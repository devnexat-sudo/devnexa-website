import { useId } from "react";

/**
 * Deterministic, code-drawn cover art for demo portfolio projects.
 * No external images — replace these with real screenshots later.
 */
export function ProjectArt({
  seed,
  kind,
  className = "",
}: {
  seed: number;
  kind: "app" | "game" | "whitelabel";
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const palettes: Record<string, [string, string, string]> = {
    app: ["#4f5af0", "#22d3ee", "#8b96ff"],
    game: ["#7c5af0", "#f05ab8", "#4f5af0"],
    whitelabel: ["#22d3ee", "#4f5af0", "#5af0c8"],
  };
  const [c1, c2, c3] = palettes[kind];
  const r = (n: number) => {
    // simple deterministic pseudo-random from seed
    const x = Math.sin(seed * 997 + n * 131) * 10000;
    return x - Math.floor(x);
  };

  const rings = Array.from({ length: 4 }, (_, i) => ({
    cx: 120 + r(i) * 560,
    cy: 60 + r(i + 9) * 240,
    rr: 40 + r(i + 20) * 120,
    c: [c1, c2, c3][i % 3],
    o: 0.14 + r(i + 30) * 0.2,
  }));

  return (
    <svg
      viewBox="0 0 800 400"
      className={className}
      role="img"
      aria-label="Abstract project cover artwork"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#070c26" />
          <stop offset="1" stopColor="#03061a" />
        </linearGradient>
        <linearGradient id={`ac${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c3} />
          <stop offset="1" stopColor={c1} />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill={`url(#bg${uid})`} />

      {/* dot grid */}
      {Array.from({ length: 20 }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => (
          <circle
            key={`${i}-${j}`}
            cx={20 + i * 40}
            cy={20 + j * 40}
            r="1.4"
            fill={c3}
            opacity="0.14"
          />
        )),
      )}

      {/* rings */}
      {rings.map((g, i) => (
        <circle
          key={i}
          cx={g.cx}
          cy={g.cy}
          r={g.rr}
          fill="none"
          stroke={g.c}
          strokeWidth="1.6"
          opacity={g.o}
        />
      ))}

      {/* circuit trace */}
      <path
        d={`M0 ${300 + r(1) * 60} H${180 + r(2) * 120} l60 -60 H${420 + r(3) * 80} l60 60 H800`}
        fill="none"
        stroke={`url(#ac${uid})`}
        strokeWidth="2"
        opacity="0.7"
      />
      <circle cx={180 + r(2) * 120} cy={300 + r(1) * 60} r="4" fill={c2} />
      <circle cx={480 + r(3) * 80} cy={240 + r(1) * 60} r="4" fill={c3} />

      {/* kind glyph */}
      {kind === "app" && (
        <g opacity="0.9">
          <rect x="352" y="118" width="96" height="164" rx="16" fill="none" stroke={`url(#ac${uid})`} strokeWidth="2.5" />
          <line x1="378" y1="258" x2="422" y2="258" stroke={c2} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="366" y="140" width="68" height="8" rx="4" fill={c1} opacity="0.8" />
          <rect x="366" y="158" width="46" height="8" rx="4" fill={c3} opacity="0.5" />
          <rect x="366" y="182" width="68" height="34" rx="8" fill={c1} opacity="0.22" />
        </g>
      )}
      {kind === "game" && (
        <g opacity="0.9" stroke={`url(#ac${uid})`} strokeWidth="2.5" fill="none">
          <rect x="330" y="150" width="140" height="88" rx="26" />
          <line x1="362" y1="182" x2="362" y2="206" stroke={c2} />
          <line x1="350" y1="194" x2="374" y2="194" stroke={c2} />
          <circle cx="432" cy="184" r="5" fill={c3} stroke="none" />
          <circle cx="446" cy="200" r="5" fill={c1} stroke="none" />
        </g>
      )}
      {kind === "whitelabel" && (
        <g opacity="0.9" fill="none" strokeWidth="2.5">
          <rect x="322" y="150" width="70" height="88" rx="10" stroke={c1} />
          <rect x="408" y="150" width="70" height="88" rx="10" stroke={c3} strokeDasharray="6 5" />
          <path d="M392 194h16" stroke={c2} />
          <path d="M398 188l8 6-8 6" stroke={c2} fill="none" />
        </g>
      )}
    </svg>
  );
}

/** CSS phone mockup used on the mobile-app page hero. */
export function PhoneMock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[240px] rounded-[2rem] border border-white/15 bg-[hsl(229,50%,9%)] p-2.5 shadow-[0_40px_80px_-30px_rgba(79,90,240,0.45)] ${className}`}
      role="img"
      aria-label="Mobile application interface mockup"
    >
      <div className="overflow-hidden rounded-[1.5rem] bg-[hsl(229,60%,6%)]">
        <div className="flex items-center justify-between px-4 pt-3">
          <span className="font-mono2 text-[0.55rem] text-[hsl(230,14%,60%)]">9:41</span>
          <span className="h-3.5 w-16 rounded-full bg-black/60" />
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(230,14%,60%)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(230,14%,60%)]" />
          </span>
        </div>
        <div className="space-y-2.5 p-4">
          <div className="h-2 w-16 rounded bg-[#4f5af0]" />
          <div className="h-3.5 w-3/4 rounded bg-white/20" />
          <div className="h-3.5 w-1/2 rounded bg-white/10" />
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div className="h-16 rounded-lg bg-gradient-to-br from-[#4f5af0]/50 to-[#22d3ee]/25" />
            <div className="h-16 rounded-lg bg-white/8" />
            <div className="h-16 rounded-lg bg-white/8" />
            <div className="h-16 rounded-lg bg-gradient-to-br from-[#8b96ff]/40 to-[#4f5af0]/15" />
          </div>
          <div className="mt-2 h-9 rounded-lg bg-[#4f5af0]" />
          <div className="mx-auto mt-2 flex w-2/3 justify-between px-1 pt-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-4 w-4 rounded-md bg-white/12" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
