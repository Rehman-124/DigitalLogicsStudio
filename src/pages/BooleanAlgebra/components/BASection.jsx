import React from "react";
const BASection = ({
  kicker,
  title,
  description,
  children,
  className = "",
}) => (
  <section className={`ba-section ${className}`.trim()}>
    {(kicker || title || description) && (
      <div className="ba-section-header">
        {kicker ? <p className="ba-section-kicker">{kicker}</p> : null}
        {title ? <h2 className="ba-section-title">{title}</h2> : null}
        {description ? (
          <p className="ba-section-description">{description}</p>
        ) : null}
      </div>
    )}
    {children}
  </section>
);
export default BASection;
