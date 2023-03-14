import React from "react";
import { IconType } from "react-icons";
import { FiFilter } from "react-icons/fi";

type Props = {
  handleClick?: () => void;
  Icon?: IconType;
};

const defaultProps = {
  handleClick: () => {},
  Icon: FiFilter,
};

function Button({ handleClick, Icon }: Props) {
  return (
    <button
      type="button"
      className="w-[52px] h-[52px] border-[1px] border-br-grey text-paw-green-2 text-2xl rounded-2xl flex justify-center items-center"
      onClick={handleClick}
    >
      {Icon && <Icon />}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;
