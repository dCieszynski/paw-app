import React from "react";
import { Provider } from "@supabase/supabase-js";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { Navigate } from "react-router-dom";

import logoUrl from "../assets/logo.svg";
import LoginButton from "../components/LoginButton";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import LoginSubmitButton from "../components/LoginSubmitButton";

function Login() {
  const { auth } = useAuth();

  async function signIn(provider: Provider) {
    await supabase.auth.signInWithOAuth({
      provider,
    });
  }

  if (auth) {
    return <Navigate to="/create_profile" />;
  }

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex flex-col items-center">
        <div className="w-[150px] h-[222px] mb-[36px]">
          <img src={logoUrl} alt="Paw logo" />
        </div>
        <h1 className="font-montserrat-bold text-lg mb-6">Sign up to continue</h1>
        <div className="flex flex-col items-center gap-6">
          <LoginSubmitButton title="Sign in with OTP" submit={false} link="/sign_via_otp" />
          <div className="flex gap-5">
            <LoginButton Icon={FaGoogle} handleClick={() => signIn("google")} />
            <LoginButton Icon={FaDiscord} handleClick={() => signIn("discord")} />
          </div>
        </div>
      </div>
      <div className="flex gap-5 text-paw-green-2">
        <div>Terms of use</div>
        <div>Privacy Policy</div>
      </div>
    </div>
  );
}

export default Login;
