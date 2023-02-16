import React from "react";
import { FaFacebookSquare, FaGoogle, FaApple } from "react-icons/fa";

import logoUrl from "../assets/logo.svg";
import LoginButton from "../components/LoginButton";

function Login() {
  return (
    <div className="flex flex-col items-center gap-36">
      <div className="flex flex-col items-center">
        <div className="w-[150px] h-[222px] mb-[38px]">
          <img src={logoUrl} alt="Paw logo" />
        </div>
        <h1 className="font-montserrat-bold text-lg mb-[41px]">Sign up to continue</h1>
        <div className="flex gap-5">
          <LoginButton Icon={FaFacebookSquare} />
          <LoginButton Icon={FaGoogle} />
          <LoginButton Icon={FaApple} />
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
