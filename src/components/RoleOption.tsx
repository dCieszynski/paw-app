import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

type Props = {
  text: string;
  active: boolean;
  onClick: () => void;
};

function RoleOption({ text, active, onClick }: Props) {
  return (
    <button
      type="button"
      className={`w-[295px] py-4 rounded-2xl flex items-center justify-between ${
        !active
          ? "border-[1px] border-br-grey hover:border-none hover:font-montserrat-bold hover:text-white hover:bg-paw-green-2"
          : "bg-paw-green-2 text-white font-montserrat-bold border-none hover:border-1 hover: border-br-grey"
      }`}
      onClick={onClick}
    >
      <span className="pl-5">{text}</span>
      <span className={`pr-5 ${!active ? "text-inactive" : "text-white"}`}>
        <AiOutlineCheck />
      </span>
    </button>
  );
}

export default RoleOption;
