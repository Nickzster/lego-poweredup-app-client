import React from "react";
import Container from "../Container";
import Button from "../Inputs/Button";
import PUClient from "../../lib/PUClient";

const STEP_SIZE = 5;

interface IMotorArray {
  metadata: {
    id: string;
    name: string;
    type: string;
  };
  state: {
    color: string;
    direction: number;
    power: number;
  };
}

interface IControllerProps {
  remoteKey: string;
  value: IMotorArray[];
  client: PUClient;
}

const Controller: React.FC<IControllerProps> = (props) => {
  const { remoteKey, value, client } = props;

  const displayName = remoteKey;
  const direction = "REPLACE_ME";
  const remoteID = remoteKey;

  return (
    <Container className='controller-container'>
      <h2>{displayName}</h2>
      <p>I am going {direction}!</p>
      <Container className='button-container'>
        <Container className='joystick-container'>
          <Container className='up-down-container'>
            <Button
              color='blue'
              onClick={() => client.decreasePower(remoteID, STEP_SIZE)}
            >{`<`}</Button>
            <p className='power-display'>{-9999}</p>
            <Button
              color='blue'
              onClick={() => client.increasePower(remoteID, STEP_SIZE)}
            >{`>`}</Button>
          </Container>
        </Container>
        <Container className='joystick-container'>
          <Button color='red' onClick={() => client.brake(remoteID)}>
            STOP
          </Button>
          <Button color='gray' onClick={() => client.changeDirection(remoteID)}>
            DIRECTION
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default Controller;
