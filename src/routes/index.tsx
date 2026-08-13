import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgePercent, Clock, Phone, ShieldCheck, Star, Users } from "lucide-react";
import heroImage from "@/assets/hero-cleaning.png";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyMobileCta } from "@/components/site/StickyMobileCta";
import { FaqSection, faqs } from "@/components/site/FaqSection";
import { Button } from "@/components/ui/button";
import { BUSINESS, services } from "@/lib/services";

const TITLE = "Aart Cleaning Services | Home, Office & Post-Renovation Cleaning";
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
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
          url: "/",
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
  { 
    icon: ShieldCheck, 
    title: "Attention to detail", 
    body: " High-quality staffs leave no corner untouched with attention to details" 
  },
  { 
    icon: Clock, 
    title: "7 AM to  6 PM", 
    body: "Book your cleaning any day of the week between 7 AM and 6 PM" 
  },
  { 
    icon: Users, 
    title: "Faster with a Team", 
    body: "2-hour per session minimum for\u00A0\n2 or more cleaners or more cleaners" 
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <SiteHeader />

      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
              <BadgePercent className="size-3.5" /> 10% OFF YOUR FIRST SESSION
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold text-balance-tight sm:text-6xl">
              Cleaning you can&apos;t stop thinking about.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              We clean homes, rentals, offices, factories, freshly renovated units and retail spaces across Klang, Shah Alam, Subang, and Kota Kemuning for RM 25 per hour.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/welcome">
                  Book & claim 10% off <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={BUSINESS.phoneHref} target="_blank" rel="noopener noreferrer">
                  <Phone className="size-4" /> {BUSINESS.phone}
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
              className="aspect-4/3 w-full rounded-3xl object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 left-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:left-8">
              <p className="font-display text-2xl font-bold">RM 25</p>
              <p className="text-xs text-muted-foreground">per hour · 4-hour minimum</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {trust.map((t) => (
            <div key={t.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <t.icon className="size-6 text-primary" />
              <p className="mt-4 font-display font-semibold">{t.title}</p>
              <div className="mt-1.5 text-sm text-muted-foreground whitespace-pre-line">{t.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Our services</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          Pick the space you need cleaned
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <h3 className="font-display text-lg font-bold">{s.cardTitle}</h3>
              <p className="mt-3 flex-1 text-sm/6 text-muted-foreground">{s.cardBlurb}</p>
              <Button asChild variant="secondary" className="mt-6 w-full justify-between">
                <Link to={s.path}>
                  {s.navLabel === "Homes & Rentals"
                    ? "Clean my home"
                    : s.navLabel === "Factory & Office"
                      ? "Clean my workplace"
                      : s.navLabel === "Post-Renovation"
                        ? "Clear the reno dust"
                        : s.navLabel === "Move In / Out"
                          ? "Prep my move"
                          : "Clean my retail space"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground shadow-lift sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/80">
            10% off your first session
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Fill out a form. Book at least one day ahead to keep the first-timer discount.
          </h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link to="/welcome">
                Claim my 10% discount <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
            >
              <a href={BUSINESS.phoneHref} target="_blank" rel="noopener noreferrer">
                <Phone className="size-4" /> {BUSINESS.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="py-16 sm:py-20">
        <FaqSection />
      </div>

      <SiteFooter />
      <StickyMobileCta />
    </div>
  );
}
