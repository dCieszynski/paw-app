import React from "react";

type Props = {
  title: string;
  submit: boolean;
};

function LoginSubmitButton({ title, submit }: Props) {
  return (
    <button type={submit ? "submit" : "button"} className="bg-paw-green-2 w-[295px] h-14 font-montserrat-bold text-white rounded-2xl">
      {title}
    </button>
  );
}

export default LoginSubmitButton;
