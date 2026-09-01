import { BUSINESS, services } from "./services";

const SITE_URL = "https://www.aartcleaning.my/";

function contactBlock(): string {
  return [
    "## Contact",
    "",
    `- Business: ${BUSINESS.name}`,
    `- WhatsApp / Phone: ${BUSINESS.phone} (${BUSINESS.waHref})`,
    `- Email: ${BUSINESS.email}`,
    `- Service area: ${BUSINESS.area}`,
    `- Base rate: RM ${BUSINESS.baseRate} per hour`,
    `- Book online: ${SITE_URL}/bookings`,
    "",
  ].join("\n");
}

function homeMarkdown(): string {
  return [
    `# ${BUSINESS.name}`,
    "",
    `We clean homes, rentals, offices, factories, freshly renovated units and retail spaces across ${BUSINESS.area} for RM ${BUSINESS.baseRate} per hour.`,
    "",
    "New customers get 10% off their first session. Book at least one day ahead to keep the first-timer discount.",
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.cardTitle}](${SITE_URL}${s.path}): ${s.cardBlurb}`),
    "- Events and functions cleaning: message us on WhatsApp for a quote.",
    "",
    "## Pages",
    "",
    `- [About us](${SITE_URL}/about)`,
    `- [Reviews](${SITE_URL}/reviews)`,
    `- [Book a cleaning](${SITE_URL}/bookings)`,
    `- [Privacy policy](${SITE_URL}/privacy)`,
    "",
    contactBlock(),
  ].join("\n");
}

function serviceMarkdown(path: string): string | undefined {
  const service = services.find((s) => s.path === path);
  if (!service) return undefined;
  return [
    `# ${service.pageTitle}`,
    "",
    service.metaDescription,
    "",
    `${service.heroKicker}: ${service.heroLine}`,
    "",
    "## How we solve common problems",
    "",
    ...service.pains.flatMap((p) => [`### ${p.pain}`, "", p.solution, ""]),
    "## What every session includes",
    "",
    ...service.includes.map((i) => `- ${i}`),
    "",
    contactBlock(),
  ].join("\n");
}

const staticPages: Record<string, string> = {
  "/about": [
    `# About ${BUSINESS.name}`,
    "",
    `A local cleaning team serving ${BUSINESS.area}, built on attention to detail and the same trusted staffs on every visit.`,
    "",
    "- Our vision: make a professionally cleaned space something every household and business here can afford.",
    "- Our mission: deliver consistent, checklist-driven cleaning with staffs who are trained, respectful and accountable.",
    "- Our values: attention to detail, punctuality, honest pricing, respect for your space.",
    "",
    "We are hiring cleaning staffs. Message us on WhatsApp to join the team.",
    "",
    contactBlock(),
  ].join("\n"),
  "/reviews": [
    "# Reviews and testimonials",
    "",
    `What customers across ${BUSINESS.area} say about ${BUSINESS.name}.`,
    "",
    contactBlock(),
  ].join("\n"),
  "/bookings": [
    "# Book a cleaning",
    "",
    "Three steps: your details, your location, then date and times.",
    "",
    `- Base rate: RM ${BUSINESS.baseRate} per hour, per cleaner.`,
    "- Sessions run from 07:00 to 18:00 in 1-hour blocks.",
    "- Session lengths: 4 to 8 hours; 2 and 3 hour sessions need 2 or more cleaners.",
    "- 10% off the first session when booked at least one day ahead.",
    "",
    contactBlock(),
  ].join("\n"),
  "/privacy": [
    "# Privacy policy",
    "",
    `${BUSINESS.name} collects only the name, email, phone number and address needed to schedule and deliver a cleaning session. We do not sell your data.`,
    "",
    contactBlock(),
  ].join("\n"),
};

export function getMarkdownForPath(pathname: string): string | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  if (path === "/" || path === "") return homeMarkdown();
  if (staticPages[path]) return staticPages[path];
  return serviceMarkdown(path);
}
