import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, HeartHandshake, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyMobileCta } from "@/components/site/StickyMobileCta";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "About Us | Aart Cleaning Services";
const DESCRIPTION =
  "Our vision, mission and values at Aart Cleaning Services - a local cleaning team serving Klang, Shah Alam, Subang and Kota Kemuning. Now hiring cleaners.";

const JOIN_HREF =
  "https://wa.me/60135519772?text=Hi%20Aart%20Cleaning%2C%20I%20would%20like%20to%20join%20your%20cleaning%20team";

export const Route = createLazyFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/about") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Do it properly",
    body: "Corners, tracks, grout and skirting. If it is on the checklist it gets cleaned, not skipped.",
  },
  {
    icon: Users,
    title: "Respect the space",
    body: "We treat every home, office and unit like it belongs to someone we know, because it does.",
  },
  {
    icon: HeartHandshake,
    title: "Show up",
    body: "Confirmed bookings, confirmed arrivals, and a supervisor you can reach on WhatsApp.",
  },
  {
    icon: Sparkles,
    title: "Fair for both sides",
    body: "Clear hourly pricing for clients and fair, on-time pay for our staffs.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <SiteHeader />
      <main>

        <section className="bg-gradient-soft">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">About us</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-balance-tight sm:text-5xl">
              A local cleaning team built on showing up and finishing the job.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {BUSINESS.name} has been cleaning homes, rentals, offices, factories and retail
              spaces across {BUSINESS.area} since 2020. Same people, same standards, every session.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <Compass className="size-6 text-primary" />
              <h2 className="mt-4 font-display text-2xl font-bold">Our vision</h2>
              <p className="mt-3 text-sm/7 text-muted-foreground">
                To be the cleaning team that Klang Valley households and businesses recommend
                without hesitation, where a clean space is simply expected and never a gamble on
                who turns up.
              </p>
            </article>
            <article className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <Target className="size-6 text-primary" />
              <h2 className="mt-4 font-display text-2xl font-bold">Our mission</h2>
              <p className="mt-3 text-sm/7 text-muted-foreground">
                To deliver dependable, checklist-driven cleaning at honest hourly pricing, with
                trained staffs who are paid fairly, scheduled realistically, and supported by a
                supervisor on every job.
              </p>
            </article>
          </div>

          <h2 className="mt-14 font-display text-2xl font-bold sm:text-3xl">Our values</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <v.icon className="size-5 text-primary" />
                <p className="mt-3 font-display font-semibold">{v.title}</p>
                <p className="mt-1.5 text-sm/6 text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep p-6 text-primary-foreground shadow-lift sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/80">
              We are hiring
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
              Join our staff team in Klang, Shah Alam, Subang or Kota Kemuning.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-primary-foreground/85">
              Full time and part time cleaners, flexible day shifts between 7 AM and 6 PM, training
              provided, transport allowance for out-of-zone jobs. No experience needed, we will teach
              you our checklist.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <a href={JOIN_HREF} target="_blank" rel="noopener noreferrer">
                  Apply to join our team <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
              >
                <Link to="/bookings">Book a cleaning instead</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
      <StickyMobileCta />
    </div>
  );
}