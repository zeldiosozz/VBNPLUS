import React from "react";
import Image from "next/image";
import LanguageSwitcher from "../components/LanguageSwitcher";
import HeroMobileMenu from "../components/HeroMobileMenu";
import HeroDesktopNavigation from "../components/HeroDesktopNavigation";
import type { Dictionary, Locale } from "../lib/dictionaries";

const partners = [
  { name: "BLUEDIAMOND", mark: "diamond" },
  { name: "beehouse", mark: "stack" },
  { name: "CLEANENERGY", mark: "plant" },
  { name: "chekpeople", mark: "check" },
  { name: "BLUEMOUNT", mark: "mountain" },
  { name: "blueenergy", mark: "gear" },
];

function PartnerMark({ type }: { type: string }) {
  const common = "h-8 w-8 shrink-0 text-current";

  if (type === "diamond") {
    return (
      <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M7 5h18l5 8-14 15L2 13l5-8Z" fill="currentColor" />
        <path d="m7 5 4 8 5 15 5-15 4-8M2 13h28" stroke="#11111c" strokeOpacity=".42" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === "stack") {
    return (
      <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="m16 2 13 7-13 7L3 9 16 2Z" fill="currentColor" />
        <path d="m3 14 13 7 13-7M3 20l13 7 13-7" stroke="currentColor" strokeWidth="5" />
        <path d="M16 2v14m0 5v6" stroke="#11111c" strokeOpacity=".4" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === "plant") {
    return (
      <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M13 3h6v10h-6zM7 8h6v5H7zm12 0h6v5h-6z" fill="currentColor" />
        <path d="M16 13v8m0-4c-7 0-10 2-10 6v5h20v-5c0-4-3-6-10-6Z" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }
  if (type === "check") {
    return (
      <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="10" cy="8" r="6" fill="currentColor" />
        <path d="m5 19 6 6 15-12" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
      </svg>
    );
  }
  if (type === "mountain") {
    return (
      <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="currentColor" />
        <path d="M3 23 12 9l3 5 3-4 11 15H3Z" fill="#11111c" fillOpacity=".65" />
        <path d="m4 22 6-4 4 2 5-6 9 9" stroke="#11111c" strokeOpacity=".5" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="m13 2 6 0 1 4 3 2 4-1 3 5-3 3v4l3 3-3 5-4-1-3 2-1 4h-6l-1-4-3-2-4 1-3-5 3-3v-4l-3-3 3-5 4 1 3-2 1-4Z" fill="currentColor" />
      <circle cx="16" cy="16" r="5" fill="#11111c" fillOpacity=".65" />
    </svg>
  );
}

/** A responsive, self-contained recreation of the VBN+ landing-page hero. */
export default function HeroSection({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const copy = dictionary.hero;
  return (
    <section
      className="relative isolate flex min-h-[780px] flex-col overflow-hidden bg-transparent text-white sm:min-h-[820px]"
      aria-labelledby="hero-title"
    >
      <header className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center px-6 pt-7 sm:px-10 lg:grid-cols-[1fr_auto_1fr] lg:px-0">
        <a href="#home" className="flex w-fit items-center gap-3 lg:col-start-1 lg:row-start-1" aria-label="VBN+ home">
          <Image src="/images/vbn-logo.png" alt="VBN+" width={240} height={80} className="navbar-logo h-auto w-[120px]" />
        </a>

        <HeroDesktopNavigation
          navLabel={copy.navLabel}
          links={[
            { href: "#home", label: copy.home },
            { href: "#process", label: copy.process },
            { href: "#case-study", label: copy.caseStudies },
            { href: "#pricing", label: copy.pricing },
          ]}
          servicesLabel={copy.services}
        />

        <div className="col-start-2 row-start-1 flex items-center justify-self-end gap-2 lg:col-start-3">
          <HeroMobileMenu
            navLabel={copy.navLabel}
            menuLabel={locale === "ar" ? "فتح القائمة" : "Open menu"}
            closeLabel={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
            demoLabel={copy.bookDemo}
            items={[
              { href: "#home", label: copy.home },
              { href: "#process", label: copy.process },
              { href: "#services", label: copy.services },
              { href: "#case-study", label: copy.caseStudies },
              { href: "#pricing", label: copy.pricing },
            ]}
          />
          <LanguageSwitcher locale={locale} label={copy.languageLabel} />
          <a
            href="#demo"
            className="hidden rounded-[2px] p-[1px] border-white border-[1px] lg:block"
          >
            <span className="block rounded-[2px] bg-[#111111] px-4 py-[13px] text-[14px] sm:px-5 sm:text-[16px]">{copy.bookDemo}</span>
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full flex-1 flex-col items-center px-5 pt-20 text-center sm:pt-28 lg:pt-[116px]">
        <h1 id="hero-title" className="max-w-[1000px] text-[clamp(2.65rem,5.1vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.035em]">
          <span className="block"> 
            {copy.titleLead}
            <span className="gold-highlight">
              {copy.titleHighlight}
          </span>
          </span>
          <span className="block">{copy.titleEnd}</span>
        </h1>

        <p className="mt-5 max-w-[620px] text-[18px] leading-[1.4] text-white/95 sm:text-[24px]">
          {copy.description}
        </p>

        <div className="mt-20 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a href="#consultation" className="theme-component theme-button rounded-[9px] px-5 py-[15px] text-[14px] font-semibold sm:text-[16px]">
            {copy.consultation}
          </a>
          {/* <a href="#demo" className="rounded-[9px] p-[1px] [background:#ffffff]">
            <span className="block rounded-[8px] bg-[#181818] px-5 py-[14px] text-[14px] sm:text-[16px]">{copy.bookDemo}</span>
          </a> */}
        </div>

        <div className="mt-auto w-full pt-20 sm:pt-24">
          <p className="mb-10 text-[14px] font-semibold tracking-[-.01em] text-white/80 sm:mb-12 sm:text-[16px]">
            {copy.trusted}
          </p>
<div 
  role="group" 
  dir="ltr" 
  className="relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen overflow-hidden" 
  aria-label={copy.partnersLabel}
>            <div className="marquee-track flex w-max h-[70px] text-white/45 backdrop-blur-md bg-white/10">
              {[0, 1, 2, 3].map((group) => (
                <div key={group} aria-hidden={group > 0} className="flex shrink-0 items-center gap-10 pe-10 sm:gap-12 sm:pe-12">
                  {partners.map((partner) => (
                    <div key={`${group}-${partner.name}`} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                      <PartnerMark type={partner.mark} />
                      <span className={`${partner.name === "beehouse" ? "text-[24px] font-semibold" : "text-[18px] font-medium"} tracking-[-.03em]`}>{partner.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
