export type ServiceSlug =
  | "home-cleaning"
  | "factory-office-cleaning"
  | "post-renovation-cleaning"
  | "move-in-cleaning"
  | "move-out-cleaning"
  | "commercial-mall-cleaning";

export type ServicePath =
  | "/services/home-cleaning"
  | "/services/factory-office-cleaning"
  | "/services/post-renovation-cleaning"
  | "/services/move-in-cleaning"
  | "/services/move-out-cleaning"
  | "/services/commercial-mall-cleaning";

export interface ServiceContent {
  slug: ServiceSlug;
  path: ServicePath;
  navLabel: string;
  cardTitle: string;
  cardBlurb: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroKicker: string;
  heroLine: string;
  pains: { pain: string; solution: string }[];
  includes: string[];
}

export const services: ServiceContent[] = [
  {
    slug: "home-cleaning",
    path: "/services/home-cleaning",
    navLabel: "Homes & Rentals",
    cardTitle: "Homes and Rental Properties",
    cardBlurb:
      "Weekly upkeep, deep cleans and turnover cleaning for landed homes, condos, and rental units.",
    pageTitle: "Home & Rental Property Cleaning",
    metaTitle: "Home & Rental Cleaning Services | Aart Cleaning Services",
    metaDescription:
      "Trusted home, condo and rental property cleaning by Aart Cleaning Services. Vetted cleaners, own supplies, flexible weekly plans. 10% off your first session.",
    heroKicker: "For families, tenants and landlords",
    heroLine:
      "A home that feels reset - without spending your only free day scrubbing bathrooms.",
    pains: [
      {
        pain: "No time between work, kids and traffic.",
        solution:
          "We work in fixed 1-hour blocks around your schedule: mornings, evenings or weekends, so cleaning happens while you live your life.",
      },
      {
        pain: "Last cleaner missed the spots that actually matter.",
        solution:
          "Every session follows a room-by-room checklist: bathroom grout, kitchen grease, skirting, fan blades and window tracks are ticked off, not skipped.",
      },
      {
        pain: "Strangers in your home makes you uneasy.",
        solution:
          "The same vetted cleaner is assigned to your address whenever possible, with ID verification and a named supervisor you can call directly.",
      },
      {
        pain: "Rental turnover eats your deposit and your rating.",
        solution:
          "Turnover cleans are photographed before and after, so you have proof for tenants, agents and platform listings.",
      },
    ],
    includes: [
      "Bedrooms, living and dining areas dusted and vacuumed",
      "Bathrooms scrubbed, descaled and disinfected",
      "Kitchen surfaces, sink, hob and exterior cabinets degreased",
      "Floors swept, mopped and dried",
      "Rubbish removed and bins relined",
    ],
  },
  {
    slug: "factory-office-cleaning",
    path: "/services/factory-office-cleaning",
    navLabel: "Factory & Office",
    cardTitle: "Factory and Office Buildings",
    cardBlurb:
      "Scheduled cleaning for production floors, warehouses, pantries, washrooms, and workstations.",
    pageTitle: "Factory & Office Building Cleaning",
    metaTitle: "Factory & Office Cleaning Services | Aart Cleaning Services",
    metaDescription:
      "Scheduled factory, warehouse and office cleaning with trained staffs, safety-aware routines and reliable attendance. Get 10% off your first session.",
    heroKicker: "For operations, HR and facility managers",
    heroLine:
      "A workplace that passes inspection on any given Tuesday, not just audit week.",
    pains: [
      {
        pain: "Cleaners show up late or not at all.",
        solution:
          "Attendance is confirmed at check-in and escalated to a supervisor within 30 minutes if a staff is delayed, with a replacement dispatched same shift.",
      },
      {
        pain: "Production floors need cleaning without stopping work.",
        solution:
          "We schedule around shift changes and work zone by zone, so machines keep running while walkways, pantries and washrooms get done.",
      },
      {
        pain: "Washrooms are the first thing staff complain about.",
        solution:
          "Washrooms are put on a higher-frequency rotation with restock checks for soap, tissue and hand towels logged every visit.",
      },
      {
        pain: "You cannot tell what was actually cleaned.",
        solution:
          "Each visit closes with a signed zone checklist so facilities has a paper trail for audits and management reporting.",
      },
    ],
    includes: [
      "Workstations, meeting rooms and reception detailed",
      "Pantry surfaces, sinks and appliance exteriors cleaned",
      "Washroom deep clean with consumable restock check",
      "Production and warehouse floors swept and machine-safe mopped",
      "Waste consolidated and removed to your collection point",
    ],
  },
  {
    slug: "move-in-cleaning",
    path: "/services/move-in-cleaning",
    navLabel: "Moving In",
    cardTitle: "Moving In",
    cardBlurb:
      "Empty-unit deep cleans timed to your key handover, so your first night in is in a clean home.",
    pageTitle: "Move In Cleaning",
    metaTitle: "Move In Cleaning Services | Aart Cleaning Services",
    metaDescription:
      "Deep cleaning for empty units before you move in. Cabinet interiors, bathrooms and floors cleaned before your furniture lands. 10% off your first session.",
    heroKicker: "For tenants, owners and agents",
    heroLine: "Move into a clean start, not into someone else's leftovers.",
    pains: [
      {
        pain: "You are cleaning at midnight before the movers arrive.",
        solution:
          "We take the empty-unit slot: same-week scheduling in early morning or late evening blocks, so the unit is ready before your delivery date.",
      },
      {
        pain: "The previous tenant's grime is now yours.",
        solution:
          "Cabinet interiors, wardrobes, fridge cavities, toilets and floor corners are cleaned before your furniture ever lands.",
      },
      {
        pain: "New unit handovers still carry construction dust.",
        solution:
          "We damp-wipe and vacuum top-down instead of dry sweeping, so leftover dust is removed rather than pushed around the unit.",
      },
      {
        pain: "Movers and cleaners keep clashing.",
        solution:
          "We coordinate with your moving time so cleaning finishes before the first box arrives, not while the hallway is full.",
      },
    ],
    includes: [
      "Full empty-unit deep clean, room by room",
      "Wardrobe, cabinet and drawer interiors wiped",
      "Fridge, oven and appliance interiors (if left in unit)",
      "Bathrooms descaled, sanitised and deodorised",
      "Floors washed and dried, ready for furniture",
    ],
  },
  {
    slug: "move-out-cleaning",
    path: "/services/move-out-cleaning",
    navLabel: "Moving Out",
    cardTitle: "Moving Out",
    cardBlurb:
      "Deposit-friendly move out cleans, photo documented and timed to your inspection date.",
    pageTitle: "Move Out Cleaning",
    metaTitle: "Move Out Cleaning Services | Aart Cleaning Services",
    metaDescription:
      "Move out cleaning that protects your deposit. Photo-documented, timed to your handover inspection, room by room. 10% off your first session.",
    heroKicker: "For tenants, owners and agents",
    heroLine: "Move out with your deposit intact and the inspection behind you.",
    pains: [
      {
        pain: "Landlord disputes over cleanliness.",
        solution:
          "Before-and-after photos of every room are sent to you the same day, evidence you can forward straight to the agent or owner.",
      },
      {
        pain: "The inspection is tomorrow and the unit is still full.",
        solution:
          "We schedule the moment the last box leaves and can assign more staffs so the whole unit is finished in one session.",
      },
      {
        pain: "Years of grease and limescale will not budge.",
        solution:
          "Kitchen hoods, hobs, sinks and bathroom fittings are degreased and descaled with the right products for each surface.",
      },
      {
        pain: "You are already paying movers, agents and a new deposit.",
        solution:
          "Clear hourly pricing at RM 25 per hour with no surprise add-ons, so you know the cost before we start.",
      },
    ],
    includes: [
      "Full empty-unit deep clean, room by room",
      "Wardrobe, cabinet and drawer interiors wiped",
      "Kitchen degrease: hob, hood, sink and cabinet fronts",
      "Bathrooms descaled, sanitised and deodorised",
      "Before-and-after photo report for your inspection",
    ],
  },
  
  {
    slug: "post-renovation-cleaning",
    path: "/services/post-renovation-cleaning",
    navLabel: "Post-Renovation",
    cardTitle: "Post-Renovation Cleaning",
    cardBlurb:
      "We eliminate fine dust, cement haze, paint specks, and adhesive residue so you can settle in immediately.",
    pageTitle: "Post-Renovation Cleaning",
    metaTitle: "Post-Renovation Cleaning Services | Aart Cleaning Services",
    metaDescription:
      "Renovation dust, cement haze and paint residue removed properly. Multi-pass post-renovation cleaning by Aart Cleaning Services. 10% off your first session.",
    heroKicker: "For homeowners and contractors at handover",
    heroLine:
      "Renovation dust settles three times. We clean for all three passes.",
    pains: [
      {
        pain: "Fine dust returns a day after you clean it yourself.",
        solution:
          "We work top-down in multiple passes with vacuum extraction and damp wiping instead of dry sweeping, so dust is removed rather than moved.",
      },
      {
        pain: "Cement haze and grout film dull new tiles.",
        solution:
          "Tiles and stone are treated with appropriate solutions and buffed, lifting the haze without scratching your new surfaces.",
      },
      {
        pain: "Paint specks, silicone and sticker glue are everywhere.",
        solution:
          "Glass, frames, switches and skirting are hand-detailed with scrapers and safe solvents, the work that contractors normally leave behind.",
      },
      {
        pain: "You need the unit ready for handover tomorrow.",
        solution:
          "Larger staffs can be assigned so a full unit is cleared in one session instead of stretching across days.",
      },
    ],
    includes: [
      "Multi-pass dust removal, ceiling to floor",
      "Cement and grout haze treatment on tiles and stone",
      "Paint, adhesive and sticker residue removal",
      "Window glass, tracks, grilles and frames detailed",
      "Cabinet interiors wiped and construction debris cleared",
    ],
  },
  {
    slug: "commercial-mall-cleaning",
    path: "/services/commercial-mall-cleaning",
    navLabel: "Commercial & Malls",
    cardTitle: "Commercial Buildings",
    cardBlurb:
      "High-traffic cleaning for retail lots, atriums, corridors, food courts, and public washrooms",
    pageTitle: "Commercial & Shopping Mall Cleaning",
    metaTitle: "Commercial & Shopping Mall Cleaning | Aart Cleaning Services",
    metaDescription:
      "High-footfall cleaning for malls, retail lots, food courts and public washrooms. Day staffs, spill response and reporting. 10% off your first session.",
    heroKicker: "For mall management and retail operators",
    heroLine:
      "Thousands of shoes an hour. Floors that still look open-for-business.",
    pains: [
      {
        pain: "Footfall undoes a clean floor in twenty minutes.",
        solution:
          "Day staffs patrol assigned zones continuously instead of cleaning once overnight, keeping entrances, atriums and corridors presentable all trading day.",
      },
      {
        pain: "Spills become slip hazards and complaints.",
        solution:
          "Spill response is part of the patrol route: wet-floor signage placed, area dried and logged, with escalation for anything requiring maintenance.",
      },
      {
        pain: "Public washrooms tank your tenant satisfaction scores.",
        solution:
          "Peak-hour washroom rotations with hourly sign-off sheets and consumable restocking keep the most-reviewed space in your building under control.",
      },
      {
        pain: "Tenants and management want visibility.",
        solution:
          "Zone-level reporting per shift shows coverage, incidents and restocks, so you can answer tenant queries with facts.",
      },
    ],
    includes: [
      "Entrances, atriums, corridors and escalator sides",
      "Food court tables, trays and surrounding floors",
      "Public washroom rotations with restock logs",
      "Glass frontage, handrails and high-touch points",
      "Back-of-house corridors and waste room support",
    ],
  },
];

export const getService = (slug: ServiceSlug) =>
  services.find((s) => s.slug === slug)!;

export const BUSINESS = {
  name: "Aart Cleaning Services",
  phone: "+60 13 551 9772",
  phoneHref:
    "https://wa.me/60135519772?text=I%20am%20interested%20for%20a%20cleaning%20service%20for%20my%20place",
  waHref: "https://wa.me/60135519772",
  email: "nora@aartcleaning.my",
  area: "Klang, Shah Alam, Subang, and Kota Kemuning",
  baseRate: 25,
};
