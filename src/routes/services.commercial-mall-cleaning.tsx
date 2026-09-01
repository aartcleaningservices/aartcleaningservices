import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { getService } from "@/lib/services";
import heroImage from "@/assets/service-mall.webp";
import { absoluteUrl } from "@/lib/seo";

const service = getService("commercial-mall-cleaning");

export const Route = createFileRoute("/services/commercial-mall-cleaning")({
  head: () => ({
    meta: [
      { title: service.metaTitle },
      { name: "description", content: service.metaDescription },
      { property: "og:title", content: service.metaTitle },
      { property: "og:description", content: service.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl(service.path) },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl(service.path) },
      { rel: "preload", href: heroImage, as: "image", fetchPriority: "high" },
    ],
  }),
  component: () => (
    <ServicePageLayout service={service} heroImage={heroImage} heroAlt="Cleaner polishing the glossy tiled concourse floor of a shopping mall" />
  ),
});
