import React from "react";
import Controller from "./components/Controller";
import { TRAINS } from "./data/trains";

function App() {
  return (
    <div className='App'>
      {TRAINS.map((train) => (
        <Controller
          displayName={train.displayName}
          deviceName={[train.deviceName]}
        />
      ))}
      <Controller
        displayName='Master'
        deviceName={TRAINS.map((train) => train.deviceName)}
      />
    </div>
  );
}

export default App;
