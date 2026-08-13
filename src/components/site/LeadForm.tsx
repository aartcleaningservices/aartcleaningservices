import { useState } from "react";
import { BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

type FieldKey = "name" | "email" | "phone";

export interface LeadValues {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  onComplete: (values: LeadValues) => void;
}

export function LeadForm({ onComplete }: Props) {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const setValue = (key: FieldKey, value: string) => {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<FieldKey, string>> = {};
    if (!values.name.trim()) next.name = "Please tell us your name";
    if (!values.email.trim()) next.email = "Please enter your email address";
    else if (!EMAIL_REGEX.test(values.email.trim()))
      next.email = "Enter a valid email like name@example.com";
    if (!values.phone.trim()) next.phone = "Please enter your phone number";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const clean = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    };
    try {
      sessionStorage.setItem("aart_lead", JSON.stringify(clean));
    } catch {
      /* storage unavailable - continue anyway */
    }
    onComplete(clean);
  };

  const fieldClass = (key: FieldKey) =>
    cn(
      "h-12 w-full rounded-xl border bg-card px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/25",
      errors[key]
        ? "border-destructive bg-destructive/5 ring-2 ring-destructive/25"
        : "border-input",
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
        Three things, then we&apos;ll set up your booking. Your first session is 10% off when
        you book at least one day ahead.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="lead-name" className="text-sm font-semibold">
            Name
          </label>
          <input
            id="lead-name"
            name="name"
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
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setValue("phone", e.target.value)}
            placeholder="+60 12 345 6789"
            aria-invalid={Boolean(errors.phone)}
            className={cn(fieldClass("phone"), "mt-2")}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs font-medium text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full">
        Continue to location
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We only use these details to arrange your cleaning. No spam, ever.
      </p>
    </form>
  );
}
