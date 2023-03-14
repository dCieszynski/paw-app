import React from "react";

type Props = {
  name: string;
  title: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: "text" | "select";
  options?: string[];
};

const defaultProps = {
  value: "",
  type: "text",
  options: [],
};

function InputField({ name, title, type, value, options, handleChange }: Props) {
  return (
    <div className="relative w-[295px] h-14 border-[1px] border-br-grey rounded-2xl flex items-center font-montserrat-regular">
      {type && options && type === "select" ? (
        <>
          <label htmlFor={name} className="absolute top-[-12px] left-5 text-input-grey bg-white pl-2 text-xs">
            {title}
          </label>
          <select name={name} id={name} className="px-4 appearance-none w-full text-sm ring-0 outline-none" value={value} onChange={handleChange}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : (
        <div>
          {value !== undefined ? (
            <>
              <label htmlFor={name} className="absolute top-[-12px] left-5 text-input-grey bg-white pl-2 text-xs">
                {title}
              </label>
              <input id={name} type="text" value={value} name={name} className="px-4 w-full text-sm ring-0 outline-none" onChange={handleChange} />
            </>
          ) : (
            <>
              <label htmlFor={name} className="absolute top-[-12px] left-5 text-input-grey bg-white pl-2 text-xs">
                {title}
              </label>
              <input id={name} type="text" name={name} className="px-4 w-full text-sm ring-0 outline-none" onChange={handleChange} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

InputField.defaultProps = defaultProps;

export default InputField;
