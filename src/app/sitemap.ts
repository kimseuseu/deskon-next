import { MetadataRoute } from "next";

const BASE_URL = "https://www.aovo.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const pages: { url: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    // Main
    { url: "", priority: 1.0, changeFrequency: "weekly" },

    // About
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/about/history", priority: 0.6, changeFrequency: "monthly" },
    { url: "/about/ci", priority: 0.5, changeFrequency: "yearly" },
    { url: "/about/location", priority: 0.6, changeFrequency: "monthly" },
    { url: "/about/partners", priority: 0.7, changeFrequency: "monthly" },

    // Subscribe (landing + sub-pages)
    { url: "/subscribe", priority: 0.9, changeFrequency: "weekly" },
    { url: "/subscribe/chair", priority: 0.9, changeFrequency: "weekly" },
    { url: "/subscribe/rolltainer", priority: 0.9, changeFrequency: "weekly" },
    { url: "/subscribe/pallet", priority: 0.7, changeFrequency: "monthly" },
    { url: "/subscribe/intainer", priority: 0.7, changeFrequency: "monthly" },
    { url: "/subscribe/movingbox", priority: 0.6, changeFrequency: "monthly" },
    { url: "/subscribe/kitchen", priority: 0.7, changeFrequency: "monthly" },
    { url: "/subscribe/hvac", priority: 0.7, changeFrequency: "monthly" },

    // Sharing (landing + sub-pages)
    { url: "/sharing", priority: 0.8, changeFrequency: "weekly" },
    { url: "/sharing/rolltainer", priority: 0.7, changeFrequency: "monthly" },
    { url: "/sharing/cart", priority: 0.7, changeFrequency: "monthly" },
    { url: "/sharing/airport-cart", priority: 0.6, changeFrequency: "monthly" },
    { url: "/sharing/stair-cart", priority: 0.6, changeFrequency: "monthly" },
    { url: "/sharing/stacker", priority: 0.6, changeFrequency: "monthly" },
    { url: "/sharing/event", priority: 0.7, changeFrequency: "monthly" },

    // Rental (landing + sub-pages)
    { url: "/rental", priority: 0.8, changeFrequency: "weekly" },
    { url: "/rental/furniture", priority: 0.7, changeFrequency: "monthly" },
    { url: "/rental/kitchen", priority: 0.7, changeFrequency: "monthly" },
    { url: "/rental/event", priority: 0.7, changeFrequency: "monthly" },
    { url: "/rental/it", priority: 0.7, changeFrequency: "monthly" },
    { url: "/rental/medical", priority: 0.7, changeFrequency: "monthly" },
    { url: "/rental/aircon", priority: 0.7, changeFrequency: "monthly" },
    { url: "/rental/dehumidifier", priority: 0.6, changeFrequency: "monthly" },

    // Recycle (landing + sub-pages)
    { url: "/recycle", priority: 0.8, changeFrequency: "weekly" },
    { url: "/recycle/chair", priority: 0.7, changeFrequency: "monthly" },
    { url: "/recycle/logistics", priority: 0.7, changeFrequency: "monthly" },
    { url: "/recycle/furniture", priority: 0.7, changeFrequency: "monthly" },
    { url: "/recycle/kitchen", priority: 0.6, changeFrequency: "monthly" },
    { url: "/recycle/aircon", priority: 0.6, changeFrequency: "monthly" },
    { url: "/recycle/seasonal", priority: 0.6, changeFrequency: "monthly" },
    { url: "/recycle/dehumidifier", priority: 0.6, changeFrequency: "monthly" },
    { url: "/recycle/special", priority: 0.6, changeFrequency: "monthly" },

    // Buyback (landing + sub-pages)
    { url: "/buyback", priority: 0.8, changeFrequency: "weekly" },
    { url: "/buyback/furniture", priority: 0.7, changeFrequency: "monthly" },
    { url: "/buyback/logistics", priority: 0.7, changeFrequency: "monthly" },
    { url: "/buyback/event", priority: 0.7, changeFrequency: "monthly" },
    { url: "/buyback/commercial", priority: 0.7, changeFrequency: "monthly" },

    // Products & Support
    { url: "/products", priority: 0.8, changeFrequency: "weekly" },
    { url: "/support/contact", priority: 0.8, changeFrequency: "monthly" },
    { url: "/support/notice", priority: 0.7, changeFrequency: "weekly" },
    { url: "/support/faq", priority: 0.7, changeFrequency: "monthly" },
    { url: "/quote", priority: 0.7, changeFrequency: "monthly" },

    // Legal
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  return pages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
