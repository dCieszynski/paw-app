import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDomain, MdPets } from "react-icons/md";
import { BsFillChatTextFill, BsFillPersonFill } from "react-icons/bs";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import ImageCard from "../components/ImageCard";
import { TAnimal } from "../types/animalShelter";
import Loader from "../components/Loader";

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
  const [animals, setAnimals] = useState<TAnimal[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, profile, logout } = useAuth();
  const navigate = useNavigate();

  const signout = async () => {
    await supabase.auth.signOut();
    logout();
    navigate("/");
  };

  const getAnimals = useCallback(async () => {
    if (!profile) return;
    setIsLoading(true);
    const { data, error } = await supabase.from("animals").select("*").eq("shelter_id", profile.id);
    if (error) {
      setErrorMessage(error.message);
    } else {
      setAnimals(data);
    }
    setIsLoading(false);
  }, [profile]);

  const handleRemove = async (id: number, search: string) => {
    await supabase.from("animals").delete().eq("id", id);
    const { data } = await supabase.storage.from("animals").list(auth?.id, { search });
    data?.forEach(async (file) => {
      await supabase.storage.from("animals").remove([`${auth?.id}/${file.name}`]);
    });
    getAnimals();
  };

  useEffect(() => {
    getAnimals();
  }, [getAnimals]);

  return (
    <div className="flex flex-col items-center gap-5 h-full">
      <div className="flex justify-between items-center w-full">
        <BackButton handleClick={signout} />
        <div className="flex flex-col items-center">
          <h1 className="font-montserrat-bold text-2xl">{profile?.name}</h1>
          <p className="font-montserrat-regular text-xs text-input-grey">
            {profile?.city}, {profile?.address}
          </p>
        </div>
        <Button />
      </div>
      <div className="w-[300px] flex flex-col gap-6">
        <div>
          <h2 className="font-montserrat-bold text-xl">Animals</h2>
          <p className="font-montserrat-regular text-input-grey">This is a list of animals that are available in your animal shelter</p>
        </div>
        <div className="flex flex-wrap gap-4 pb-10">
          {isLoading && <Loader />}
          {!isLoading &&
            (errorMessage || (animals.length === 0 && <p className="font-montserrat-regular text-input-grey">{errorMessage || "No animals"}</p>))}
          {animals.map((animal) => (
            <ImageCard
              key={animal.id}
              id={animal.id}
              size="small"
              images={animal.images}
              title={`${animal.name}, ${animal.age}`}
              handleDelete={handleRemove}
            />
          ))}
        </div>
      </div>
      <Navbar links={links} />
    </div>
  );
}

export default ShelterMain;
