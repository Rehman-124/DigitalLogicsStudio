/**
 * theme.js — Shared design tokens
 * Same palette used across Encoder/Decoder, Mux/Demux pages.
 */

export const COLORS = {
  pageBg: "#080e1e",
  cardBg: "rgba(10,16,32,0.85)",
  inputBg: "rgba(12,18,35,0.7)",
  darkBg: "rgba(8,14,30,0.9)",
  deepBg: "rgba(15,23,42,0.9)",
  indigo: "#6366f1",
  indigoLight: "#a5b4fc",
  indigoMuted: "rgba(99,102,241,0.2)",
  high: "#00ff88",
  low: "#ef4444",
  warn: "#fbbf24",
  blue: "#60a5fa",
  purple: "#a78bfa",
  textPrimary: "#e2e8f0",
  textSecondary: "#9ca3af",
  textMuted: "#6b7280",
  textDim: "#4b5563",
  glassBg: "rgba(10, 16, 32, 0.4)",
  glassBorder: "rgba(255, 255, 255, 0.1)",
  glassShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  glowShadow: (color) => `0 0 15px ${color}60, 0 0 5px ${color}40`,
};

export const FONT = { mono: "monospace", base: "inherit" };

export const bitIndicatorStyle = (isActive, activeColor = COLORS.high) => ({
  width: "28px",
  height: "16px",
  borderRadius: "4px",
  background: isActive ? activeColor : "rgba(99,102,241,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: FONT.mono,
  fontSize: "0.78rem",
  color: isActive ? "#0a0f1a" : COLORS.textDim,
  fontWeight: "800",
  transition: "all 0.2s",
});

export const glassCardStyle = (accentColor = COLORS.indigo) => ({
  background: COLORS.glassBg,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: `1px solid ${accentColor}40`,
  borderRadius: "20px",
  boxShadow: COLORS.glassShadow,
  overflow: "hidden",
});

export const cardStyle = (accentColor = COLORS.indigo) => ({
  background: COLORS.cardBg,
  border: `1px solid ${accentColor}30`,
  borderRadius: "16px",
  overflow: "hidden",
});
