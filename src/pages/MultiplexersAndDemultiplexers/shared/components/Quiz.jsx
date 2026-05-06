/**
 * Quiz.jsx — Reusable quiz widget.
 *
 * Props:
 *   questions    : { q, opts, ans, exp, hint }[]
 *   feedbackText : { perfect, good, review }
 */
import React, { useState } from "react";
import { COLORS } from "../theme.js";

const Quiz = ({ questions, feedbackText }) => {
  const [answers, setAnswers]   = useState({});
  const [revealed, setRevealed] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const choose = (qi, oi) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  };

  const reveal = (qi) => setRevealed((prev) => ({ ...prev, [qi]: true }));

  const submit = () => setSubmitted(true);

  const score = submitted
    ? questions.reduce((s, q, i) => s + (answers[i] === q.ans ? 1 : 0), 0)
    : null;

  const feedbackMsg =
    score === null ? null
    : score === questions.length ? feedbackText.perfect
    : score >= Math.ceil(questions.length / 2) ? feedbackText.good
    : feedbackText.review;

  return (
    <div>
      {questions.map((q, qi) => (
        <div
          key={qi}
          style={{
            marginBottom: "20px",
            padding: "18px",
            background: COLORS.darkBg,
            borderRadius: "12px",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <p style={{ color: COLORS.textPrimary, fontWeight: "600", marginBottom: "12px", fontSize: "0.9rem" }}>
            {qi + 1}. {q.q}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {q.opts.map((opt, oi) => {
              const chosen  = answers[qi] === oi;
              const correct = q.ans === oi;
              let borderColor = COLORS.indigoMuted;
              let bg = COLORS.inputBg;
              let color = COLORS.textSecondary;
              if (submitted && chosen && correct)  { borderColor = COLORS.high; bg = "rgba(0,255,136,0.1)"; color = COLORS.high; }
              if (submitted && chosen && !correct) { borderColor = COLORS.low;  bg = "rgba(239,68,68,0.1)"; color = COLORS.low; }
              if (!submitted && chosen)            { borderColor = COLORS.indigo; bg = COLORS.indigoMuted; color = COLORS.indigoLight; }
              return (
                <button
                  key={oi}
                  onClick={() => choose(qi, oi)}
                  style={{
                    padding: "9px 14px", borderRadius: "8px",
                    border: `1.5px solid ${borderColor}`,
                    background: bg, color, cursor: submitted ? "default" : "pointer",
                    textAlign: "left", fontSize: "0.85rem", transition: "all 0.2s",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <div style={{ marginTop: "10px" }}>
              {!revealed[qi] ? (
                <button
                  onClick={() => reveal(qi)}
                  style={{ fontSize: "0.78rem", color: COLORS.textMuted, background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Show explanation
                </button>
              ) : (
                <p style={{ color: COLORS.textSecondary, fontSize: "0.82rem", marginTop: "8px", lineHeight: "1.6" }}>
                  💡 {q.exp}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={submit}
          style={{
            padding: "12px 28px", borderRadius: "10px",
            border: "none", background: COLORS.indigo,
            color: "#fff", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem",
          }}
        >
          Submit Answers
        </button>
      ) : (
        <div style={{ padding: "16px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "12px" }}>
          <div style={{ color: COLORS.indigoLight, fontWeight: "700", fontSize: "1rem" }}>
            Score: {score} / {questions.length}
          </div>
          <p style={{ color: COLORS.textSecondary, fontSize: "0.85rem", marginTop: "6px" }}>{feedbackMsg}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
