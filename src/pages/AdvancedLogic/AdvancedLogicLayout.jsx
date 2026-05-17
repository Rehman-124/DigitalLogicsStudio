import React from "react";
import PremiumLearningShell from "../../components/topics/PremiumLearningShell";

const advancedLogicPages = [
  {
    path: "/circuit-cost",
    label: "Circuit Cost",
    description: "Measure literal and gate-input cost for implementation choices.",
  },
  {
    path: "/universal-gates",
    label: "Universal Gates",
    description: "Build complete logic systems using only NAND or NOR gates.",
  },
  {
    path: "/odd-function",
    label: "Odd Function",
    description: "Study 3-variable XOR and parity behavior as a design pattern.",
  },
  {
    path: "/gates",
    label: "Gate Explanations",
    description: "Review symbols, behavior, and intuition for the full gate set.",
  },
];

const AdvancedLogicLayout = ({
  title,
  subtitle,
  intro,
  highlights = [],
  children,
}) => (
  <PremiumLearningShell
    title={title}
    subtitle={subtitle}
    intro={intro}
    highlights={highlights}
    pages={advancedLogicPages}
    topicLabel="Advanced Logic"
    sidebarTitle="Advanced Logic"
    sidebarCopy="Study optimization, universal construction, parity, and deeper reasoning inside the same premium shell."
    heroKicker="Advanced Logic"
    progressVerb="complete"
  >
    {children}
  </PremiumLearningShell>
);

export default AdvancedLogicLayout;
