import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BUSINESS } from "@/lib/services";

const TITLE = "Privacy Policy | Aart Cleaning Services";
const DESCRIPTION =
  "How Aart Cleaning Services collects, uses and protects the name, email, phone number and address you share when booking a cleaning session.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated 10 August 2026 · {BUSINESS.name}
        </p>

        <div className="mt-10 space-y-8 text-sm/7 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">
              What we collect
            </h2>
            <p className="mt-3">
              When you request a cleaning session we collect your name, email address,
              phone number and the address (or approximate GPS location) of the premises
              to be cleaned, along with your chosen date, time, plan and staff count.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">
              How we use it
            </h2>
            <p className="mt-3">
              We use your details only to quote, schedule, deliver and follow up on your
              cleaning service, to apply eligible discounts, and to contact you about your
              booking. We do not sell your personal data, and we do not send marketing you
              did not ask for.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">
              Location data
            </h2>
            <p className="mt-3">
              GPS detection on our booking page runs only when you tap the button, and the
              coordinates are used solely to identify the service address. You can always
              enter your address manually instead.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">
              Sharing and retention
            </h2>
            <p className="mt-3">
              Booking details are shared with the assigned cleaner and supervisor for the
              purpose of completing your session. We keep records for as long as needed to
              service your account and to meet Malaysian tax and legal obligations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Your rights</h2>
            <p className="mt-3">
              Under the Malaysian Personal Data Protection Act 2010 you may request access
              to, correction of, or deletion of your personal data, and you may withdraw
              consent to further contact at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Contact us</h2>
            <p className="mt-3">
              Call or WhatsApp{" "}
              <a href={BUSINESS.phoneHref} className="font-semibold text-primary">
                {BUSINESS.phone}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${BUSINESS.email}`} className="font-semibold text-primary">
                {BUSINESS.email}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
