import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ImageCard from "../components/ImageCard";
import Loader from "../components/Loader";
import supabase from "../supabase";
import { TAnimal } from "../types/animalShelter";

function Animal() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<TAnimal>();
  const navigate = useNavigate();

  const getAnimal = useCallback(async () => {
    const { data } = await supabase.from("animals").select("*").eq("id", id);
    if (data) {
      setAnimal(data[0]);
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/animal_shelter/edit/${id}`);
  };

  useEffect(() => {
    getAnimal();
  }, [getAnimal]);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="flex flex-col items-center">
          <h1 className="font-montserrat-bold text-2xl">Details</h1>
          <p className="font-montserrat-regular text-xs text-input-grey">Here you can check your animal&apos;s details</p>
        </div>
        <Button handleClick={handleEdit} Icon={AiFillEdit} />
      </div>
      <div className="flex flex-col gap-5 justify-center w-[300px]">
        {!animal && <Loader />}
        {animal && (
          <>
            <ImageCard
              size="large"
              id={animal.id}
              title={`${animal.name}, ${animal.age}`}
              description={animal.breed}
              images={animal.images}
              link=""
            />
            <div className="font-montserrat-regular text-input-grey text-justify">{animal.description}</div>
          </>
        )}
      </div>
    </>
  );
}

export default Animal;
