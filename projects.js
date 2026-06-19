// بيانات المشاريع المعروضة في معرض الأعمال الخاص بأكرم سعد
const PROJECTS_DATA = [
    {
        id: 1,
        title: "منصة التحليل والأتمتة لصوامع طامية",
        description: "لوحة تحكم تفاعلية متكاملة لمراقبة مؤشرات التوريد اليومي، نسب نقاوة القمح، وحسابات الموردين لحظياً، مع نظام ETL لأتمتة معالجة البيانات المجمعة من ملفات Excel ومزامنتها سحابياً عبر OneDrive API.",
        category: "python",
        tags: ["Python", "Streamlit", "Pandas", "Plotly", "OneDrive API"],
        image: "assets/images/project1.png",
        demoUrl: "https://tamia-silos-dashboard-hapnbmvswzubaubdbeqef5.streamlit.app/",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 2,
        title: "حوكمة حركة الأقماح المحلية والتدفقات النقدية",
        description: "لوحة تحكم تفاعلية متكاملة مصممة بـ Power BI لصوامع طامية لحوكمة حركة الأقماح المحلية والتدفقات النقدية، وتتبع نسب التوريد وحسابات الموردين بدقة متناهية ودعم اتخاذ القرارات الاستراتيجية للإدارة العليا.",
        category: "data",
        tags: ["Power BI", "Power Query", "Data Modeling", "Financial Governance"],
        image: "project2.jpg",
        demoUrl: "#",
        githubUrl: "https://github.com/AkramSaad",
        gallery: [
            { src: "project2.jpg", caption: "لوحة التحكم التفاعلية لحوكمة حركة الأقماح المحلية" },
            { src: "assets/images/project2.png", caption: "تتبع نسب التوريد والتدفقات النقدية بدقة متناهية" },
            { src: "assets/images/photo_2025-11-20_19-31-15.jpg", caption: "معاينة لوحة تحكم حوكمة صوامع طامية على جهاز الحاسوب" }
        ]
    },
    {
        id: 3,
        title: "نظام أتمتة التسويات البنكية اليومية",
        description: "تطوير سكربت برمجية لمطابقة آلاف المعاملات البنكية اليومية مع سجلات الأستاذ العام وتحديد الفروقات تلقائياً، مما قلل وقت التسوية بنسبة 70% وتفادي الأخطاء البشرية.",
        category: "python",
        tags: ["Python", "Automation", "Data Matching", "Financial Auditing"],
        image: "assets/images/project3.png",
        demoUrl: "#",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 4,
        title: "نظام إدارة وعقود المقاولات المالي",
        description: "تطبيق ويب متكامل (PWA) لإدارة الحسابات المالية للمشاريع والمقاولات، يشمل متابعة مستحقات الموردين ومقاولي الباطن، كشوف مرتبات الموظفين، وإدارة الموازنات التشغيلية مع واجهات تفاعلية تدعم العمل دون اتصال بالإنترنت.",
        category: "data",
        tags: ["HTML5", "CSS3", "JavaScript", "PWA", "Financial Dashboards"],
        image: "assets/images/project4.png",
        demoUrl: "https://akram-contracting.netlify.app",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 5,
        title: "نظام التنبؤ المالي والموازنات بالذكاء الاصطناعي",
        description: "منصة ذكية لتحليل الأداء المالي التاريخي والتنبؤ بالمبيعات والموازنات لعام 2026 باستخدام خوارزميات التعلم الآلي (الانحدار الخطي)، مع محاكاة تفاعلية فورية لسيناريوهات زيادة الاستثمار التسويقي أو خفض التكاليف التشغيلية.",
        category: "python",
        tags: ["Python", "Streamlit", "Machine Learning", "Linear Regression", "Plotly"],
        image: "assets/images/project5.png",
        demoUrl: "https://financial-forecaster-c6xcfhcdd2nmyheb6obxip.streamlit.app/",
        githubUrl: "https://github.com/a01030108199-stack/financial-forecaster"
    }
];
