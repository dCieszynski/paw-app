import React from "react";
import ImageSlider from "./ImageSlider";

function ImageCard() {
  return (
    <div className="relative w-[300px] h-[400px]">
      <ImageSlider />
      <div className="bg-black bg-opacity-90 blur-[2px] w-[300px] rounded-lg h-20 absolute bottom-0" />
      <div className="text-white absolute bottom-4 left-4">
        <h2 className="font-montserrat-bold text-2xl">Rolf, 2</h2>
        <p className="font-montserrat-regular text-sm">Nova Scotia Duck Tolling Retriver</p>
      </div>
    </div>
  );
}

export default ImageCard;
