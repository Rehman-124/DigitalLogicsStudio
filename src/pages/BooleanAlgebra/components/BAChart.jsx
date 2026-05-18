import React from "react";
const BAChart = ({ data }) => (
  <div className="ba-chart">
    <h4 className="ba-info-title">Boolean metrics</h4>
    <ul>
      {data.map((item, idx) => (
        <li key={idx}>
          <strong>{item.label}:</strong> {item.value}
        </li>
      ))}
    </ul>
  </div>
);
export default BAChart;
