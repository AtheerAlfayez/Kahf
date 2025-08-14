"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

export interface Translations {
  about: string;
  eServices: string;
  tawasol: string;
  getInTouch: string;
  adminPanel: string;
  supportPortal: string;
  login: string;
  foundation: {
    name: string;
    nameEn: string;
  };
  stats: {
    projectsCompleted: string;
    countriesReached: string;
    beneficiaries: string;
    yearsOfService: string;
    millionPeople: string;
    countries: string;
    humanitarianProjects: string;
  };
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  events: {
    title: string;
    subtitle: string;
    calendar: string;
    calendarTitle: string;
    noUpcomingEvents: string;
    allEvents: string;
    upcoming: string;
    today: string;
    past: string;
    noEventsFound: string;
    readMore: string;
    showLess: string;
    viewDetails: string;
    save: string;
    register: string;
    ended: string;
    seeMoreEvents: string;
    showLessEvents: string;
  };
  partners: {
    title: string;
    subtitle: string;
    previousPartners: string;
    nextPartners: string;
  };
  footer: {
    copyright: string;
    socialLinks: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
      youtube: string;
    };
  };
  aboutPage: {
    glance: {
      title: string;
      description: string;
    };
    boardOfTrustees: {
      title: string;
      description: string;
    };
    boardOfDirectors: {
      title: string;
      description: string;
      chairman: string;
      chairmanTitle: string;
      boardMember: string;
    };
    executiveManagement: {
      title: string;
      subtitle: string;
      description: string;
      orgChart: {
        boardOfDirectors: string;
        ceo: string;
        secretariat: string;
        internalAuditor: string;
        humanitarianPrograms: string;
        legalSector: string;
        humanResources: string;
        engineeringAffairs: string;
        administrativeFinancial: string;
        corporateCommunications: string;
        investment: string;
      };
    };
  };
  contactPage: {
    title: string;
    subtitle: string;
    sendMessage: string;
    fullName: string;
    email: string;
    mobile: string;
    subject: string;
    message: string;
    submit: string;
    successTitle: string;
    successMessage: string;
  };
  admin: {
    dashboard: string;
    events: string;
    news: string;
    users: string;
    settings: string;
    totalEvents: string;
    totalNews: string;
    activeUsers: string;
    newsCategories: {
      employeeNews: string;
      eventAnnouncements: string;
      guidance: string;
      hrAnnouncements: string;
      itAnnouncements: string;
      humanResources: string;
      communication: string;
      title: string;
      circulars: string;
    };
    upcomingEvents: string;
    noUpcomingEvents: string;
    scheduleEvent: string;
    welcomeMessage: string;
    quickActions: string;
    actions: {
      addEvent: string;
      addNews: string;
      manageCategories: string;
      settings: string;
      edit: string;
      delete: string;
      cancel: string;
      save: string;
      saveChanges: string;
    };
    form: {
      title: string;
      description: string;
      date: string;
      time: string;
      location: string;
      category: string;
      content: string;
      image: string;
      selectCategory: string;
    };
    modals: {
      addEvent: string;
      editEvent: string;
      addNews: string;
      editNews: string;
      enterEventTitle: string;
      enterEventDesc: string;
      enterEventLocation: string;
      enterNewsTitle: string;
      enterNewsDesc: string;
    };
    confirmDelete: string;
    noEventsFound: string;
    noNewsFound: string;
    addFirstNews: string;
    addFirstEvent: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    about: "About Us",
    eServices: "E-Services",
    tawasol: "Tawasol",
    getInTouch: "Contact List",
    adminPanel: "Admin Panel",
    supportPortal: "Support Portal",
    login: "Login",
    foundation: {
      name: "مؤسسة الملك عبدالله الإنسانية",
      nameEn: "King Abdullah Humanitarian Foundation",
    },
    stats: {
      projectsCompleted: "Projects Completed",
      countriesReached: "Countries Reached",
      beneficiaries: "Beneficiaries",
      yearsOfService: "Years of Service",
      millionPeople: "Million People",
      countries: "Countries",
      humanitarianProjects: "Humanitarian Projects",
    },
    countdown: {
      days: "Days",
      hours: "Hours",
      minutes: "Min",
      seconds: "Sec",
    },
    events: {
      title: "Upcoming Events",
      subtitle:
        "Join us in our upcoming humanitarian activities and make a difference in the world",
      calendar: "Event Calendar",
      calendarTitle: "Event Calendar",
      noUpcomingEvents: "No upcoming events",
      allEvents: "All Events",
      upcoming: "Upcoming",
      today: "Today",
      past: "Past",
      noEventsFound: "No events found for the selected filters",
      readMore: "Read More",
      showLess: "Show Less",
      viewDetails: "View Details",
      save: "Save",
      register: "Register",
      ended: "Ended",
      seeMoreEvents: "See More Events",
      showLessEvents: "Show Less",
    },
    partners: {
      title: "Humanitarian Ecosystem",
      subtitle:
        "Together with our partners, we create lasting impact in communities worldwide",
      previousPartners: "Previous partners",
      nextPartners: "Next partners",
    },
    footer: {
      copyright:
        "© 2025 King Abdullah Humanitarian Foundation. All Rights Reserved",
      socialLinks: {
        facebook: "Facebook",
        twitter: "Twitter",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        youtube: "YouTube",
      },
    },
    aboutPage: {
      glance: {
        title: "Foundation at a Glance",
        description:
          "King Abdullah International Foundation for Humanitarian Activities was founded in 29 Ramadan 1431 AH (8 September 2010 AD). Since then, it expanded globally, dedicated to the belief that everyone deserves a decent life, no matter where they are. Its projects reflect a humanitarian vision that reaches far and wide through its affiliated entities.",
      },
      boardOfTrustees: {
        title: "Board of Trustees",
        description:
          "It is the top management of the Foundation and the supervisor of its activities. The Board of Trustees of the Custodian of the Two Holy Mosques King Abdullah bin Abdulaziz International Foundation for Humanitarian Works is composed of their Royal Highnesses, sons of King Abdullah bin Abdulaziz – may Allah have mercy on him – and is chaired by His Royal Highness Prince Miteb bin Abdullah bin Abdulaziz.",
      },
      boardOfDirectors: {
        title: "Board of Directors",
        description:
          "The Board of Directors manages all the work of the Custodian of the Two Holy Mosques King Abdullah bin Abdulaziz Al Saud International Foundation for Humanitarian Works, and works on preparing general and investment policies and strategies, in addition to preparing draft regulations of the Foundation and its business reports, and proposing plans and programs that would develop its resources in accordance with the decisions of the Board of Trustees.",
        chairman: "Prof. Dr. Khalid Mohammed Alaiban",
        chairmanTitle: "Chairman of the Board",
        boardMember: "Board Member",
      },
      executiveManagement: {
        title: "Executive Management",
        subtitle: "(Organizational Structure)",
        description:
          "The Executive Management implements the foundation's plans and activities on a daily basis, and submits work and achievement reports to the Board of Directors, through several different departments that were established based on the requirements of the strategic plans, and it operates within an organizational structure.",
        orgChart: {
          boardOfDirectors: "Board of Directors",
          ceo: "Chief Executive Officer",
          secretariat:
            "Secretariat of the Board of Trustees and Board of Directors",
          internalAuditor: "Internal Auditor",
          humanitarianPrograms: "Humanitarian Programs Sector",
          legalSector: "Legal Sector",
          humanResources: "Human Resources Management",
          engineeringAffairs: "Engineering Affairs Sector",
          administrativeFinancial: "Administrative and Financial Sector",
          corporateCommunications: "Corporate Communication Sector",
          investment: "Investment Sector",
        },
      },
    },
    contactPage: {
      title: "Get in Touch",
      subtitle: "We'd love to hear from you",
      sendMessage: "Send Us a Message",
      fullName: "Full Name",
      email: "Email Address",
      mobile: "Mobile Number",
      subject: "Subject",
      message: "Your Message",
      submit: "Send Message",
      successTitle: "Message Sent Successfully!",
      successMessage:
        "Thank you for contacting us. We'll get back to you as soon as possible.",
    },
    admin: {
      dashboard: "Dashboard",
      events: "Events",
      news: "News",
      users: "Users",
      settings: "Settings",
      totalEvents: "Total Events",
      totalNews: "Total News",
      activeUsers: "Active Users",
      newsCategories: {
        employeeNews: "Employee News",
        eventAnnouncements: "Event Announcements",
        guidance: "Guidance",
        hrAnnouncements: "HR Announcements",
        itAnnouncements: "Information Technology",
        humanResources: "Human Resources",
        communication: "Josoor",
        title: "News by Category",
        circulars: "Circulars",
      },
      upcomingEvents: "Next 3 Upcoming Events",
      noUpcomingEvents: "No upcoming events",
      scheduleEvent: "Schedule an event to see it here",
      welcomeMessage: "Welcome to Dashboard",
      quickActions: "Quick Actions",
      actions: {
        addEvent: "Add Event",
        addNews: "Add News",
        manageCategories: "Manage Categories",
        settings: "Settings",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        save: "Save",
        saveChanges: "Save Changes",
      },
      form: {
        title: "Title",
        description: "Description",
        date: "Date",
        time: "Time",
        location: "Location",
        category: "Category",
        content: "Content",
        image: "Image",
        selectCategory: "Select category",
      },
      modals: {
        addEvent: "Add New Event",
        editEvent: "Edit Event",
        addNews: "Add News",
        editNews: "Edit News",
        enterEventTitle: "Enter event title",
        enterEventDesc: "Enter event description",
        enterEventLocation: "Enter event location",
        enterNewsTitle: "Enter news title",
        enterNewsDesc: "Enter news description",
      },
      confirmDelete: "Are you sure you want to delete this item?",
      noEventsFound: "No events found",
      noNewsFound: "No news found",
      addFirstNews: "Add your first news item using the button above",
      addFirstEvent: "Add your first event using the button above",
    },
  },
  ar: {
    about: "من نحن",
    eServices: "الخدمات الإلكترونية",
    tawasol: "تواصل",
    getInTouch: "قائمة جهات الاتصال",
    adminPanel: "لوحة التحكم",
    supportPortal: "بوابة الدعم",
    login: "تسجيل الدخول",
    foundation: {
      name: "مؤسسة الملك عبدالله الإنسانية",
      nameEn: "King Abdullah Humanitarian Foundation",
    },
    stats: {
      projectsCompleted: "المشاريع المنجزة",
      countriesReached: "الدول المستفيدة",
      beneficiaries: "المستفيدون",
      yearsOfService: "سنوات الخدمة",
      millionPeople: "مليون شخص",
      countries: "دولة",
      humanitarianProjects: "مشروع إنساني",
    },
    countdown: {
      days: "يوم",
      hours: "ساعة",
      minutes: "دقيقة",
      seconds: "ثانية",
    },
    events: {
      title: "الفعاليات القادمة",
      subtitle: "انضم إلينا في أنشطتنا الإنسانية القادمة وأحدث فرقاً في العالم",
      calendar: "تقويم الفعاليات",
      calendarTitle: "تقويم الفعاليات",
      noUpcomingEvents: "لا توجد فعاليات قادمة",
      allEvents: "جميع الفعاليات",
      upcoming: "القادمة",
      today: "اليوم",
      past: "السابقة",
      noEventsFound: "لم يتم العثور على فعاليات للفلاتر المحددة",
      readMore: "اقرأ المزيد",
      showLess: "عرض أقل",
      viewDetails: "عرض التفاصيل",
      save: "حفظ",
      register: "تسجيل",
      ended: "انتهت",
      seeMoreEvents: "عرض المزيد من الفعاليات",
      showLessEvents: "عرض أقل",
    },
    partners: {
      title: "المنظومة الإنسانية",
      subtitle: "نعمل مع شركائنا لإحداث تأثير دائم في المجتمعات حول العالم",
      previousPartners: "الشركاء السابقون",
      nextPartners: "الشركاء التاليون",
    },
    footer: {
      copyright: "© 2025 مؤسسة الملك عبدالله الإنسانية. جميع الحقوق محفوظة",
      socialLinks: {
        facebook: "فيسبوك",
        twitter: "تويتر",
        instagram: "انستغرام",
        linkedin: "لينكد إن",
        youtube: "يوتيوب",
      },
    },
    aboutPage: {
      glance: {
        title: "نظرة عامة على المؤسسة",
        description:
          "تأسست مؤسسة الملك عبدالله العالمية للأعمال الإنسانية في 29 رمضان 1431 هـ (8 سبتمبر 2010 م). ومنذ ذلك الحين، توسعت عالمياً، مكرسة لإيمانها بأن كل إنسان يستحق حياة كريمة، أينما كان. تعكس مشاريعها رؤية إنسانية تمتد بعيداً وواسعاً من خلال كياناتها التابعة.",
      },
      boardOfTrustees: {
        title: "مجلس الأمناء",
        description:
          "هي الإدارة العليا للمؤسسة والمشرف على أنشطتها. يتكون مجلس أمناء مؤسسة خادم الحرمين الشريفين الملك عبدالله بن عبدالعزيز العالمية للأعمال الإنسانية من أصحاب السمو الملكي أبناء الملك عبدالله بن عبدالعزيز - رحمه الله - ويرأسها صاحب السمو الملكي الأمير متعب بن عبدالله بن عبدالعزيز.",
      },
      boardOfDirectors: {
        title: "مجلس الإدارة",
        description:
          "يدير مجلس الإدارة جميع أعمال مؤسسة خادم الحرمين الشريفين الملك عبدالله بن عبدالعزيز آل سعود العالمية للأعمال الإنسانية، ويعمل على إعداد السياسات والاستراتيجيات العامة والاستثمارية، بالإضافة إلى إعداد مشروع لوائح المؤسسة وتقارير أعمالها، واقتراح الخطط والبرامج التي من شأنها تطوير مواردها وفقاً لقرارات مجلس الأمناء.",
        chairman: "أ.د. خالد محمد العيبان",
        chairmanTitle: "رئيس مجلس الإدارة",
        boardMember: "عضو مجلس الإدارة",
      },
      executiveManagement: {
        title: "الإدارة التنفيذية",
        subtitle: "(الهيكل التنظيمي)",
        description:
          "تقوم الإدارة التنفيذية بتنفيذ خطط وأنشطة المؤسسة بشكل يومي، وتقدم تقارير العمل والإنجاز لمجلس الإدارة، من خلال عدة إدارات مختلفة تم إنشاؤها بناءً على متطلبات الخطط الاستراتيجية، وتعمل ضمن هيكل تنظيمي.",
        orgChart: {
          boardOfDirectors: "مجلس الإدارة",
          ceo: "الرئيس التنفيذي",
          secretariat: "أمانة مجلس الأمناء ومجلس الإدارة",
          internalAuditor: "المراجع الداخلي",
          humanitarianPrograms: "قطاع البرامج الإنسانية",
          legalSector: "القطاع القانوني",
          humanResources: "إدارة الموارد البشرية",
          engineeringAffairs: "قطاع الشؤون الهندسية",
          administrativeFinancial: "القطاع الإداري والمالي",
          corporateCommunications: "قطاع الاتصال المؤسسي",
          investment: "قطاع الاستثمار",
        },
      },
    },
    contactPage: {
      title: "تواصل معنا",
      subtitle: "يسعدنا سماع رأيك",
      sendMessage: "أرسل لنا رسالة",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      mobile: "رقم الجوال",
      subject: "الموضوع",
      message: "رسالتك",
      submit: "إرسال الرسالة",
      successTitle: "تم إرسال الرسالة بنجاح!",
      successMessage: "شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.",
    },
    admin: {
      dashboard: "لوحة التحكم",
      events: "الفعاليات",
      news: "الأخبار",
      users: "المستخدمون",
      settings: "الإعدادات",
      totalEvents: "إجمالي الفعاليات",
      totalNews: "إجمالي الأخبار",
      activeUsers: "المستخدمون النشطون",
      newsCategories: {
        employeeNews: "أخبار الموظفين",
        eventAnnouncements: "إعلانات الفعاليات",
        guidance: "التوجيهات",
        hrAnnouncements: "إعلانات الموارد البشرية",
        itAnnouncements: "تكنولوجيا المعلومات",
        humanResources: "الموارد البشرية",
        communication: "جسور للتواصل الداخلي",
        title: "الأخبار حسب التصنيف",
        circulars: "التعاميم",
      },
      upcomingEvents: "أقرب 3 فعاليات قادمة",
      noUpcomingEvents: "لا توجد فعاليات قادمة",
      scheduleEvent: "قم بجدولة فعالية لتظهر هنا",
      welcomeMessage: "مرحباً بك في لوحة التحكم",
      quickActions: "إجراءات سريعة",
      actions: {
        addEvent: "إضافة فعالية",
        addNews: "إضافة خبر",
        manageCategories: "إدارة التصنيفات",
        settings: "الإعدادات",
        edit: "تعديل",
        delete: "حذف",
        cancel: "إلغاء",
        save: "حفظ",
        saveChanges: "حفظ التغييرات",
      },
      form: {
        title: "العنوان",
        description: "الوصف",
        date: "التاريخ",
        time: "الوقت",
        location: "الموقع",
        category: "التصنيف",
        content: "المحتوى",
        image: "الصورة",
        selectCategory: "اختر التصنيف",
      },
      modals: {
        addEvent: "إضافة فعالية جديدة",
        editEvent: "تعديل الفعالية",
        addNews: "إضافة خبر",
        editNews: "تعديل الخبر",
        enterEventTitle: "أدخل عنوان الفعالية",
        enterEventDesc: "أدخل وصف الفعالية",
        enterEventLocation: "أدخل موقع الفعالية",
        enterNewsTitle: "أدخل عنوان الخبر",
        enterNewsDesc: "أدخل وصف الخبر",
      },
      confirmDelete: "هل أنت متأكد أنك تريد حذف هذا العنصر؟",
      noEventsFound: "لا توجد فعاليات",
      noNewsFound: "لا توجد أخبار",
      addFirstNews: "أضف أول خبر باستخدام الزر أعلاه",
      addFirstEvent: "أضف أول فعالية باستخدام الزر أعلاه",
    },
  },
};

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (
    key: keyof Omit<
      Translations,
      | "foundation"
      | "stats"
      | "events"
      | "partners"
      | "footer"
      | "aboutPage"
      | "contactPage"
      | "admin"
    >
  ) => string;
  getNestedTranslation: <K extends keyof Translations>(
    key: K,
    nestedKey: K extends keyof Translations ? keyof Translations[K] : never
  ) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (
    key: keyof Omit<
      Translations,
      | "foundation"
      | "stats"
      | "events"
      | "partners"
      | "footer"
      | "aboutPage"
      | "contactPage"
      | "admin"
    >
  ): string => {
    const value = translations[language][key];
    if (typeof value === "string") {
      return value;
    }
    return "";
  };

  const getNestedTranslation = <K extends keyof Translations>(
    key: K,
    nestedKey: K extends keyof Translations ? keyof Translations[K] : never
  ): string => {
    const value = translations[language][key];
    if (typeof value === "object" && value !== null) {
      const nestedValue = (value as any)[nestedKey];
      if (typeof nestedValue === "object" && nestedValue !== null) {
        return JSON.stringify(nestedValue);
      }
      return nestedValue || "";
    }
    return "";
  };

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage, t, getNestedTranslation }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
