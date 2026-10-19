import type { MetadataRoute } from "next";

const locales = ["en", "de", "fr", "it", "nl"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];

  const languages = {
    "en-US": `${origin}/en`, "en-CH": `${origin}/en`, "de-DE": `${origin}/de`, "de-CH": `${origin}/de`,
    "fr-FR": `${origin}/fr`, "fr-CH": `${origin}/fr`, "it-IT": `${origin}/it`,
    "it-CH": `${origin}/it`, "nl-NL": `${origin}/nl`, "x-default": `${origin}/en`
  };
  return locales.map((locale) => ({
    url: `${origin}/${locale}`,
    alternates: { languages }
  }));
}
