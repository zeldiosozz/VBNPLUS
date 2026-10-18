import { notFound } from "next/navigation";
import { dictionaries, type Locale } from "../../lib/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return dictionaries[locale].metadata;
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      {children}
    </div>
  );
}

function isLocale(value: string): value is Locale {
  return value in dictionaries;
}
