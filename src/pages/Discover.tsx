import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose, IoStar } from "react-icons/io5";

import BackButton from "../components/BackButton";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";
import Button from "../components/Button";
import ImageCard from "../components/ImageCard";
import CircleButton from "../components/CircleButton";
import PawButton from "../components/PawButton";
import { TAnimal } from "../types/animalShelter";
import { getDate } from "../utils/helpers";
import FiltersModal from "../components/FiltersModal";
import { TFilter } from "../types/keeper";

const initialFilters: TFilter = {
  minAge: 0,
  maxAge: 30,
  species: "All",
  city: "",
};

function Discover() {
  const [animalsCount, setAnimalsCount] = useState(0);
  const [animals, setAnimals] = useState<TAnimal[]>([]);
  const [isReset, setIsReset] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("No more animals found");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
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
      await supabase
        .from("notinterested")
        .insert([
          { animal_id: animals[currentIndex].id, keeper_id: profile?.id, expires_at: getDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)) },
        ]);
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
      await supabase.from("likes").insert([{ animal_id: animals[currentIndex].id, keeper_id: profile?.id, status: "Pending" }]);
    } else {
      setCurrentIndex(currentIndex + 1);
      await supabase.from("likes").insert([{ animal_id: animals[currentIndex].id, keeper_id: profile?.id, status: "Pending" }]);
    }
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
    if (filters.city !== "" && filters.city !== null) {
      const { data: shelters } = await supabase.from("shelters").select("*").textSearch("city", filters.city);
      const shelterIds = shelters?.map((shelter) => shelter.id);
      const { data } = await supabase.rpc("getanimalswithoutrelationwithfilters", {
        keeper_id: profile?.id,
        min_age: filters.minAge,
        max_age: filters.maxAge,
        species: filters.species === "All" ? null : filters.species,
        shelters: shelterIds,
      });
      setAnimals(data);
      setAnimalsCount(data.length);
    } else {
      const { data } = await supabase.rpc("getanimalswithoutrelationwithfilters", {
        keeper_id: profile?.id,
        min_age: filters.minAge,
        max_age: filters.maxAge,
        species: filters.species === "All" ? null : filters.species,
      });
      setAnimals(data);
      setAnimalsCount(data.length);
    }
  };

  const handleInfo = () => {
    setIsInfo(!isInfo);
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
    <>
      <div className="flex justify-between items-center w-full">
        <BackButton handleClick={signout} />
        <div className="flex flex-col items-center">
          <h1 className="font-montserrat-bold text-2xl">Discover</h1>
          <p className="font-montserrat-regular text-xs text-input-grey">Here you can look for pets to adopt</p>
        </div>
        <Button handleClick={displayFiltersModal} />
      </div>
      <div className="flex flex-col gap-5 justify-center w-[300px]">
        {animalsCount === 0 && <p className="font-montserrat-regular text-xl text-input-grey">{errorMessage}</p>}
        {animalsCount > 0 && (
          <>
            <ImageCard
              size="large"
              id={animals[currentIndex].id}
              title={`${animals[currentIndex].name}, ${animals[currentIndex].age}`}
              description={animals[currentIndex].breed}
              images={animals[currentIndex].images}
              handleInfo={handleInfo}
            />
            <div className={`${isInfo ? "block" : "hidden"} font-montserrat-regular text-input-grey text-justify`}>
              {animals[currentIndex].description}
            </div>
            <div className="flex gap-10 justify-center items-center pb-12">
              <CircleButton Icon={IoClose} color="text-paw-orange-0" textSize="text-2xl" handleClick={handleNotInterested} />
              <PawButton handleClick={handleLike} />
              <CircleButton Icon={IoStar} color="text-paw-purple-0" textSize="text-2xl" handleClick={() => {}} />
            </div>
          </>
        )}
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

export default Discover;
