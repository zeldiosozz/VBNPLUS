import { notFound } from "next/navigation";
import CaseStudiesSection from "../../components/CaseStudiesSection";
import ComparisonSection from "../../components/ComparisonSection";
import FAQSection from "../../components/FAQSection";
import FinalCtaFooter from "../../components/FinalCtaFooter";
import HeroSection from "../../components/HeroSection";
import PricingSection from "../../components/PricingSection";
import ProcessSection from "../../components/ProcessSection";
import ServicesSection from "../../components/ServicesSection";
import TestimonialSection from "../../components/TestimonialSection";
import WhoWeAreSection from "../../components/WhoWeAreSection";
import { dictionaries, type Locale } from "../../lib/dictionaries";

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dictionary = dictionaries[locale];
  return (
    <>
      <main>
        <div id="home"><HeroSection dictionary={dictionary} locale={locale} /></div>
        <div id="who-we-are"><WhoWeAreSection dictionary={dictionary} /></div>
        <div id="process"><ProcessSection dictionary={dictionary} /></div>
        <div id="services"><ServicesSection dictionary={dictionary} /></div>
        <div id="case-study"><CaseStudiesSection dictionary={dictionary} locale={locale} /></div>
        <div id="comparison"><ComparisonSection dictionary={dictionary} /></div>
        <div id="testimonial"><TestimonialSection dictionary={dictionary} locale={locale} /></div>
        <div id="pricing"><PricingSection dictionary={dictionary} locale={locale} /></div>
        <div id="faq"><FAQSection dictionary={dictionary} /></div>
        <div id="consultation"><FinalCtaFooter dictionary={dictionary} locale={locale} /></div>
      </main>
    </>
  );
}

function isLocale(value: string): value is Locale {
  return value in dictionaries;
}
