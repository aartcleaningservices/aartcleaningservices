import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "./WhatsAppIcon";
import { BUSINESS, services } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-bold">{BUSINESS.name}</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Our local cleaning services helps homeowners, landlords, businesses and property operators keep their spaces clean, presentable and ready for what comes next.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a href={BUSINESS.waHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold">
              <FaWhatsapp className="size-4 text-primary" /> {BUSINESS.phone}
            </a>
            <a href={`mailto:${BUSINESS.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> {BUSINESS.email}
            </a>
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4 text-primary" /> {BUSINESS.area}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={s.path} className="text-muted-foreground hover:text-foreground">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Company
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About us
              </Link>
            </li>
            <li>
              <Link to="/bookings" className="text-muted-foreground hover:text-foreground">
                Book a session
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="text-muted-foreground hover:text-foreground">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy policy
              </Link>
            </li>
            <li>
              <a href={BUSINESS.waHref} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} {BUSINESS.name}. Operating hours 7am–6pm daily.
      </div>
    </footer>
  );
}
