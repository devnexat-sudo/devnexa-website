import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { LogoWordmark } from "./Logo";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation + lock scroll while open.
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled || open
          ? "border-b border-white/10 bg-[hsl(229,84%,5%)/0.92]"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex h-[4.25rem] items-center justify-between">
        <Link to="/" aria-label="Devnexa Technologies — home" className="shrink-0">
          <LogoWordmark />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.slice(1, 6).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "text-white"
                    : "text-[hsl(230,14%,72%)] hover:text-white",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/contact" className="btn btn-primary">
            Start Your Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

    </header>

    {/* Mobile menu — sibling of <header>: backdrop-filter on the header would
        otherwise trap this fixed overlay inside the header's box. */}
    {open && (
      <div
        id="mobile-menu"
        className="fixed inset-x-0 top-[4.25rem] bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-[hsl(229,84%,5%)] lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-6">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "border-b border-white/5 py-4 text-lg font-medium transition-colors",
                  isActive ? "text-white" : "text-[hsl(230,14%,72%)]",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary mt-6 w-full">
            Start Your Project
          </Link>
        </nav>
      </div>
    )}
    </>
  );
}
