import React, { useState } from "react";
import { TiCamera } from "react-icons/ti";
import { MdArrowBackIosNew } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";

import defaultImgUrl from "../assets/avatar.svg";
import { TKeeperFormValues } from "../types/login";
import LoginSubmitButton from "../components/LoginSubmitButton";
import InputField from "../components/InputField";

function CreateProfile() {
  const [avatarUrl, setAvatarUrl] = useState(defaultImgUrl);
  const initialValues: TKeeperFormValues = { avatar: undefined, firstName: "", lastName: "" };

  const profileSchema = Yup.object({
    avatar: Yup.mixed().required("Avatar is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <button
        type="button"
        className="w-[52px] h-[52px] border-[1px] border-br-grey text-paw-green-2 text-2xl rounded-2xl flex justify-center items-center"
      >
        <MdArrowBackIosNew />
      </button>
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
            <div className="flex flex-col gap-2">
              {formik.touched.firstName && formik.errors.firstName && <span className="text-red">{formik.errors.firstName}</span>}
              <InputField name="firstName" title="First name" handleChange={formik.handleChange} />
            </div>
            <div className="flex flex-col gap-2">
              {formik.touched.lastName && formik.errors.lastName && <span className="text-red">{formik.errors.lastName}</span>}
              <InputField name="lastName" title="Last name" handleChange={formik.handleChange} />
            </div>
          </div>
        </div>
        <LoginSubmitButton title="Confirm" submit />
      </form>
    </div>
  );
}

export default CreateProfile;
