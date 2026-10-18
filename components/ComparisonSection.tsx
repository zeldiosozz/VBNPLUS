import React from "react";
import type { Dictionary } from "../lib/dictionaries";
import Image from "next/image";
function BrandMark() {
  return <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-[10px] border border-white/20 bg-white/[0.08] text-[12px] font-bold tracking-[-.08em]">V+</span>;
}

function ComparisonList({ items, positive }: { items: readonly string[]; positive: boolean }) {
  return (
    <ul className="flex h-full flex-col justify-center gap-5 rounded-[20px] border border-white/[0.12] bg-[#111111] px-7 py-7 sm:gap-[22px] sm:px-10 sm:py-8">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 text-[15px] leading-6 sm:text-[16px] ${positive ? "text-white" : "text-white/60"}`}>
          <span aria-hidden="true" className={`mt-[1px] inline-flex h-5 w-5 shrink-0 items-center justify-center text-[21px] font-light leading-none ${positive ? "text-[#eaff00]" : "text-white/60"}`}>
            {positive ? "✓" : "×"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Side-by-side comparison of a typical agency and VBN+. */
export default function ComparisonSection({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.comparison;
  return (
    <section
      aria-labelledby="comparison-title"
      className="relative isolate overflow-hidden bg-transparent px-5 py-8 text-white sm:px-8 sm:py-9"
    >
      <div className="relative mx-auto max-w-[1140px]">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-white/20 bg-white/[0.025] px-3 py-[6px] text-[14px] font-medium leading-5">
            {copy.badge}
          </span>
          <h2 id="comparison-title" className="mx-auto mt-7 max-w-[720px] text-[clamp(2.35rem,3.7vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.035em]">
            <span className="block">{copy.title}</span>
            <span className="gold-highlight block">{copy.highlight}</span>
          </h2>
          <p className="mt-6 text-[15px] leading-6 text-white/95 sm:text-[16px]">
            {copy.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col">
            <h3 className="mt-5 text-center text-[26px] font-semibold leading-9 tracking-[-0.025em] sm:mb-8 mb-8 sm:text-[32px]">
              {copy.agencies}
            </h3>
            <ComparisonList items={copy.drawbacks} positive={false} />
          </div>
          <div className="flex flex-col">
            <h3 className="mb-7 flex items-center justify-center gap-3 text-[26px] font-normal leading-9 tracking-[-0.025em] sm:mb-8 sm:text-[32px]">
              {/* <BrandMark />
              <span>{copy.brand}</span> */}
                        <Image src="/images/vbn-logo.png" alt="VBN+" width={240} height={80} className="navbar-logo h-auto w-[122px]" />
              
            </h3>
            <ComparisonList items={copy.benefits} positive />
          </div>
        </div>
      </div>
    </section>
  );
}
