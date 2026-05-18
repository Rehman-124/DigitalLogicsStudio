import React from "react";
import PremiumLearningShell from "../../../components/topics/PremiumLearningShell";
import { afhdlPages } from "../afhdlConfig";

const AFHDLLayout = ({ title, subtitle, intro, highlights = [], children }) => (
  <PremiumLearningShell
    title={title}
    subtitle={subtitle}
    intro={intro}
    highlights={highlights}
    pages={afhdlPages}
    topicLabel="Arithmetic & HDLs"
    sidebarTitle="Arithmetic Toolkit"
    sidebarCopy="Learn one operation at a time, then connect ideas to hardware design."
    heroKicker="Arithmetic Functions and HDLs"
    progressVerb="complete"
  >
    {children}
  </PremiumLearningShell>
);

export default AFHDLLayout;
