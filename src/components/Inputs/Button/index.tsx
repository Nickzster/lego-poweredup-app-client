import React from "react";
import style from "./Button.module.css";

interface Props {
  onClick: Function;
  color?: string;
  children: any;
}

const Button: React.FC<Props> = (props) => {
  const { onClick, color = "#000080", children } = props;
  return (
    <div className={`${style["button-styles"]}`} onClick={() => onClick()}>
      {children}
    </div>
  );
};

export default Button;
