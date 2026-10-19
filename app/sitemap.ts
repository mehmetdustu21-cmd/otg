import type { MetadataRoute } from "next";
import { locales } from "@/lib/copy";
import { marketSlugs } from "@/lib/market-copy";
import { alternateLanguages } from "@/lib/seo";

const localizedRoutes = ["", "/about", "/faq", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];

  const standardRoutes = locales.flatMap((locale) => localizedRoutes.map((suffix) => ({
    url: `${origin}/${locale}${suffix}`,
    alternates: { languages: alternateLanguages(origin, suffix) }
  })));
  const marketRoutes = locales.flatMap((locale) => marketSlugs.map((market) => {
    const suffix = `/markets/${market}`;
    return { url: `${origin}/${locale}${suffix}`, alternates: { languages: alternateLanguages(origin, suffix) } };
  }));
  return [...standardRoutes, ...marketRoutes];
}
