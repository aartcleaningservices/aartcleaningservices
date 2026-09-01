import { Link } from "@tanstack/react-router";
import { FaWhatsapp } from "./WhatsAppIcon";
import { BUSINESS } from "@/lib/services";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-2.5 backdrop-blur-lg md:hidden">
      <div className="flex items-stretch gap-2">
        <a
          href={BUSINESS.waHref} target="_blank" rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-sm font-semibold"
        >
          <FaWhatsapp className="size-4 text-primary" /> WhatsApp us
        </a>
        <span aria-hidden className="w-px shrink-0 self-stretch bg-border" />
        <Link
          to="/bookings"
          className="flex flex-[1.4] items-center justify-center rounded-xl bg-gradient-deep px-3 py-3 text-center text-sm font-bold text-primary-foreground shadow-soft"
        >
          Book & save 10%
        </Link>
      </div>
    </div>
  );
}
