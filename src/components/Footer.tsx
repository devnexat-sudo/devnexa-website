import { Link } from "react-router";
import { MapPin, Mail } from "lucide-react";
import { LogoWordmark } from "./Logo";
import { WhatsAppIcon } from "./WhatsApp";
import { site, whatsappLink, services } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[hsl(229,70%,4%)]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <LogoWordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[hsl(230,14%,72%)]">
            {site.tagline} Software development agency for mobile applications,
            games and white-label digital products.
          </p>
          <p className="font-mono2 mt-6 text-[0.7rem] tracking-[0.2em] text-[hsl(230,12%,55%)] uppercase">
            {site.location}
          </p>
        </div>

        <nav aria-label="Services">
          <h3 className="font-mono2 text-[0.72rem] tracking-[0.22em] text-[hsl(233,84%,72%)] uppercase">
            Services
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/${s.slug}`}
                  className="text-[hsl(230,14%,72%)] transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="font-mono2 text-[0.72rem] tracking-[0.22em] text-[hsl(233,84%,72%)] uppercase">
            Company
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link className="text-[hsl(230,14%,72%)] transition-colors hover:text-white" to="/about">About Us</Link></li>
            <li><Link className="text-[hsl(230,14%,72%)] transition-colors hover:text-white" to="/portfolio">Portfolio</Link></li>
            <li><Link className="text-[hsl(230,14%,72%)] transition-colors hover:text-white" to="/process">Development Process</Link></li>
            <li><Link className="text-[hsl(230,14%,72%)] transition-colors hover:text-white" to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div>
          <h3 className="font-mono2 text-[0.72rem] tracking-[0.22em] text-[hsl(233,84%,72%)] uppercase">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[hsl(230,14%,72%)] transition-colors hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25c05e]" />
                {site.whatsappNumberDisplay}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-[hsl(230,14%,72%)]">
              <Mail className="h-4 w-4 text-[hsl(233,84%,72%)]" />
              {site.emailConfigured ? (
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
              ) : (
                <span title="Business email to be announced">{site.email}</span>
              )}
            </li>
            <li className="inline-flex items-center gap-2.5 text-[hsl(230,14%,72%)]">
              <MapPin className="h-4 w-4 text-[hsl(233,84%,72%)]" />
              {site.location}
            </li>
          </ul>
          <Link to="/contact" className="btn btn-outline mt-6 text-sm">
            Request a Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-[hsl(230,12%,55%)] md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-mono2 tracking-[0.14em] uppercase">
            Mobile Apps · Games · White-Label
          </p>
        </div>
      </div>
    </footer>
  );
}
