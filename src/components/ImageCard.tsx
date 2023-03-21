import React from "react";
import { MdDeleteForever, MdInfo } from "react-icons/md";
import { Link } from "react-router-dom";

import ImageSlider from "./ImageSlider";

type Props = {
  size: "small" | "medium" | "large";
  images: string[];
  title: string;
  description?: string;
  id: number;
  link?: string;
  handleDelete?: (id?: number | string, search?: string) => void;
  handleInfo?: () => void;
};

const defaultProps = {
  description: "",
  handleDelete: undefined,
  handleInfo: undefined,
  link: undefined,
};

function ImageCard({ size, images, title, description, handleDelete, id, link, handleInfo }: Props) {
  return (
    <div>
      {size === "small" && handleDelete ? (
        <div className="relative w-[140px] h-[200px] group">
          <ImageSlider images={images} />
          {link ? (
            <Link to={link}>
              <div className="bg-black bg-opacity-90 blur-[2px] w-[140px] rounded-lg h-10 absolute bottom-0 " />
              <div className="text-white absolute bottom-2 left-2">
                <h2 className="font-montserrat-bold text-sm">{title}</h2>
              </div>
            </Link>
          ) : (
            <>
              <div className="bg-black bg-opacity-90 blur-[2px] w-[140px] rounded-lg h-10 absolute bottom-0" />
              <div className="text-white absolute bottom-2 left-2">
                <h2 className="font-montserrat-bold text-sm">{title}</h2>
              </div>
            </>
          )}
          <button
            type="button"
            className="bg-black opacity-70 rounded hidden group-hover:block absolute top-6 right-[-12px] translate-x-[-50%] translate-y-[-50%] text-red text-4xl transition-all ease-in hover:opacity-100"
            onClick={() => handleDelete(id, `${title.split(", ").join("_")}`)}
          >
            <MdDeleteForever />
          </button>
        </div>
      ) : (
        <div className="relative w-[300px] h-[400px]">
          <ImageSlider images={images} />
          <div className="bg-black bg-opacity-90 blur-[2px] w-[300px] rounded-lg h-20 absolute bottom-0" />
          <div className="w-full flex justify-between text-white absolute bottom-4 px-4">
            <div>
              <h2 className="font-montserrat-bold text-2xl">{title}</h2>
              <p className="font-montserrat-regular text-sm">{description}</p>
            </div>
            {link === undefined && (
              <button type="button" className="text-paw-green-2 text-4xl transition-all ease-in hover:text-white" onClick={handleInfo}>
                <MdInfo />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

ImageCard.defaultProps = defaultProps;

export default ImageCard;
