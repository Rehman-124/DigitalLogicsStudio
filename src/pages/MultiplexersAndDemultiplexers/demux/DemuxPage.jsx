/**
 * DemuxPage.jsx — Main Demultiplexer page (thin orchestrator).
 *
 * Owns top-level state:
 *   selectedType, dVal, selVals
 *
 * Arranges sections using <Section>.
 * Contains no rendering logic itself.
 */
import React, { useState } from "react";
import { COLORS } from "../shared/theme.js";
import Section from "../shared/components/Section.jsx";
import Quiz from "../shared/components/Quiz.jsx";
import TipsPanel from "../shared/components/TipsPanel.jsx";

import { DEMUX_TYPES, DEMUX_QUIZ, DEMUX_QUIZ_FEEDBACK, DEMUX_TIPS } from "./demuxData.js";
import DemuxTypeSelector from "./components/DemuxTypeSelector.jsx";
import DemuxSimulator from "./components/DemuxSimulator.jsx";
import DecoderVsDemux from "./components/DecoderVsDemux.jsx";

const DemuxPage = () => {
  const [selectedType, setSelectedType] = useState("1to4");
  const [dVal, setDVal]     = useState(1);
  const [selVals, setSelVals] = useState(Array(3).fill(0));

  const config = DEMUX_TYPES[selectedType];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px", fontFamily: "inherit" }}>

      {/* Page header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ color: COLORS.textPrimary, fontSize: "1.8rem", fontWeight: "800", margin: 0 }}>
          🔀 Demultiplexers (DEMUX)
        </h1>
        <p style={{ color: COLORS.textSecondary, marginTop: "8px", lineHeight: "1.6", fontSize: "0.95rem" }}>
          A demultiplexer routes a single input signal to one of many outputs, selected by
          binary select lines. It is the functional inverse of a multiplexer — distributing
          one signal across multiple destinations.
        </p>
      </div>

      {/* Type selector */}
      <DemuxTypeSelector
        selectedType={selectedType}
        types={DEMUX_TYPES}
        onChange={(k) => { setSelectedType(k); setDVal(1); setSelVals(Array(3).fill(0)); }}
      />

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
        <DemuxSimulator
          config={config}
          dVal={dVal}
          setDVal={setDVal}
          selVals={selVals}
          setSelVals={setSelVals}
        />
      </Section>

      {/* Decoder vs DEMUX */}
      <Section title="Decoder vs DEMUX" icon="🔍" accentColor={COLORS.blue}>
        <p style={{ color: COLORS.textSecondary, fontSize: "0.88rem", lineHeight: "1.65", marginBottom: "18px" }}>
          A decoder with its Enable used as the data input is functionally equivalent to a
          DEMUX. When D=1 they are identical; when D=0 the DEMUX routes a LOW signal while
          a disabled decoder simply deactivates all outputs.
        </p>
        <DecoderVsDemux />
      </Section>

      {/* Quiz */}
      <Section title="Knowledge Check" icon="🧠" accentColor={COLORS.blue}>
        <Quiz questions={DEMUX_QUIZ} feedbackText={DEMUX_QUIZ_FEEDBACK} />
      </Section>

      <TipsPanel tips={DEMUX_TIPS} />
    </div>
  );
};

export default DemuxPage;
