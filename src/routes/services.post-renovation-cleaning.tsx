import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { getService } from "@/lib/services";
import heroImage from "@/assets/service-renovation.webp";

const service = getService("post-renovation-cleaning");

export const Route = createFileRoute("/services/post-renovation-cleaning")({
  head: () => ({
    meta: [
      { title: service.metaTitle },
      { name: "description", content: service.metaDescription },
      { property: "og:title", content: service.metaTitle },
      { property: "og:description", content: service.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: service.path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: service.path }],
  }),
  component: () => (
    <ServicePageLayout service={service} heroImage={heroImage} heroAlt="Cleaner vacuuming construction dust from a freshly renovated apartment" />
  ),
});
