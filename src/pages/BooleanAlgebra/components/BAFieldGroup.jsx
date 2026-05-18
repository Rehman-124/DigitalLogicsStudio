import React from "react";
const BAFieldGroup = ({ label, children }) => (
  <div className="ba-field-group">
    <div className="ba-field-label">{label}</div>
    {children}
  </div>
);
export default BAFieldGroup;
