// بيانات المشاريع المعروضة في معرض الأعمال الخاص بأكرم سعد
const PROJECTS_DATA = [
    {
        id: 1,
        title: "منصة التحليل والأتمتة لصوامع طامية",
        description: "لوحة تحكم تفاعلية متكاملة لمراقبة مؤشرات التوريد اليومي، نسب نقاوة القمح، وحسابات الموردين لحظياً، مع نظام ETL لأتمتة معالجة البيانات المجمعة من ملفات Excel ومزامنتها سحابياً عبر OneDrive API.",
        category: "python",
        tags: ["Python", "Streamlit", "Pandas", "Plotly", "OneDrive API"],
        image: "assets/images/project1.png",
        demoUrl: "launch.html?url=https://tamia-silos-dashboard-hapnbmvswzubaubdbeqef5.streamlit.app/&title=%D9%85%D9%86%D8%B5%D8%A9+%D8%B5%D9%88%D8%A7%D9%85%D8%B9+%D8%B7%D8%A7%D9%85%D9%8A%D8%A9",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 2,
        title: "حوكمة حركة الأقماح المحلية والتدفقات النقدية",
        description: "لوحة تحكم تفاعلية متكاملة مصممة بـ Power BI لصوامع طامية لحوكمة حركة الأقماح المحلية والتدفقات النقدية، وتتبع نسب التوريد وحسابات الموردين بدقة متناهية ودعم اتخاذ القرارات الاستراتيجية للإدارة العليا.",
        category: "data",
        tags: ["Power BI", "Power Query", "Data Modeling", "Financial Governance"],
        image: "project2_cover.jpg",
        demoUrl: "#",
        githubUrl: "https://github.com/AkramSaad",
        gallery: [
            { src: "project2_cover.jpg", caption: "غلاف حوكمة حركة الأقماح المحلية للعمليات الحسابية والتدفقات النقدية" },
            { src: "project2_governance.png", caption: "لوحة التحكم الرئيسية - حوكمة القمح المحلي" },
            { src: "project2_indicators.png", caption: "المؤشرات العامة وتفاصيل نسب النظافة والكميات الموردة" },
            { src: "project2_analysis.png", caption: "التحليل التفصيلي للتدفقات النقدية والتوريد حسب التاريخ والكميات" },
            { src: "project2_deviations.png", caption: "تحليل الانحرافات والتغير اليومي والنمو الشهري للموردين" }
        ]
    },
    {
        id: 3,
        title: "نظام أتمتة التسويات البنكية اليومية",
        description: "تطبيق ويب تفاعلي مصمم بـ Streamlit وأداة محاسبية ذكية لربط ومطابقة آلاف معاملات كشف الحساب البنكي مع دفتر الأستاذ العام تلقائياً، وعزل الحركات المعلقة (مثل الشيكات المعلقة والإيداعات بالطريق والعمولات البنكية) وحساب الأرصدة المعدلة بدقة وتوليد مذكرة تسوية البنك الرسمية وتصديرها لملف Excel.",
        category: "python",
        tags: ["Python", "Streamlit", "Pandas", "Automation", "Financial Reconciliation"],
        image: "assets/images/project3.png",
        demoUrl: "launch.html?url=https://bank-reconciliation-oxe6rmoqs8egask7wnz33k.streamlit.app/&title=%D8%A3%D8%AA%D9%85%D8%AA%D8%A9+%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D8%A7%D8%AA+%D8%A7%D9%84%D8%A8%D9%86%D9%83%D9%8A%D8%A9",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 4,
        title: "نظام إدارة وعقود المقاولات المالي",
        description: "تطبيق ويب متكامل (PWA) لإدارة الحسابات المالية للمشاريع والمقاولات، يشمل متابعة مستحقات الموردين ومقاولي الباطن، كشوف مرتبات الموظفين، وإدارة الموازنات التشغيلية مع واجهات تفاعلية تدعم العمل دون اتصال بالإنترنت.",
        category: "data",
        tags: ["HTML5", "CSS3", "JavaScript", "PWA", "Financial Dashboards"],
        image: "assets/images/project4.png",
        demoUrl: "https://a01030108199-stack.github.io/akram-contracting/",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 5,
        title: "نظام التنبؤ المالي والموازنات بالذكاء الاصطناعي",
        description: "منصة ذكية لتحليل الأداء المالي التاريخي والتنبؤ بالمبيعات والموازنات لعام 2026 باستخدام خوارزميات التعلم الآلي (الانحدار الخطي)، مع محاكاة تفاعلية فورية لسيناريوهات زيادة الاستثمار التسويقي أو خفض التكاليف التشغيلية.",
        category: "python",
        tags: ["Python", "Streamlit", "Machine Learning", "Linear Regression", "Plotly"],
        image: "assets/images/project5.png",
        demoUrl: "launch.html?url=https://financial-forecaster-c6xcfhcdd2nmyheb6obxip.streamlit.app/&title=%D9%86%D8%B8%D8%A7%D9%85+%D8%A7%D9%84%D8%AA%D9%86%D8%A8%D8%A4+%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A",
        githubUrl: "https://github.com/a01030108199-stack/financial-forecaster"
    },
    {
        id: 6,
        title: "برنامج الحسابات العامة للشركات",
        description: "برنامج مالي متكامل مصمم بالإكسل لإدارة الحسابات العامة للشركات، يشمل قيود اليومية، ميزان المراجعة، والحسابات الختامية (قائمة الدخل والميزانية العمومية) تلقائياً.",
        category: "excel",
        tags: ["Excel Formulas", "Financial Accounting", "Balance Sheet", "Income Statement"],
        image: "excel_accounting_mockup.png",
        demoUrl: "company_accounting_system.xlsx",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 7,
        title: "برنامج إدارة مبيعات محلات الملابس",
        description: "نظام مالي متكامل لتسجيل وإدارة المبيعات والمخازن لمحلات الملابس، مع تتبع حركات الصادر والوارد وحساب الأرباح اليومية والشهرية تلقائياً.",
        category: "excel",
        tags: ["Excel Templates", "Sales Management", "Inventory Control", "Retail Finance"],
        image: "excel_clothing_store_mockup.png",
        demoUrl: "clothing_store_management.xlsx",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 8,
        title: "نظام فواتير المبيعات الذكي",
        description: "شيت إكسل تفاعلي مدعوم بماكرو (VBA) لتصميم وإصدار فواتير المبيعات، وحفظ بيانات العملاء وتوليد تقارير المبيعات اليومية بضغطة زر.",
        category: "excel",
        tags: ["Excel VBA", "Macros", "Invoicing System", "Automation"],
        image: "excel_invoice_mockup.png",
        demoUrl: "smart_sales_invoice.xlsm",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 9,
        title: "شيت إدارة صادر ووارد المخازن",
        description: "نموذج محاسبي مبسط لمراقبة حركة المخازن (الصادر والوارد)، وتحديد مستويات حد الطلب وتنبيهات نفاد المخزون تلقائياً.",
        category: "excel",
        tags: ["Inventory Tracking", "Warehouse Control", "Alert Systems", "Excel Sheets"],
        image: "excel_warehouse_mockup.png",
        demoUrl: "warehouse_inventory_tracker.xlsx",
        githubUrl: "https://github.com/AkramSaad"
    },
    {
        id: 10,
        title: "لوحة تحكم تحليل البيانات والمبيعات",
        description: "لوحة تحكم تفاعلية (Dashboard) مصممة بالاكسل لتحليل بيانات المبيعات والأداء المالي التاريخي، مع رسوم بيانية ديناميكية وجداول محورية تفصيلية.",
        category: "excel",
        tags: ["Excel Dashboards", "Data Analysis", "Pivot Tables", "Financial Charts"],
        image: "excel_sales_analysis_mockup.png",
        demoUrl: "sales_analysis_dashboard.xlsm",
        githubUrl: "https://github.com/AkramSaad"
    }
];
