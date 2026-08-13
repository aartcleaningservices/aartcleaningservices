import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/services";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-2.5 backdrop-blur-lg md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={BUSINESS.phoneHref} target="_blank" rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-sm font-semibold"
        >
          <Phone className="size-4 text-primary" /> Call us
        </a>
        <Link
          to="/welcome"
          className="flex-[1.4] rounded-xl bg-gradient-deep px-3 py-3 text-center text-sm font-bold text-primary-foreground shadow-soft"
        >
          Get 10% off
        </Link>
      </div>
    </div>
  );
}
