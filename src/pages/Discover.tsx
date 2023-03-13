import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose, IoStar } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatTextFill, BsFillPersonFill } from "react-icons/bs";
import { TbLayoutCards } from "react-icons/tb";

import BackButton from "../components/BackButton";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import Button from "../components/Button";
import ImageCard from "../components/ImageCard";
import CircleButton from "../components/CircleButton";
import PawButton from "../components/PawButton";
import Navbar from "../components/Navbar";
import { TAnimal } from "../types/animalShelter";
import { getDate } from "../utils/helpers";

const links = [
  {
    to: "/discover",
    Icon: TbLayoutCards,
  },
  {
    to: "/likes",
    Icon: AiFillHeart,
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

function Discover() {
  const [animalsCount, setAnimalsCount] = useState(0);
  const [animals, setAnimals] = useState<TAnimal[]>([]);
  const [isReset, setIsReset] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const signout = async () => {
    await supabase.auth.signOut();
    logout();
    navigate("/");
  };

  const resetNotInterested = useCallback(async () => {
    await supabase
      .from("notinterested")
      .delete()
      .match({ keeper_id: profile?.id })
      .eq("expires_at", getDate(new Date(Date.now())));
    setIsReset(true);
  }, [profile?.id]);

  const getAllAnimals = useCallback(async () => {
    const { data, error } = await supabase.rpc("getanimalswithoutrelation", { keeper_id: profile?.id });
    if (error) {
      setErrorMessage(error.message);
    } else if (data) {
      setAnimals(data);
      setAnimalsCount(data.length);
    }
  }, [profile?.id]);

  const handleNotInterested = async () => {
    if (currentIndex === animalsCount - 1) {
      setErrorMessage("No more animals to show");
      setAnimalsCount(0);
    } else {
      setCurrentIndex(currentIndex + 1);
      await supabase
        .from("notinterested")
        .insert([
          { animal_id: animals[currentIndex].id, keeper_id: profile?.id, expires_at: getDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)) },
        ]);
    }
  };

  const handleLike = async () => {
    if (currentIndex === animalsCount - 1) {
      setErrorMessage("No more animals to show");
      setAnimalsCount(0);
    } else {
      setCurrentIndex(currentIndex + 1);
      await supabase.from("likes").insert([{ animal_id: animals[currentIndex].id, keeper_id: profile?.id }]);
    }
  };

  useEffect(() => {
    resetNotInterested();
  }, [resetNotInterested]);

  useEffect(() => {
    if (isReset) {
      getAllAnimals();
    }
  }, [isReset, getAllAnimals]);

  return (
    <div className="flex flex-col items-center gap-5 h-full">
      <div className="flex justify-between items-center w-full">
        <BackButton handleClick={signout} />
        <div className="flex flex-col items-center">
          <h1 className="font-montserrat-bold text-2xl">Discover</h1>
          <p className="font-montserrat-regular text-xs text-input-grey">All</p>
        </div>
        <Button />
      </div>
      <div className="flex flex-col gap-5 justify-center">
        {animalsCount === 0 && <p className="font-montserrat-regular text-xl text-input-grey">{errorMessage}</p>}
        {animalsCount > 0 && (
          <>
            <ImageCard
              size="large"
              id={animals[currentIndex].id}
              title={`${animals[currentIndex].name}, ${animals[currentIndex].age}`}
              description={animals[currentIndex].breed}
              images={animals[currentIndex].images}
            />
            <div className="flex gap-10 justify-center items-center w-[300px] pb-12">
              <CircleButton Icon={IoClose} color="text-paw-orange-0" textSize="text-2xl" handleClick={handleNotInterested} />
              <PawButton handleClick={handleLike} />
              <CircleButton Icon={IoStar} color="text-paw-purple-0" textSize="text-2xl" handleClick={() => {}} />
            </div>
          </>
        )}
      </div>

      <Navbar links={links} />
    </div>
  );
}

export default Discover;
