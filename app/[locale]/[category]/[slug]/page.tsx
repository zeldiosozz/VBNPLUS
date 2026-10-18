import { notFound } from "next/navigation";
import { dictionaries, type Locale } from "../../../../lib/dictionaries";

type Detail = { title: string; intro: string; focus: string[]; result: string };
const en: Record<string, Record<string, Detail>> = {
  process: {
    audit: { title: "Funnel performance audit", intro: "We map the path from first impression to sale, then find the points where intent is lost. The audit gives your team a clear, prioritized view of what to fix first.", focus: ["Review tracking, landing pages, and conversion paths", "Separate audience, offer, and creative issues", "Deliver a practical action plan with measurable priorities"], result: "A shared baseline for every campaign decision that follows." },
    launch: { title: "Targeted campaign launch", intro: "We turn your goals into a channel plan, audience structure, and creative testing roadmap. Campaigns launch with clean measurement and a clear learning agenda.", focus: ["Match channels and audiences to buyer intent", "Build campaign structure, messaging, and creative tests", "Validate tracking before spend scales"], result: "A focused launch designed to produce useful learning from day one." },
    optimize: { title: "Profit-driven optimization", intro: "Once data starts coming in, we make deliberate changes to improve the economics of growth. We protect what works while testing the next opportunity.", focus: ["Monitor lead quality and downstream revenue", "Refresh creative before fatigue erodes results", "Reallocate budget against clear performance signals"], result: "More confident growth decisions with a focus on sustainable return." },
  },
  services: {
    "meta-ads": { title: "Meta advertising", intro: "Reach new customers and reconnect with existing audiences across Facebook and Instagram. We pair audience strategy with creative testing and clear conversion measurement.", focus: ["Prospecting and retargeting campaign design", "Creative concepts tailored to placements", "Lead, purchase, and pipeline quality reporting"], result: "An adaptable Meta program built around your business outcomes." },
    "tiktok-ads": { title: "TikTok advertising", intro: "Earn attention with short-form creative that feels native to the platform and gives people a reason to act. We build a repeatable testing loop instead of relying on one viral hit.", focus: ["Creator-style concepts and hooks", "Audience and offer testing", "Fast creative iteration guided by performance"], result: "A steady stream of learnings to improve reach and conversion." },
    "google-ads": { title: "Google advertising", intro: "Meet customers when they are actively searching, comparing, or ready to buy. We structure campaigns around intent and keep search terms, landing pages, and outcomes aligned.", focus: ["Search and Performance Max strategy", "Keyword, query, and negative keyword management", "Conversion tracking tied to qualified outcomes"], result: "Efficient demand capture with visibility into what drives value." },
  },
  "case-studies": {
    "identity-refresh": { title: "Brand identity refresh", intro: "A digital-first refresh created a more consistent story across paid campaigns and product pages. The team paired the new visual system with message testing to learn what moved customers.", focus: ["Unified campaign visuals across placements", "Tested product benefits against customer motivations", "Connected creative learnings to the landing experience"], result: "A more recognizable campaign system and a clearer path from ad to product." },
    "product-launch": { title: "Product launch campaign", intro: "A focused launch introduced a new generation of creative tools to audiences most likely to value the upgrade. Education and proof points were staged across the customer journey.", focus: ["Built launch audiences around product fit", "Sequenced awareness, consideration, and conversion messages", "Shifted investment toward high-intent segments"], result: "A launch plan designed to turn product interest into qualified demand." },
    "outdoor-reach": { title: "Outdoor campaign reach", intro: "A coordinated campaign extended a digital-first message into high-visibility city placements. Digital follow-up helped the team understand how broad awareness supported action.", focus: ["Selected placements around audience movement", "Aligned creative across outdoor and digital touchpoints", "Measured response with campaign-specific signals"], result: "A joined-up reach strategy with clearer insight into audience response." },
    "lower-acquisition-cost": { title: "60% lower acquisition cost", intro: "A performance reset paired sharper audience segmentation with disciplined creative testing. Budget shifted toward combinations that brought in customers at a sustainable cost.", focus: ["Rebuilt campaign structure around intent", "Tested creative angles and landing page clarity", "Used conversion quality to guide budget changes"], result: "The campaign reduced cost per acquisition by 60% while improving return." },
    "retention-growth": { title: "45% higher customer retention", intro: "A lifecycle and retargeting program gave customers more relevant reasons to return. Segments and messages reflected where each customer was in their relationship with the brand.", focus: ["Grouped audiences by behavior and recency", "Matched offers and education to customer stage", "Measured repeat purchase and retention trends"], result: "Customer retention increased by 45% through a more relevant follow-up journey." },
  },
  pricing: {
    starter: { title: "Starter plan", intro: "A focused starting point for teams that need a clear direction before making a larger media commitment. We align on your goal, review the current setup, and identify the next best move.", focus: ["Initial account and funnel review", "Priority recommendations", "A practical first campaign roadmap"], result: "A clear foundation for deciding what to test next." },
    enterprise: { title: "Enterprise plan", intro: "For teams managing multiple audiences, products, or markets. We provide a coordinated strategy and ongoing optimization with communication that keeps stakeholders aligned.", focus: ["Multi-channel campaign management", "Ongoing creative and audience testing", "Regular performance reviews and planning"], result: "A consistent operating rhythm that connects campaign activity to growth goals." },
    "project-based": { title: "Project-based plan", intro: "A defined engagement for a launch, audit, or specific growth challenge. The scope is set around the outcome you need, with deliverables and milestones agreed up front.", focus: ["A tailored project scope and timeline", "Specialist support for the agreed challenge", "A final handoff with next-step recommendations"], result: "Experienced support for a high-priority initiative, with a clear finish line." },
  },
};

const ar: typeof en = {
  process: {
    audit: { title: "تدقيق أداء مسار التحويل", intro: "نرسم رحلة العميل من أول انطباع حتى الشراء، ثم نحدد النقاط التي يتراجع عندها الاهتمام. يمنح التدقيق فريقك رؤية واضحة ومرتبة حسب الأولوية لما ينبغي تحسينه.", focus: ["مراجعة التتبع وصفحات الهبوط ومسارات التحويل", "تمييز مشكلات الجمهور والعرض والإبداع", "تقديم خطة عملية بأولويات قابلة للقياس"], result: "خط أساس مشترك يدعم كل قرار إعلاني لاحق." },
    launch: { title: "إطلاق حملات موجّهة", intro: "نحوّل أهدافك إلى خطة قنوات وتقسيم للجمهور وخارطة لاختبار الإبداع. تنطلق الحملات بقياس واضح وأهداف تعلم محددة.", focus: ["اختيار القنوات والجمهور وفق نية الشراء", "بناء هيكل الحملة والرسائل والاختبارات الإبداعية", "التحقق من القياس قبل زيادة الإنفاق"], result: "إطلاق مركز يحقق تعلمًا مفيدًا منذ اليوم الأول." },
    optimize: { title: "تحسين يركز على الربحية", intro: "مع بدء تدفق البيانات، نجري تغييرات مدروسة لتحسين اقتصاديات النمو. نحافظ على ما ينجح ونختبر الفرصة التالية.", focus: ["متابعة جودة العملاء والإيرادات اللاحقة", "تجديد المواد الإبداعية قبل تراجع فعاليتها", "توجيه الميزانية وفق مؤشرات أداء واضحة"], result: "قرارات نمو أوثق تركز على عائد مستدام." },
  },
  services: {
    "meta-ads": { title: "إعلانات Meta", intro: "نصل إلى عملاء جدد ونعيد التواصل مع الجمهور الحالي عبر Facebook وInstagram. نجمع بين استراتيجية الجمهور واختبار الإبداع وقياس التحويلات بوضوح.", focus: ["تصميم حملات الاستكشاف وإعادة الاستهداف", "أفكار إبداعية تناسب مواضع العرض", "تقارير العملاء المحتملين والمشتريات وجودة المسار"], result: "برنامج Meta مرن ومبني حول نتائج نشاطك التجاري." },
    "tiktok-ads": { title: "إعلانات TikTok", intro: "نجذب الانتباه بمحتوى قصير يناسب المنصة ويمنح الجمهور سببًا للتفاعل. نبني دورة اختبار متكررة بدل الاعتماد على انتشار عابر.", focus: ["أفكار ومقدمات بأسلوب صناع المحتوى", "اختبار الجمهور والعروض", "تطوير سريع للإبداع بناءً على الأداء"], result: "تعلم مستمر يساعد على تحسين الوصول والتحويل." },
    "google-ads": { title: "إعلانات Google", intro: "نقابل العملاء عندما يبحثون أو يقارنون أو يستعدون للشراء. نبني الحملات حول نية البحث ونربط الكلمات وصفحات الهبوط بالنتائج.", focus: ["استراتيجية البحث وPerformance Max", "إدارة الكلمات وعبارات البحث والكلمات السلبية", "تتبع التحويلات المرتبطة بالنتائج المؤهلة"], result: "التقاط فعّال للطلب مع وضوح مصادر القيمة." },
  },
  "case-studies": {
    "identity-refresh": { title: "تجديد الهوية التجارية", intro: "أنشأ التجديد الرقمي قصة أكثر اتساقًا بين الحملات المدفوعة وصفحات المنتجات. واختبر الفريق الرسائل لمعرفة ما يحفّز العملاء.", focus: ["توحيد مظهر الحملات عبر مواضع العرض", "اختبار مزايا المنتج وفق دوافع العملاء", "ربط نتائج الإبداع بتجربة صفحة الهبوط"], result: "نظام حملات أكثر تميزًا ومسار أوضح من الإعلان إلى المنتج." },
    "product-launch": { title: "حملة إطلاق منتج", intro: "قدّم إطلاق مركّز جيلًا جديدًا من الأدوات الإبداعية للجمهور الأكثر استفادة من التحديث. وتدرجت الرسائل بين التوعية والاهتمام والتحويل.", focus: ["تحديد جمهور الإطلاق بناءً على ملاءمة المنتج", "تسلسل رسائل الوعي والاهتمام والتحويل", "توجيه الاستثمار إلى الشرائح الأعلى نية"], result: "خطة إطلاق تحوّل الاهتمام بالمنتج إلى طلب مؤهل." },
    "outdoor-reach": { title: "توسيع الوصول الخارجي", intro: "وسّعت حملة منسقة رسالة رقمية عبر مواقع خارجية عالية الظهور. وساعدت المتابعة الرقمية الفريق على فهم أثر الوعي على الاستجابة.", focus: ["اختيار المواقع وفق حركة الجمهور", "توحيد الإبداع عبر القنوات الخارجية والرقمية", "قياس الاستجابة بإشارات خاصة بالحملة"], result: "استراتيجية وصول مترابطة ورؤية أوضح لاستجابة الجمهور." },
    "lower-acquisition-cost": { title: "خفض تكلفة الاكتساب ٦٠٪", intro: "جمع تطوير الأداء بين تقسيم أدق للجمهور واختبار إبداعي منضبط، ثم وُجهت الميزانية إلى التركيبات التي تجذب العملاء بتكلفة مستدامة.", focus: ["إعادة بناء الحملة حول نية الجمهور", "اختبار الرسائل ووضوح صفحات الهبوط", "توجيه الميزانية وفق جودة التحويل"], result: "انخفضت تكلفة الاكتساب ٦٠٪ مع تحسن العائد." },
    "retention-growth": { title: "زيادة الاحتفاظ بالعملاء ٤٥٪", intro: "منح برنامج دورة حياة العميل وإعادة الاستهداف العملاء أسبابًا أكثر ملاءمة للعودة، مع رسائل تناسب مرحلة علاقتهم بالعلامة التجارية.", focus: ["تقسيم الجمهور وفق السلوك وحداثة التفاعل", "مواءمة العروض والتثقيف مع مرحلة العميل", "قياس تكرار الشراء واتجاهات الاحتفاظ"], result: "ارتفع الاحتفاظ بالعملاء ٤٥٪ بفضل رحلة متابعة أكثر ملاءمة." },
  },
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
