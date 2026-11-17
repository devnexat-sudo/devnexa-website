import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Eyebrow + heading + optional lead paragraph, consistently spaced. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className={cn("eyebrow", align === "center" && "justify-center")}>
        {eyebrow}
      </p>
      <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-white uppercase md:text-4xl lg:text-[2.6rem] lg:leading-[1.08]">
        {title}
      </h2>
      {lead && (
        <p className="mt-5 text-base leading-relaxed text-[hsl(230,14%,72%)] md:text-lg">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}
