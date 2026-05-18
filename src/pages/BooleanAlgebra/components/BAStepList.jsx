import React from "react";
const BAStepList = ({ steps }) => (
  <ol className="ba-steps">
    {steps.map((step, idx) => (
      <li key={idx}>{step}</li>
    ))}
  </ol>
);
export default BAStepList;
