import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { BUSINESS, services } from "@/lib/services";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-deep text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="leading-none">
            Aart
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Cleaning Services
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center justify-end gap-2">
          <a
            href={BUSINESS.waHref} target="_blank" rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-semibold md:flex"
          >
            <Phone className="size-4 text-primary" />
            {BUSINESS.phone}
          </a>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/bookings">Book & save 10%</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-xl border border-border"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={s.path}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
            >
              {s.navLabel}
            </Link>
          ))}
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
          >
            About us
          </Link>
          <Link
            to="/reviews"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
          >
            Reviews
          </Link>
          <Link
            to="/bookings"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Book & save 10%
          </Link>
        </nav>
      )}
    </header>
  );
}
