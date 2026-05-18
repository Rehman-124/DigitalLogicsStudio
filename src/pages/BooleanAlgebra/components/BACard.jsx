import React from "react";
const BACard = ({ title, subtitle, children }) => (
  <article className="ba-card">
    {title ? <h3 className="ba-card-title">{title}</h3> : null}
    {subtitle ? <p className="ba-card-subtitle">{subtitle}</p> : null}
    <div className="ba-card-content">{children}</div>
  </article>
);
export default BACard;
