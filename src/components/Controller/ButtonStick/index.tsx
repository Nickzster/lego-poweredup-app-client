import React from "react";
import PUClient from "../../../lib/PUClient";
import style from "./ButtonStick.module.css";

interface IButtonStickButtonProps {
  children: any;
  type?: "power-button" | "brake";
  handleClick?: () => void;
}

const ButtonStickButton: React.FC<IButtonStickButtonProps> = ({
  children,
  type = "arrow",
  handleClick = () => {},
}) => {
  return (
    <div
      className={`${style["stickbutton-container"]} ${style[type]}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

interface IButtonStickProps {
  client: PUClient;
  stepSize: number;
  remoteID: string;
}

const ButtonStick: React.FC<IButtonStickProps> = ({
  client,
  remoteID,
  stepSize,
}) => {
  return (
    <div className={style.container}>
      <ButtonStickButton
        type='power-button'
        handleClick={() => client.increasePower(remoteID, stepSize)}
      >
        +
      </ButtonStickButton>
      <ButtonStickButton
        type='brake'
        handleClick={() => client.brake(remoteID)}
      >
        B
      </ButtonStickButton>
      <ButtonStickButton
        type='power-button'
        handleClick={() => client.decreasePower(remoteID, stepSize)}
      >
        -
      </ButtonStickButton>
    </div>
  );
};

export default ButtonStick;
