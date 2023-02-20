import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="w-[52px] h-[52px] border-[1px] border-br-grey text-paw-green-2 text-2xl rounded-2xl flex justify-center items-center"
      onClick={() => navigate(-1)}
    >
      <MdArrowBackIosNew />
    </button>
  );
}

export default BackButton;
