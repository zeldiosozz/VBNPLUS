import React from "react";
import AnimatedMetric from "./AnimatedMetric";
import type { Dictionary } from "../lib/dictionaries";

const metricValues = ["30+", "15M+", "600+"];

/** About / proof section based on the supplied VBN+ design reference. */
export default function WhoWeAreSection({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.who;
  return (
    <section
      aria-labelledby="who-we-are-title"
      className="relative isolate overflow-hidden bg-transparent px-5 pb-14 pt-8 text-white sm:px-8 sm:pb-16 sm:pt-10"
    >
      <div className="relative mx-auto max-w-[1140px]">
        <span className="inline-flex rounded-full border border-white/20 bg-white/[0.025] px-3 py-[6px] text-[14px] font-medium leading-5 text-white">
          {copy.badge}
        </span>

        <h2 id="who-we-are-title" className="mt-7 text-[clamp(2.25rem,3.55vw,3.25rem)] font-bold leading-[1.13] tracking-[-0.035em]">
          <span className="block">{copy.title}</span>
          <span className="gold-highlight block">
            {copy.highlight}
          </span>
        </h2>
        <p className="mt-5 max-w-[680px] text-[16px] leading-[1.75] text-white/70 sm:text-[18px]">{copy.summary}</p>

        <div className="mt-10 rounded-[16px] border border-white/[0.12] bg-white/[0.035] p-3 sm:mt-11 sm:p-4">
          <div className="group relative aspect-[1.96/1] overflow-hidden rounded-[8px] bg-[#181725]">
            <video
              aria-label={copy.videoLabel}
              className="absolute inset-0 h-full w-full object-cover object-center"
              controls
              playsInline
              preload="metadata"
              poster={copy.videoPoster}
            >
              <source src={copy.videoSrc} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {copy.metrics.map((label, index) => (
            <div
              key={label}
              className="flex min-h-[138px] flex-col items-center justify-center rounded-[16px] border border-white/[0.12] backdrop-blur-md bg-white/10 px-4 py-5 text-center sm:min-h-[145px]"
            >
              <dt className="order-2 mt-4 text-[18px] font-semibold leading-6 tracking-[-0.02em] text-white/90 sm:text-[23px]">
                {label}
              </dt>
              <AnimatedMetric value={metricValues[index]} className="order-1 m-0 text-[44px] font-bold leading-none tracking-[0.015em] sm:text-[48px]" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
