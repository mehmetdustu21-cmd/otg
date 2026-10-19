import type { MetadataRoute } from "next";
import { locales } from "@/lib/copy";
<<<<<<< HEAD
import { marketSlugs } from "@/lib/market-copy";
import { alternateLanguages } from "@/lib/seo";

const localizedRoutes = ["", "/about", "/faq", "/privacy"] as const;
=======
import { alternateLanguages } from "@/lib/seo";

const localizedRoutes = ["", "/faq"] as const;
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];

<<<<<<< HEAD
  const standardRoutes = locales.flatMap((locale) => localizedRoutes.map((suffix) => ({
    url: `${origin}/${locale}${suffix}`,
    alternates: { languages: alternateLanguages(origin, suffix) }
  })));
  const marketRoutes = locales.flatMap((locale) => marketSlugs.map((market) => {
    const suffix = `/markets/${market}`;
    return { url: `${origin}/${locale}${suffix}`, alternates: { languages: alternateLanguages(origin, suffix) } };
  }));
  return [...standardRoutes, ...marketRoutes];
=======
  return locales.flatMap((locale) => localizedRoutes.map((suffix) => ({
    url: `${origin}/${locale}${suffix}`,
    alternates: { languages: alternateLanguages(origin, suffix) }
  })));
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
}
