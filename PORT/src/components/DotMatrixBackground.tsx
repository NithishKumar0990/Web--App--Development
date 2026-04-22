import { useEffect, useRef } from "react";

export interface DotMatrixBackgroundProps {
  backgroundColor?: string;
  dotColor?: string;

  spacing?: number;
  mobileSpacing?: number;

  dotSize?: number;
  mobileDotSize?: number;

  opacity?: number;

  interactionRadius?: number;
  interactionStrength?: number;
  maxOffset?: number;
  ease?: number;

  repel?: boolean;

  pulse?: boolean;
  pulseSpeed?: number;
  pulseAmount?: number;

  edgeFade?: boolean;
  edgeFadeDistance?: number;

  cursorBoost?: boolean;
  cursorBoostRadius?: number;
  cursorBoostOpacity?: number;

  cursorGlow?: boolean;
  cursorGlowColor?: string;

  disableOnTouch?: boolean;

  randomDrift?: boolean;
  driftSpeed?: number;
  driftAmount?: number;

  zIndex?: number;
  className?: string;
}

type Dot = {
  x: number;
  y: number;
  currentX: number;
  currentY: number;
  size: number;
  phase: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function DotMatrixBackground({
  backgroundColor = "transparent",
  dotColor = "#0B1D51",

  spacing = 34,
  mobileSpacing = 44,

  dotSize = 1.6,
  mobileDotSize = 1.3,

  opacity = 0.22,

  interactionRadius = 150,
  interactionStrength = 28,
  maxOffset = 22,
  ease = 0.08,

  repel = true,

  pulse = true,
  pulseSpeed = 1.5,
  pulseAmount = 0.50,

  edgeFade = true,
  edgeFadeDistance = 140,

  cursorBoost = true,
  cursorBoostRadius = 160,
  cursorBoostOpacity = 0.35,

  cursorGlow = true,
  cursorGlowColor = "rgba(37, 99, 235, 0.08)",

  disableOnTouch = false,

  randomDrift = true,
  driftSpeed = 0.8,
  driftAmount = 8,

  zIndex = -10,
  className = "",
}: DotMatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let dots: Dot[] = [];
    let pixelRatio = 1;

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const getResponsiveValues = () => {
      const isMobile = viewport.width < 768;
      return {
        spacing: isMobile ? mobileSpacing : spacing,
        dotSize: isMobile ? mobileDotSize : dotSize,
      };
    };

    const buildDots = () => {
      dots = [];
      const responsive = getResponsiveValues();
      const gridSpacing = responsive.spacing;
      const baseDotSize = responsive.dotSize;

      for (let y = gridSpacing / 2; y < viewport.height; y += gridSpacing) {
        for (let x = gridSpacing / 2; x < viewport.width; x += gridSpacing) {
          dots.push({
            x,
            y,
            currentX: x,
            currentY: y,
            size: baseDotSize + (Math.random() - 0.5) * 0.25,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const setupCanvas = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;

      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = viewport.width * pixelRatio;
      canvas.height = viewport.height * pixelRatio;

      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      buildDots();
    };

    const drawCursorGlow = () => {
      if (!cursorGlow || !pointer.active || prefersReducedMotion) return;

      const gradient = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        interactionRadius
      );

      gradient.addColorStop(0, cursorGlowColor);
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.save();
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, interactionRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, viewport.width, viewport.height);

      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, viewport.width, viewport.height);
      }

      drawCursorGlow();

      const now = performance.now() / 1000;
      const pulseTime = now * pulseSpeed;

      for (const dot of dots) {
        // 1. Start with the grid home position
        let targetX = dot.x;
        let targetY = dot.y;

        // 2. Add random drift to target
        if (randomDrift && !prefersReducedMotion) {
          targetX += Math.sin(now * driftSpeed + dot.phase) * driftAmount;
          targetY += Math.cos(now * driftSpeed + dot.phase * 1.5) * driftAmount;
        }

        // 3. Cursor interaction
        const dx = targetX - pointer.x;
        const dy = targetY - pointer.y;
        const distance = Math.hypot(dx, dy) || 0.0001;

        if (
          pointer.active &&
          !prefersReducedMotion &&
          distance < interactionRadius
        ) {
          const force = 1 - distance / interactionRadius;
          const direction = repel ? 1 : -1;
          const offset = Math.min(maxOffset, force * interactionStrength);

          targetX += (dx / distance) * offset * direction;
          targetY += (dy / distance) * offset * direction;
        }

        // 4. Smooth easing toward drifted position
        dot.currentX += (targetX - dot.currentX) * ease;
        dot.currentY += (targetY - dot.currentY) * ease;

        // 5. Calculate alpha
        let alpha = opacity;

        if (edgeFade) {
          const edgeDistance = Math.min(
            dot.currentX,
            dot.currentY,
            viewport.width - dot.currentX,
            viewport.height - dot.currentY
          );
          const edgeFactor = clamp(edgeDistance / edgeFadeDistance, 0.2, 1);
          alpha *= edgeFactor;
        }

        if (cursorBoost && pointer.active) {
          const dx2 = dot.currentX - pointer.x;
          const dy2 = dot.currentY - pointer.y;
          const dist2 = Math.hypot(dx2, dy2);

          if (dist2 < cursorBoostRadius) {
            alpha = clamp(
              alpha + (1 - dist2 / cursorBoostRadius) * cursorBoostOpacity,
              0,
              1
            );
          }
        }

        // 6. Calculate size with pulse
        const radius =
          pulse && !prefersReducedMotion
            ? dot.size * (1 + Math.sin(pulseTime + dot.phase) * pulseAmount)
            : dot.size;

        // 7. Draw the dot
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.currentX, dot.currentY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      setupCanvas();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (disableOnTouch && event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    setupCanvas();
    animationFrameId = window.requestAnimationFrame(render);

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [
    backgroundColor,
    dotColor,
    spacing,
    mobileSpacing,
    dotSize,
    mobileDotSize,
    opacity,
    interactionRadius,
    interactionStrength,
    maxOffset,
    ease,
    repel,
    pulse,
    pulseSpeed,
    pulseAmount,
    edgeFade,
    edgeFadeDistance,
    cursorBoost,
    cursorBoostRadius,
    cursorBoostOpacity,
    cursorGlow,
    cursorGlowColor,
    disableOnTouch,
    randomDrift,
    driftSpeed,
    driftAmount,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}