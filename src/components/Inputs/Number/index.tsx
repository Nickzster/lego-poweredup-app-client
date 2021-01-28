import React from "react";
import "./number.css";

interface Props {
  value: number;
  onChange: Function;
}

const Number: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  return (
    <input
      type='number'
      min={-100}
      max={100}
      step={5}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
    ></input>
  );
};

export default Number;
