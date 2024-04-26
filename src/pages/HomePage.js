import React from "react";
import Meter from "../components/Meter";

const HomePage = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Meter label="Temperature" value={25} />
        <Meter label="Humidity" value={50} />
        <Meter label="Moisture" value={75} />
        <Meter label="Light" value={90} />
      </div>
    </div>
  );
};

export default HomePage;
