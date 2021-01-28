import React from "react";
import Container from "../Container";
import Button from "../Inputs/Button";
import Number from "../Inputs/Number";
import Fetch from "../lib/Network";

interface Props {
  displayName: string;
  deviceName: string[];
}

const applyDirection = (name: string[]) => {
  return {
    command: "direction",
    trains: name,
    value: 0,
  };
};

const applyBrakes = (name: string[]) => {
  return {
    command: "brake",
    trains: name,
    value: 0,
  };
};

const applyPower = (name: string[], power: number) => {
  return {
    command: "power",
    trains: name,
    value: power,
  };
};

const Controller: React.FC<Props> = (props) => {
  const [power, updatePowerValue] = React.useState(20);
  const { displayName, deviceName } = props;
  const updatePower = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePowerValue(parseInt(e.target.value, 10));
    handlePower();
  };
  const handlePower = () => {
    new Fetch("http://localhost:5000/execute")
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .setBody(applyPower(deviceName, power))
      .fetch()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const handleBrake = () => {
    new Fetch("http://localhost:5000/execute")
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .setBody(applyBrakes(deviceName))
      .fetch()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const handleDirection = () => {
    new Fetch("http://localhost:5000/execute")
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .setBody(applyDirection(deviceName))
      .fetch()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h1>{displayName}</h1>
      <Button color='green' onClick={() => handlePower()}>
        GO
      </Button>
      <Number value={power} onChange={updatePower} />
      <Button color='red' onClick={() => handleBrake()}>
        STOP
      </Button>
      <Button color='gray' onClick={() => handleDirection()}>
        DIRECTION
      </Button>
    </Container>
  );
};

export default Controller;
