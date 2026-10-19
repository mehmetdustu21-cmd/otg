import type { Locale } from "@/lib/copy";

export const imageAlt: Record<Locale, { hero: string; detail: string }> = {
  en: { hero: "Dried figs with fig leaves on a warm stone surface", detail: "Whole and halved dried figs arranged in a woven tray" },
  de: { hero: "Getrocknete Feigen mit Feigenblättern auf warmem Naturstein", detail: "Ganze und aufgeschnittene getrocknete Feigen in einem Weidentablett" },
  fr: { hero: "Figues séchées et feuilles de figuier sur une pierre claire", detail: "Figues séchées entières et ouvertes dans un panier tressé" },
  it: { hero: "Fichi secchi e foglie di fico su una superficie in pietra", detail: "Fichi secchi interi e tagliati disposti in un vassoio intrecciato" },
  nl: { hero: "Gedroogde vijgen met vijgenbladeren op een lichte stenen ondergrond", detail: "Hele en gehalveerde gedroogde vijgen in een gevlochten schaal" }
};
