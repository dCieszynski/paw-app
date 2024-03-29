import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  submit: boolean;
  link?: string;
};

const defaultProps = {
  link: undefined,
};

function LoginSubmitButton({ title, submit, link }: Props) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {link ? (
        <Link
          className="bg-paw-green-2 w-[295px] h-14 font-montserrat-bold text-white rounded-2xl flex justify-center items-center shadow-md transition-all ease-in-out hover:text-lg hover:border-4 hover:border-paw-green-3"
          to={link}
        >
          {title}
        </Link>
      ) : (
        <button
          type={submit ? "submit" : "button"}
          className="bg-paw-green-2 w-[295px] h-14 font-montserrat-bold text-white rounded-2xl shadow-md transition-all ease-in-out hover:text-lg hover:border-4 hover:border-paw-green-3"
        >
          {title}
        </button>
      )}
    </>
  );
}

LoginSubmitButton.defaultProps = defaultProps;

export default LoginSubmitButton;
