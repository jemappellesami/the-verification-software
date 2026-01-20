import type { ChangeEvent } from "react";

type SliderProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  helper?: string;
};

function Slider({ label, min, max, step, value, onChange, helper }: SliderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="slider-field">
      <div className="slider-header">
        <span>{label}</span>
        <span className="slider-value">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
      {helper ? <p className="helper">{helper}</p> : null}
    </div>
  );
}

export default Slider;
