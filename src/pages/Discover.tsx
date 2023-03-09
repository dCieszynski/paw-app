import React from "react";
import { useNavigate } from "react-router-dom";
import { IoClose, IoStar } from "react-icons/io5";

import BackButton from "../components/BackButton";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import Button from "../components/Button";
import ImageCard from "../components/ImageCard";
import CircleButton from "../components/CircleButton";
import PawButton from "../components/PawButton";
import Navbar from "../components/Navbar";

function Discover() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signout = async () => {
    await supabase.auth.signOut();
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-5 h-full">
      <div className="flex justify-between items-center w-full">
        <BackButton handleClick={signout} />
        <div className="flex flex-col items-center">
          <h1 className="font-montserrat-bold text-2xl">Discover</h1>
          <p className="font-montserrat-regular text-xs text-input-grey">Lublin</p>
        </div>
        <Button />
      </div>
      <div className="flex flex-col gap-5 justify-center">
        <ImageCard />
        <div className="flex gap-10 justify-center items-center w-[300px] pb-12">
          <CircleButton Icon={IoClose} color="text-paw-orange-0" textSize="text-2xl" handleClick={() => {}} />
          <PawButton handleClick={() => {}} />
          <CircleButton Icon={IoStar} color="text-paw-purple-0" textSize="text-2xl" handleClick={() => {}} />
        </div>
      </div>

      <Navbar />
    </div>
  );
}

export default Discover;
