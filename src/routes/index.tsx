import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgePercent,
  Clock,
  Factory,
  Home,
  type LucideIcon,
  PackageOpen,
  PaintRoller,
  PartyPopper,
  ShieldCheck,
  Star,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "@/components/site/WhatsAppIcon";
import heroImage from "@/assets/hero-cleaning.webp";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyMobileCta } from "@/components/site/StickyMobileCta";
import { FaqSection, faqs } from "@/components/site/FaqSection";
import { Button } from "@/components/ui/button";
import { BUSINESS, services } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";

const EVENTS_HREF =
  "https://wa.me/60135519772?text=Hi%20Aart%20Cleaning%2C%20I%20need%20cleaning%20for%20an%20event";

const TITLE = "Aart Cleaning Services | Home, Rentals & Office Cleaning";
const DESCRIPTION =
  "Local cleaning services in Klang, Shah Alam, Subang, and Kota Kemuning for homes, rentals, offices, factories, post-renovation units and malls. From RM 25/hour. 10% off your first session.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      
      { rel: "canonical", href: absoluteUrl("/") },
      { rel: "preload", href: heroImage, as: "image", fetchPriority: "high" },
    ,
      { rel: "preload", as: "image", href: heroImage, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://aartcleaning.my/#business",
          name: BUSINESS.name,
          legalName: BUSINESS.name,
          description: DESCRIPTION,
          telephone: BUSINESS.phone,
          email: BUSINESS.email,
           url: absoluteUrl("/"),
          priceRange: "RM25+ per hour",
          areaServed: [
            { "@type": "City", name: "Klang" },
            { "@type": "City", name: "Shah Alam" },
            { "@type": "City", name: "Subang" },
            { "@type": "City", name: "Kota Kemuning" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Klang",
            addressRegion: "Selangor",
            addressCountry: "MY",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "07:00",
              closes: "18:00",
            },
          ],
          makesOffer: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.cardTitle },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: LandingPage,
});

const trust = [
  { icon: ShieldCheck, label: "Attention to detail, no corner skipped" },
  { icon: Clock, label: "7 AM to 6 PM, any day of the week" },
  { icon: Users, label: "2-hour minimum with 2 or more cleaners" },
];

const serviceTheme: Record<
  string,
  { tint: string; cta: string; icon: LucideIcon }
> = {
  "home-cleaning": { tint: "svc-home", cta: "Clean my home", icon: Home },
  "factory-office-cleaning": {
    tint: "svc-office",
    cta: "Clean my workplace",
    icon: Factory,
  },
  "move-in-cleaning": { tint: "svc-move", cta: "Prepare my move in", icon: PackageOpen },
  "move-out-cleaning": { tint: "svc-moveout", cta: "Prepare my move out", icon: Truck },
  "post-renovation-cleaning": {
    tint: "svc-renovation",
    cta: "Clean after renovation",
    icon: PaintRoller,
  },
  "commercial-mall-cleaning": {
    tint: "svc-mall",
    cta: "Clean my retail space",
    icon: Store,
  },
};

function LandingPage() {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <SiteHeader />
      <main>
      <main>
        <section className="relative overflow-hidden bg-gradient-soft">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-2">
            <div>
              <h3 className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                <BadgePercent className="size-3.5" /> 10% OFF YOUR FIRST SESSION
              </h3>
              <h2 className="mt-5 font-display text-4xl font-bold text-balance-tight sm:text-6xl">
                Reliable cleaning for the places that matter.
              </h2>
              <h1 className="mt-5 max-w-xl text-lg text-muted-foreground">
                We clean homes, rentals, offices, factories, freshly renovated units and retail spaces across Klang, Shah Alam, Subang, and Kota Kemuning for RM 25 per hour.
              </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/bookings">
                    Book & claim 10% off <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={BUSINESS.waHref} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="size-4" /> {BUSINESS.phone}
                  </a>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                Loved by families, landlords and facility managers since 2020
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImage}
                alt="Aart Cleaning Services cleaner wiping a surface in a bright, freshly cleaned Malaysian living room"
                width={1600}
                height={1104}
              fetchPriority="high"
                fetchPriority="high"
                className="aspect-4/3 w-full rounded-3xl object-cover shadow-lift"
              />
              <div className="absolute -bottom-6 left-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:left-8">
                <p className="font-display text-2xl font-bold">RM 25</p>
                <p className="text-xs text-muted-foreground">per hour · 4-hour minimum</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
          <ul className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card px-5 shadow-soft sm:flex-row sm:divide-x sm:divide-y-0">
            {trust.map((t) => (
              <li
                key={t.label}
                className="flex flex-1 items-center gap-3 py-3.5 text-sm font-medium sm:px-5 sm:first:pl-0 sm:last:pr-0"
              >
                <t.icon className="size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{t.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Our cleaning services</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            A cleaner space, without the hassle
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const theme = serviceTheme[s.slug];
              const Icon = theme?.icon ?? Home;
              return (
                <Link
                  key={s.slug}
                  to={s.path}
                  className={`service-card group flex flex-col rounded-3xl border border-border bg-card p-6 ${theme?.tint ?? "svc-home"}`}
                >
                  <span className="service-icon grid size-11 shrink-0 place-items-center rounded-2xl">
                    <Icon className="size-5.5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{s.cardTitle}</h3>
                  <p className="mt-2 flex-1 text-sm/6 text-muted-foreground">{s.cardBlurb}</p>
                  <span className="service-cta mt-5 flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold">
                    {theme?.cta ?? "View service"}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}

            <a
              href={EVENTS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="service-card svc-events group flex flex-col rounded-3xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-3"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="service-icon grid size-11 shrink-0 place-items-center rounded-2xl">
                    <PartyPopper className="size-5.5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">Events and Functions</h3>
                    <p className="mt-2 max-w-2xl text-sm/6 text-muted-foreground">
                      Weddings, open houses, corporate functions and pop-up booths. Pre-event
                      preparation, on-site cleaning during the event, and a full teardown clean after
                      the last guest leaves.
                    </p>
                  </div>
                </div>
                <span className="service-cta flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold sm:w-auto sm:shrink-0">
                  Talk to us
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </div>
        </section>


        <section className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep p-6 text-primary-foreground shadow-lift sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/80">
              10% off your first session
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Book at least one day ahead to keep the first-timer discount.
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link to="/bookings">
                  Claim my 10% discount <ArrowRight className="size-4" />
                </Link>
              </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                >
                  <a href={BUSINESS.waHref} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="size-4" /> {BUSINESS.phone}
                  </a>
                </Button>
            </div>
          </div>
        </section>

        <div className="py-12 sm:py-14">
          <FaqSection />
        </div>
+     </main>

      </main>
      <SiteFooter />
      <StickyMobileCta />
    </div>
  );
}
