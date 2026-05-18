import React from "react";
const BAToggle = ({ checked, label, onChange }) => (
  <label className="ba-toggle">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);
export default BAToggle;
