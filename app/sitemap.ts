import type { MetadataRoute } from "next";
import { locales } from "@/lib/copy";
import { alternateLanguages } from "@/lib/seo";

const localizedRoutes = ["", "/faq"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];

  return locales.flatMap((locale) => localizedRoutes.map((suffix) => ({
    url: `${origin}/${locale}${suffix}`,
    alternates: { languages: alternateLanguages(origin, suffix) }
  })));
}
