import React from "react";

interface Props {
  onClick: Function;
  color?: string;
  children: any;
}

const Button: React.FC<Props> = (props) => {
  const { onClick, color = "green", children } = props;
  return (
    <button
      className='button-styles'
      style={{ backgroundColor: color }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
