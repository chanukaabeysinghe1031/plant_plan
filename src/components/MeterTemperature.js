import React from "react";
import GaugeComponent from "react-gauge-component";

const Meter2 = ({ label, value, message }) => {
  return (
    <div style={{ margin: "10px" }}>
      <h3 style={{ textAlign: "center" }}>{label}</h3>

      <GaugeComponent
        value={value}
        type="radial"
        labels={{
          valueLabel: { formatTextValue: (value) => value + "ºC" },
          tickLabels: {
            type: "inner",
            valueConfig: {
              formatTextValue: (value) => value + "ºC",
              fontSize: 10,
            },
            ticks: [{ value: 13 }, { value: 22.5 }, { value: 32 }],
          },
        }}
        minValue={10}
        maxValue={35}
        arc={{
          colorArray: ["#5BE12C", "#EA4228"],
          subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
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

export default Meter2;
