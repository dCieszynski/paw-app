import React, { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  min: number;
  max: number;
  maxCap: number;
  reset: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  setReset: (value: boolean) => void;
};

function SliderInput({ title, min, max, maxCap, reset, setFieldValue, setReset }: Props) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setMinValue(newValue);
    setFieldValue("minAge", minValue);
    if (newValue > maxValue) {
      setMaxValue(newValue);
      setFieldValue("maxAge", maxValue);
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setMaxValue(newValue);
    setFieldValue("maxAge", maxValue);
    if (newValue < minValue) {
      setMinValue(newValue);
      setFieldValue("minAge", minValue);
    }
  };

  const handleReset = useCallback(() => {
    setMinValue(min);
    setMaxValue(max);
    setReset(false);
  }, [min, max, setReset]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.left = `${(minValue / maxCap) * 100}%`;
      progressRef.current.style.right = `${100 - (maxValue / maxCap) * 100}%`;
    }
  }, [minValue, maxValue, maxCap]);

  useEffect(() => {
    if (reset) {
      handleReset();
    }
  }, [reset, handleReset]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="font-montserrat-bold">{title}</h2>
        <p className="font-montserrat-regular text-input-grey">
          {minValue} - {maxValue}
        </p>
      </div>
      <div className="h-2 rounded-md bg-input-grey-2 relative">
        <div ref={progressRef} className="h-2 absolute rounded-md bg-paw-green-2" />
      </div>
      <div className="relative">
        <input
          className="absolute top-[-25px] h-2 w-full appearance-none bg-transparent pointer-events-none"
          type="range"
          min={min}
          max={maxCap}
          value={minValue}
          onChange={handleMinChange}
        />
        <input
          className="absolute top-[-25px] h-2 w-full appearance-none bg-transparent pointer-events-none"
          type="range"
          min={min}
          max={maxCap}
          value={maxValue}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}

export default SliderInput;
