import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import InputField from "../components/InputField";
import LoginSubmitButton from "../components/LoginSubmitButton";
import supabase from "../supabase";

function OTPSignin() {
  const navigate = useNavigate();

  const handleSubmit = async (email: string) => {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://dcieszynskipaw.netlify.app/create_profile",
      },
    });
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => handleSubmit(values.email),
  });

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="self-start">
        <BackButton />
      </div>
      <div className="flex flex-col gap-4 w-[295px]">
        <h1 className="font-montserrat-bold text-2xl">Sign in via OTP link</h1>
        <div className="font-montserrat-regular text-justify text-">
          Please enter your email on which will be sent a confirmation link to login. After clicking on Send OTP link, check your email address to
          login via OTP link.
        </div>
      </div>
      <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
        <InputField name="email" title="Email" value={formik.values.email} handleChange={formik.handleChange} />
        <LoginSubmitButton title="Send OTP link" submit />
      </form>
    </div>
  );
}

export default OTPSignin;
