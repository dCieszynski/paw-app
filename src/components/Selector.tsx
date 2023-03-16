// eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events

import React from "react";

type Props = {
  title: string;
  value: string;
  elements: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
};

function Selector({ title, value, elements, setFieldValue }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setFieldValue("species", e.currentTarget.textContent);
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-montserrat-bold">{title}</h2>
      <div className="font-montserrat-regular flex rounded-2xl border-2 border-input-grey-2 h-14 w-[295px]">
        {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          className={`${
            value === elements[0] ? "bg-paw-green-2 text-white font-montserrat-bold" : ""
          } rounded-l-2xl border-r-[1px] border-input-grey flex justify-center items-center w-[98px] cursor-pointer  ${
            value !== elements[0] ? "hover:bg-paw-green-1 hover:font-montserrat-bold" : ""
          }`}
          onClick={handleClick}
        >
          {elements[0]}
        </div>
        <div
          className={`${
            value === elements[1] ? "bg-paw-green-2 text-white font-montserrat-bold" : ""
          } font-montserrat-regular border-r-[1px] border-input-grey flex justify-center items-center w-[98px] cursor-pointer  ${
            value !== elements[1] ? "hover:bg-paw-green-1 hover:font-montserrat-bold" : ""
          }`}
          onClick={handleClick}
        >
          {elements[1]}
        </div>
        <div
          className={`${
            value === elements[2] ? "bg-paw-green-2 text-white font-montserrat-bold" : ""
          } rounded-r-2xl  flex justify-center items-center w-[98px] cursor-pointer ${
            value !== elements[2] ? "hover:bg-paw-green-1 hover:font-montserrat-bold" : ""
          }`}
          onClick={handleClick}
        >
          {elements[2]}
        </div>
        {/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      </div>
    </div>
  );
}

export default Selector;
