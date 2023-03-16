import React from "react";
import { IconType } from "react-icons/lib/esm/iconBase";

type Props = {
  Icon: IconType;
  handleClick: () => void;
};

function LoginButton({ Icon, handleClick }: Props) {
  return (
    <button
      type="button"
      className="border-[1px] border-br-grey rounded-2xl p-4 text-paw-green-2 text-[32px] shadow-md transition-all ease-in hover:bg-paw-green-2 hover:text-white"
      onClick={handleClick}
    >
      <Icon />
    </button>
  );
}

export default LoginButton;
