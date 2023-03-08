import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

import defaultImgUrl from "../assets/avatar.svg";
import { TProfileFormValues } from "../types/login";
import LoginSubmitButton from "../components/LoginSubmitButton";
import InputField from "../components/InputField";
import BackButton from "../components/BackButton";
import ImagePicker from "../components/ImagePicker";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";

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
  const { auth } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [avatarUrl, setAvatarUrl] = useState(defaultImgUrl);
  const navigate = useNavigate();

  const initialValues: TProfileFormValues =
    role === "keeper" ? { avatar: undefined, firstName: "", lastName: "" } : { avatar: undefined, name: "", city: "", address: "" };

  const profileSchema = role === "keeper" ? keeperSchema : animalShelterSchema;

  const inputs = role === "keeper" ? keeperInputs : animalShelterInputs;

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      if (role === "keeper") {
        await supabase.storage.from("avatars").upload(`${auth?.id}/avatar-${auth?.id}`, avatarFile as File);
        await supabase.from("keepers").insert([
          {
            firstName: values.firstName,
            lastName: values.lastName,
            avatarImageSrc: `https://ptsiwtpctamyuwnfigwp.supabase.co/storage/v1/object/public/avatars/${auth?.id}/avatar-${auth?.id}`,
            user_id: auth?.id,
          },
        ]);
      } else {
        await supabase.storage.from("avatars").upload(`${auth?.id}/avatar-${auth?.id}`, avatarFile as File);
        await supabase.from("shelters").insert([
          {
            name: values.name,
            city: values.city,
            address: values.address,
            avatarImageSrc: `https://ptsiwtpctamyuwnfigwp.supabase.co/storage/v1/object/public/avatars/${auth?.id}/avatar-${auth?.id}`,
            user_id: auth?.id,
          },
        ]);
      }
      navigate("/discover");
    },
  });

  const handleAvatarImageInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        const file = e.currentTarget.files[0];
        if (file instanceof File) {
          formik.setFieldValue("avatar", file);
          setAvatarFile(file);
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
