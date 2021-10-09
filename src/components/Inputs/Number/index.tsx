import React from "react";

interface Props {
  value: number;
  onChange: Function;
  step?: number;
}

const Number: React.FC<Props> = (props) => {
  const { value, onChange, step = 5 } = props;
  return (
    <input
      type='number'
      min={-100}
      max={100}
      step={step}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
    ></input>
  );
};

export default Number;
