import React from "react";
import Container from "../Container";
import PUClient from "../../lib/PUClient";
import ButtonStick from "./ButtonStick";
import style from "./Controller.module.css";
import MotorList, { IDeviceData } from "./MotorList";
import { COLOR_MAP } from "../../lib/ColorMap";

const STEP_SIZE = 5;

interface IControllerProps {
  remoteKey: string;
  value: IDeviceData[];
  client: PUClient;
  color: number;
}

const Controller: React.FC<IControllerProps> = (props) => {
  const { remoteKey, value, client, color } = props;

  const displayName = remoteKey;
  const remoteID = remoteKey;

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className={style["controller-container"]}
    >
      <div
        style={{ backgroundColor: COLOR_MAP[color] }}
        className={style["controller-color-box"]}
      ></div>
      <h2>{displayName}</h2>
      <Container className={style["motor-container"]}>
        <ButtonStick stepSize={STEP_SIZE} client={client} remoteID={remoteID} />
        <MotorList remoteID={remoteID} motors={value} client={client} />
      </Container>
    </div>
  );
};

export default Controller;
