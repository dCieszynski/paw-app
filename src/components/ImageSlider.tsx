import React, { useEffect } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import Loader from "./Loader";

type Props = {
  images: string[];
};

function ImageSlider({ images }: Props) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [loadedImages, setLoadedImages] = React.useState<number[]>([]);

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

  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
  };

  useEffect(() => {
    setLoadedImages([]);
  }, [images]);

  return (
    <div className="rounded w-full h-full group">
      {images.map((image, index) => (
        <div key={image}>
          {!loadedImages.includes(index) && <Loader />}
          <img
            className={`${loadedImages.includes(index) ? "opacity-100" : "opacity-0"} absolute w-full h-full object-cover transition-opacity ${
              index === currentImage ? "opacity-100" : "opacity-0"
            } duration-500 ease-in-out`}
            src={image}
            onLoad={() => handleImageLoad(index)}
            alt="Pet"
          />
        </div>
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
