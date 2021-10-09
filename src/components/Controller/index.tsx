import React from "react";
import Container from "../Container";
import Button from "../Inputs/Button";
import Number from "../Inputs/Number";
import Fetch from "../../lib/Network";

const STEP_SIZE = 5;

interface Props {
  displayName: string;
  deviceID: string;
}

const Controller: React.FC<Props> = (props) => {
  const [power, updatePowerValue] = React.useState(0);
  const [direction, changeDirection] = React.useState("Forwards");
  const { displayName, deviceID } = props;
  const handlePower = (adjustment: number) => {
    new Fetch(`execute/${deviceID}`)
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .setBody({
        command: {
          name: "set_power",
          args: {
            adjustment: adjustment,
          },
        },
      })
      .fetch()
      .then((res) => {
        console.log(res);
        updatePowerValue(res.power);
      })
      .catch((err) => console.log(err));
  };
  const handleBrake = () => {
    updatePowerValue(0);
    new Fetch(`execute/${deviceID}`)
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .setBody({
        command: { name: "stop" },
      })
      .fetch()
      .then((res) => {
        console.log(res);
        updatePowerValue(res.power);
      })
      .catch((err) => console.log(err));
  };
  const handleDirection = () => {
    new Fetch(`execute/${deviceID}`)
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .setBody({
        command: { name: "change_direction" },
      })
      .fetch()
      .then((res) => {
        console.log(res);
        changeDirection(res.direction === -1 ? "Backwards" : "Forwards");
        updatePowerValue(res.power);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className='controller-container'>
      <h2>{displayName}</h2>
      <p>I am going {direction}!</p>
      <Container className='button-container'>
        <Container className='joystick-container'>
          <Container className='up-down-container'>
            <Button
              color='blue'
              onClick={() => handlePower(STEP_SIZE * -1)}
            >{`<`}</Button>
            <p className='power-display'>{power}</p>
            <Button
              color='blue'
              onClick={() => handlePower(STEP_SIZE * 1)}
            >{`>`}</Button>
          </Container>
        </Container>
        <Container className='joystick-container'>
          <Button color='red' onClick={() => handleBrake()}>
            STOP
          </Button>
          <Button color='gray' onClick={() => handleDirection()}>
            DIRECTION
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default Controller;
