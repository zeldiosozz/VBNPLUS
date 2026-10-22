"use client";

import React, { useState } from "react";
import Image from "next/image";
import AnimatedMetric from "./AnimatedMetric";
import type { Dictionary, Locale } from "../lib/dictionaries";

const resultValues = ["4+", "22+"];
const portraits = [

  "/images/partners/raafat.jpg",

  "/images/partners/safwat.png",
      "/images/partners/sharaf.jpg",

];

function CarouselArrow({ direction, label, onClick, isRtl }: { direction: "previous" | "next"; label: string; onClick: () => void; isRtl: boolean }) {
  const pointsLeft = direction === "previous";
  const path = pointsLeft ? "m14.5 5-7 7 7 7" : "m9.5 5 7 7-7 7";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.04] text-white transition hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
        <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/** Featured customer quote and results panel. */
export default function TestimonialSection({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const copy = dictionary.testimonial;
  const [activeIndex, setActiveIndex] = useState(0);
  const isRtl = locale === "ar";
  const review = copy.reviews[activeIndex];
  const changeReview = (step: number) => {
    setActiveIndex((current) => (current + step + copy.reviews.length) % copy.reviews.length);
  };
  const slideLabel = copy.slide.replace("{current}", String(activeIndex + 1)).replace("{total}", String(copy.reviews.length));
  return (
    <section
      aria-label={copy.label}
      className="relative isolate overflow-hidden bg-transparent px-5 py-12 text-white sm:px-8 sm:py-[68px]"
    >
      <div className="mx-auto max-w-[1140px] rounded-[17px] p-[1px]">
        <div className="flex min-h-[660px] flex-col items-center rounded-[16px] bg-[#111111]/95 px-5 py-9 text-center sm:min-h-[696px] sm:px-10 sm:py-10">
          <span className="inline-flex rounded-full border border-white/20 bg-white/[0.035] px-3 py-[6px] text-[14px] font-medium leading-5">
            {copy.label}
          </span>
          <Image
            src={portraits[activeIndex]}
            alt={review.name}
            width={80}
            height={80}
            className="mt-9 h-20 w-20 rounded-full border border-white/10 bg-white/10 object-cover"
          />
          <div className="mt-7 flex gap-[2px] text-[27px] leading-none text-[#ffc52f]" aria-label={copy.rating}>
            {Array.from({ length: 5 }, (_, index) => <span key={index} aria-hidden="true">★</span>)}
          </div>
          <blockquote aria-live="polite" className="mt-6 max-w-[900px] text-[clamp(1.8rem,3.2vw,2.85rem)] font-bold leading-[1.14] tracking-[-0.035em]">
            <p>{review.quote}</p>
          </blockquote>
          <p className="mt-5 text-[15px] font-semibold leading-6">{review.name}</p>
          <p className="mt-1 text-[13px] leading-5 text-white/55">{review.role}</p>
          <div role="group" aria-label={slideLabel} className="mt-8 flex items-center gap-4">
            <CarouselArrow direction="previous" label={copy.previous} onClick={() => changeReview(-1)} isRtl={isRtl} />
            <div className="testimonial-pagination flex items-center gap-2" aria-label={slideLabel}>
              {copy.reviews.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={copy.showReview.replace("{number}", String(index + 1))}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${index === activeIndex ? "w-6 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
            <CarouselArrow direction="next" label={copy.next} onClick={() => changeReview(1)} isRtl={isRtl} />
          </div>

          <div className="mt-auto w-full max-w-[740px] pt-12">
            <div className="h-px w-full bg-white/[0.12]" />
            <dl className="mt-10 grid grid-cols-2">
              {copy.metrics.map((label, index) => (
                <div key={label} className={`px-2 sm:px-4 ${index > 0 ? "border-s border-white/[0.12]" : ""}`}>
                  <AnimatedMetric value={resultValues[index]} className="m-0 text-[38px] font-bold leading-none tracking-[0.01em] sm:text-[48px]" />
                  <dt className="mt-6 text-[13px] font-semibold leading-5 text-white/60 sm:text-[23px] sm:leading-7">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
