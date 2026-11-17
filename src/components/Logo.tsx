import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Devnexa Technologies logo"
    >
      <defs>
        <linearGradient id="dxg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b96ff" />
          <stop offset="0.55" stopColor="#4f5af0" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path
        d="M24 3.5 41.7 13.7v20.6L24 44.5 6.3 34.3V13.7Z"
        fill="none"
        stroke="url(#dxg)"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 15v18h4.6c5.6 0 9.9-3.8 9.9-9s-4.3-9-9.9-9Z"
        fill="none"
        stroke="url(#dxg)"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <circle cx="18.5" cy="15" r="2.2" fill="#22d3ee" />
      <circle cx="18.5" cy="33" r="2.2" fill="#4f5af0" />
    </svg>
  );
}

export function LogoWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      {!compact && (
        <span className="leading-none">
          <span className="font-display block text-[1.05rem] font-extrabold tracking-[0.08em] text-white uppercase">
            Devnexa
          </span>
          <span className="font-mono2 mt-1 block text-[0.6rem] tracking-[0.42em] text-[hsl(233,84%,72%)] uppercase">
            Technologies
          </span>
        </span>
      )}
    </span>
  );
}
