import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
  handleClick?: () => void;
};

const defaultProps = {
  handleClick: undefined,
};

function BackButton({ handleClick }: Props) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="w-[52px] h-[52px] border-[1px] border-br-grey text-paw-green-2 text-2xl rounded-2xl flex justify-center items-center transition-all ease-in hover:bg-paw-green-2 hover:text-white"
      /* eslint-disable-next-line no-unneeded-ternary */
      onClick={handleClick ? handleClick : () => navigate(-1)}
    >
      <MdArrowBackIosNew />
    </button>
  );
}

BackButton.defaultProps = defaultProps;

export default BackButton;
