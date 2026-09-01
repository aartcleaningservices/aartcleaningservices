import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Quote, Phone, Star } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyMobileCta } from "@/components/site/StickyMobileCta";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/services";

const TITLE = "Customer Reviews & Testimonials | Aart Cleaning Services";
const DESCRIPTION =
  "Read reviews from homeowners, landlords, and facility managers in Klang, Shah Alam, Subang, and Kota Kemuning who book Aart Cleaning Services from RM 25 per hour.";

const review = [
  {
    name: "Nurul A.",
    role: "Condo owner, Kota Kemuning",
    rating: 5,
    body: "Booked a 4-hour session before Raya. The staffs arrived on time and the bathroom grout looks new again. Easiest booking form I have used.",
  },
  {
    name: "Kevin T.",
    role: "Landlord, Klang",
    rating: 5,
    body: "I use them for every tenant turnover. Photos before and after means no arguments about the deposit. Fair rate for the hours put in.",
  },
  {
    name: "Siva R.",
    role: "Factory supervisor, Shah Alam",
    rating: 5,
    body: "Our production floor and office pantry get cleaned weekly now. Same team every visit, so nothing needs re-explaining.",
  },
  {
    name: "Mei Ling",
    role: "New homeowner, Subang",
    rating: 5,
    body: "Post-renovation dust was everywhere, even inside wardrobes. They vacuumed the fine dust twice and wiped every track. We moved in the next day.",
  },
  {
    name: "Farah I.",
    role: "Retail manager, Klang",
    rating: 4,
    body: "Shopfront glass and floors are consistently spotless before opening hours. Would love an even earlier slot, otherwise excellent.",
  },
  {
    name: "Daniel W.",
    role: "Tenant moving out, Shah Alam",
    rating: 5,
    body: "Two staffs finished the whole unit in 3 hours. Agent inspected and passed it on the spot. Got the first-timer 10% off too.",
  },
];

const proof = [
  { value: "1,200+", label: "Sessions completed since 2020" },
  { value: "4.9/5", label: "Average rating from repeat clients" },
  { value: "92%", label: "Clients who book us again" },
  { value: "4", label: "Towns served across Selangor" },
];

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: BUSINESS.name,
          telephone: BUSINESS.phone,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: String(review.length),
            bestRating: "5",
          },
          reviews: review.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(r.rating),
              bestRating: "5",
            },
            reviewBody: r.body,
          })),
        }),
      },
    ],
  }),
  component: ReviewPage,
});

function ReviewPage() {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <SiteHeader />
      <main>
        <section className="bg-gradient-soft">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Reviews and social proof
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-balance-tight sm:text-5xl">
              What our clients say after the staffs leave
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Real feedback from homes, rentals, offices, factories and retail spaces across{" "}
              {BUSINESS.area}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/bookings">
                  Book & claim 10% off <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={BUSINESS.waHref} target="_blank" rel="noopener noreferrer">
                  <Phone className="size-4" /> {BUSINESS.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((p) => (
              <div key={p.label} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <p className="font-display text-3xl font-bold">{p.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Testimonials</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {review.map((r) => (
              <article
                key={r.name}
                className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <Quote className="size-6 text-primary" />
                <span className="mt-4 flex text-accent">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                <p className="mt-4 flex-1 text-sm/6 text-muted-foreground">{r.body}</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="flex items-center gap-2 font-display font-semibold">
                    {r.name} <BadgeCheck className="size-4 text-primary" />
                  </p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground shadow-lift sm:p-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Join them and save 10% on your first session
            </h2>
            <p className="mt-4 max-w-2xl text-sm/6 text-primary-foreground/90">
              Book at least one day ahead to keep the first-timer discount.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                  <Phone className="size-4" /> {BUSINESS.phone}
                </a>
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
