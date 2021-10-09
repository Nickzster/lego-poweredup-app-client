import React from "react";

const Container: React.FC<{ children: any; className?: string }> = ({
  children,
  className = "",
}) => <div className={`${className}`}>{children}</div>;

export default Container;
