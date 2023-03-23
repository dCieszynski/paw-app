import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { TAddPetFormValues } from "../types/animalShelter";
import AddImage from "./AddImage";
import ImagePreview from "./ImagePreview";
import InputField from "./InputField";
import LoginSubmitButton from "./LoginSubmitButton";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";

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
  description: Yup.string().max(500, "Description must be less than 500 characters"),
  image: Yup.mixed().required("At least one image is required"),
});

type Props = {
  id?: string;
};

const defaultProps = {
  id: undefined,
};

function PetForm({ id }: Props) {
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const createAnimal = async (values: TAddPetFormValues) => {
    imagesFiles.forEach(async (file, index) => {
      await supabase.storage.from("animals").upload(`${auth?.id}/${values.name}_${values.age}_${index}`, file, { cacheControl: "0" });
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
          (_, index) => `https://ptsiwtpctamyuwnfigwp.supabase.co/storage/v1/object/public/animals/${auth?.id}/${values.name}_${values.age}_${index}`
        ),
        user_id: auth?.id,
      },
    ]);
  };

  const editAnimal = async (values: TAddPetFormValues) => {
    const { data } = await supabase.from("animals").select().eq("id", id);
    const animal = data?.[0];

    imagesFiles.forEach(async (file, index) => {
      await supabase.storage
        .from("animals")
        .upload(`${auth?.id}/${values.name}_${values.age}_${index}`, file, { upsert: true, cacheControl: "max-age=60" });
    });

    await supabase
      .from("animals")
      .update({
        name: values.name,
        breed: values.breed,
        age: values.age,
        description: values.description,
        shelter_id: animal.shelter_id,
        species: values.species,
        images: imagesFiles.map(
          (_, index) => `https://ptsiwtpctamyuwnfigwp.supabase.co/storage/v1/object/public/animals/${auth?.id}/${values.name}_${values.age}_${index}`
        ),
        user_id: auth?.id,
      })
      .eq("id", id);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: addPetSchema,
    onSubmit: async (values) => {
      if (!id) {
        createAnimal(values);
      } else {
        editAnimal(values);
      }
      navigate("/animal_shelter");
    },
  });

  const handleImageInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      if (file instanceof File) {
        formik.setFieldValue("image", file);
        const images = [...imagesFiles, file];
        const urls = [...imagesUrls, URL.createObjectURL(file)];
        setImagesFiles(images);
        setImagesUrls(urls);
      }
    }
  };

  const handleImageRemove = useCallback(
    (url: string) => {
      const index = imagesUrls.indexOf(url);
      const urls = imagesUrls;
      urls.splice(index, 1);
      const files = imagesFiles;
      files.splice(index, 1);
      setImagesUrls(urls);
      setImagesFiles(files);
    },
    [imagesFiles, imagesUrls]
  );

  const handleAnimal = useCallback(async () => {
    if (!id) return;
    const { data: animalData } = await supabase.from("animals").select().eq("id", id);
    const animal = animalData?.[0];
    const { data: images } = await supabase.storage.from("animals").list(auth?.id, { search: `${animal.name}_${animal.age}` });
    const files: File[] = [];
    images?.forEach(async (image) => {
      const { data } = await supabase.storage.from("animals").download(`${auth?.id}/${image.name}`);
      if (data) {
        const file = new File([data], image.name, { type: "image/jpg" });
        files.push(file);
      }
    });
    setImagesFiles(files);

    formik.setValues({
      name: animal.name,
      breed: animal.breed,
      age: animal.age,
      description: animal.description,
      species: animal.species,
      image: animal.images[0],
    });
    setImagesUrls(animal.images);
    formik.setFieldValue("image", animal.images[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    handleAnimal();
  }, [handleAnimal]);

  return (
    <form className="flex flex-col gap-5 pb-10" onSubmit={formik.handleSubmit}>
      {inputs.map((input) => (
        <div key={input.name} className="flex flex-col gap-2">
          {formik.touched[input.name as keyof TAddPetFormValues] && formik.errors[input.name as keyof TAddPetFormValues] && (
            <span className="text-red">{formik.errors[input.name as keyof TAddPetFormValues]}</span>
          )}
          <InputField
            name={input.name}
            title={input.title}
            value={formik.values[input.name as keyof TAddPetFormValues] as string}
            handleChange={formik.handleChange}
          />
        </div>
      ))}
      <InputField name="species" title="Species" value={formik.values.species} handleChange={formik.handleChange} type="select" options={species} />
      <div className="flex flex-wrap gap-2 justify-center">
        {formik.touched.image && formik.errors.image && <span className="text-red">{formik.errors.image}</span>}
        <AddImage handleChange={handleImageInput} />
        {imagesUrls.map((url) => (
          <ImagePreview key={url} imgSrc={url} altText={url} url={url} handleRemove={() => handleImageRemove(url)} />
        ))}
      </div>
      <LoginSubmitButton title={id ? "Edit pet" : "Add pet"} submit />
    </form>
  );
}

PetForm.defaultProps = defaultProps;

export default PetForm;
