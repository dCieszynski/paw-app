import React from "react";

type Props = {
  name: string;
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ name, title, handleChange }: Props) {
  return (
    <div className="relative w-[295px] h-14 border-[1px] border-br-grey rounded-2xl flex items-center font-montserrat-regular">
      <label htmlFor={name} className="absolute top-[-12px] left-5 text-input-grey bg-white pl-2 text-xs">
        {title}
      </label>
      <input id={name} type="text" name={name} className="px-4 w-full text-sm ring-0 outline-none" onChange={handleChange} />
    </div>
  );
}

export default InputField;
