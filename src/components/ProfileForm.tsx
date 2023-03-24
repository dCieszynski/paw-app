import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TProfileFormValues } from "../types/login";
import ImagePicker from "./ImagePicker";
import InputField from "./InputField";
import LoginSubmitButton from "./LoginSubmitButton";
import useAuth from "../utils/useAuth";
import defaultImgUrl from "../assets/avatar.svg";
import supabase from "../supabase";

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

function ProfileForm() {
  const { role } = useParams();
  const { auth, profile } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [avatarUrl, setAvatarUrl] = useState(defaultImgUrl);
  const navigate = useNavigate();

  const initialValues: TProfileFormValues =
    role === "keeper" ? { avatar: undefined, firstName: "", lastName: "" } : { avatar: undefined, name: "", city: "", address: "" };

  const profileSchema = role === "keeper" ? keeperSchema : animalShelterSchema;

  const inputs = role === "keeper" ? keeperInputs : animalShelterInputs;

  const addProfile = async (values: TProfileFormValues) => {
    if (role === "keeper") {
      await supabase.storage
        .from("avatars")
        .upload(`${auth?.id}/avatar-${auth?.id}`, avatarFile as File, { upsert: true, cacheControl: "max-age=60" });
      await supabase.from("keepers").insert([
        {
          firstName: values.firstName,
          lastName: values.lastName,
          avatarImageSrc: `https://ptsiwtpctamyuwnfigwp.supabase.co/storage/v1/object/public/avatars/${auth?.id}/avatar-${auth?.id}`,
          user_id: auth?.id,
          role,
        },
      ]);
      navigate("/keeper");
    } else {
      await supabase.storage.from("avatars").upload(`${auth?.id}/avatar-${auth?.id}`, avatarFile as File);
      await supabase.from("shelters").insert([
        {
          name: values.name,
          city: values.city,
          address: values.address,
          avatarImageSrc: `https://ptsiwtpctamyuwnfigwp.supabase.co/storage/v1/object/public/avatars/${auth?.id}/avatar-${auth?.id}`,
          user_id: auth?.id,
          role,
        },
      ]);
      navigate("/animal_shelter");
    }
  };

  const editProfile = async (values: TProfileFormValues) => {
    if (role === "keeper") {
      await supabase.storage
        .from("avatars")
        .upload(`${auth?.id}/avatar-${auth?.id}`, avatarFile as File, { upsert: true, cacheControl: "max-age=60" });
      await supabase
        .from("keepers")
        .update([
          {
            firstName: values.firstName,
            lastName: values.lastName,
            avatarImageSrc: `https://ptsiwtpctamyuwnfigwp.supabase.co/storage/v1/object/public/avatars/${auth?.id}/avatar-${auth?.id}`,
            user_id: auth?.id,
            role,
          },
        ])
        .eq("user_id", auth?.id);
      navigate("/keeper");
    } else {
      await supabase.storage
        .from("avatars")
        .upload(`${auth?.id}/avatar-${auth?.id}`, avatarFile as File, { upsert: true, cacheControl: "max-age=60" });
      await supabase
        .from("shelters")
        .update([
          {
            name: values.name,
            city: values.city,
            address: values.address,
            avatarImageSrc: `https://ptsiwtpctamyuwnfigwp.supabase.co/storage/v1/object/public/avatars/${auth?.id}/avatar-${auth?.id}`,
            user_id: auth?.id,
            role,
          },
        ])
        .eq("user_id", auth?.id);
      navigate("/animal_shelter");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      if (profile === null) {
        await addProfile(values);
      } else if (profile) {
        await editProfile(values);
      }
    },
  });

  const handleAvatarImageInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      if (file instanceof File) {
        formik.setFieldValue("avatar", file);
        setAvatarFile(file);
        setAvatarUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleProfile = useCallback(async () => {
    if (profile) {
      const { data: avatar } = await supabase.storage.from("avatars").download(`${profile.user_id}/avatar-${profile.user_id}`);
      if (profile.role === "keeper") {
        formik.setValues({
          firstName: profile.firstName,
          lastName: profile.lastName,
          avatar: avatar as File,
        });
      } else {
        formik.setValues({
          name: profile.name,
          city: profile.city,
          address: profile.address,
          avatar: avatar as File,
        });
      }
      setAvatarFile(avatar as File);
      setAvatarUrl(URL.createObjectURL(avatar as File));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    handleProfile();
  }, [handleProfile]);

  return (
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
              <InputField
                name={input.name}
                title={input.title}
                value={formik.values[input.name as keyof TProfileFormValues] as string}
                handleChange={formik.handleChange}
              />
            </div>
          ))}
        </div>
      </div>
      <LoginSubmitButton title="Confirm" submit />
    </form>
  );
}

export default ProfileForm;
