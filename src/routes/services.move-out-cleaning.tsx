import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { getService } from "@/lib/services";
import heroImage from "@/assets/service-move-out.webp";

const service = getService("move-out-cleaning");

export const Route = createFileRoute("/services/move-out-cleaning")({
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
    <ServicePageLayout
      service={service}
      heroImage={heroImage}
      heroAlt="Cleaner mopping an emptied apartment after the tenant moved out"
    />
  ),
});
