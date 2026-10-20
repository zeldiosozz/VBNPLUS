export const dictionaries = {
  en: {
    metadata: {
      title: "VBN+ | Advertising That Drives Results",
      description: "VBN+ helps businesses grow with data-driven advertising strategies and high-converting campaigns.",
    },
    switchLanguage: "العربية",
    hero: {
      navLabel: "Main navigation",
      home: "Home", process: "Process", services: "Services", caseStudies: "Case Study", pricing: "Pricing",
      logoLabel: "VBN+ home", bookDemo: "Book a Demo", consultation: "Get a Free Consultation",
      titleLead: "Powerful", titleHighlight: "Ads Campaigns", titleEnd: "That Drive Results",
      description: "VBN+ helps businesses grow with data-driven strategies and high-converting campaigns.",
      trusted: "Trusted by more than 500+ business partners worldwide",
      languageLabel: "Switch language",
      partnersLabel: "Partner companies",
    },
    who: {
      badge: "Who We Are", title: "Good marketing starts with", highlight: "a clear growth signal.", summary: "VBN+ brings strategy, creative, and performance into one focused team. We turn customer insight into campaigns you can understand, improve, and scale.",
      videoLabel: "Play VBN+ marketing introduction video",
      videoSrc: "/videos/marketing-intro-en.mp4",
      videoPoster: "/images/marketing-intro-en-poster.png",
      metrics: ["Satisfied Customers", "Views Rate", "Contacted With"],
    },
    process: {
      badge: "Our Process", title: "How We", highlight: "Build Campaigns",
      description: "We follow a proven, collaborative process to develop and execute high-impact advertising campaigns that deliver measurable results.", learnMore: "Explore this step",
      steps: [
        { title: "Funnel Performance Audit", description: "We analyze your sales funnel to identify opportunities for improvement and increased conversions." },
        { title: "Targeted Campaign Setup", description: "We create and launch targeted ad campaigns tailored to your specific business goals." },
        { title: "Profit-Driven Optimization", description: "We optimize your campaigns to reduce costs and maximize your return on investment." },
      ],
    },
    services: {
      badge: "Services", title: "Our", highlight: "Best Services", description: "Data-Driven Strategies for High-Impact Advertising", learnMore: "Explore service",
      menuTitle: "Choose the right channel for your growth", menuDescription: "Specialist campaigns across the platforms your customers use every day.", viewAll: "View all services",
      cards: [
        { name: "Meta Ads", description: "Our team has decades of combined experience creating winning Facebook & Instagram campaigns.", alt: "Person wearing a virtual reality headset" },
        { name: "TikTok Ads", description: "Our team has decades of combined experience creating winning Facebook & Instagram campaigns.", alt: "Portrait of a creator" },
        { name: "Google Ads", description: "Our team has decades of combined experience creating winning Facebook & Instagram campaigns.", alt: "Sports car viewed from above" },
      ],
    },
    cases: {
      badge: "Case Studies", title: "Recent", highlight: "Case Studies", description: "Data-Driven Strategies for High-Impact Advertising",
      previous: "Scroll to previous case studies", next: "Scroll to next case studies", listLabel: "Case studies", controlsLabel: "Case study carousel controls", learnMore: "Read case study",
      cards: [
        { title: "Brand Identity Refresh", description: "A refreshed visual direction helped the brand stand out across its digital campaigns.", alt: "A desktop monitor displaying a design concept" },
        { title: "MacBook Pro M3", description: "A focused product campaign brought a new generation of creative tools to the right audience.", alt: "Laptop product mockup" },
        { title: "Outdoor Campaign Reach", description: "We expanded customer acquisition with high-visibility outdoor placements.", alt: "Large outdoor billboard in a city" },
        { title: "60% Lower CPA", description: "A data-driven PPC strategy and optimized ad creatives doubled an e-commerce brand's return on investment in three months.", alt: "Laptop showing a web design on screen" },
        { title: "45% Higher Retention", description: "A strategic retargeting funnel increased customer retention by 45% and improved campaign performance.", alt: "Laptop product mockup viewed at an angle" },
      ],
      date: "January 9, 2025",
    },
    comparison: {
      badge: "Comparison", title: "Why would you Want to", highlight: "Work with Us?", description: "Data-Driven Strategies for High-Impact Advertising",
      agencies: "Other Agencies", brand: "VBN+",
      drawbacks: ["Unlimited ideas & features", "Single channel approach", "Outdated growth strategies", "Lack of industry research", "Outsourced to mediocre talent"],
      benefits: ["Constant, proactive communication", "Omni-channel approach", "Tailored best-fit solutions", "Provides industry specific expertise", "Experts with 10+ years of experience"],
    },
    testimonial: {
      label: "Featured Customer", rating: "5 out of 5 stars", slide: "Testimonial {current} of {total}", previous: "Previous testimonial", next: "Next testimonial", showReview: "Show testimonial {number}",
      reviews: [
        { quote: "“VBN+ helped us focus our spend on the customers most ready to buy. Our qualified leads grew 38% in one quarter.”", name: "Olivia Martinez", role: "Founder, Northstar Retail" },
        { quote: "“We finally have a channel mix we can explain and improve. Cost per acquisition is down, and the pipeline is stronger.”", name: "Amir Rahman", role: "CEO, Meridian Group" },
        { quote: "“The team paired sharp creative with disciplined testing. We now make decisions from clear results instead of guesswork.”", name: "Sarah Chen", role: "Marketing Director, Brightline" },
      ],
      metrics: ["Years Experience", "Projects Done"],
    },
    pricing: {
      badge: "Pricing Plan", title: "Flexible plans", highlight: "for your Growth", description: "Choose a plan that's right for you.", included: "What’s included", demo: "Book a Demo", details: "View plan details",
      // features: ["Unlimited ideas & features", "Unlimited feedback", "AI Suggestions", "CRM integration", "Manage feedback from Slack, Hubspot", "Dedicated Slack Channel"],
      plans: [
        { name: "Starter", price: "Free", 
          cadence: "", billing: "Free forever", 
          features: ["Unlimited ideas & features", "Unlimited feedback", "AI Suggestions", "CRM integration", "Manage feedback from Slack, Hubspot", "Dedicated Slack Channel"],
          unavailable: [3, 4, 5],
        },
        { name: "Enterprise", price: "$40", cadence: "/month", billing: "Billed annually",
          features: ["Unlimited ideas & features", "Unlimited feedback", "AI Suggestions", "CRM integration", "Manage feedback from Slack, Hubspot", "Dedicated Slack Channel"],
          unavailable: [4, 5] },
        { name: "Project-based", price: "$100", cadence: "/month", billing: "Billed annually",
          features: ["Unlimited ideas & features", "Unlimited feedback", "AI Suggestions", "CRM integration", "Manage feedback from Slack, Hubspot", "Dedicated Slack Channel"],
          unavailable: [] },
      ],
    },
    faq: {
      badge: "Frequently Asked Questions", title: "Frequently", highlight: "Asked Questions", description: "Data-Driven Strategies for High-Impact Advertising",
      questions: ["What services does VBN+ offer?", "Who is VBN+ for?", "How do I know if my business needs ad campaign consulting?", "What platforms do you specialize in?", "Do you offer a free consultation?"],
      answers: [
        "We plan, launch, and optimize paid advertising campaigns across Meta, TikTok, Google, and other digital channels.",
        "VBN+ works with businesses that want a clear, measurable way to grow through paid digital advertising.",
        "If your campaigns are not producing consistent leads or sales, or you cannot clearly measure their return, an audit can identify what to improve.",
        "We specialize in Meta, TikTok, and Google Ads, and can recommend the right channel mix for your audience and goals.",
        "Yes. Book a free consultation and we’ll discuss your goals, current campaigns, and the best next steps for your business.",
      ],
    },
    footer: {
      cta: "Ready to", highlight: "Maximize Your ROI?", start: "Start Your Campaign Now!", description: "VBN+ helps businesses grow with data-driven strategies and high-converting campaigns.", consultation: "Get a Free Consultation",
      links: ["Home", "Process", "Services", "Case Study", "Pricing"], logoLabel: "VBN+ home", newsletter: "Join our newsletter today and stay informed!", email: "Email address", submit: "Get Notified",
      navLabel: "Footer navigation", newsletterLabel: "Newsletter signup",
      consent: "By subscribing you agree to our", privacy: "Privacy Policy", andUpdates: "and consent to receive updates from our company.", social: ["Instagram", "Facebook", "Twitter", "LinkedIn"],
    },
  },
  ar: {
    metadata: {
      title: "VBN+ | إعلانات تحقق النتائج",
      description: "تساعد VBN+ الشركات على النمو باستراتيجيات إعلانية قائمة على البيانات وحملات عالية التحويل.",
    },
    switchLanguage: "English",
    hero: {
      navLabel: "التنقل الرئيسي",
      home: "الرئيسية", process: "منهجيتنا", services: "الخدمات", caseStudies: "دراسات الحالة", pricing: "الأسعار",
      logoLabel: "الصفحة الرئيسية لVBN+", bookDemo: "احجز عرضًا توضيحيًا", consultation: "احصل على استشارة مجانية",
      titleLead: "احنا بنبني براندات", titleHighlight: " مش", titleEnd: "مجرد اعلانات",
      description: "بنؤمن أن كل علامة تجارية تمتلك قصة فريدة تستحق أن تُروى باحترافية، نترجم أفكاركم إلى حملات تسويقية تخطف الأنظار، تحقق أعلى العوائد.",
      trusted: "موثوقون لدى عشرات الشركاء في جميع أنحاء الجمهورية",
      languageLabel: "تغيير اللغة",
      partnersLabel: "الشركات الشريكة",
    },
    who: {
      badge: "من نحن", title: "نبني حضورك في السوق،", highlight: "ونساعدك للوصول الى هدفك", summary: "في +VBN، بنساعد الشركات والبراندات تطوّر شغلها من خلال حلول تسويقية تجمع بين التخطيط، والإبداع، والتكنولوجيا.",
      videoLabel: "تشغيل الفيديو التعريفي بخدمات VBN+ التسويقية",
      videoSrc: "/videos/marketing-intro-ar.mp4",
      videoPoster: "/images/marketing-intro-ar-poster.png",
      metrics: ["عميل راضٍ", "نسبة مشاهدات", "تواصلنا مع"],
    },
    process: {
      badge: "منهجيتنا", title: "كيف", highlight: "نبني الحملات",
      description: "بنبدأ بفهم طبيعة مشروعك، والجمهور اللي بتستهدفه، والأهداف اللي عايز تحققها. ومن هنا بنحدد أنسب الحلول، سواء من خلال الحملات الإعلانية، أو صناعة المحتوى، أو بناء الهوية البصرية، أو تطوير موقعك وتحسين ظهوره على محركات البحث.", learnMore: "اكتشف هذه الخطوة",
      steps: [
        { title: "تدقيق أداء مسار المبيعات", description: "نحلل مسار مبيعاتك لاكتشاف فرص التحسين وزيادة التحويلات." },
        { title: "إعداد حملات موجّهة", description: "ننشئ حملات إعلانية موجّهة ونطلقها بما يتوافق مع أهداف نشاطك التجاري." },
        { title: "تحسين يركز على الأرباح", description: "نحسّن حملاتك لخفض التكاليف وتعظيم عائدك على الاستثمار." },
      ],
    },
    services: {
      badge: "الخدمات", title: "أفضل", highlight: "خدماتنا", description: "استراتيجيات قائمة على البيانات لإعلانات عالية التأثير", learnMore: "اكتشف الخدمة",
      menuTitle: "اختر القناة المناسبة لنمو أعمالك", menuDescription: "حملات متخصصة عبر المنصات التي يستخدمها عملاؤك يوميًا.", viewAll: "استكشف جميع الخدمات",
      cards: [
        { name: "إعلانات Meta", description: "يتمتع فريقنا بخبرة واسعة في إنشاء حملات ناجحة على Facebook وInstagram.", alt: "شخص يرتدي نظارة واقع افتراضي" },
        { name: "إعلانات TikTok", description: "يتمتع فريقنا بخبرة واسعة في إنشاء حملات ناجحة على Facebook وInstagram.", alt: "صورة لمُنشئ محتوى" },
        { name: "إعلانات Google", description: "يتمتع فريقنا بخبرة واسعة في إنشاء حملات ناجحة على Facebook وInstagram.", alt: "سيارة رياضية من الأعلى" },
      ],
    },
    cases: {
      badge: "دراسات الحالة", title: "أحدث", highlight: "دراسات الحالة", description: "استراتيجيات قائمة على البيانات لإعلانات عالية التأثير",
      previous: "عرض دراسات الحالة السابقة", next: "عرض دراسات الحالة التالية", listLabel: "دراسات الحالة", controlsLabel: "أزرار التنقل بين دراسات الحالة", learnMore: "اقرأ دراسة الحالة",
      cards: [
        { title: "تجديد الهوية التجارية", description: "ساعد التوجه البصري المتجدد العلامة التجارية على التميز في حملاتها الرقمية.", alt: "شاشة حاسوب تعرض فكرة تصميم" },
        { title: "MacBook Pro M3", description: "وصلت حملة منتج مركزة بجيل جديد من الأدوات الإبداعية إلى الجمهور المناسب.", alt: "تصميم دعائي لحاسوب محمول" },
        { title: "توسيع الوصول للحملات الخارجية", description: "وسعنا اكتساب العملاء عبر إعلانات خارجية بارزة في مواقع عالية الظهور.", alt: "لوحة إعلانية كبيرة في المدينة" },
        { title: "خفض تكلفة الاكتساب 60٪", description: "ضاعفت استراتيجية PPC قائمة على البيانات وتحسينات التصميم عائد الاستثمار لمتجر إلكتروني خلال ثلاثة أشهر.", alt: "حاسوب محمول يعرض تصميم موقع" },
        { title: "زيادة الاحتفاظ 45٪", description: "رفع مسار إعادة الاستهداف الاستراتيجي الاحتفاظ بالعملاء 45٪ وحسّن أداء الحملات.", alt: "حاسوب محمول من زاوية جانبية" },
      ],
      date: "9 يناير 2025",
    },
    comparison: {
      badge: "مقارنة", title: "لماذا تختار", highlight: "العمل معنا؟", description: "استراتيجيات قائمة على البيانات لإعلانات عالية التأثير",
      agencies: "الوكالات الأخرى", brand: "VBN+",
      drawbacks: ["أفكار وميزات بلا حدود", "التركيز على قناة واحدة", "استراتيجيات نمو قديمة", "غياب البحث في المجال", "إسناد العمل إلى مواهب متوسطة"],
      benefits: ["تواصل مستمر واستباقي", "نهج متعدد القنوات", "حلول مصممة لاحتياجاتك", "خبرة متخصصة في المجال", "خبراء بخبرة تزيد على 10 سنوات"],
    },
    testimonial: {
      label: "عميل مميز", rating: "٥ من ٥ نجوم", slide: "الشهادة {current} من {total}", previous: "الشهادة السابقة", next: "الشهادة التالية", showReview: "عرض الشهادة {number}",
      reviews: [
        { quote: "«ساعدنا VBN+ على توجيه الإنفاق إلى العملاء الأقرب للشراء، وزادت العملاء المحتملون المؤهلون ٣٨٪ خلال ربع سنة.»", name: "أوليفيا مارتينيز", role: "المؤسسة، نورث ستار ريتيل" },
        { quote: "«أصبح لدينا مزيج قنوات واضح يمكن تطويره، وانخفضت تكلفة الاستحواذ وتحسّن مسار المبيعات.»", name: "أمير رحمن", role: "الرئيس التنفيذي، مجموعة ميريديان" },
        { quote: "«جمع الفريق بين الإبداع والاختبار المنهجي، وأصبحت قراراتنا مبنية على نتائج واضحة بدل التخمين.»", name: "سارة تشين", role: "مديرة التسويق، برايت لاين" },
      ],
      metrics: ["سنوات من الخبرة", "إنجاز"],
    },
    pricing: {
      badge: "خطط الأسعار", title: "خطط مرنة", highlight: "لنمو أعمالك", description: "اختر الخطة المناسبة لك.", included: "ما الذي تتضمنه الخطة", demo: "احجز عرضًا توضيحيًا", details: "تفاصيل الخطة",
      // features: ["٢٢ تصميم فيسبوك", "٤ ريلز", "حملة اعلانية للتوعية", "تكامل مع CRM", "إدارة الملاحظات من Slack وHubSpot", "قناة Slack مخصصة"],
      plans: [
        { name: "الفضية", price: "25K EGP", 
          cadence: "/شهرياً", billing: "مجانية دائمًا", 
          features: ["22 تصميم احترافي", "4 ريلز", "حملة تسويقية واحدة", "خيارات المنصة الاعلانية: 1"],
          unavailable: [3, 4, 5],
        },
        { name: "البرونزية", price: "32K EGP", 
          cadence: "/شهريًا", billing: "الفوترة سنوية", 
          features: ["24 تصميم احترافي", "6 ريلز", "اثنتا حملة تسويقية", "خيارات المنصة الاعلانية: 2", "موقع الكتروني", "زيادة معدل الSEO"],
          unavailable: [4, 5]
        },
        { name: "الذهبية", price: "42K EGP", 
          cadence: "/شهريًا", billing: "الفوترة سنوية", 
          features: ["24 تصميم احترافي", "10 ريلز", "ثلاث حملات تسويقية", "خيارات المنصة الاعلانية: 3", "موقع الكتروني", "خدمة استضافة مجانية", "زيادة معدل الSEO",],
          unavailable: [] },
      ],
    },
    faq: {
      badge: "الأسئلة الشائعة", title: "الأسئلة", highlight: "الشائعة", description: "استراتيجيات قائمة على البيانات لإعلانات عالية التأثير",
      questions: ["ما الخدمات التي تقدمها VBN+؟", "لمن تناسب خدمات VBN+؟", "كيف أعرف أن نشاطي يحتاج إلى استشارات للحملات الإعلانية؟", "ما المنصات التي تتخصصون فيها؟", "هل تقدمون استشارة مجانية؟"],
      answers: [
        "نخطط للحملات الإعلانية المدفوعة ونطلقها ونحسّنها عبر Meta وTikTok وGoogle وغيرها من القنوات الرقمية.",
        "نعمل مع الشركات التي تبحث عن طريقة واضحة وقابلة للقياس للنمو عبر الإعلانات الرقمية المدفوعة.",
        "إذا لم تحقق حملاتك عملاء محتملين أو مبيعات بانتظام، أو لم تتمكن من قياس عائدها بوضوح، فيمكن للتدقيق تحديد فرص التحسين.",
        "نتخصص في إعلانات Meta وTikTok وGoogle، ونوصي بمزيج القنوات المناسب لجمهورك وأهدافك.",
        "نعم. احجز استشارة مجانية لمناقشة أهدافك وحملاتك الحالية والخطوات الأنسب لنشاطك التجاري.",
      ],
    },
    footer: {
      cta: "هل أنت مستعد لـ", highlight: "تعظيم عائدك؟", start: "ابدأ حملتك الآن!", description: "تساعد VBN+ الشركات على النمو باستراتيجيات قائمة على البيانات وحملات عالية التحويل.", consultation: "احصل على استشارة مجانية",
      links: ["الرئيسية", "منهجيتنا", "الخدمات", "دراسات الحالة", "الأسعار"], logoLabel: "الصفحة الرئيسية لVBN+", newsletter: "اشترك في نشرتنا البريدية وابقَ على اطلاع!", email: "البريد الإلكتروني", submit: "أبلغوني",
      navLabel: "روابط التذييل", newsletterLabel: "الاشتراك في النشرة البريدية",
      consent: "بالاشتراك، أنت توافق على", privacy: "سياسة الخصوصية", andUpdates: "وتوافق على تلقي تحديثات من شركتنا.", social: ["Instagram", "Facebook", "Twitter", "LinkedIn"],
    },
  },
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];
