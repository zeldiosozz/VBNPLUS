"use client"
import { useEffect, useRef, useState, type FormEvent } from "react";

import SiteWavesBackground from "../components/SiteWavesBackground";
import {handleClickConfetti} from "@/components/icons/animated/confetti_effect"

import type { Dictionary, Locale } from "../lib/dictionaries";

let colorPlatte = [0x5c5c5c, 0x825f40, 0x967100]
function CheckIcon() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[#0d554e]" aria-hidden="true">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
        <path d="m3 8 3.1 3.1L13 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Three pricing options shown in the supplied design. */
export default function PricingSection({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const copy = dictionary.pricing;
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | "consultation" | null>(null);
  const [bookingStatus, setBookingStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selectedPlan = typeof selectedPlanIndex === "number" ? copy.plans[selectedPlanIndex] : null;

  useEffect(() => {
    const openConsultation = () => {
      setBookingStatus("");
      setSelectedPlanIndex("consultation");
    };
    window.addEventListener("vbn-open-consultation", openConsultation);
    return () => window.removeEventListener("vbn-open-consultation", openConsultation);
  }, []);

  useEffect(() => {
    if (selectedPlanIndex === null) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("input")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPlanIndex(null);
        setBookingStatus("");
      }

      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>('button, input, textarea, [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
      else triggerRef.current?.focus();
    };
  }, [selectedPlanIndex]);

  const closeBooking = () => {
    setSelectedPlanIndex(null);
    setBookingStatus("");
  };

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedPlanIndex === null) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setBookingStatus("");

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageType: selectedPlanIndex === "consultation" ? "consultation" : ["silver", "bronze", "gold"][selectedPlanIndex],
          locale,
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phoneNumber: formData.get("phoneNumber"),
          businessType: formData.get("businessType"),
          address: formData.get("address"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const result = await response.json() as { notification?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "Demo request submission failed.");

      setBookingStatus(result.notification === "failed" ? copy.bookingEmailFailed : copy.bookingSuccess);
      form.reset();
    } catch {
      setBookingStatus(copy.bookingError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <section
      aria-labelledby="pricing-title"
      className="relative bg-transparent px-5 py-12 text-white sm:px-8 sm:py-[68px]"
    >

      <div className="relative mx-auto max-w-[1154px]">
        <span className="inline-flex rounded-full border border-white/20 bg-white/[0.025] px-3 py-[6px] text-[14px] font-medium leading-5">
          {copy.badge}
        </span>
        <h2 id="pricing-title" className="mt-6 text-[clamp(2.25rem,3.55vw,3.25rem)] font-bold leading-[1.14] tracking-[-0.035em]">
          {copy.title} <span className="gold-highlight">{copy.highlight}</span>
        </h2>
        <p className="mt-5 text-[15px] leading-6 text-white/95 sm:text-[16px]">{copy.description}</p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

          {copy.plans.map((plan, planIndex) => (
            <article
              key={plan.name}
              className={`relative isolate  flex min-h-[550px] flex-col overflow-hidden rounded-[16px] border border-white/[0.12] p-5 sm:min-h-[558px] ${planIndex === 1 ? "bg-[#181818]" : "bg-[#111111]"}`}
            >
{/* <div
  data-aifx="liquid-metal"
  data-aifx-colors="#ffeb09,#ffbf00,#ffbf00"
  className="absolute inset-0 -z-10 pointer-events-none "
  aria-hidden="true"
/>
<Script src="https://cdn.aidesigner.ai/effects/runtime/v1.js" strategy="afterInteractive" /> */}
<div
  className="absolute inset-0 -z-10 pointer-events-none backdrop-blur-md"
  aria-hidden="true"
>
          <SiteWavesBackground color={colorPlatte[planIndex]} />
  
  </div>

 
              <h3 className="text-[18px] font-semibold leading-6 backdrop-blur-md bg-black/20 w-fit px-4 py-2 rounded-xl">{plan.name}</h3>
              <div className="mt-5 flex items-baseline gap-2 backdrop-blur-md bg-black/20 w-fit px-4 py-2 rounded-xl">
        
  

                <bdi dir="ltr" className="text-[42px] font-light leading-none tracking-[-0.035em]">{plan.price}</bdi>
                {plan.cadence && <span dir="auto" className="text-[14px] text-white/45">{plan.cadence}</span>}
              </div>
             
              {/* <p className="mt-2 text-[15px] leading-6 text-white/70">{plan.billing}</p> */}
              <div className="mt-4 h-px bg-white/[0.12]" />
              <p className="mt-4 text-[15px] leading-6">{copy.included}</p>
              <ul className="mt-4 flex flex-col gap-[17px] backdrop-blur-md bg-black/20 px-4 py-3 rounded-xl">
                {plan.features.map((feature) => {
                  return (
                    <li key={feature} className="flex items-center gap-3 text-[15px] leading-5">
                      <CheckIcon />
                      <span>{feature}</span>
                      {/* <span className={unavailable ? "line-through decoration-white/80" : ""}>{feature}</span> */}
                    </li>
                  );
                })}
              </ul>
              
              <p className="mt-auto mb-3 text-center text-[14px] font-semibold text-white/75 underline decoration-white/30 underline-offset-4 transition hover:text-white ">{copy.details}</p>
              {/* <a href={`/${locale}/pricing/${["starter", "enterprise", "project-based"][planIndex]}`} className="mt-auto mb-3 text-center text-[14px] font-semibold text-white/75 underline decoration-white/30 underline-offset-4 transition hover:text-white ">{copy.details}</a> */}
              <button type="button" className="theme-component pricing-cta mt-auto mb-3 block w-full rounded-[8px] px-4 py-[13px] text-center text-[15px] font-medium leading-5 backdrop-blur-md bg-black/50"
                onClick={(event) => {
                  handleClickConfetti(event);
                  triggerRef.current = event.currentTarget;
                  setBookingStatus("");
                  setSelectedPlanIndex(planIndex);
                }}
              >
                {copy.demo}
              </button>
               {/* </div> */}
            </article>
          ))}
        </div>
      </div>
    </section>
    {selectedPlanIndex !== null && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeBooking();
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
          aria-describedby="booking-description"
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="max-h-[90dvh] w-full max-w-[560px] overflow-y-auto rounded-2xl border border-white/15 bg-[#111] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,.7)] sm:p-8"
        >
          <div className="flex items-start justify-between gap-5">
            <div>
              <h2 id="booking-title" className="text-2xl font-bold">{selectedPlanIndex === "consultation" ? copy.consultationBookingTitle : copy.bookingTitle}</h2>
              <p id="booking-description" className="mt-2 text-sm leading-6 text-white/65">{selectedPlanIndex === "consultation" ? copy.consultationDescription : copy.bookingDescription}</p>
            </div>
            <button type="button" onClick={closeBooking} className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-xl text-white/70 transition hover:bg-white/10 hover:text-white" aria-label={copy.cancelBooking}>
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-[#e8bd45]/40 bg-[#e8bd45]/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#f3d77c]">{copy.selectedPackage}</p>
            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{selectedPlan?.name ?? copy.consultationPackage}</h3>
              {selectedPlan && <p className="text-lg"><bdi dir="ltr">{selectedPlan.price}</bdi>{selectedPlan.cadence && <span className="ms-1 text-sm text-white/60">{selectedPlan.cadence}</span>}</p>}
            </div>
            {selectedPlan ? (
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/75">
                {selectedPlan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            ) : <p className="mt-2 text-sm leading-6 text-white/75">{copy.consultationDescription}</p>}
          </div>

          <form className="mt-6 grid gap-4" onSubmit={submitBooking}>
            <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
              <label>
                Leave this field blank
                <input tabIndex={-1} autoComplete="off" name="website" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium">
              {copy.firstNameLabel}
              <input autoComplete="given-name" name="firstName" required className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 outline-none transition placeholder:text-white/40 focus:border-[#e8bd45] focus:ring-2 focus:ring-[#e8bd45]/25" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {copy.lastNameLabel}
              <input autoComplete="family-name" name="lastName" required className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 outline-none transition placeholder:text-white/40 focus:border-[#e8bd45] focus:ring-2 focus:ring-[#e8bd45]/25" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {copy.emailLabel}
              <input dir="ltr" type="email" autoComplete="email" name="email" required className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-left outline-none transition placeholder:text-white/40 focus:border-[#e8bd45] focus:ring-2 focus:ring-[#e8bd45]/25" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {copy.phoneLabel}
              <input dir="ltr" type="tel" autoComplete="tel" name="phoneNumber" required className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-left outline-none transition placeholder:text-white/40 focus:border-[#e8bd45] focus:ring-2 focus:ring-[#e8bd45]/25" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {copy.businessTypeLabel}
              <input name="businessType" required className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 outline-none transition placeholder:text-white/40 focus:border-[#e8bd45] focus:ring-2 focus:ring-[#e8bd45]/25" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {copy.addressLabel}
              <input autoComplete="street-address" name="address" required className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 outline-none transition placeholder:text-white/40 focus:border-[#e8bd45] focus:ring-2 focus:ring-[#e8bd45]/25" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {copy.messageLabel}
              <textarea name="message" rows={3} className="resize-y rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 outline-none transition placeholder:text-white/40 focus:border-[#e8bd45] focus:ring-2 focus:ring-[#e8bd45]/25" />
            </label>
            <p className="text-xs leading-5 text-white/55">{selectedPlanIndex === "consultation" ? copy.consultationSubmissionNotice : copy.submissionNotice}</p>
            {bookingStatus && <p role="status" className="text-sm leading-6 text-[#f3d77c]">{bookingStatus}</p>}
            <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeBooking} className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10">{copy.cancelBooking}</button>
              <button type="submit" disabled={isSubmitting} className="rounded-lg bg-[#e8bd45] px-5 py-3 text-sm font-semibold text-[#17120a] transition hover:bg-[#f3d77c] disabled:cursor-wait disabled:opacity-60">{isSubmitting ? copy.submittingBooking : copy.submitBooking}</button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
}
