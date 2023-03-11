import React from "react";
import { IoMdAddCircle } from "react-icons/io";

type Props = {
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

function AddImage({ handleChange }: Props) {
  return (
    <button type="button" className="w-[99px] h-[99px] border-[1px] rounded-3xl border-paw-green-2 shadow-2xl">
      <div className="text-paw-green-2">
        <label htmlFor="image" className="relative text-4xl flex justify-center">
          <IoMdAddCircle />
          <input
            type="file"
            name="image"
            id="image"
            accept="image/jpg, image/png"
            className="absolute cursor-pointer file:invisible top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-8 h-8"
            onChange={handleChange}
          />
        </label>
      </div>
    </button>
  );
}

export default AddImage;
