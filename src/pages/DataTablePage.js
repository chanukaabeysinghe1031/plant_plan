import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../components/DataTable";
import "./DataPage.css";
import Navbar from "../components/Navbar";

const DataPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState("green"); // Initial color of the button

  const fetchData = async () => {
    try {
      setIsLoading(true); // Set loading to true when fetching data
      const response = await axios.post(
        "http://localhost:3001/api/data/getAllData",
        {
          startDate,
          endDate,
        }
      );
      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.error("Error fetching data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after API response
      setButtonColor("green"); // Reset button color after response
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []); // Empty dependency array to run only once on component mount

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading to true when submitting
    setButtonColor("#4caf50"); // Change button color on submit
    await fetchData(); // Wait for data to be fetched
    // Set start date and end date in input fields after fetching data
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div>
      <Navbar activeStyle="DataTable" />
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Logs</h1>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{ backgroundColor: buttonColor }} // Set button color dynamically
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default DataPage;
