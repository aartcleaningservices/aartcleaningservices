import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { getService } from "@/lib/services";
import heroImage from "@/assets/service-mall.webp";

const service = getService("commercial-mall-cleaning");

export const Route = createFileRoute("/services/commercial-mall-cleaning")({
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
    <ServicePageLayout service={service} heroImage={heroImage} heroAlt="Cleaner polishing the glossy tiled concourse floor of a shopping mall" />
  ),
});
