import React from "react";
import GaugeComponent from "react-gauge-component";

const Meter = ({ label, value, message, threshold }) => {
  return (
    <div style={{ margin: "10px" }}>
      <h3 style={{ textAlign: "center" }}>{label}</h3>
      <GaugeComponent
        value={value}
        type="radial"
        labels={{
          tickLabels: {
            type: "inner",
            ticks: [
              { value: 20 },
              { value: 40 },
              { value: 60 },
              { value: 80 },
              { value: 100 },
            ],
          },
        }}
        arc={{
          colorArray: ["red", "green"],
          subArcs: [{ limit: threshold }, { limit: 100 }],
          padding: 0.02,
          width: 0.2,
        }}
        pointer={{
          elastic: true,
          animationDelay: 100,
        }}
      />
      <h5 style={{ textAlign: "center" }}>{message}</h5>
    </div>
  );
};

export default Meter;
