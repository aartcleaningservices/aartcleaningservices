import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, CircleAlert, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyMobileCta } from "@/components/site/StickyMobileCta";
import { Button } from "@/components/ui/button";
import { BUSINESS, type ServiceContent } from "@/lib/services";

export function ServicePageLayout({
  service,
  heroImage,
  heroAlt,
}: {
  service: ServiceContent;
  heroImage: string;
  heroAlt: string;
}) {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <SiteHeader />

      <section className="bg-gradient-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-2">
          <div>
            <nav className="text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
              <span className="px-2">/</span>
              <span className="text-foreground">{service.navLabel}</span>
            </nav>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {service.heroKicker}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-balance-tight sm:text-5xl">
              {service.pageTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{service.heroLine}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/bookings">
                  Get 10% off your first session <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={BUSINESS.phoneHref} target="_blank" rel="noopener noreferrer">
                  <Phone className="size-4" /> {BUSINESS.phone}
                </a>
              </Button>
            </div>
          </div>
          <img
            src={heroImage}
            alt={heroAlt}
            width={1600}
            height={1104}
            className="aspect-4/3 w-full rounded-3xl object-cover shadow-lift"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          The problems we actually solve
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Here is what clients tell us goes wrong - and exactly how we deliver our
          solution for {service.navLabel.toLowerCase()}.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {service.pains.map((item) => (
            <article
              key={item.pain}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <p className="flex items-start gap-2.5 font-display font-semibold">
                <CircleAlert className="mt-0.5 size-5 shrink-0 text-accent-foreground" />
                {item.pain}
              </p>
              <p className="mt-3 border-l-2 border-primary/40 pl-4 text-sm/6 text-muted-foreground">
                {item.solution}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              What every session includes
            </h2>
            <p className="mt-3 text-muted-foreground">
              A fixed checklist, so you know what was done before the staffs leave.
            </p>
          </div>
          <ul className="space-y-3">
            {service.includes.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 rounded-2xl bg-card p-4 text-sm shadow-soft"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground shadow-lift sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Get 10% off your first {service.navLabel.toLowerCase()} session
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
              <a href={BUSINESS.phoneHref} target="_blank" rel="noopener noreferrer">
                <Phone className="size-4" /> {BUSINESS.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>


      <SiteFooter />
      <StickyMobileCta />
    </div>
  );
}
