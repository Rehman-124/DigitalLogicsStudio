import React from "react";
import PremiumLearningShell from "../../../components/topics/PremiumLearningShell";
import "./NSLayout.css";
import { nsPages } from "./nsConfig";

const PATH_TO_SUBTOPIC_ID = {
  "/number-systems/binary-representation": "binary-representation",
  "/number-systems/number-conversion": "number-conversion",
  "/number-systems/bit-extension": "bit-extension",
  "/number-systems/bcd-notation": "bcd-notation",
  "/number-systems/ascii-notation": "ascii-notation",
  "/number-systems/bit-converter": "bit-converter",
  "/number-systems/calculator": "calculator",
};

const NS_TOPIC = {
  id: "number-systems",
  title: "NUMBER SYSTEMS",
  links: Object.values(PATH_TO_SUBTOPIC_ID).map((id) => ({ id })),
};

const NSLayout = ({ title, subtitle, intro, highlights = [], children }) => (
  <PremiumLearningShell
    title={title}
    subtitle={subtitle}
    intro={intro}
    highlights={highlights}
    pages={nsPages}
    topicLabel="Number Systems"
    sidebarTitle="Number Systems"
    sidebarCopy="Move across binary, decimal, octal, and hexadecimal with one consistent premium conversion workspace."
    heroKicker="Number Systems"
    progressVerb="read"
    rootClassName="ns-layout"
    tracking={{
      topic: NS_TOPIC,
      pathToSubtopicId: PATH_TO_SUBTOPIC_ID,
    }}
  >
    {children}
  </PremiumLearningShell>
);

export default NSLayout;
