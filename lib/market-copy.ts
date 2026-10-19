import type { Locale } from "@/lib/copy";

export const marketSlugs = ["germany", "netherlands", "italy", "france", "switzerland", "usa"] as const;
export type MarketSlug = (typeof marketSlugs)[number];

type MarketText = { name: string; title: string; description: string; body: string; cta: string };

const names: Record<Locale, Record<MarketSlug, string>> = {
  en: { germany: "Germany", netherlands: "the Netherlands", italy: "Italy", france: "France", switzerland: "Switzerland", usa: "the United States" },
  de: { germany: "Deutschland", netherlands: "die Niederlande", italy: "Italien", france: "Frankreich", switzerland: "die Schweiz", usa: "die USA" },
  fr: { germany: "l'Allemagne", netherlands: "les Pays-Bas", italy: "l'Italie", france: "la France", switzerland: "la Suisse", usa: "les États-Unis" },
  it: { germany: "la Germania", netherlands: "i Paesi Bassi", italy: "l'Italia", france: "la Francia", switzerland: "la Svizzera", usa: "gli Stati Uniti" },
  nl: { germany: "Duitsland", netherlands: "Nederland", italy: "Italië", france: "Frankrijk", switzerland: "Zwitserland", usa: "de Verenigde Staten" }
};

const templates: Record<Locale, { title: (name: string) => string; description: (name: string) => string; body: (name: string) => string; cta: string }> = {
  en: { title: (name) => `Dried figs supplier for buyers in ${name}`, description: (name) => `Discuss Turkish dried figs wholesale supply for importers, distributors and food businesses in ${name}.`, body: (name) => `Orchard to Global helps professional buyers in ${name} discuss dried figs from Türkiye. Share your product interest, packaging preference and approximate volume to receive current information for your business. Bulk and packed supply can be discussed, while applicable documents, availability and commercial details are confirmed for each inquiry.`, cta: "Request product details" },
  de: { title: (name) => `Lieferant für getrocknete Feigen für Käufer in ${name}`, description: (name) => `Großhandel mit getrockneten Feigen aus Türkiye für Importeure, Händler und Lebensmittelunternehmen in ${name}.`, body: (name) => `Orchard to Global spricht mit gewerblichen Käufern in ${name} über getrocknete Feigen aus Türkiye. Teilen Sie Produktinteresse, Verpackungswunsch und ungefähres Volumen, um aktuelle Informationen für Ihr Unternehmen zu erhalten. Bulk- und verpackte Ware können besprochen werden; Unterlagen, Verfügbarkeit und Konditionen werden je Anfrage bestätigt.`, cta: "Produktdetails anfragen" },
  fr: { title: (name) => `Fournisseur de figues séchées pour les acheteurs en ${name}`, description: (name) => `Approvisionnement en gros de figues séchées de Türkiye pour importateurs, distributeurs et entreprises alimentaires en ${name}.`, body: (name) => `Orchard to Global échange avec les acheteurs professionnels de ${name} au sujet de figues séchées de Türkiye. Indiquez le produit, le conditionnement et le volume approximatif pour recevoir des informations actuelles. Le vrac et le conditionnement peuvent être discutés ; les documents, la disponibilité et les conditions sont confirmés pour chaque demande.`, cta: "Demander les détails du produit" },
  it: { title: (name) => `Fornitore di fichi secchi per acquirenti in ${name}`, description: (name) => `Fornitura all'ingrosso di fichi secchi dalla Türkiye per importatori, distributori e aziende alimentari in ${name}.`, body: (name) => `Orchard to Global parla con acquirenti professionali in ${name} dei fichi secchi dalla Türkiye. Indica prodotto, confezionamento e volume approssimativo per ricevere informazioni aggiornate. La fornitura sfusa o confezionata può essere discussa; documenti, disponibilità e condizioni vengono confermati per ogni richiesta.`, cta: "Richiedi dettagli sul prodotto" },
  nl: { title: (name) => `Leverancier van gedroogde vijgen voor inkopers in ${name}`, description: (name) => `Groothandel in gedroogde vijgen uit Türkiye voor importeurs, distributeurs en voedingsbedrijven in ${name}.`, body: (name) => `Orchard to Global bespreekt gedroogde vijgen uit Türkiye met zakelijke inkopers in ${name}. Deel uw productinteresse, verpakkingsvoorkeur en ongeveer volume voor actuele informatie. Bulk- en verpakte levering kunnen worden besproken; documenten, beschikbaarheid en voorwaarden bevestigen we per aanvraag.`, cta: "Productinformatie aanvragen" }
};

export function getMarketText(locale: Locale, slug: MarketSlug): MarketText {
  const name = names[locale][slug];
  const template = templates[locale];
  return { name, title: template.title(name), description: template.description(name), body: template.body(name), cta: template.cta };
}
