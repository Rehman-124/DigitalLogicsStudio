/**
 * MuxPage.jsx — Main Multiplexer page (thin orchestrator).
 *
 * Owns top-level state:
 *   selectedType, dataVals, selVals
 *
 * Arranges sections using <Section>.
 * Contains no rendering logic itself.
 */
import React, { useState } from "react";
import { COLORS } from "../shared/theme.js";
import Section from "../shared/components/Section.jsx";
import Quiz from "../shared/components/Quiz.jsx";
import TipsPanel from "../shared/components/TipsPanel.jsx";

import { MUX_TYPES, MUX_QUIZ, MUX_QUIZ_FEEDBACK, MUX_TIPS } from "./muxData.js";
import MuxTypeSelector from "./components/MuxTypeSelector.jsx";
import MuxSimulator from "./components/MuxSimulator.jsx";
import CascadingMuxDemo from "./components/CascadingMuxDemo.jsx";
import BooleanFunctionMux from "./components/BooleanFunctionMux.jsx";

const MuxPage = () => {
  const [selectedType, setSelectedType] = useState("4to1");
  const [dataVals, setDataVals] = useState(Array(8).fill(0));
  const [selVals, setSelVals]   = useState(Array(3).fill(0));

  const config = MUX_TYPES[selectedType];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px", fontFamily: "inherit" }}>

      {/* Page header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ color: COLORS.textPrimary, fontSize: "1.8rem", fontWeight: "800", margin: 0 }}>
          ⚙️ Multiplexers (MUX)
        </h1>
        <p style={{ color: COLORS.textSecondary, marginTop: "8px", lineHeight: "1.6", fontSize: "0.95rem" }}>
          A multiplexer selects one of many input signals and forwards it to a single output.
          It uses select lines to determine which input is routed — acting like a digitally controlled switch.
        </p>
      </div>

      {/* Type selector */}
      <MuxTypeSelector selectedType={selectedType} types={MUX_TYPES} onChange={(k) => { setSelectedType(k); setDataVals(Array(8).fill(0)); setSelVals(Array(3).fill(0)); }} />

      {/* Concept & analogy */}
      <Section title={`${config.label} — Concept`} icon="💡" accentColor={COLORS.indigo}>
        <p style={{ color: COLORS.textSecondary, fontSize: "0.9rem", lineHeight: "1.65", marginBottom: "10px" }}>
          {config.description}
        </p>
        <div style={{ padding: "12px 16px", background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: "10px" }}>
          <span style={{ color: COLORS.warn, fontWeight: "700", fontSize: "0.8rem" }}>🌍 REAL-WORLD ANALOGY: </span>
          <span style={{ color: COLORS.textSecondary, fontSize: "0.85rem" }}>{config.analogy}</span>
        </div>
      </Section>

      {/* Interactive simulator */}
      <Section title="Interactive Simulator" icon="🎮" accentColor={COLORS.high}>
        <MuxSimulator
          config={config}
          dataVals={dataVals}
          setDataVals={setDataVals}
          selVals={selVals}
          setSelVals={setSelVals}
        />
      </Section>

      {/* Boolean function implementation */}
      <Section title="MUX as a Universal Logic Element" icon="🔧" accentColor={COLORS.purple}>
        <p style={{ color: COLORS.textSecondary, fontSize: "0.88rem", lineHeight: "1.65", marginBottom: "18px" }}>
          Any Boolean function can be implemented with a single MUX by tying its data inputs to
          constants (0 or 1) that match the function's truth table output column.
          Try clicking the cells below to define your own function!
        </p>
        <BooleanFunctionMux />
      </Section>

      {/* Cascading demo */}
      <Section title="Cascading MUXes" icon="🔗" accentColor={COLORS.warn}>
        <p style={{ color: COLORS.textSecondary, fontSize: "0.88rem", lineHeight: "1.65", marginBottom: "18px" }}>
          Two 4-to-1 MUXes can be chained through a 2-to-1 MUX to create an 8-to-1 MUX,
          adding one extra select bit per level of cascading.
        </p>
        <CascadingMuxDemo />
      </Section>

      {/* Quiz */}
      <Section title="Knowledge Check" icon="🧠" accentColor={COLORS.blue}>
        <Quiz questions={MUX_QUIZ} feedbackText={MUX_QUIZ_FEEDBACK} />
      </Section>

      <TipsPanel tips={MUX_TIPS} />
    </div>
  );
};

export default MuxPage;
