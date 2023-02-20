import React, { useState } from "react";
import { TiCamera } from "react-icons/ti";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

import defaultImgUrl from "../assets/avatar.svg";
import { TProfileFormValues } from "../types/login";
import LoginSubmitButton from "../components/LoginSubmitButton";
import InputField from "../components/InputField";
import BackButton from "../components/BackButton";

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

  return (
    <div className="flex flex-col gap-8">
      <BackButton />
      <form className="flex flex-col items-center gap-14" onSubmit={formik.handleSubmit}>
        <h1 className="self-start font-montserrat-bold text-[34px]">Profile details</h1>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            {formik.touched.avatar && formik.errors.avatar && <span className="text-red">{formik.errors.avatar}</span>}
            <div className="relative w-[99px] h-[99px]">
              <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-3xl" />
              <div className="absolute right-0 bottom-[-8px] flex justify-center items-center w-[34px] h-[34px] border-2 border-white rounded-full bg-paw-green-2 text-white">
                <label htmlFor="avatar" className="relative w-full h-full flex justify-center items-center">
                  <TiCamera />
                  <input
                    type="file"
                    accept="image/"
                    name="avatar"
                    className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  w-[34px] h-[34px] cursor-pointer file:invisible"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      if (e.currentTarget.files) {
                        formik.setFieldValue("avatar", e.currentTarget.files[0]);
                        setAvatarUrl(URL.createObjectURL(e.currentTarget.files[0]));
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {inputs.map((input) => (
              <div key={input.name} className="flex flex-col gap-2">
                {formik.touched[input.name as keyof TProfileFormValues] && formik.errors[input.name as keyof TProfileFormValues] && (
                  <span className="text-red">{formik.errors.firstName}</span>
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
