import React, { useState, useEffect } from "react";
import Meter from "../components/Meter";
import axios from "axios";
import Meter2 from "../components/MeterTemperature";
import Navbar from "../components/Navbar";
import GaugeComponent from "react-gauge-component";

const HomePage = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    moisture: 0,
    light: 0,
  });

  const [messageTemp, setMessageTemp] = useState();
  const [messageHumi, setMessageHumi] = useState();
  const [messageMois, setMessageMois] = useState();
  const [messageLight, setMessageLight] = useState();

  useEffect(() => {
    const sendNotification = async (title, body) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/email/sendNotification",
          {
            title,
            body,
          }
        );
        if (response.data.status === "Success") {
          console.log(
            "Notification sent successfully:",
            response.data.data.requestId
          );
        } else {
          console.error("Failed to send notification:", response.data);
        }
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/data/getLatestData"
        );
        if (response.status === 200) {
          const jsonData = response.data;
          setSensorData({
            temperature: jsonData.data.temperature,
            humidity: jsonData.data.humidity,
            moisture: jsonData.data.moisture,
            light: jsonData.data.light,
          });

          if (jsonData.data.temperature < 24) {
            setMessageTemp("Temperature level is low");
          } else {
            setMessageTemp("Temperature level is normal");
          }

          if (jsonData.data.humidity < 70) {
            setMessageHumi("Humidity level is low");
          } else {
            setMessageHumi("Humidy level is normal");
          }

          if (jsonData.data.moisture < 60) {
            setMessageMois("Moisture level is low");
          } else {
            setMessageMois("Moisture level is normal");
          }

          if (jsonData.data.light < 70) {
            setMessageLight("Light level is low");
          } else {
            setMessageLight("Light level is normal");
          }

          console.log({
            temperature: jsonData.data.temperature,
            humidity: jsonData.data.humidity,
            moisture: jsonData.data.moisture,
            light: jsonData.data.light,
          });
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 10 * 1000); // Fetch every 5 minutes

    return () => clearInterval(intervalId); // Cleanup function
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <Navbar activeStyle={"HomePage"} />
      <h2 style={{ textAlign: "center" }}>Live Monitoring</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ margin: "10px" }}>
          <h3 style={{ textAlign: "center" }}>Temperature</h3>

          <GaugeComponent
            value={sensorData.temperature}
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
              colorArray: ["red", "green"],
              subArcs: [{ limit: 24 }, { limit: 30 }],
              padding: 0.02,
              width: 0.2,
            }}
            pointer={{
              elastic: true,
              animationDelay: 100,
            }}
          />
          <h5 style={{ textAlign: "center" }}>{messageTemp}</h5>
        </div>
        <div style={{ margin: "10px" }}>
          <h3 style={{ textAlign: "center" }}>Humidty</h3>
          <GaugeComponent
            value={sensorData.humidity}
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
              subArcs: [{ limit: 70 }, { limit: 100 }],
              padding: 0.02,
              width: 0.2,
            }}
            pointer={{
              elastic: true,
              animationDelay: 100,
            }}
          />
          <h5 style={{ textAlign: "center" }}>{messageHumi}</h5>
        </div>
        <div style={{ margin: "10px" }}>
          <h3 style={{ textAlign: "center" }}>Moisture</h3>
          <GaugeComponent
            value={sensorData.moisture}
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
              subArcs: [{ limit: 60 }, { limit: 100 }],
              padding: 0.02,
              width: 0.2,
            }}
            pointer={{
              elastic: true,
              animationDelay: 100,
            }}
          />
          <h5 style={{ textAlign: "center" }}>{messageMois}</h5>
        </div>

        <div style={{ margin: "10px" }}>
          <h3 style={{ textAlign: "center" }}>Light</h3>
          <GaugeComponent
            value={sensorData.light}
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
              subArcs: [{ limit: 70 }, { limit: 100 }],
              padding: 0.02,
              width: 0.2,
            }}
            pointer={{
              elastic: true,
              animationDelay: 100,
            }}
          />
          <h5 style={{ textAlign: "center" }}>{messageLight}</h5>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
