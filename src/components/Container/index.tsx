import React from "react";
import "./container.css";

const Container: React.FC<{ children: any }> = ({ children }) => {
  return <div className='container-styles'>{children}</div>;
};

export default Container;
