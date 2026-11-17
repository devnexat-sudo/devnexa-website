import { useEffect, useRef } from "react";

/**
 * Hero background: a static dot grid + soft electric-blue/cyan glow that
 * gently follows the pointer. Drawn on canvas, fully disabled (static
 * poster gradient) under prefers-reduced-motion. aria-hidden + inert.
 */
export function DotGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    const glow = { x: 0.72, y: 0.3, tx: 0.72, ty: 0.3 };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = canvas.width = Math.floor((rect?.width ?? window.innerWidth) * devicePixelRatio);
      h = canvas.height = Math.floor((rect?.height ?? window.innerHeight) * devicePixelRatio);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // glow
      glow.x += (glow.tx - glow.x) * 0.06;
      glow.y += (glow.ty - glow.y) * 0.06;
      const gx = glow.x * w;
      const gy = glow.y * h;
      const r = Math.max(w, h) * 0.5;
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
      grad.addColorStop(0, "rgba(79,90,240,0.20)");
      grad.addColorStop(0.45, "rgba(79,90,240,0.06)");
      grad.addColorStop(1, "rgba(79,90,240,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // dot grid
      const gap = 34 * devicePixelRatio;
      const dotR = Math.max(1, 1.05 * devicePixelRatio);
      ctx.fillStyle = "rgba(139,150,255,0.16)";
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          // brighter near glow center
          const d = Math.hypot(x - gx, y - gy) / r;
          const a = 0.08 + Math.max(0, 0.22 * (1 - d));
          ctx.globalAlpha = Math.min(a, 0.4);
          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      glow.tx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      glow.ty = (e.clientY - rect.top) / Math.max(rect.height, 1);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* static poster layer: visible before first frame / on failure */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 72% 28%, rgba(79,90,240,0.18) 0%, rgba(79,90,240,0.05) 45%, transparent 100%)",
        }}
      />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
