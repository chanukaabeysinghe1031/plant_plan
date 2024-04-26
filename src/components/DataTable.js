import React, { useEffect, useState } from "react";
import "./DataTable.css"; // Import your CSS file for styling

const DataTable = ({ data }) => {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    let newData = [];

    data.map((item, index) => {
      console.log(item);

      const dateObj = new Date(item.timestamp);

      // Extract date and time components
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
      const day = dateObj.getDate();
      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();
      const seconds = dateObj.getSeconds();

      // Format date and time strings
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
      const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`;

      item.date = formattedDate;
      item.time = formattedTime;
    });

    setTableData(data);
  });

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
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.time}</td>
            <td>{item.temperature}</td>
            <td>{item.humidity}</td>
            <td>{item.moisture}</td>
            <td>{item.light}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
