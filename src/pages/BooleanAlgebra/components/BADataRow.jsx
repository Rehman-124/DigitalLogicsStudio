import React from "react";
const BADataRow = ({ label, value }) => (
  <div className="ba-data-row">
    <span className="ba-data-label">{label}</span>
    <span className="ba-data-value">{value}</span>
  </div>
);
export default BADataRow;
