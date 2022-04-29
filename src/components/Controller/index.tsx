import React from "react";
import Container from "../Container";
import PUClient from "../../lib/PUClient";
import ButtonStick from "./ButtonStick";
import style from "./Controller.module.css";
import MotorList, { IDeviceData } from "./MotorList";

const STEP_SIZE = 5;

interface IControllerProps {
  remoteKey: string;
  value: IDeviceData[];
  client: PUClient;
}

const Controller: React.FC<IControllerProps> = (props) => {
  const { remoteKey, value, client } = props;

  const displayName = remoteKey;
  const remoteID = remoteKey;

  return (
    <Container className={style["controller-container"]}>
      <h2>{displayName}</h2>
      <Container className={style["motor-container"]}>
        <ButtonStick stepSize={STEP_SIZE} client={client} remoteID={remoteID} />
        <MotorList remoteID={remoteID} motors={value} client={client} />
      </Container>
    </Container>
  );
};

export default Controller;
