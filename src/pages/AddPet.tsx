import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import BackButton from "../components/BackButton";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import { shelterLinks as links } from "../utils/navbarLinks";
import LoginSubmitButton from "../components/LoginSubmitButton";
import AddImage from "../components/AddImage";
import ImagePreview from "../components/ImagePreview";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import { TAddPetFormValues } from "../types/animalShelter";

const inputs = [
  {
    name: "name",
    title: "Name",
  },
  {
    name: "breed",
    title: "Breed",
  },
  {
    name: "age",
    title: "Age",
  },
  {
    name: "description",
    title: "Description",
  },
];

const species = ["Dog", "Cat", "Other"];

const initialValues: TAddPetFormValues = {
  name: "",
  breed: "",
  age: "",
  species: "Dog",
  description: "",
  image: undefined,
};

const addPetSchema = Yup.object({
  name: Yup.string().required("Name is required").max(20, "Name must be less than 20 characters"),
  breed: Yup.string().required("Breed is required").max(20, "Breed must be less than 20 characters"),
  age: Yup.string()
    .required("Age is required")
    .test("is-num-0-30", "Age must be a number between 1 and 30", (value) => {
      if (value) {
        const num = Number(value);
        return num > -1 && num < 31;
      }
      return false;
    }),
  description: Yup.string().max(100, "Description must be less than 100 characters"),
  image: Yup.mixed().required("At least one image is required"),
});

function AddPet() {
  const [imagesUrls, setImagesUrls] = React.useState<string[]>([]);
  const [imagesFiles, setImagesFiles] = React.useState<File[]>([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: addPetSchema,
    onSubmit: async (values) => {
      imagesFiles.forEach(async (file, index) => {
        await supabase.storage.from("animals").upload(`${auth?.id}/${values.name}_${values.age}_${index}`, file);
      });

      const { data } = await supabase.from("shelters").select("id").eq("user_id", auth?.id);

      await supabase.from("animals").insert([
        {
          name: values.name,
          breed: values.breed,
          age: values.age,
          description: values.description,
          shelter_id: data?.[0].id,
          species: values.species,
          images: imagesFiles.map(
            (_, index) =>
              `https://ptsiwtpctamyuwnfigwp.supabase.co/storage/v1/object/public/animals/${auth?.id}/${values.name}_${values.age}_${index}`
          ),
          user_id: auth?.id,
        },
      ]);
      navigate("/animal_shelter");
    },
  });

  const handleImageInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        const file = e.currentTarget.files[0];
        if (file instanceof File) {
          formik.setFieldValue("image", file);
          const images = imagesFiles;
          images.push(file);
          const urls = imagesUrls;
          urls.push(URL.createObjectURL(file));
          setImagesFiles(images);
          setImagesUrls(urls);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleImageRemove = useCallback(
    (url: string) => {
      const index = imagesUrls.indexOf(url);
      const urls = [...imagesUrls];
      urls.splice(index, 1);
      const files = [...imagesFiles];
      files.splice(index, 1);
      setImagesUrls(urls);
      setImagesFiles(files);
    },
    [imagesFiles, imagesUrls]
  );

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="text-right">
          <h1 className="font-montserrat-bold text-2xl">Add pett</h1>
          <p className="font-montserrat-regular text-input-grey">Here you can add a new pet.</p>
        </div>
      </div>
      <div className="w-[300px] p-">
        <form className="flex flex-col gap-5 pb-10" onSubmit={formik.handleSubmit}>
          {inputs.map((input) => (
            <div key={input.name} className="flex flex-col gap-2">
              {formik.touched[input.name as keyof TAddPetFormValues] && formik.errors[input.name as keyof TAddPetFormValues] && (
                <span className="text-red">{formik.errors[input.name as keyof TAddPetFormValues]}</span>
              )}
              <InputField name={input.name} title={input.title} handleChange={formik.handleChange} />
            </div>
          ))}
          <InputField
            name="species"
            title="Species"
            value={formik.values.species}
            handleChange={formik.handleChange}
            type="select"
            options={species}
          />
          <div className="flex flex-wrap gap-2 justify-center">
            {formik.touched.image && formik.errors.image && <span className="text-red">{formik.errors.image}</span>}
            <AddImage handleChange={handleImageInput} />
            {imagesUrls.map((url) => (
              <ImagePreview key={url} imgSrc={url} altText={url} url={url} handleRemove={() => handleImageRemove(url)} />
            ))}
          </div>
          <LoginSubmitButton title="Add pet" submit />
        </form>
      </div>

      <Navbar links={links} />
    </div>
  );
}

export default AddPet;
