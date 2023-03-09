import React from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import dog1 from "../assets/dog.png";
import dog2 from "../assets/dog2.jpg";
import dog3 from "../assets/dog3.jpg";

const images = [
  {
    url: dog1,
  },
  {
    url: dog2,
  },
  {
    url: dog3,
  },
];

function ImageSlider() {
  const [currentImage, setCurrentImage] = React.useState(0);

  const goToNextImage = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <div className="rounded w-full h-full group">
      {images.map((image, index) => (
        <img
          key={image.url}
          className={`absolute w-full h-full transition-opacity ${index === currentImage ? "opacity-100" : "opacity-0"} duration-500 ease-in-out`}
          src={image.url}
          alt="Dog"
        />
      ))}
      {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div className="hidden group-hover:block absolute top-1/2 translate-y-[-50%] text-4xl cursor-pointer" onClick={goToNextImage}>
        <IoMdArrowDropleft />
      </div>
      <div className="hidden group-hover:block absolute top-1/2 translate-y-[-50%] right-0 text-4xl cursor-pointer" onClick={goToPreviousImage}>
        <IoMdArrowDropright />
      </div>
      {/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
    </div>
  );
}

export default ImageSlider;
