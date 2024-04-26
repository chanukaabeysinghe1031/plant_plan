import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../components/DataTable";
import "./DataPage.css";

const DataPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  const handleSubmit = async () => {
    fetchData();
  };

  return (
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
      <button onClick={handleSubmit}>Submit</button>
      <DataTable data={data} />
    </div>
  );
};

export default DataPage;
