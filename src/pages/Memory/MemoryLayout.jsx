import React from "react";
import PremiumLearningShell from "../../components/topics/PremiumLearningShell";
import "./MemorySystem.css";
import { memoryPages } from "./memoryConfig";

const MemoryLayout = ({ title, kicker, description, children }) => (
  <PremiumLearningShell
    title={title}
    subtitle={description}
    pages={memoryPages}
    topicLabel="Memory Systems"
    sidebarTitle="Memory Systems"
    sidebarCopy="Progress through storage architectures, RAM families, and memory construction inside one unified premium workspace."
    heroKicker={kicker || "Memory Systems"}
    progressVerb="complete"
    rootClassName="mem-layout"
  >
    {children}
  </PremiumLearningShell>
);

export default MemoryLayout;
