import React from "react";
import PUClient from "../../../lib/PUClient";
import Button from "../../Inputs/Button";
import style from "./MotorList.module.css";

interface IDeviceMetadata {
  id: string;
  name: string;
  type: string;
}

interface IDeviceState {
  power: number;
  color: any;
  direction: 1 | -1;
}

export interface IDeviceData {
  state: IDeviceState;
  metadata: IDeviceMetadata;
}

interface IMotorListProps {
  remoteID: string;
  motors: IDeviceData[];
  client: PUClient;
}

const renderDirection = (direction: 1 | -1) => {
  if (direction === 1) return "-->";
  return "<--";
};

interface ICustomTDProps {
  children: any;
}

const Ctd: React.FC<ICustomTDProps> = ({ children }) => (
  <td className={style["motorlist-td"]}>{children}</td>
);

interface ISingleMotorProps {
  motor: IDeviceData;
  client: PUClient;
  remoteID: string;
}

const SingleMotor: React.FC<ISingleMotorProps> = ({
  motor,
  client,
  remoteID,
}) => {
  return (
    <div className={style["container-singlemotor"]}>
      <div className={style["container-title"]}>{motor.metadata.name}</div>
      <div className={style["container-meta"]}>
        <p>Power: {motor.state.power}</p>
        <p>Direction: {renderDirection(motor.state.direction)}</p>
      </div>
      <div className={style["container-buttons"]}>
        <Button
          onClick={() => {
            client.changeDirection(remoteID, motor.metadata.id);
          }}
        >
          Change Direction
        </Button>
        <Button
          onClick={() => {
            client.rotateMotorToNewRemote(remoteID, motor.metadata.id);
          }}
        >
          Move Motor
        </Button>
      </div>
    </div>
  );
};

const MotorList: React.FC<IMotorListProps> = ({ motors, client, remoteID }) => {
  if (motors.length === 0)
    return <p>This remote currently contains 0 motors.</p>;
  return (
    <div className={style["container"]}>
      {motors.map((motor) => (
        <SingleMotor motor={motor} client={client} remoteID={remoteID} />
      ))}
    </div>
  );
};

export default MotorList;
