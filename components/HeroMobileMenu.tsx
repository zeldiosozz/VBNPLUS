"use client";

import { useState } from "react";

type MenuItem = { href: string; label: string };

export default function HeroMobileMenu({
  items,
  navLabel,
  menuLabel,
  closeLabel,
  demoLabel,
}: {
  items: MenuItem[];
  navLabel: string;
  menuLabel: string;
  closeLabel: string;
  demoLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-label={open ? closeLabel : menuLabel}
        aria-expanded={open}
        aria-controls="mobile-primary-nav"
        onClick={() => setOpen((current) => !current)}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <nav
          id="mobile-primary-nav"
          aria-label={navLabel}
          className="absolute right-0 top-[calc(100%_+_0.75rem)] z-50 w-[calc(100vw_-_3rem)] rounded-2xl border border-white/15 bg-[#11101e]/95 p-2 shadow-[0_16px_48px_rgba(0,0,0,.35)] backdrop-blur-xl sm:w-[420px]"
        >
          <ul className="grid gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-xl px-4 text-start text-[15px] font-medium text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#demo"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-xl p-[1px] [background:linear-gradient(110deg,#ffe52d,#ff432e)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="flex min-h-11 items-center justify-center rounded-xl bg-[#080614] px-4 text-[14px] font-semibold text-white">
              {demoLabel}
            </span>
          </a>
        </nav>
      )}
    </div>
  );
}
