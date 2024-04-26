import React from "react";

const DataTable = ({ data }) => {
  return (
    <table>
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
