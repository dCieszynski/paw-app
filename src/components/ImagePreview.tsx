import React from "react";
import { MdDeleteForever } from "react-icons/md";

type Props = {
  imgSrc: string;
  altText: string;
  handleRemove: (url: string) => void;
  url: string;
};

function ImagePreview({ imgSrc, altText, handleRemove, url }: Props) {
  return (
    <div className="relative w-[99px] h-[99px] border-[1px] border-paw-green-2 rounded-3xl shadow-2xl group">
      <img src={imgSrc} alt={altText} className="w-full h-full object-cover rounded-3xl" />
      <button
        type="button"
        className="bg-black opacity-70 rounded hidden group-hover:block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-red text-4xl"
        onClick={() => handleRemove(url)}
      >
        <MdDeleteForever />
      </button>
    </div>
  );
}

export default ImagePreview;
