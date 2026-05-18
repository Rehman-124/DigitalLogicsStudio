import React from "react";
const BAInput = ({ label, value, onChange, placeholder }) => (
  <div className="ba-field-group">
    {label ? <label className="ba-field-label">{label}</label> : null}
    <input
      className="ba-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      spellCheck={false}
      autoComplete="off"
    />
  </div>
);
export default BAInput;
