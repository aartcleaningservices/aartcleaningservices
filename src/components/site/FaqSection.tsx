import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    q: "How much does cleaning cost?",
    a: "Sessions start at RM 25 per hour with a 4-hour minimum. Your first session gets 10% off when you book at least one day ahead.",
  },
  {
    q: "Do I need to provide cleaning supplies?",
    a: "No. Our cleaners arrive with their own tools and standard supplies. If you prefer specific products for delicate surfaces or allergies, leave them out and tell us on our WhatsApp.",
  },
  {
    q: "Can I book a same-day cleaning?",
    a: "Yes, subject to staff availability. Do note that same-day bookings are not eligible for the 10% first-time discount - book at least one day ahead to keep it.",
  },
  {
    q: "Which areas do you cover?",
    a: "We serve Klang, Shah Alam, Subang, and Kota Kemuning. Message us with your address if you are just outside and we will confirm whether our staffs can reach you.",
  },
  {
    q: "What if I am not happy with the clean?",
    a: "Tell us within 24 hours and we will send our staffs back to redo the areas you flagged at no extra charge. Every session is supervised and photo-documented on request.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">FAQ</p>
      <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
        Questions we get every week
      </h2>
      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-left font-display text-base font-semibold">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm/6 text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
