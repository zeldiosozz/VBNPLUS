import React from "react";
import type { Dictionary, Locale } from "../lib/dictionaries";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const serviceImages = [
  "/images/facebookicon.lottie",
  "/images/Outlined TikTok icon.lottie",
  "/images/GoogleAds.lottie"
];
const serviceSlugs = ["meta-ads", "tiktok-ads", "google-ads"];

/** Image-led service cards for the VBN+ marketing page. */
export default function ServicesSection({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const copy = dictionary.services;
  return (
    <section
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-transparent px-5 py-10 text-white sm:px-8 sm:py-12"
    >
      <div className="relative mx-auto max-w-[1140px]">
        <span className="inline-flex rounded-full border border-white/20 bg-white/[0.025] px-3 py-[6px] text-[14px] font-medium leading-5">
          {copy.badge}
        </span>
        <h2 id="services-title" className="mt-6 text-[clamp(2.25rem,3.55vw,3.25rem)] font-bold leading-[1.14] tracking-[-0.035em]">
          {copy.title} <span className="gold-highlight">{copy.highlight}</span>
        </h2>
        <p className="mt-5 text-[15px] leading-6 text-white/95 sm:text-[16px]">
          {copy.description}
        </p>

        <div className="mt-9 rounded-[20px] border border-white/[0.12] bg-transparent p-3 sm:mt-10 sm:p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.cards.map((service, index) => (
              <a 
                key={service.name} 
                href={`/${locale}/services/${serviceSlugs[index]}`} 
                aria-label={`${service.name} — ${copy.learnMore}`} 
                className=" relative isolate flex min-h-[430px] flex-col justify-end overflow-hidden rounded-[16px] backdrop-blur-md bg-white/10focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-[460px] lg:min-h-[488px]"
              >
                {/* Lottie Animation as Background */}

                {/* <div className="absolute w-full h-full inset-0 pointer-events-none transition-transform duration-500 group-hover:scale-[1.03]"> */}
                <div className="flex">
                                                                   <DotLottieReact
                    src={serviceImages[index]}
                    autoplay
                    loop
                    className="h-full w-full object-cover"
                  />

                </div>
               {/* </div> */}

                {/* Dark Overlay Gradient for Text Contrast */}

                <div
                  className="absolute inset-0 z-10 bg-gradient-to-b from-black/5 via-black/25 to-black"
                  aria-hidden="true"
                />

                {/* Card Content */}
                <div className="relative z-20 px-6 pb-6 pt-12 sm:px-6 sm:pb-6">
                  <h3 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[42px]">
                    {service.name}
                  </h3>
                  <p className="mt-4 max-w-[320px] text-[15px] leading-[1.72] text-white/95 sm:text-[16px]">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-white/80">
                    {copy.learnMore}{" "}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
