import React from "react";
import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  textSize: string;
  color: string;
  handleClick: () => void;
};

function CircleButton({ Icon, color, textSize, handleClick }: Props) {
  return (
    <button
      type="button"
      className={`w-[64px] h-[64px] border-[1px] border-br-grey ${color} ${textSize} rounded-full flex justify-center items-center shadow-xl`}
      onClick={handleClick}
    >
      <Icon />
    </button>
  );
}

export default CircleButton;
