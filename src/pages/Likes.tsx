import React, { useCallback, useEffect, useState } from "react";

import { keeperLinks as links } from "../utils/navbarLinks";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { TAnimal } from "../types/animalShelter";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import ImageCard from "../components/ImageCard";

function Likes() {
  const [animals, setAnimals] = useState<TAnimal[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { profile } = useAuth();

  const getAllAnimals = useCallback(async () => {
    const { data, error } = await supabase.rpc("getanimalswithlikestatus", { keeper_id: profile?.id });
    if (error) {
      setErrorMessage(error.message);
    } else if (data === null) {
      setAnimals([]);
    } else {
      setAnimals(data);
    }
  }, [profile?.id]);

  const handleDeleteLike = async (id?: string) => {
    if (!id) return;
    await supabase.from("likes").delete().eq("keeper_id", profile?.id).eq("id", parseInt(id, 10));
    getAllAnimals();
  };

  useEffect(() => {
    getAllAnimals();
  }, [getAllAnimals]);

  return (
    <div className="flex flex-col items-center gap-5 h-full">
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="flex flex-col">
          <h1 className="font-montserrat-bold text-3xl">Likes</h1>
        </div>
        <Button />
      </div>
      <div className="w-[300px] flex flex-col gap-6">
        <p className="text-center font-montserrat-regular text-input-grey">
          This is a list of animals that you are interested in and their current status.
        </p>
        <div className="flex flex-wrap gap-4 pb-10">
          {errorMessage && <p className="font-montserrat-regular text-xl text-input-grey">{errorMessage}</p>}
          {animals.length > 0 &&
            animals.map((animal) => (
              <div key={animal.id}>
                <ImageCard
                  size="small"
                  id={animal.id}
                  title={`${animal.name}, ${animal.age}`}
                  images={animal.images}
                  handleDelete={() => handleDeleteLike(animal.like_id)}
                />
                {animal.status === "Pending" && <p className="text-center font-montserrat-regular text-paw-orange-0">Pending</p>}
                {animal.status === "Approved" && <p className="text-center font-montserrat-regular text-paw-green-3">Approved</p>}
                {animal.status === "Rejected" && <p className="text-center font-montserrat-regular text-red">Rejected</p>}
              </div>
            ))}
        </div>
      </div>

      <Navbar links={links} />
    </div>
  );
}

export default Likes;
