import React, { useEffect } from "react";
import Container from "../components/Container";
import Controller from "../components/Controller";
import Button from "../components/Inputs/Button";
import { TRAINS } from "../data/trains";
import Fetch from "../lib/Network";
import PUClient from "../lib/PUClient";

const MainScreen = () => {
  const [remotes, updateRemotes] = React.useState(new Array());

  const client = new PUClient();

  useEffect(() => {
    client.subscribe((response) => {
      if (response.type === "NEW_CONNECTION") {
        console.log("New Connection!", response);
        const newRemote = {
          id: response.id,
          name: response.payload.device.metadata.name,
          power: response.payload.device.power,
          direction:
            response.payload.device.direction > 0 ? "forwards" : "backwards",
        };
        const newRemotes = [...remotes, newRemote];
        updateRemotes(newRemotes);
      }

      if (response.type === "DEVICE_STATE") {
        console.log("New State!", response);
      }
    });

    return () => {
      client.close();
    };
  }, []);

  return (
    <>
      <h1>LEGO Powered Up</h1>
      <br />
      <Container className='generic-container'>
        {remotes.map((remote) => (
          <Controller
            displayName={remote.name}
            deviceID={remote.id}
            power={remote.power}
            direction={remote.direction}
            client={client}
          />
        ))}
      </Container>
    </>
  );
};

export default MainScreen;
