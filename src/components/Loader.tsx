import React from "react";
import lodaderUrl from "../assets/loader.svg";

function Loader() {
  return (
    <div className="w-full h-full">
      <img src={lodaderUrl} alt="Loading" className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
    </div>
  );
}

export default Loader;
