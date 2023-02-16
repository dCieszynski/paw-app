import React from "react";
import { IconType } from "react-icons/lib/esm/iconBase";

type Props = {
  Icon: IconType;
};

function LoginButton({ Icon }: Props) {
  return (
    <button type="button" className="border-[1px] border-br-grey rounded-2xl p-4 text-paw-green-2 text-[32px]">
      <Icon />
    </button>
  );
}

export default LoginButton;
