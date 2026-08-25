import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/services";

const TITLE = "Thank You - Booking Received | Aart Cleaning Services";
const DESCRIPTION =
  "Thanks for booking with Aart Cleaning Services. Our team will confirm your cleaning slot by phone shortly.";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/thank-you" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/thank-you" }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const confetti = (await import("canvas-confetti")).default;
      if (cancelled) return;
      const shoot = (ratio: number, opts: Record<string, unknown>) =>
        confetti({
          origin: { y: 0.7 },
          particleCount: Math.floor(180 * ratio),
          colors: ["#0e7490", "#22d3ee", "#facc15", "#4ade80"],
          ...opts,
        });
      shoot(0.25, { spread: 26, startVelocity: 55 });
      shoot(0.2, { spread: 60 });
      shoot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      shoot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      shoot(0.1, { spread: 120, startVelocity: 45 });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <span className="grid size-16 place-items-center rounded-full bg-gradient-deep text-primary-foreground">
          <CheckCircle2 className="size-8" />
        </span>
        <h1 className="mt-7 font-display text-4xl font-bold">Thank you - we&apos;ve got it</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your booking request is in. A supervisor from {BUSINESS.name} will call you to
          confirm the slot, the staffs and your discounted rate.
        </p>
        <div className="mt-8 w-full rounded-3xl border border-border bg-card p-6 text-left shadow-soft">
          <p className="font-display font-bold">What happens next</p>
          <ol className="mt-4 space-y-3 text-sm/6 text-muted-foreground">
            <li>1. We confirm your date, time and address by phone or WhatsApp.</li>
            <li>2. Your cleaner arrives with supplies and works through the checklist.</li>
            <li>3. You pay after the session - discount already applied.</li>
          </ol>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={BUSINESS.waHref} target="_blank" rel="noopener noreferrer">
              <Phone className="size-4" /> {BUSINESS.phone}
            </a>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
