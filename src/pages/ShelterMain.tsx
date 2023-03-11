import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDomain, MdPets } from "react-icons/md";
import { BsFillChatTextFill, BsFillPersonFill } from "react-icons/bs";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import ImageCard from "../components/ImageCard";

export const links = [
  {
    to: "/animal_shelter",
    Icon: MdDomain,
  },
  {
    to: "/add_pet",
    Icon: MdPets,
  },
  {
    to: "/messages",
    Icon: BsFillChatTextFill,
  },
  {
    to: "/profile",
    Icon: BsFillPersonFill,
  },
];

function ShelterMain() {
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
          <h1 className="font-montserrat-bold text-2xl">Animal shelter</h1>
          <p className="font-montserrat-regular text-xs text-input-grey">Lublin, Metalurgiczna 5</p>
        </div>
        <Button />
      </div>
      <div className="w-[300px] flex flex-col gap-6">
        <div>
          <h2 className="font-montserrat-bold text-xl">Animals</h2>
          <p className="font-montserrat-regular text-input-grey">This is a list of animals that are available in your animal shelter</p>
        </div>
        <div className="flex flex-wrap gap-4 pb-10">
          <ImageCard size="small" />
          <ImageCard size="small" />
          <ImageCard size="small" />
          <ImageCard size="small" />
          <ImageCard size="small" />
        </div>
      </div>
      <Navbar links={links} />
    </div>
  );
}

export default ShelterMain;
