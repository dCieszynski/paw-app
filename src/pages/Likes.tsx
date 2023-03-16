import React, { useCallback, useEffect, useState } from "react";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { TAnimal } from "../types/animalShelter";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import ImageCard from "../components/ImageCard";
import FiltersModal from "../components/FiltersModal";
import { TFilter } from "../types/keeper";

const initialFilters: TFilter = {
  minAge: 0,
  maxAge: 30,
  species: "All",
  city: null,
  name: "",
};

function Likes() {
  const [animals, setAnimals] = useState<TAnimal[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayFilters, setDisplayFilters] = useState(false);
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

  const displayFiltersModal = () => {
    setDisplayFilters(!displayFilters);
  };

  const handleFiltersSubmit = async (filters?: TFilter) => {
    setDisplayFilters(false);
    if (!filters) {
      getAllAnimals();
      return;
    }
    if (filters.city !== null) {
      const { data: shelters } = await supabase.from("shelters").select("*").ilike("city", `%${filters.city}%`);
      const shelterIds = shelters?.map((shelter) => shelter.id);
      const { data } = await supabase.rpc("getanimalswithlikestatuswithfilters", {
        keeper_id: profile?.id,
        min_age: filters.minAge,
        max_age: filters.maxAge,
        species: filters.species === "All" ? null : filters.species,
        shelters: shelterIds,
        name: filters.name === "" ? null : filters.name,
      });
      setAnimals(data);
    } else {
      const { data } = await supabase.rpc("getanimalswithlikestatuswithfilters", {
        keeper_id: profile?.id,
        min_age: filters.minAge,
        max_age: filters.maxAge,
        species: filters.species === "All" ? null : filters.species,
        name: filters.name === "" ? null : filters.name,
      });
      setAnimals(data);
    }
  };

  useEffect(() => {
    getAllAnimals();
  }, [getAllAnimals]);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="flex flex-col">
          <h1 className="font-montserrat-bold text-3xl">Likes</h1>
        </div>
        <Button handleClick={displayFiltersModal} />
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
      <FiltersModal
        initialFilters={initialFilters}
        display={displayFilters}
        handleCloseFilterModal={displayFiltersModal}
        handleSubmit={handleFiltersSubmit}
      />
    </>
  );
}

export default Likes;
