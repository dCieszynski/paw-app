import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import ImageCard from "../components/ImageCard";
import { TAnimal } from "../types/animalShelter";
import Loader from "../components/Loader";
import FiltersModal from "../components/FiltersModal";
import { TFilter } from "../types/keeper";

const initialFilters: TFilter = {
  minAge: 0,
  maxAge: 30,
  species: "All",
  city: null,
  name: "",
};

function ShelterMain() {
  const [animals, setAnimals] = useState<TAnimal[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayFilters, setDisplayFilters] = useState(false);
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

  const handleRemove = async (id?: number | string, search?: string) => {
    await supabase.from("animals").delete().eq("id", id);
    const { data } = await supabase.storage.from("animals").list(auth?.id, { search });
    data?.forEach(async (file) => {
      await supabase.storage.from("animals").remove([`${auth?.id}/${file.name}`]);
    });
    getAnimals();
  };

  const displayFiltersModal = () => {
    setDisplayFilters(!displayFilters);
  };

  const handleFiltersSubmit = async (filters?: TFilter) => {
    setDisplayFilters(false);
    if (!filters) {
      getAnimals();
      return;
    }
    if (filters.species === "All") {
      const { data } = await supabase
        .from("animals")
        .select("*")
        .match({
          shelter_id: profile?.id,
        })
        .gte("age", filters.minAge)
        .lte("age", filters.maxAge)
        .ilike("name", `%${filters.name}%`);
      setAnimals(data as TAnimal[]);
    } else {
      const { data } = await supabase
        .from("animals")
        .select("*")
        .match({
          shelter_id: profile?.id,
          species: filters.species,
        })
        .gte("age", filters.minAge)
        .lte("age", filters.maxAge)
        .ilike("name", `%${filters.name}%`);
      setAnimals(data as TAnimal[]);
    }
  };

  useEffect(() => {
    getAnimals();
  }, [getAnimals]);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <BackButton handleClick={signout} />
        <div className="flex flex-col items-center">
          <h1 className="font-montserrat-bold text-2xl">{profile?.name}</h1>
          <p className="font-montserrat-regular text-xs text-input-grey">
            {profile?.city}, {profile?.address}
          </p>
        </div>
        <Button handleClick={displayFiltersModal} />
      </div>
      <div className="w-[300px] md:w-[600px] lg:w-[900px] 2xl:w-[1200px] flex flex-col items-center gap-6">
        <div>
          <h2 className="font-montserrat-bold text-xl">Animals</h2>
          <p className="font-montserrat-regular text-input-grey">This is a list of animals that are available in your animal shelter</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pb-10">
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
      <FiltersModal
        initialFilters={initialFilters}
        display={displayFilters}
        handleCloseFilterModal={displayFiltersModal}
        handleSubmit={handleFiltersSubmit}
      />
    </>
  );
}

export default ShelterMain;
