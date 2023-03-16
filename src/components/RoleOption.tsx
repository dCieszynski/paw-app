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
      className={`w-[295px] h-[58px] py-4 rounded-2xl flex items-center justify-between ${
        !active
          ? "border-[1px] border-br-grey transition-all ease-in hover:text-white hover:font-montserrat-bold hover:border-none hover:bg-paw-green-2"
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
