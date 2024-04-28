import React from "react";
import Navbar from "../components/Navbar";

const AboutUsPage = () => {
  return (
    <div>
      <Navbar activeStyle="AboutUs" />
      <div
        style={{
          textAlign: "center",
          margin: "50px",
        }}
      >
        <h1>About Us </h1>
        <h2>What is PlantPlan</h2>
        <p>
          Our solution offers users a customized gardening experience that makes
          it simple for them to keep tabs and track the development of their
          plants. Users may get realtime information about their plants such as
          temperature, humidity, moisture and light levels with the help if our
          sensors and data analytics. Mainly educated selctions about how to
          care for their plants will assits users ensure that they thrive and
          generate the highest possible yields.
        </p>
        <p>
          PlantPlan is not only a helpful tool for people who want to grow their
          own food but it is also environmentally friendly option. Our methods
          help to reduce carbon emmisions and the food production industry's
          carbon footprint by eliminating the demand for product transportation
          and storage. Additionally, PlantPlan promotes sustainability and
          independance enabling people to take chaege of their own food
          production and cut costs.
        </p>
        <p>
          it is important to note that PlantPlan is a software prototype that is
          planing to expand its product in the near future. Since the system
          currently supports only one device, the team is constantly working to
          improve the app and expand its capabilities. In the forthcoming future
          multiple modes are planning to be implemented to support a wide range
          of devices aswell as providing additional features to increase
          usefullness for plant enthusiats.
        </p>
        <p>
          Therefore eventhough PlantPlan is a prototype it has enormous
          intentions for the future. Watch for updates as they will undoutably
          improve the app.
        </p>
        <h2>Our Services</h2>
        <h5>Live Monitoring</h5>
        <p>
          Users may keep a close eye on their plant's health and development
          using PlantPlan's Live monitoring tool. This enables them to see
          problems early on and take the required steps to protect the helth of
          their plants.
        </p>
        <h5>Automated hourly logs</h5>
        <p>
          PlantPlan has a tool that automatically log their parameters including
          temperature, humidity, moisture and light. Users are able to see trans
          and knowledgeable decisions regarding the health of their plants
          thanks to the PlantPlan.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
