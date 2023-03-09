import React from "react";
import { FiFilter } from "react-icons/fi";

type Props = {
  handleClick?: () => void;
};

const defaultProps = {
  handleClick: () => {},
};

function Button({ handleClick }: Props) {
  return (
    <button
      type="button"
      className="w-[52px] h-[52px] border-[1px] border-br-grey text-paw-green-2 text-2xl rounded-2xl flex justify-center items-center"
      onClick={handleClick}
    >
      <FiFilter />
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;
