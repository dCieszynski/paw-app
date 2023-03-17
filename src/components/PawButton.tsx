import React from "react";

import pawBtnUrl from "../assets/pawBtn.svg";

type Props = {
  handleClick: () => void;
};

function PawButton({ handleClick }: Props) {
  return (
    <button
      type="button"
      className="w-[72px] h-[72px] bg-paw-green-2 rounded-full flex justify-center items-center shadow-xl transition-all ease-in hover:shadow-2xl hover:scale-125 hover:border-4 hover:border-paw-green-3"
      onClick={handleClick}
    >
      <img className="w-9" src={pawBtnUrl} alt="Paw button" />
    </button>
  );
}

export default PawButton;
