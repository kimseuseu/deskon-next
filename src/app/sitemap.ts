import { MetadataRoute } from "next";

const BASE_URL = "https://aovo.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/about", "/about/history", "/about/ci", "/about/location", "/about/partners",
    "/products", "/support/contact", "/support/notice", "/support/faq", "/quote",
    // Subscribe
    "/subscribe/rolltainer", "/subscribe/pallet", "/subscribe/intainer", "/subscribe/movingbox",
    "/subscribe/kitchen", "/subscribe/hvac", "/subscribe/chair",
    // Sharing
    "/sharing/rolltainer", "/sharing/cart", "/sharing/airport-cart", "/sharing/stair-cart",
    "/sharing/stacker", "/sharing/event",
    // Rental
    "/rental/furniture", "/rental/kitchen", "/rental/event", "/rental/it",
    "/rental/medical", "/rental/aircon", "/rental/dehumidifier",
    // Recycle
    "/recycle/logistics", "/recycle/chair", "/recycle/furniture", "/recycle/kitchen",
    "/recycle/aircon", "/recycle/seasonal", "/recycle/dehumidifier", "/recycle/special",
    // Buyback
    "/buyback/furniture", "/buyback/logistics", "/buyback/event",
    "/buyback/commercial",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/about") ? 0.7 : 0.8,
  }));
}
