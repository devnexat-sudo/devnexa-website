import type { ReactNode } from "react";
import { DotGrid } from "./DotGrid";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  visual,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
      <DotGrid />
      <div className="container-x relative">
        <div className={visual ? "grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]" : ""}>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="font-display mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[hsl(230,14%,72%)] md:text-lg">
              {lead}
            </p>
            {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
          </Reveal>
          {visual && (
            <Reveal delay={120} className="hidden lg:block">
              {visual}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
