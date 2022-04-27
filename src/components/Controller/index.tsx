import React from "react";
import Container from "../Container";
import Button from "../Inputs/Button";
import Number from "../Inputs/Number";
import Fetch from "../../lib/Network";
import PUClient from "../../lib/PUClient";

const STEP_SIZE = 5;

interface Props {
  displayName: string;
  deviceID: string;
  power: number;
  direction: string;
  client: PUClient;
}

const Controller: React.FC<Props> = (props) => {
  const { displayName, deviceID, power, direction, client } = props;

  return (
    <Container className='controller-container'>
      <h2>{displayName}</h2>
      <p>I am going {direction}!</p>
      <Container className='button-container'>
        <Container className='joystick-container'>
          <Container className='up-down-container'>
            <Button
              color='blue'
              onClick={() => client.decreasePower(deviceID, STEP_SIZE)}
            >{`<`}</Button>
            <p className='power-display'>{power}</p>
            <Button
              color='blue'
              onClick={() => client.increasePower(deviceID, STEP_SIZE)}
            >{`>`}</Button>
          </Container>
        </Container>
        <Container className='joystick-container'>
          <Button color='red' onClick={() => client.brake(deviceID)}>
            STOP
          </Button>
          <Button color='gray' onClick={() => client.changeDirection(deviceID)}>
            DIRECTION
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default Controller;
