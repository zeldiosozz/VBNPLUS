"use client";

import React, { useRef } from "react";
import Image from "next/image";
import type { Dictionary, Locale } from "../lib/dictionaries";

const caseImages = [
  "/images/post_1.jpg",
  "/images/post_2.jpg",
  "/images/post_3.jpg",
  "/images/post_4.jpg",
  "/images/post_5.jpg",
  "/images/post_6.jpg",
  "/images/post_7.jpg",
  // "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85",
  // "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85",
  // "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85",
  // "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
  // "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85",
];
const caseSlugs = ["identity-refresh", "product-launch", "outdoor-reach", "lower-acquisition-cost", "retention-growth"];

function ArrowButton({ direction, onClick, label, locale }: { direction: "previous" | "next"; onClick: () => void; label: string; locale: Locale }) {
  const pointsLeft = direction === "previous";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.04] text-white transition hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${locale === "ar" ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
        <path
          d={pointsLeft ? "m14.5 5-7 7 7 7" : "m9.5 5 7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/** Horizontally browsable case studies in normal document flow. */
export default function CaseStudiesSection({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const copy = dictionary.cases;

  const scrollCards = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const rtlMultiplier = locale === "ar" ? -1 : 1;
    track.scrollBy({ left: direction * rtlMultiplier * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="case-studies-title"
      className="relative overflow-hidden px-5 py-14 text-white sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-[1140px]">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-white/20 bg-white/[0.025] px-3 py-[6px] text-[14px] font-medium leading-5">
            {copy.badge}
          </span>
          <h2 id="case-studies-title" className="mt-6 text-[clamp(2.25rem,3.55vw,3.25rem)] font-bold leading-[1.14] tracking-[-0.035em]">
            {copy.title} <span className="gold-highlight">{copy.highlight}</span>
          </h2>
          <p className="mt-5 text-[15px] leading-6 text-white/95 sm:text-[16px]">
            {copy.description}
          </p>
        </div>

        <div role="group" aria-label={copy.controlsLabel} className="mt-9 hidden justify-end gap-3 sm:mt-10 sm:flex">
          <ArrowButton direction="previous" label={copy.previous} locale={locale} onClick={() => scrollCards(-1)} />
          <ArrowButton direction="next" label={copy.next} locale={locale} onClick={() => scrollCards(1)} />
        </div>

        <div className="relative mt-4">
          <div
            ref={trackRef}
            className="case-studies-track flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 sm:gap-[20px]"
            aria-label={copy.listLabel}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {copy.cards.map((study, index) => (
              <a href={`/${locale}/case-studies/${caseSlugs[index]}`} key={study.title} aria-label={`${study.title} — ${copy.learnMore}`} className="group block shrink-0 rounded-[18px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <article
                  className="w-[min(82vw,560px)] snap-start overflow-hidden rounded-[18px] border border-white/[0.1] bg-[#111111] transition duration-300 group-hover:border-white/30 lg:w-[clamp(300px,29.2vw,550px)]"
                >
                  <div className="m-4 aspect-[1.04/1] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#111111]">
                    <div className="relative h-full w-full">
                      <Image src={caseImages[index]} alt={study.alt} fill sizes="(max-width: 768px) 82vw, 560px" className="case-study-image object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-[#11101e]/85" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[22px] font-bold leading-7 tracking-[-0.025em] sm:text-[30px] sm:leading-9">{study.title}</h3>
                      <time dateTime="2025-01-09" className="shrink-0 text-[12px] text-white/55 sm:text-[14px]">{copy.date}</time>
                    </div>
                    <p className="mt-2 text-[14px] leading-[1.7] text-white/55 sm:text-[15px]">{study.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-white/75">{copy.learnMore}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
