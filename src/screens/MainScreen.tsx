import React from "react";
import Container from "../components/Container";
import Controller from "../components/Controller";
import Button from "../components/Inputs/Button";
import { TRAINS } from "../data/trains";
import Fetch from "../lib/Network";

const MainScreen = () => {
  const [devices, updateDevices] = React.useState(new Array());
  console.log(devices);
  return (
    <>
      <h1>LEGO Powered Up</h1>
      <Button
        onClick={() => {
          new Fetch("state/all-devices")
            .fetch()
            .then((res) => updateDevices(res.connections))
            .catch(() => updateDevices([]));
        }}
      >
        Poll for Devices
      </Button>
      <br />
      <Container className='generic-container'>
        {devices.map((device) => (
          <Controller
            displayName={device.device.meta.name}
            deviceID={device.device.meta.id}
          />
        ))}
      </Container>
    </>
  );
};

export default MainScreen;
