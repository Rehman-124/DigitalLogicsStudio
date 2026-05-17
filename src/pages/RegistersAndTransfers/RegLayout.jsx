import React from "react";
import PremiumLearningShell from "../../components/topics/PremiumLearningShell";
import "./RegStyles.css";

const regPages = [
  {
    path: "/registers/intro",
    label: "Registers",
    description: "Register fundamentals, data storage roles, and system context.",
  },
  {
    path: "/registers/counters",
    label: "Counters",
    description: "Counting circuits, sequences, and binary progression behavior.",
  },
  {
    path: "/registers/sync-async",
    label: "Synchronous / Asynchronous",
    description: "Clocked coordination and the tradeoffs of async transitions.",
  },
  {
    path: "/registers/shift-registers",
    label: "Shift Registers",
    description: "Move data bit by bit through serial and parallel structures.",
  },
  {
    path: "/registers/serial-shift",
    label: "Serial Shift Registers",
    description: "Serial loading, shifting patterns, and timing of bit movement.",
  },
  {
    path: "/registers/loading",
    label: "Loading Registers",
    description: "Control how data enters registers cleanly and predictably.",
  },
  {
    path: "/registers/parallel",
    label: "Parallel Registers",
    description: "Parallel transfer techniques for wider, faster data movement.",
  },
  {
    path: "/registers/ripple-counters",
    label: "Ripple Counters",
    description: "Asynchronous counter propagation and cumulative delay effects.",
  },
  {
    path: "/registers/sync-binary-counters",
    label: "Synchronous Binary Counters",
    description: "Tighter clocked counter design with coordinated state changes.",
  },
];

const RegLayout = ({ children, title, subtitle }) => (
  <PremiumLearningShell
    title={title}
    subtitle={subtitle}
    pages={regPages}
    topicLabel="Registers & Transfers"
    sidebarTitle="Registers & Transfers"
    sidebarCopy="Explore storage, shifting, loading, and counting patterns through one polished navigation system."
    heroKicker="Registers and Register Transfers"
    progressVerb="complete"
    rootClassName="reg-layout"
  >
    {children}
  </PremiumLearningShell>
);

export default RegLayout;
