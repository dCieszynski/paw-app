import React from "react";
import { useParams } from "react-router-dom";

import BackButton from "../components/BackButton";
import PetForm from "../components/PetForm";

function AddPet() {
  const { id } = useParams();

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="text-right">
          <h1 className="font-montserrat-bold text-2xl">{id ? "Edit" : "Add"} pett</h1>
          <p className="font-montserrat-regular text-input-grey">Here you can {id ? "edit" : "add"} a pet.</p>
        </div>
      </div>
      <div className="w-[300px]">
        <PetForm id={id} />
      </div>
    </>
  );
}

export default AddPet;
