import { createLazyFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { getService } from "@/lib/services";
import heroImage from "@/assets/service-renovation.webp";
import { absoluteUrl } from "@/lib/seo";

const service = getService("post-renovation-cleaning");

export const Route = createLazyFileRoute("/services/post-renovation-cleaning")({
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
    <ServicePageLayout service={service} heroImage={heroImage} heroAlt="Cleaner vacuuming construction dust from a freshly renovated apartment" />
  ),
});
