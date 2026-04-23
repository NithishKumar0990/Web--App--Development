import type { DotMatrixBackgroundProps } from "../components/DotMatrixBackground";

export const dotMatrixConfig: DotMatrixBackgroundProps = {
  // Visual
  backgroundColor: "transparent",
  dotColor: "#101314",

  // Density
  spacing: 32,
  mobileSpacing: 44,

  // Dot size
  dotSize: 1.7,
  mobileDotSize: 1.35,

  // Base visibility
  opacity: 0.5,

  // Cursor interaction
  interactionRadius: 200,
  interactionStrength: 60,
  maxOffset: 24,
  ease: 0.09,
  repel: true,

  // Pulse animation
  pulse: true,
  pulseSpeed: 1.5,
  pulseAmount: 0.2,

  // Edge fade
  edgeFade: true,
  edgeFadeDistance: 140,

  // Cursor highlight
  cursorBoost: true,
  cursorBoostRadius: 170,
  cursorBoostOpacity: 0.45,
  cursorGlow: true,
  cursorGlowColor: "rgba(51, 153, 255, 0.08)",

  // Touch devices
  disableOnTouch: false,

  // Random drift (dots move on their own)
  randomDrift: true,
  driftSpeed: 0.8,
  driftAmount: 8,

  // Layering
  zIndex: -10,
};
