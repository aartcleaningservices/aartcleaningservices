import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BadgePercent,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock,
  Loader2,
  LocateFixed,
  MapPin,
  TriangleAlert,
  Users,
  Minus,
  Plus,
  UserRound,
} from "lucide-react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BUSINESS } from "@/lib/services";
import { cn } from "@/lib/utils";
import { postStepData } from "@/lib/submitLead";
import { COUNTRY_CODES, matchDial } from "@/lib/countryCodes";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Book Your Clean | Aart Cleaning Services";
const DESCRIPTION =
  "Set your location, date, time and staff count to see your cleaning rate instantly. First-time customers get 10% off.";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/bookings") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/bookings") }],
  }),
  component: WelcomePage,
});

type AddressKey = "address" | "postcode" | "city" | "state";

export interface LeadValues {
  name: string;
  email: string;
  phone: string;
}

// First-2-digit postcode prefix -> state / federal territory, per
// https://en.wikipedia.org/wiki/Postal_codes_in_Malaysia
// A few prefixes are genuinely shared by disjoint areas of one state
// (e.g. 39/49/69 are outlying Pahang districts sitting inside Selangor's
// numeric neighbourhood) - this table reflects the primary/majority
// assignment for each prefix. The dropdown stays editable so an address
// on one of these edge cases can always be corrected by hand.
const POSTCODE_PREFIX_STATE: Record<string, string> = {
  "01": "Perlis",
  "02": "Perlis",
  "05": "Kedah",
  "06": "Kedah",
  "07": "Kedah",
  "08": "Kedah",
  "09": "Kedah",
  "10": "Penang",
  "11": "Penang",
  "12": "Penang",
  "13": "Penang",
  "14": "Penang",
  "15": "Kelantan",
  "16": "Kelantan",
  "17": "Kelantan",
  "18": "Kelantan",
  "20": "Terengganu",
  "21": "Terengganu",
  "22": "Terengganu",
  "23": "Terengganu",
  "24": "Terengganu",
  "25": "Pahang",
  "26": "Pahang",
  "27": "Pahang",
  "28": "Pahang",
  "30": "Perak",
  "31": "Perak",
  "32": "Perak",
  "33": "Perak",
  "34": "Perak",
  "35": "Perak",
  "36": "Perak",
  "39": "Pahang", // Cameron Highlands
  "40": "Selangor",
  "41": "Selangor",
  "42": "Selangor",
  "43": "Selangor",
  "44": "Selangor",
  "45": "Selangor",
  "46": "Selangor",
  "47": "Selangor",
  "48": "Selangor",
  "49": "Pahang", // Fraser's Hill
  "50": "Kuala Lumpur",
  "51": "Kuala Lumpur",
  "52": "Kuala Lumpur",
  "53": "Kuala Lumpur",
  "54": "Kuala Lumpur",
  "55": "Kuala Lumpur",
  "56": "Kuala Lumpur",
  "57": "Kuala Lumpur",
  "58": "Kuala Lumpur",
  "59": "Kuala Lumpur",
  "60": "Kuala Lumpur",
  "62": "Putrajaya",
  "63": "Selangor",
  "64": "Selangor",
  "65": "Selangor",
  "66": "Selangor",
  "67": "Selangor",
  "68": "Selangor", // 68100 itself is a Kuala Lumpur exception within this block
  "69": "Pahang", // Genting Highlands
  "70": "Negeri Sembilan",
  "71": "Negeri Sembilan",
  "72": "Negeri Sembilan",
  "73": "Negeri Sembilan",
  "75": "Malacca",
  "76": "Malacca",
  "77": "Malacca",
  "78": "Malacca",
  "79": "Johor",
  "80": "Johor",
  "81": "Johor",
  "82": "Johor",
  "83": "Johor",
  "84": "Johor",
  "85": "Johor",
  "86": "Johor",
  "87": "Labuan",
  "88": "Sabah",
  "89": "Sabah",
  "90": "Sabah",
  "91": "Sabah",
  "93": "Sarawak",
  "94": "Sarawak",
  "95": "Sarawak",
  "96": "Sarawak",
  "97": "Sarawak",
  "98": "Sarawak",
};

const MALAYSIA_STATES = Array.from(new Set(Object.values(POSTCODE_PREFIX_STATE))).sort();

const getStateFromPostcode = (postcode: string): string | null => {
  const prefix = postcode.slice(0, 2);
  return /^\d{2}$/.test(prefix) ? POSTCODE_PREFIX_STATE[prefix] ?? null : null;
};
type Frequency = "one-time" | "monthly" | "weekly";

const DURATIONS = [2, 3, 4, 5, 6, 7, 8];
const HOUR_BLOCKS = Array.from({ length: 12 }, (_, i) => 7 + i); // 7:00 - 18:00
const LAST_END = 18; // sessions must end by 18:00
const STEP_LABELS: Record<number, string> = {
  1: "Your details",
  2: "Location",
  3: "Date & times",
};


const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;
const rm = (n: number) => `RM ${n.toFixed(2)}`;

// Local-time (not UTC) date <-> "yyyy-mm-dd" helpers, so a date picked in the
// user's own timezone always round-trips to the same calendar day.
const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parseISODate = (iso: string): Date | undefined => {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  if (y === undefined || m === undefined || d === undefined) return undefined;
  return new Date(y, m - 1, d);
};
const formatDisplayDate = (iso: string) => {
  const d = parseISODate(iso);
  return d
    ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "";
};
const todayISO = () => toISODate(new Date());

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const splitPhone = (full: string) => {
  const value = full.trim().replace(/\s+/g, " ");
  const match = matchDial(value);
  if (match) return { iso: match.iso, national: value.slice(match.dial.length).trim() };
  return { iso: "MY", national: value };
};

type LeadFieldKey = "name" | "email" | "phone";

interface LeadFormProps {
  onComplete: (values: LeadValues) => void;
  initialValues?: LeadValues | null;
}

function LeadForm({ onComplete, initialValues }: LeadFormProps) {
  const [values, setValues] = useState<Record<LeadFieldKey, string>>({
    name: initialValues?.name ?? "",
    email: initialValues?.email ?? "",
    phone: splitPhone(initialValues?.phone ?? "").national,
  });
  const [countryIso, setCountryIso] = useState(splitPhone(initialValues?.phone ?? "").iso);
  const country =
    COUNTRY_CODES.find((c) => c.iso === countryIso) ?? COUNTRY_CODES[0]!;
  const [errors, setErrors] = useState<Partial<Record<LeadFieldKey, string>>>({});

  const setValue = (key: LeadFieldKey, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key])
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
  };

  const validateEmailOnBlur = () => {
    const email = values.email.trim();
    if (!email) return;
    setErrors((e) => {
      const next = { ...e };
      if (EMAIL_REGEX.test(email)) delete next.email;
      else next.email = "Enter a valid email like name@example.com";
      return next;
    });
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const fieldRefs = { name: nameRef, email: emailRef, phone: phoneRef };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<LeadFieldKey, string>> = {};
    if (!values.name.trim()) next.name = "Please tell us your name";
    if (!values.email.trim()) next.email = "Please enter your email address";
    else if (!EMAIL_REGEX.test(values.email.trim()))
      next.email = "Enter a valid email like name@example.com";
    if (!values.phone.trim()) next.phone = "Please enter your phone number";
  
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstKey = (["name", "email", "phone"] as const).find((k) => next[k]);
      if (firstKey) {
        const el = fieldRefs[firstKey].current;
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true }); // preventScroll so it doesn't double-jump instantly first
      }
      return;
    }

    const clean = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: `${country.dial} ${values.phone.trim()}`.trim().replace(/\+/g, ""),
    };
    try {
      sessionStorage.setItem("aart_lead", JSON.stringify(clean));
    } catch {
      /* storage unavailable - continue anyway */
    }

    postStepData({ step: "lead", ...clean });
    onComplete(clean);
  };

  const fieldClass = (key: LeadFieldKey) =>
    cn(
      "h-12 w-full rounded-xl border bg-card px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70",
      errors[key]
        ? "border-destructive bg-destructive/5 ring-2 ring-destructive/25 focus:border-destructive focus:ring-destructive/25"
        : "border-input focus:border-primary focus:ring-2 focus:ring-ring/25",
    );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
        <BadgePercent className="size-3.5" /> 10% off first session
      </span>
      <h2 className="mt-5 font-display text-xl font-bold">Let&apos;s get you started</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Three things, then we&apos;ll set up your booking.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="lead-name" className="text-sm font-semibold">
            Name
          </label>
          <input
            id="lead-name"
            name="name"
            ref={nameRef}
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValue("name", e.target.value)}
            placeholder="Your Name"
            aria-invalid={Boolean(errors.name)}
            className={cn(fieldClass("name"), "mt-2")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-destructive">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="lead-email" className="text-sm font-semibold">
            Email address
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            ref={emailRef}
            value={values.email}
            onChange={(e) => setValue("email", e.target.value)}
            onBlur={validateEmailOnBlur}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            className={cn(fieldClass("email"), "mt-2")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-destructive">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="lead-phone" className="text-sm font-semibold">
            Phone number
          </label>
          <div className="mt-2 flex items-stretch gap-2">
            <div className="relative shrink-0">
              <select
                aria-label="Country calling code"
                value={countryIso}
                onChange={(e) => setCountryIso(e.target.value)}
                className="h-12 w-[7.5rem] appearance-none rounded-xl border border-input bg-card pl-3 pr-8 text-base font-semibold outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/25"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.iso} value={c.iso}>
                    {c.flag} {c.dial}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-px left-px right-7 flex items-center gap-1.5 rounded-l-xl bg-card pl-3 text-base font-semibold"
              >
                <span className="text-lg leading-none">{country.flag}</span>
                {country.dial}
              </span>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              ref={phoneRef}
              value={values.phone}
              onChange={(e) => setValue("phone", e.target.value)}
              placeholder="12 345 6789"
              aria-invalid={Boolean(errors.phone)}
              className={cn(fieldClass("phone"), "min-w-0 flex-1")}
            />
          </div>
          {errors.phone && (
            <p className="mt-1.5 text-xs font-medium text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full">
        Continue to location
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We only use these details to arrange your cleaning.
      </p>
    </form>
  );
}

function WelcomePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [lead, setLead] = useState<LeadValues | null>(null);
  const leadName = lead?.name ?? "";

  const [address, setAddress] = useState<Record<AddressKey, string>>({
    address: "",
    postcode: "",
    city: "",
    state: "",
  });
  const [addressErrors, setAddressErrors] = useState<AddressKey[]>([]);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [coords, setCoords] = useState<string | null>(null);

  // Step 2
  const [date, setDate] = useState("");
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [startHour, setStartHour] = useState<number | null>(null);
  const [duration, setDuration] = useState(4);
  const [frequency] = useState<Frequency>("one-time");
  const [cleaners, setCleaners] = useState(1);
  const [step2Errors, setStep2Errors] = useState<string[]>([]);

  const shortAllowed = cleaners > 1;
  const lastStart = LAST_END - duration;

  useEffect(() => {
    if (!shortAllowed && duration < 4) setDuration(4);
  }, [shortAllowed, duration]);

  useEffect(() => {
    if (startHour !== null && startHour > LAST_END - duration) setStartHour(null);
  }, [duration, startHour]);

  useEffect(() => {
    if (startHour !== null && date === todayISO() && startHour < new Date().getHours() + 1)
      setStartHour(null);
  }, [date, startHour]);

  const isSameDay = date !== "" && date === todayISO();
  const minStartToday = isSameDay ? new Date().getHours() + 1 : 0;
  const ready = date !== "" && startHour !== null;


  const quote = useMemo(() => {
    const subtotal = BUSINESS.baseRate * duration * cleaners;
    const firstTimePct = isSameDay ? 0 : 10;
    const freqPct = 0;
    const staffPct = 0;
    const totalPct = firstTimePct + freqPct + staffPct;
    const discount = (subtotal * totalPct) / 100;
    return {
      subtotal,
      firstTimePct,
      freqPct,
      staffPct,
      totalPct,
      firstTimeOff: (subtotal * firstTimePct) / 100,
      freqOff: (subtotal * freqPct) / 100,
      staffOff: (subtotal * staffPct) / 100,
      discount,
      total: subtotal - discount,
    };
  }, [duration, cleaners, frequency, isSameDay]);

  const detectLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords(
          `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
        );
        setGeoStatus("done");
        setAddressErrors([]);
      },
      () => setGeoStatus("error"),
    );
  };

  const addressRefs = {
    address: useRef<HTMLInputElement>(null),
    postcode: useRef<HTMLInputElement>(null),
    city: useRef<HTMLInputElement>(null),
    state: useRef<HTMLSelectElement>(null),
  };

  const submitStep1 = () => {
    if (coords) {
      postStepData({ step: "location", email: lead?.email, coords });
      setStep(3);
      return;
    }
    const missing = (Object.keys(address) as AddressKey[]).filter(
      (k) => address[k].trim() === "",
    );
    setAddressErrors(missing);
    if (missing.length > 0) {
      const firstKey = (["address", "postcode", "city", "state"] as const).find((k) =>
        missing.includes(k),
      );
      if (firstKey) {
        const el = addressRefs[firstKey].current;
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      }
      return;
    }
    postStepData({ step: "location", email: lead?.email, ...address });
    setStep(3);
  };
  const dateRef = useRef<HTMLButtonElement>(null);
  const timeHeadingRef = useRef<HTMLHeadingElement>(null);
  const confirmBooking = () => {
    const errs: string[] = [];
    if (!date) errs.push("date");
    if (startHour === null) errs.push("time");
    setStep2Errors(errs);
    if (errs.length > 0) {
      if (errs.includes("date")) {
        dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        dateRef.current?.focus({ preventScroll: true });
      } else if (errs.includes("time")) {
        timeHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    postStepData({
      step: "booking",
      email: lead?.email,
      date,
      startHour,
      duration,
      cleaners,
      frequency,
      total: quote.total,
    });

    navigate({ to: "/thank-you" });
  };

  const inputClass = (invalid: boolean) =>
    cn(
      "mt-2 h-12 w-full rounded-xl border bg-card px-4 text-base outline-none transition-colors",
      invalid
        ? "border-destructive bg-destructive/5 ring-2 ring-destructive/25 focus:border-destructive focus:ring-destructive/25"
        : "border-input focus:border-primary focus:ring-2 focus:ring-ring/25",
    );

  return (
    <div className="min-h-screen pb-28 md:pb-0">
      <div className="bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground">
        <BadgePercent className="mr-1.5 inline size-4" />
        First-time customer? Your first session is 10% off - it&apos;s already in the rate
        below.
      </div>

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="font-display text-lg font-bold">
            Aart Cleaning Services
          </Link>
          <a href={BUSINESS.phoneHref} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary">
            {BUSINESS.phone}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Welcome{leadName ? `, ${leadName.split(" ")[0]}` : ""} - let&apos;s set up your
          clean
        </h1>
        <p className="mt-3 text-muted-foreground">
          Three quick steps. Book at least one day ahead for your first session 10% off.
        </p>

        <button
          type="button"
          onClick={() => (step > 1 ? setStep((s) => s - 1) : navigate({ to: "/" }))}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Back
        </button>

        <nav aria-label="Booking steps" className="mt-4 flex items-center gap-3">
          {[1, 2, 3].map((n) => {
            const label = STEP_LABELS[n];
            const canGo = n < step;
            return (
              <div key={n} className="flex flex-1 items-center gap-3">
                <button
                  type="button"
                  disabled={!canGo}
                  aria-current={step === n ? "step" : undefined}
                  onClick={() => canGo && setStep(n)}
                  className={cn(
                    "flex items-center gap-3 rounded-full text-left transition-opacity",
                    canGo ? "cursor-pointer hover:opacity-80" : "cursor-default",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold",
                      step >= n
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {n}
                  </span>
                  <span
                    className={cn(
                      "hidden text-sm font-semibold sm:inline",
                      canGo && "underline decoration-dotted underline-offset-4",
                      step < n && "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </button>
                {n < 3 && <span className="h-px flex-1 bg-border" />}
              </div>
            );
          })}
        </nav>
        <p className="mt-3 text-sm font-semibold sm:hidden">{STEP_LABELS[step]}</p>

        {step === 1 && (
          <section className="mt-8">
            <LeadForm
              initialValues={lead}
              onComplete={(values) => {
                setLead(values);
                setStep(2);
              }}
            />
          </section>
        )}


        {step === 2 && (
          <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold">
              <MapPin className="size-5 text-primary" /> Where are we cleaning?
            </h2>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="mt-6 w-full"
              onClick={detectLocation}
            >
              {geoStatus === "loading" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LocateFixed className="size-4" />
              )}
              Use my current GPS location
            </Button>
            {geoStatus === "done" && coords && (
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-primary">
                <CheckCircle2 className="size-4" /> Location detected ({coords}). We&apos;ll
                confirm the exact unit by phone.
              </p>
            )}
            {geoStatus === "error" && (
              <p className="mt-3 text-sm text-destructive">
                We couldn&apos;t read your location. Please fill in the address below.
              </p>
            )}

            <div className="my-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or enter it manually{" "}
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="address" className="text-sm font-semibold">
                  Street address / unit
                </label>
                <input
                  id="address"
                  ref={addressRefs.address}
                  value={address.address}
                  onChange={(e) => setAddress((a) => ({ ...a, address: e.target.value }))}
                  placeholder="12-3, Jalan Kuchai Lama"
                  aria-invalid={addressErrors.includes("address")}
                  className={inputClass(addressErrors.includes("address"))}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="postcode" className="text-sm font-semibold">
                    Postcode
                  </label>
                  <input
                    id="postcode"
                    inputMode="numeric"
                    ref={addressRefs.postcode}
                    value={address.postcode}
                    onChange={(e) => {
                      const postcode = e.target.value;
                      setAddress((a) => {
                        const detected = getStateFromPostcode(postcode);
                        return { ...a, postcode, state: detected ?? a.state };
                      });
                    }}
                    placeholder="58200"
                    aria-invalid={addressErrors.includes("postcode")}
                    className={inputClass(addressErrors.includes("postcode"))}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="text-sm font-semibold">
                    City
                  </label>
                  <input
                    id="city"
                    ref={addressRefs.city}
                    value={address.city}
                    onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                    placeholder="Klang"
                    aria-invalid={addressErrors.includes("city")}
                    className={inputClass(addressErrors.includes("city"))}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="state" className="text-sm font-semibold">
                  State
                </label>
                <select
                  id="state"
                  ref={addressRefs.state}
                  value={address.state}
                  onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))}
                  aria-invalid={addressErrors.includes("state")}
                  className={inputClass(addressErrors.includes("state"))}
                >
                  <option value="" disabled></option>
                  {MALAYSIA_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {addressErrors.length > 0 && (
              <p className="mt-4 text-sm font-medium text-destructive">
                Please complete the highlighted fields, or use GPS detection.
              </p>
            )}

            <Button size="lg" className="mt-7 w-full" onClick={submitStep1}>
              Continue to time & dates
            </Button>
          </section>
        )}

        {step === 3 && (
          <section className="mt-8 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                <Users className="size-5 text-primary" /> How many cleaners?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Add as many cleaners as you need - each one is charged at{" "}
                {rm(BUSINESS.baseRate)}/hour.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 rounded-2xl border border-input p-2">
                  <button
                    type="button"
                    aria-label="Remove a cleaner"
                    disabled={cleaners <= 1}
                    onClick={() => setCleaners((c) => Math.max(1, c - 1))}
                    className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/70 disabled:opacity-40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-10 text-center font-display text-2xl font-bold">
                    {cleaners}
                  </span>
                  <button
                    type="button"
                    aria-label="Add a cleaner"
                    onClick={() => setCleaners((c) => c + 1)}
                    className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground transition-colors hover:opacity-90"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <UserRound className="size-4 text-primary" />
                  {cleaners} cleaner{cleaners > 1 ? "s" : ""} assigned
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                <Calendar className="size-5 text-primary" /> Pick your date
              </h2>
              <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    ref={dateRef}
                    aria-invalid={step2Errors.includes("date")}
                    className={cn(
                      inputClass(step2Errors.includes("date")),
                      "max-w-xs flex items-center justify-between text-left font-normal",
                    )}
                  >
                    {date ? formatDisplayDate(date) : "Select a date"}
                    <Calendar className="size-4 shrink-0 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarPicker
                    mode="single"
                    selected={parseISODate(date)}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate ? toISODate(selectedDate) : "");
                      setStep2Errors((x) => x.filter((v) => v !== "date"));
                      setDatePopoverOpen(false);
                    }}
                    disabled={{ before: new Date() }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {isSameDay && (
                <p className="mt-3 flex items-start gap-2 rounded-xl bg-accent/25 p-3 text-xs font-medium text-accent-foreground">
                  <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                  Heads up: same-day bookings are not eligible for the 10% first-time
                  discount. Pick tomorrow or later to keep it.
                </p>
              )}

              <h3 className="mt-8 font-display text-lg font-bold">Session length</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {shortAllowed
                  ? "2 and 3 hour sessions are unlocked with more than one cleaner."
                  : "Single-cleaner sessions start at 4 hours. Add another cleaner to unlock 2 and 3 hour sessions."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {DURATIONS.map((h) => {
                  const disabled = h < 4 && !shortAllowed;
                  return (
                    <button
                      key={h}
                      type="button"
                      disabled={disabled}
                      onClick={() => setDuration(h)}
                      className={cn(
                        "rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
                        duration === h
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-card hover:bg-secondary",
                        disabled && "cursor-not-allowed opacity-40 hover:bg-card",
                      )}
                    >
                      {h} hours
                    </button>
                  );
                })}
              </div>

              <h3 ref={timeHeadingRef} className="mt-8 flex items-center gap-2 font-display text-lg font-bold">
                <Clock className="size-5 text-primary" /> Start time
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                1-hour blocks. Sessions must finish by {formatHour(LAST_END)}, so the latest
                start for a {duration}-hour session is {formatHour(lastStart)}.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {HOUR_BLOCKS.map((h) => {
                  const disabled = h > lastStart || h < minStartToday;
                  const selected = startHour === h;
                  const inSession =
                    startHour !== null && h > startHour && h < startHour + duration;
                  return (
                    <button
                      key={h}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setStartHour(h);
                        setStep2Errors((x) => x.filter((v) => v !== "time"));
                      }}
                      className={cn(
                        "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : inSession
                            ? "border-primary bg-primary/15 text-primary"
                            : "border-input bg-card hover:bg-secondary",
                        disabled &&
                          !inSession &&
                          "cursor-not-allowed opacity-40 hover:bg-card",
                      )}
                    >
                      {formatHour(h)}
                    </button>
                  );
                })}
              </div>
              {step2Errors.includes("time") && (
                <p className="mt-3 text-sm font-medium text-destructive">
                  Please choose a start time.
                </p>
              )}
              {startHour !== null && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {cleaners} cleaner{cleaners > 1 ? "s" : ""} on site{" "}
                  {formatHour(startHour)}–{formatHour(startHour + duration)}.
                </p>
              )}
            </div>




            <div className="rounded-3xl border border-border bg-secondary/40 p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-xl font-bold">Your rate</h2>
              {!ready ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Select a date and a start time and we&apos;ll calculate your rate here.
                </p>
              ) : (
                <>
                  <dl className="mt-5 space-y-2.5 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="min-w-0 text-muted-foreground">
                        Base rate {rm(BUSINESS.baseRate)}/hour × {duration} hours ×{" "}
                        {cleaners} cleaner{cleaners > 1 ? "s" : ""}
                      </dt>
                      <dd className="shrink-0 whitespace-nowrap font-semibold">
                        {rm(quote.subtotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="min-w-0 text-muted-foreground">
                        First-session discount ({quote.firstTimePct}%)
                        {isSameDay ? " - not eligible on same-day bookings" : ""}
                      </dt>
                      <dd className="shrink-0 whitespace-nowrap font-semibold text-primary">
                        −{rm(quote.firstTimeOff)}
                      </dd>
                    </div>

                  </dl>
                  <div className="mt-5 flex flex-col items-start gap-2 border-t border-border pt-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Final rate
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {date} · {startHour !== null ? formatHour(startHour) : ""} ·{" "}
                        {duration}h · {cleaners} cleaner{cleaners > 1 ? "s" : ""}
                      </p>
                    </div>
                    <p className="whitespace-nowrap font-display text-3xl font-bold">
                      {rm(quote.total)}
                    </p>
                  </div>
                </>
              )}

              <div className="mt-6">
                <Button
                  size="lg"
                  className="h-12 w-full px-8 text-base sm:w-auto"
                  onClick={confirmBooking}
                >
                  Confirm booking
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
