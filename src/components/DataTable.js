import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataTable.css"; // Import your CSS file for styling

const DataTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    // Update date and time format for each item in the data array
    const updatedData = data.map((item) => {
      const dateObj = new Date(item.timestamp);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();
      const seconds = dateObj.getSeconds();
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
      const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`;
      return { ...item, date: formattedDate, time: formattedTime };
    });
    setTableData(updatedData); // Update tableData state with the new array
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/data/deleteData",
        {
          id: id,
        }
      );
      if (response.data.success) {
        // If the deletion is successful, filter out the deleted item
        setTableData(tableData.filter((item) => item._id !== id));
        alert(response.data.message);
      } else {
        console.error("Error deleting data:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Moisture</th>
          <th>Light</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.time}</td>
            <td>{item.temperature}</td>
            <td>{item.humidity}</td>
            <td>{item.moisture}</td>
            <td>{item.light}</td>
            <td>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
