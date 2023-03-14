import React, { useState } from "react";
import { useFormik } from "formik";
import { AiFillCloseCircle } from "react-icons/ai";
import { TFilter } from "../types/keeper";
import Button from "./Button";
import InputField from "./InputField";
import LoginSubmitButton from "./LoginSubmitButton";
import Selector from "./Selector";
import SliderInput from "./SliderInput";

type Props = {
  initialFilters: TFilter;
  display: boolean;
  handleCloseFilterModal: () => void;
  handleSubmit: (filters?: TFilter) => void;
};

const speciesOptions = ["Dog", "Cat", "All"];

function FiltersModal({ initialFilters, display, handleCloseFilterModal, handleSubmit }: Props) {
  const [reset, setReset] = useState(false);

  const formik = useFormik({
    initialValues: initialFilters,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleClear = () => {
    setReset(true);
    formik.resetForm();
  };

  return (
    <div className={`${display ? "block" : "hidden"} fixed flex items-end justify-center w-full h-full top-0 z-20`}>
      <div className="bg-black opacity-90 w-full h-full fixed -z-10" />
      <form className="bg-white w-[324px] rounded-t-xl p-6 flex flex-col items-center gap-7" onSubmit={formik.handleSubmit}>
        <div className="flex justify-end items-baseline gap-14 w-full">
          <h1 className="font-montserrat-bold text-2xl">Filters</h1>
          <button type="button" className="font-montserrat-bold text-base text-paw-green-2" onClick={handleClear}>
            Clear
          </button>
        </div>
        <div className="flex flex-col gap-7">
          <Selector title="Interested in" value={formik.values.species as string} elements={speciesOptions} setFieldValue={formik.setFieldValue} />
          <InputField name="city" title="Location" value={formik.values.city ? formik.values.city : ""} handleChange={formik.handleChange} />
          <SliderInput
            title="Age"
            min={initialFilters.minAge}
            max={initialFilters.maxAge}
            maxCap={initialFilters.maxAge}
            setFieldValue={formik.setFieldValue}
            reset={reset}
            setReset={setReset}
          />
          <LoginSubmitButton title="Continue" submit />
        </div>
      </form>
      <div className="fixed top-5 right-5">
        <Button Icon={AiFillCloseCircle} handleClick={handleCloseFilterModal} />
      </div>
    </div>
  );
}

export default FiltersModal;
