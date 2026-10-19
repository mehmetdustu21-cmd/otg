export const languageLocalePaths = {
  "en-US": "en", "en-CH": "en", "de-DE": "de", "de-CH": "de",
  "fr-FR": "fr", "fr-CH": "fr", "it-IT": "it", "it-CH": "it", "nl-NL": "nl"
} as const;

export function alternateLanguages(origin: string, suffix = "") {
  return {
    ...Object.fromEntries(Object.entries(languageLocalePaths).map(([tag, locale]) => [tag, `${origin}/${locale}${suffix}`])),
    "x-default": `${origin}/en${suffix}`
  };
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const targetMarkets = ["United States", "Switzerland", "Germany", "Netherlands", "Italy", "France"] as const;
