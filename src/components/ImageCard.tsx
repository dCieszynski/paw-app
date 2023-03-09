import React from "react";
import ImageSlider from "./ImageSlider";

type Props = {
  size: "small" | "medium" | "large";
};

function ImageCard({ size }: Props) {
  return (
    <div>
      {size === "small" ? (
        <div className="relative w-[140px] h-[200px]">
          <ImageSlider />
          <div className="bg-black bg-opacity-90 blur-[2px] w-[140px] rounded-lg h-10 absolute bottom-0" />
          <div className="text-white absolute bottom-2 left-2">
            <h2 className="font-montserrat-bold text-sm">Rolf, 2</h2>
          </div>
        </div>
      ) : (
        <div className="relative w-[300px] h-[400px]">
          <ImageSlider />
          <div className="bg-black bg-opacity-90 blur-[2px] w-[300px] rounded-lg h-20 absolute bottom-0" />
          <div className="text-white absolute bottom-4 left-4">
            <h2 className="font-montserrat-bold text-2xl">Rolf, 2</h2>
            <p className="font-montserrat-regular text-sm">Nova Scotia Duck Tolling Retriver</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageCard;
