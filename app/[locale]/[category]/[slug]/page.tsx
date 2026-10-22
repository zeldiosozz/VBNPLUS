import { notFound } from "next/navigation";
import { dictionaries, type Locale } from "../../../../lib/dictionaries";

type Detail = { title: string; intro: string; focus: string[]; result: string };
const en: Record<string, Record<string, Detail>> = {
  pricing: {
    starter: { title: "Starter plan", intro: "A focused starting point for teams that need a clear direction before making a larger media commitment. We align on your goal, review the current setup, and identify the next best move.", focus: ["Initial account and funnel review", "Priority recommendations", "A practical first campaign roadmap"], result: "A clear foundation for deciding what to test next." },
    enterprise: { title: "Enterprise plan", intro: "For teams managing multiple audiences, products, or markets. We provide a coordinated strategy and ongoing optimization with communication that keeps stakeholders aligned.", focus: ["Multi-channel campaign management", "Ongoing creative and audience testing", "Regular performance reviews and planning"], result: "A consistent operating rhythm that connects campaign activity to growth goals." },
    "project-based": { title: "Project-based plan", intro: "A defined engagement for a launch, audit, or specific growth challenge. The scope is set around the outcome you need, with deliverables and milestones agreed up front.", focus: ["A tailored project scope and timeline", "Specialist support for the agreed challenge", "A final handoff with next-step recommendations"], result: "Experienced support for a high-priority initiative, with a clear finish line." },
  },
};

const ar: typeof en = {
  pricing: {
    starter: { title: "الخطة المبتدئة", intro: "بداية مركزة للفرق التي تحتاج إلى اتجاه واضح قبل الالتزام بميزانية إعلانية أكبر. نتفق على الهدف ونراجع الإعداد الحالي ونحدد أفضل خطوة تالية.", focus: ["مراجعة أولية للحساب ومسار التحويل", "توصيات مرتبة حسب الأولوية", "خارطة عملية لأول حملة"], result: "أساس واضح لتحديد الاختبار التالي." },
    enterprise: { title: "خطة المؤسسات", intro: "للجهات التي تدير جماهير أو منتجات أو أسواقًا متعددة. نقدم استراتيجية منسقة وتحسينًا مستمرًا مع تواصل يبقي أصحاب المصلحة على اطلاع.", focus: ["إدارة حملات متعددة القنوات", "اختبار مستمر للإبداع والجمهور", "مراجعات أداء وتخطيط دورية"], result: "إيقاع عمل ثابت يربط الحملات بأهداف النمو." },
    "project-based": { title: "خطة حسب المشروع", intro: "تعاون محدد لإطلاق أو تدقيق أو تحدٍّ نمو بعينه. نحدد النطاق حول النتيجة المطلوبة مع مخرجات ومراحل متفق عليها مسبقًا.", focus: ["نطاق وجدول زمني مخصصان", "دعم متخصص للتحدي المتفق عليه", "تسليم نهائي مع توصيات للخطوات التالية"], result: "دعم خبير لمبادرة مهمة بنقطة نهاية واضحة." },
  },
};

export default async function DetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale: localeParam, category, slug } = await params;
  if (!(localeParam in dictionaries)) notFound();
  const locale = localeParam as Locale;
  const data = (locale === "ar" ? ar : en)[category]?.[slug];
  if (!data) notFound();
  const isArabic = locale === "ar";
  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="relative min-h-screen overflow-hidden px-5 py-8 text-white sm:px-8 sm:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_at_top,rgba(115,68,219,.26),transparent_68%)]" />
      <header className="mx-auto flex max-w-[1140px] items-center justify-between">
        <a href={`/${locale}`} aria-label="VBN+ home" className="flex items-center gap-3 text-[24px] font-semibold tracking-tight"> <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/[0.08] text-xs font-bold">V+</span> <span>VBN<span className="text-[#ffb22d]">+</span></span></a>
        <a href={`/${locale}`} className="text-sm text-white/70 underline decoration-white/25 underline-offset-4 hover:text-white">{isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to home"}</a>
      </header>
      <article className="mx-auto max-w-[900px] pb-20 pt-24 sm:pt-36">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#ffc44c]">VBN+ · {category.replaceAll("-", " ")}</p>
        <h1 className="mt-5 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.04] tracking-[-.05em]">{data.title}</h1>
        <p className="mt-8 max-w-[760px] text-lg leading-[1.8] text-white/70 sm:text-xl">{data.intro}</p>
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {data.focus.map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"><span className="text-sm font-semibold text-[#ffb22d]">0{index + 1}</span><p className="mt-5 text-base leading-7 text-white/85">{item}</p></div>)}
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#12111f] p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.18em] text-white/45">{isArabic ? "النتيجة" : "The outcome"}</p><p className="mt-4 text-xl font-medium leading-8 sm:text-2xl">{data.result}</p></div>
        <a href={`/${locale}#consultation`} className="mt-9 inline-flex rounded-lg bg-gradient-to-r from-[#ffe62e] via-[#ff8b2d] to-[#ff2936] px-6 py-4 text-sm font-semibold">{isArabic ? "احصل على استشارة مجانية" : "Talk with VBN+"}</a>
      </article>
    </main>
  );
}
