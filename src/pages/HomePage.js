import React, { useState, useEffect } from "react";
import Meter from "../components/Meter";
import axios from "axios";

const HomePage = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    moisture: 0,
    light: 0,
  });

  useEffect(() => {
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

    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // Fetch every 5 minutes

    return () => clearInterval(intervalId); // Cleanup function
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Live Monitoring</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Meter label="Temperature" value={sensorData.temperature} />
        <Meter label="Humidity" value={sensorData.humidity} />
        <Meter label="Moisture" value={sensorData.moisture} />
        <Meter label="Light" value={sensorData.light} />
      </div>
    </div>
  );
};

export default HomePage;
