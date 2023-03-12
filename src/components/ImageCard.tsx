import React from "react";
import { MdDeleteForever } from "react-icons/md";

import ImageSlider from "./ImageSlider";

type Props = {
  size: "small" | "medium" | "large";
  images: string[];
  title: string;
  description?: string;
  id: number;
  handleDelete: (id: number, search: string) => void;
};

const defaultProps = {
  description: "",
};

function ImageCard({ size, images, title, description, handleDelete, id }: Props) {
  return (
    <div>
      {size === "small" ? (
        <div className="relative w-[140px] h-[200px] group">
          {images && <ImageSlider images={images} />}
          <div className="bg-black bg-opacity-90 blur-[2px] w-[140px] rounded-lg h-10 absolute bottom-0" />
          <div className="text-white absolute bottom-2 left-2">
            <h2 className="font-montserrat-bold text-sm">{title}</h2>
          </div>
          <button
            type="button"
            className="bg-black opacity-70 rounded hidden group-hover:block absolute top-6 right-[-12px] translate-x-[-50%] translate-y-[-50%] text-red text-4xl"
            onClick={() => handleDelete(id, `${title.split(", ").join("_")}`)}
          >
            <MdDeleteForever />
          </button>
        </div>
      ) : (
        <div className="relative w-[300px] h-[400px]">
          {images && <ImageSlider images={images} />}
          <div className="bg-black bg-opacity-90 blur-[2px] w-[300px] rounded-lg h-20 absolute bottom-0" />
          <div className="text-white absolute bottom-4 left-4">
            <h2 className="font-montserrat-bold text-2xl">{title}</h2>
            <p className="font-montserrat-regular text-sm">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

ImageCard.defaultProps = defaultProps;

export default ImageCard;
