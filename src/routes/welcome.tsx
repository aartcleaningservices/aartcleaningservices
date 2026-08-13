import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  BadgePercent,
  Calendar,
  CheckCircle2,
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
import { LeadForm, type LeadValues } from "@/components/site/LeadForm";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/services";
import { cn } from "@/lib/utils";

const TITLE = "Welcome - Build Your Booking | Aart Cleaning Services";
const DESCRIPTION =
  "Set your location, date, time and staff count to see your cleaning rate instantly. First-time customers get 10% off.";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/welcome" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/welcome" }],
  }),
  component: WelcomePage,
});

type AddressKey = "address" | "city" | "postcode";
type Frequency = "one-time" | "monthly" | "weekly";

const DURATIONS = [2, 3, 4, 5, 6, 7, 8];
const HOUR_BLOCKS = Array.from({ length: 12 }, (_, i) => 7 + i); // 7:00 - 18:00
const LAST_END = 18; // sessions must end by 18:00


const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;
const rm = (n: number) => `RM ${n.toFixed(2)}`;
const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function WelcomePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [lead, setLead] = useState<LeadValues | null>(null);
  const leadName = lead?.name ?? "";

  // Step 1
  const [address, setAddress] = useState<Record<AddressKey, string>>({
    address: "",
    city: "",
    postcode: "",
  });
  const [addressErrors, setAddressErrors] = useState<AddressKey[]>([]);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [coords, setCoords] = useState<string | null>(null);

  // Step 2
  const [date, setDate] = useState("");
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

  const submitStep1 = () => {
    if (coords) {
      setStep(3);
      return;
    }
    const missing = (Object.keys(address) as AddressKey[]).filter(
      (k) => address[k].trim() === "",
    );
    setAddressErrors(missing);
    if (missing.length === 0) setStep(3);
  };

  const confirmBooking = () => {
    const errs: string[] = [];
    if (!date) errs.push("date");
    if (startHour === null) errs.push("time");
    setStep2Errors(errs);
    if (errs.length > 0) return;
    navigate({ to: "/thank-you" });
  };

  const inputClass = (invalid: boolean) =>
    cn(
      "mt-2 h-12 w-full rounded-xl border bg-card px-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/25",
      invalid ? "border-destructive bg-destructive/5 ring-2 ring-destructive/25" : "border-input",
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
          Three quick steps. Your rate updates as you choose.
        </p>

        <div className="mt-8 flex items-center gap-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-1 items-center gap-3">
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
              <span className="hidden text-sm font-semibold sm:inline">
                {n === 1 ? "Your details" : n === 2 ? "Location" : "Time, dates & staff"}
              </span>
              {n < 3 && <span className="h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <section className="mt-8">
            <LeadForm
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
                  value={address.address}
                  onChange={(e) => setAddress((a) => ({ ...a, address: e.target.value }))}
                  placeholder="12-3, Jalan Kuchai Lama"
                  aria-invalid={addressErrors.includes("address")}
                  className={inputClass(addressErrors.includes("address"))}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="text-sm font-semibold">
                    City
                  </label>
                  <input
                    id="city"
                    value={address.city}
                    onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                    placeholder="Klang"
                    aria-invalid={addressErrors.includes("city")}
                    className={inputClass(addressErrors.includes("city"))}
                  />
                </div>
                <div>
                  <label htmlFor="postcode" className="text-sm font-semibold">
                    Postcode
                  </label>
                  <input
                    id="postcode"
                    inputMode="numeric"
                    value={address.postcode}
                    onChange={(e) => setAddress((a) => ({ ...a, postcode: e.target.value }))}
                    placeholder="58200"
                    aria-invalid={addressErrors.includes("postcode")}
                    className={inputClass(addressErrors.includes("postcode"))}
                  />
                </div>
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
              <input
                type="date"
                value={date}
                min={todayISO()}
                onChange={(e) => {
                  setDate(e.target.value);
                  setStep2Errors((x) => x.filter((v) => v !== "date"));
                }}
                aria-invalid={step2Errors.includes("date")}
                className={cn(inputClass(step2Errors.includes("date")), "max-w-xs")}
              />
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

              <h3 className="mt-8 flex items-center gap-2 font-display text-lg font-bold">
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
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">
                        Base rate {rm(BUSINESS.baseRate)}/hour × {duration} hours ×{" "}
                        {cleaners} cleaner{cleaners > 1 ? "s" : ""}
                      </dt>
                      <dd className="font-semibold">{rm(quote.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">
                        First-session discount ({quote.firstTimePct}%)
                        {isSameDay ? " - not eligible on same-day bookings" : ""}
                      </dt>
                      <dd className="font-semibold text-primary">
                        −{rm(quote.firstTimeOff)}
                      </dd>
                    </div>

                  </dl>
                  <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Final rate
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {date} · {startHour !== null ? formatHour(startHour) : ""} ·{" "}
                        {duration}h · {cleaners} cleaner{cleaners > 1 ? "s" : ""}
                      </p>
                    </div>
                    <p className="font-display text-3xl font-bold">{rm(quote.total)}</p>
                  </div>
                </>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                  Back to location
                </Button>
                <Button size="lg" className="flex-1" onClick={confirmBooking}>
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
