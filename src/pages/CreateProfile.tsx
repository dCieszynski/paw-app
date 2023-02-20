import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import defaultImgUrl from "../assets/avatar.svg";
import { TProfileFormValues } from "../types/login";
import LoginSubmitButton from "../components/LoginSubmitButton";
import InputField from "../components/InputField";
import BackButton from "../components/BackButton";
import ImagePicker from "../components/ImagePicker";

const keeperInputs = [
  { name: "firstName", title: "First name" },
  { name: "lastName", title: "Last name" },
];

const animalShelterInputs = [
  { name: "name", title: "Name" },
  { name: "city", title: "City" },
  { name: "address", title: "Address" },
];

const keeperSchema = Yup.object({
  avatar: Yup.mixed().required("Avatar is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const animalShelterSchema = Yup.object({
  avatar: Yup.mixed().required("Avatar is required"),
  name: Yup.string().required("Name is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
});

function CreateProfile() {
  const { role } = useParams();
  const [avatarUrl, setAvatarUrl] = useState(defaultImgUrl);

  const initialValues: TProfileFormValues =
    role === "keeper" ? { avatar: undefined, firstName: "", lastName: "" } : { avatar: undefined, name: "", city: "", address: "" };

  const profileSchema = role === "keeper" ? keeperSchema : animalShelterSchema;

  const inputs = role === "keeper" ? keeperInputs : animalShelterInputs;

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleAvatarImageInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        const file = e.currentTarget.files[0];
        if (file instanceof File) {
          formik.setFieldValue("avatar", file);
          setAvatarUrl(URL.createObjectURL(file));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="flex flex-col gap-8">
      <BackButton />
      <form className="flex flex-col items-center gap-14" onSubmit={formik.handleSubmit}>
        <h1 className="self-start font-montserrat-bold text-[34px]">Profile details</h1>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            {formik.touched.avatar && formik.errors.avatar && <span className="text-red">{formik.errors.avatar}</span>}
            <ImagePicker imgUrl={avatarUrl} altText="Avatar" handleChange={handleAvatarImageInput} />
          </div>

          <div className="flex flex-col gap-5">
            {inputs.map((input) => (
              <div key={input.name} className="flex flex-col gap-2">
                {formik.touched[input.name as keyof TProfileFormValues] && formik.errors[input.name as keyof TProfileFormValues] && (
                  <span className="text-red">{formik.errors[input.name as keyof TProfileFormValues]}</span>
                )}
                <InputField name={input.name} title={input.title} handleChange={formik.handleChange} />
              </div>
            ))}
          </div>
        </div>
        <LoginSubmitButton title="Confirm" submit />
      </form>
    </div>
  );
}

export default CreateProfile;
