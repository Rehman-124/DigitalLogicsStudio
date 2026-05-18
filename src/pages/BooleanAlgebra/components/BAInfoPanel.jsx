import React from "react";
const BAInfoPanel = ({ title, content, children }) => (
  <article className="ba-info-panel">
    {title ? <h4 className="ba-info-title">{title}</h4> : null}
    <div className="ba-info-content">
      {children || <p className="ba-info-body">{content}</p>}
    </div>
  </article>
);
export default BAInfoPanel;
