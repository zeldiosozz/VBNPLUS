import React from "react";
import type { Dictionary } from "../lib/dictionaries";
import Image from "next/image";
function SocialLink({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={name}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.12] bg-white/[0.035] text-white/55 transition-colors hover:text-white"
    >
      {children}
    </a>
  );
}

/** Final conversion panel and footer from the supplied landing-page reference. */
export default function FinalCtaFooter({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.footer;
  const footerTargets = ["home", "process", "services", "case-study", "pricing"];
  return (
    <div
      className="relative isolate overflow-hidden bg-transparent text-white"
    >
      <section aria-labelledby="final-cta-title" className="px-5 pt-12 sm:px-8 sm:pt-[92px]">
        <div className="mx-auto max-w-[1140px] rounded-[17px] p-[1px] ">
          <div className="rounded-[16px] bg-[#111111] px-5 py-12 text-center sm:min-h-[402px] sm:px-12 sm:pb-14 sm:pt-[62px]">
            <h2 id="final-cta-title" className="mx-auto max-w-[900px] text-[clamp(2.2rem,3.65vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.035em]">
            {copy.cta} <span className="gold-highlight">{copy.highlight}</span>
              <span className="block">{copy.start}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-[1.7] text-white/95 sm:text-[16px]">
              {copy.description}
            </p>
            <a href="#consultation" className="theme-component theme-button mt-10 rounded-[9px] px-5 py-[15px] text-[14px] font-semibold sm:text-[16px]">
              {copy.consultation}
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto grid max-w-[1140px] grid-cols-1 gap-12 px-5 pb-12 pt-20 sm:px-8 sm:pb-[88px] sm:pt-[148px] lg:grid-cols-[1fr_415px] lg:gap-16">
        <div>
        <a href="#home" className="flex w-fit items-center gap-3 lg:col-start-1 lg:row-start-1" aria-label="VBN+ home">
          <Image src="/images/vbn-logo.png" alt="VBN+" width={240} height={80} className="navbar-logo h-auto w-[120px]" />
        </a>

          <nav aria-label={copy.navLabel} className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-medium">
                {copy.links.map((link, index) => (
                  <li key={link}>
                  <a className="transition-colors hover:text-white/70" href={`#${footerTargets[index]}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 flex gap-2">
            <SocialLink name={copy.social[0]}>
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.7" cy="6.7" r="1.1" fill="currentColor" />
              </svg>
            </SocialLink>
            <SocialLink name={copy.social[1]}><span className="text-[20px] font-bold leading-none">f</span></SocialLink>
            <SocialLink name={copy.social[2]}>
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                <path d="M21 6.1a7.2 7.2 0 0 1-2.1.6 3.6 3.6 0 0 0 1.6-2 7.1 7.1 0 0 1-2.3.9 3.6 3.6 0 0 0-6.2 3.3 10.2 10.2 0 0 1-7.4-3.8 3.6 3.6 0 0 0 1.1 4.8 3.5 3.5 0 0 1-1.6-.4v.1a3.6 3.6 0 0 0 2.9 3.5 3.7 3.7 0 0 1-1.6.1 3.6 3.6 0 0 0 3.4 2.5A7.2 7.2 0 0 1 3.5 17a10.1 10.1 0 0 0 5.5 1.6c6.6 0 10.2-5.5 10.2-10.2v-.5A7.3 7.3 0 0 0 21 6.1Z" />
              </svg>
            </SocialLink>
            <SocialLink name={copy.social[3]}>
              <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden="true">
                <path d="M5.2 8.5H2.4V21h2.8V8.5ZM3.8 3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM21.6 13.8c0-3.8-2-5.6-4.7-5.6a4.1 4.1 0 0 0-3.7 2V8.5h-2.8V21h2.8v-6.2c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V21h2.9l1.2-7.2Z" />
              </svg>
            </SocialLink>
          </div>
        </div>

        <div>
          <p className="text-[15px] leading-6">{copy.newsletter}</p>
          <div role="group" aria-label={copy.newsletterLabel} className="mt-4 flex gap-3">
            <label htmlFor="newsletter-email" className="sr-only">{copy.email}</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder={copy.email}
              dir="ltr"
              className="newsletter-email h-12 min-h-12 min-w-0 flex-1 rounded-[7px] border border-transparent px-4 text-[15px] outline-none"
            />
            <button type="button" className="theme-component theme-button h-12 shrink-0 rounded-[8px] px-5 text-[15px] font-medium">
              {copy.submit}
            </button>
          </div>
          <p className="mt-4 max-w-[415px] text-[13px] leading-[1.6] text-white/55">
            {copy.consent} <a className="underline underline-offset-2" href="#privacy-policy">{copy.privacy}</a> {copy.andUpdates}
          </p>
        </div>
      </footer>
    </div>
  );
}
