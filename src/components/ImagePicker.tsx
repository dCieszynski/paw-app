import React from "react";
import { TiCamera } from "react-icons/ti";

type Props = {
  imgUrl: string;
  altText: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

function ImagePicker({ imgUrl, altText, handleChange }: Props) {
  return (
    <div className="relative w-[99px] h-[99px]">
      <img src={imgUrl} alt={altText} className="w-full h-full rounded-3xl" />
      <div className="absolute right-0 bottom-[-8px] flex justify-center items-center w-[34px] h-[34px] border-2 border-white rounded-full bg-paw-green-2 text-white">
        <label htmlFor="avatar" className="relative w-full h-full flex justify-center items-center">
          <TiCamera />
          <input
            type="file"
            accept="image/jpg, image/png"
            name="avatar"
            id="avatar"
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  w-[34px] h-[34px] cursor-pointer file:invisible"
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}

export default ImagePicker;
