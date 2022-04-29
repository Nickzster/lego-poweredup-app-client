import React, { useEffect } from "react";
import Container from "../components/Container";
import Controller from "../components/Controller";
import PUClient from "../lib/PUClient";
import style from "./MainScreen.module.css";

const MainScreen = () => {
  const client = new PUClient();
  const [remotes, updateRemotes] = React.useState(new Array());

  useEffect(() => {
    client.subscribe((response) => {
      const remotes = response.remotes;
      updateRemotes(remotes);
    });

    return () => {
      client.close();
    };
  }, []);

  return (
    <div className={style.container}>
      <h1>LEGO Powered Up</h1>
      <br />
      <Container className='generic-container'>
        {remotes.map((remote) => (
          <Controller
            remoteKey={remote.key}
            value={remote.value}
            client={client}
            color={remote.color}
          />
        ))}
      </Container>
    </div>
  );
};

export default MainScreen;
