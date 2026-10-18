"use client";

import type { Locale } from "../lib/dictionaries";
import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const router = useRouter();
  const nextLocale = locale === "en" ? "ar" : "en";

  const preserveCurrentPage = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const currentPath = window.location.pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${nextLocale}`);
    router.push(`${currentPath}${window.location.search}`, { scroll: false });
  };

  return (
    <a
      href={`/${nextLocale}`}
      aria-label={label}
      onClick={preserveCurrentPage}
      className="whitespace-nowrap rounded-full border border-white/15 px-3 py-1.5 text-[12px] font-semibold transition-colors hover:bg-white/10 sm:text-[13px]"
    >
      {nextLocale === "ar" ? "العربية" : "English"}
    </a>
  );
}
