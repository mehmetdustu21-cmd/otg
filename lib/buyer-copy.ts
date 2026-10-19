import type { Locale } from "@/lib/copy";

type BuyerCopy = {
  sectionLabel: string;
  sectionTitle: string;
  sectionIntro: string;
  supplyCards: { title: string; text: string }[];
  processLabel: string;
  processTitle: string;
  processSteps: { title: string; text: string }[];
  marketLabel: string;
  marketTitle: string;
  marketText: string;
  quoteCta: string;
  sampleCta: string;
  whatsappCta: string;
  responseLabel: string;
  responseText: string;
  buyerTypeLabel: string;
  buyerTypeOptions: string[];
  productInterestLabel: string;
  productOptions: string[];
  volumeLabel: string;
  volumeOptions: string[];
  packagingLabel: string;
  packagingOptions: string[];
  phoneHint: string;
  privacyLink: string;
  brochureCta: string;
};

export const buyerCopy: Record<Locale, BuyerCopy> = {
  en: {
    sectionLabel: "For professional buyers",
    sectionTitle: "A clear route from product question to supply discussion.",
    sectionIntro: "We work with importers, distributors, retailers and food businesses looking for dried figs from Türkiye. Tell us what you need and we will confirm current product details, availability, packaging and applicable documents directly.",
    supplyCards: [
      { title: "Bulk supply", text: "Discuss bulk dried figs for import, distribution or food production. Current formats and availability are confirmed per inquiry." },
      { title: "Packed supply", text: "Ask about packed or retail-ready options when your market needs a defined presentation. Packaging details are confirmed with the order brief." },
      { title: "Samples first", text: "Request a sample conversation before placing an order. We will guide you on the information needed for a useful review." }
    ],
    processLabel: "How an inquiry works",
    processTitle: "A practical B2B conversation, without a fixed order path.",
    processSteps: [
      { title: "1. Share your brief", text: "Tell us your market, product interest, packaging preference and approximate volume." },
      { title: "2. Review current details", text: "We confirm the product and supply information that applies to your request." },
      { title: "3. Discuss samples or pricing", text: "If relevant, we discuss samples, commercial terms and the next step directly." }
    ],
    marketLabel: "Europe · USA · Switzerland",
    marketTitle: "Built for buyers who need a direct supplier conversation.",
    marketText: "Our public pages cover English, German, French, Italian and Dutch. For a quote or sample discussion, use the form or contact us directly. We do not publish unconfirmed certificates, prices or shipping promises.",
    quoteCta: "Request a quote",
    sampleCta: "Request a sample",
    whatsappCta: "Message on WhatsApp",
    responseLabel: "Direct contact",
    responseText: "Share your business email and requirements. We will use the details only to respond to and manage your inquiry.",
    buyerTypeLabel: "I am a",
    buyerTypeOptions: ["Importer", "Distributor / wholesaler", "Retailer", "Food manufacturer", "Other business buyer"],
    productInterestLabel: "Product interest",
    productOptions: ["Whole dried figs", "Bulk supply", "Packed supply", "Sample request", "Not sure yet"],
    volumeLabel: "Estimated volume",
    volumeOptions: ["I am comparing options", "Small trial order", "Regular wholesale supply", "Large-volume requirement", "To be discussed"],
    packagingLabel: "Packaging preference",
    packagingOptions: ["Bulk / industrial", "Packed / retail-ready", "Open to options", "To be discussed"],
    phoneHint: "Phone (optional)",
    privacyLink: "Read our privacy information",
    brochureCta: "Download buyer brief"
  },
  de: {
    sectionLabel: "Für gewerbliche Käufer",
    sectionTitle: "Vom Produktwunsch zum klaren Liefergespräch.",
    sectionIntro: "Wir arbeiten mit Importeuren, Händlern, Einzelhändlern und Lebensmittelunternehmen, die getrocknete Feigen aus Türkiye suchen. Teilen Sie uns Ihren Bedarf mit; aktuelle Produktdaten, Verfügbarkeit, Verpackung und passende Unterlagen klären wir direkt.",
    supplyCards: [
      { title: "Bulk-Lieferung", text: "Sprechen Sie mit uns über Bulk-Ware für Import, Handel oder Lebensmittelproduktion. Formate und Verfügbarkeit werden je Anfrage bestätigt." },
      { title: "Verpackte Ware", text: "Fragen Sie nach verpackten oder verkaufsfertigen Optionen. Die Verpackungsdetails werden anhand Ihres Briefings bestätigt." },
      { title: "Zuerst Muster", text: "Besprechen Sie eine Musteranfrage vor einer Bestellung. Wir nennen Ihnen die Informationen für eine sinnvolle Prüfung." }
    ],
    processLabel: "So funktioniert die Anfrage",
    processTitle: "Ein praktisches B2B-Gespräch ohne starren Bestellweg.",
    processSteps: [
      { title: "1. Bedarf teilen", text: "Nennen Sie Markt, Produktinteresse, Verpackung und ungefähres Volumen." },
      { title: "2. Aktuelle Details prüfen", text: "Wir bestätigen die für Ihre Anfrage geltenden Produkt- und Lieferinformationen." },
      { title: "3. Muster oder Preis besprechen", text: "Bei Bedarf klären wir Muster, Konditionen und die nächsten Schritte direkt." }
    ],
    marketLabel: "Europa · USA · Schweiz",
    marketTitle: "Für Käufer, die direkt mit einem Lieferanten sprechen möchten.",
    marketText: "Unsere Seiten sind auf Englisch, Deutsch, Französisch, Italienisch und Niederländisch verfügbar. Für ein Angebot oder eine Musteranfrage nutzen Sie das Formular oder kontaktieren Sie uns direkt. Unbestätigte Zertifikate, Preise oder Lieferzusagen veröffentlichen wir nicht.",
    quoteCta: "Angebot anfragen",
    sampleCta: "Muster anfragen",
    whatsappCta: "Über WhatsApp schreiben",
    responseLabel: "Direkter Kontakt",
    responseText: "Teilen Sie Ihre geschäftliche E-Mail-Adresse und Ihren Bedarf. Wir verwenden die Angaben nur zur Beantwortung und Bearbeitung Ihrer Anfrage.",
    buyerTypeLabel: "Ich bin",
    buyerTypeOptions: ["Importeur", "Händler / Großhändler", "Einzelhändler", "Lebensmittelhersteller", "Anderer gewerblicher Käufer"],
    productInterestLabel: "Produktinteresse",
    productOptions: ["Ganze getrocknete Feigen", "Bulk-Lieferung", "Verpackte Ware", "Musteranfrage", "Noch nicht sicher"],
    volumeLabel: "Geschätztes Volumen",
    volumeOptions: ["Ich vergleiche Optionen", "Kleine Testbestellung", "Regelmäßige Großhandelslieferung", "Großes Volumen", "Zu besprechen"],
    packagingLabel: "Verpackungswunsch",
    packagingOptions: ["Bulk / industriell", "Verpackt / verkaufsfertig", "Offen für Optionen", "Zu besprechen"],
    phoneHint: "Telefon (optional)",
    privacyLink: "Datenschutzinformationen lesen",
    brochureCta: "Käufer-Brief herunterladen"
  },
  fr: {
    sectionLabel: "Pour les acheteurs professionnels",
    sectionTitle: "De la question produit à une discussion d'approvisionnement claire.",
    sectionIntro: "Nous travaillons avec des importateurs, distributeurs, détaillants et entreprises alimentaires à la recherche de figues séchées de Türkiye. Indiquez-nous votre besoin : les détails actuels, la disponibilité, le conditionnement et les documents applicables sont confirmés directement.",
    supplyCards: [
      { title: "Approvisionnement en vrac", text: "Discutez d'une fourniture en vrac pour l'importation, la distribution ou la production alimentaire. Les formats et la disponibilité sont confirmés pour chaque demande." },
      { title: "Conditionnement", text: "Demandez des options conditionnées ou prêtes pour la vente. Les détails sont confirmés selon votre brief." },
      { title: "Commencer par un échantillon", text: "Demandez à discuter d'un échantillon avant une commande. Nous vous indiquons les informations utiles à fournir." }
    ],
    processLabel: "Le parcours d'une demande",
    processTitle: "Un échange B2B pratique, sans parcours de commande imposé.",
    processSteps: [
      { title: "1. Décrire le besoin", text: "Indiquez votre marché, le produit recherché, le conditionnement et le volume approximatif." },
      { title: "2. Vérifier les détails actuels", text: "Nous confirmons les informations produit et fourniture qui correspondent à votre demande." },
      { title: "3. Discuter échantillon ou prix", text: "Si nécessaire, nous échangeons sur les échantillons, les conditions et la prochaine étape." }
    ],
    marketLabel: "Europe · États-Unis · Suisse",
    marketTitle: "Pour les acheteurs qui veulent parler directement à un fournisseur.",
    marketText: "Nos pages sont disponibles en anglais, allemand, français, italien et néerlandais. Pour un devis ou un échantillon, utilisez le formulaire ou contactez-nous directement. Nous ne publions pas de certificats, prix ou promesses de livraison non confirmés.",
    quoteCta: "Demander un devis",
    sampleCta: "Demander un échantillon",
    whatsappCta: "Écrire sur WhatsApp",
    responseLabel: "Contact direct",
    responseText: "Indiquez votre e-mail professionnel et votre besoin. Ces informations servent uniquement à répondre et à suivre votre demande.",
    buyerTypeLabel: "Je suis",
    buyerTypeOptions: ["Importateur", "Distributeur / grossiste", "Détaillant", "Fabricant alimentaire", "Autre acheteur professionnel"],
    productInterestLabel: "Produit recherché",
    productOptions: ["Figues séchées entières", "Approvisionnement en vrac", "Produit conditionné", "Demande d'échantillon", "Je ne sais pas encore"],
    volumeLabel: "Volume estimé",
    volumeOptions: ["Je compare les options", "Petite commande test", "Approvisionnement régulier", "Besoin de gros volume", "À discuter"],
    packagingLabel: "Préférence de conditionnement",
    packagingOptions: ["Vrac / industriel", "Conditionné / prêt à vendre", "Ouvert aux options", "À discuter"],
    phoneHint: "Téléphone (facultatif)",
    privacyLink: "Lire les informations de confidentialité",
    brochureCta: "Télécharger le brief acheteur"
  },
  it: {
    sectionLabel: "Per acquirenti professionali",
    sectionTitle: "Dalla richiesta sul prodotto a una discussione chiara sulla fornitura.",
    sectionIntro: "Lavoriamo con importatori, distributori, rivenditori e aziende alimentari interessati ai fichi secchi dalla Türkiye. Raccontaci cosa cerchi: dettagli aggiornati, disponibilità, confezionamento e documenti applicabili vengono verificati direttamente.",
    supplyCards: [
      { title: "Fornitura sfusa", text: "Parliamo di fichi secchi sfusi per importazione, distribuzione o produzione alimentare. Formati e disponibilità vengono confermati per ogni richiesta." },
      { title: "Fornitura confezionata", text: "Chiedi informazioni su opzioni confezionate o pronte per la vendita. I dettagli vengono confermati in base al tuo brief." },
      { title: "Prima il campione", text: "Richiedi una conversazione sul campione prima di ordinare. Ti indicheremo le informazioni utili per la valutazione." }
    ],
    processLabel: "Come funziona la richiesta",
    processTitle: "Un confronto B2B pratico, senza un percorso d'ordine fisso.",
    processSteps: [
      { title: "1. Condividi il brief", text: "Indica mercato, prodotto di interesse, confezionamento e volume approssimativo." },
      { title: "2. Verifichiamo i dettagli", text: "Confermiamo le informazioni di prodotto e fornitura pertinenti alla richiesta." },
      { title: "3. Campione o prezzo", text: "Se utile, discutiamo campioni, condizioni commerciali e prossimo passo." }
    ],
    marketLabel: "Europa · USA · Svizzera",
    marketTitle: "Per chi vuole parlare direttamente con un fornitore.",
    marketText: "Le pagine sono disponibili in inglese, tedesco, francese, italiano e olandese. Per un preventivo o un campione, usa il modulo o contattaci direttamente. Non pubblichiamo certificati, prezzi o promesse di consegna non verificati.",
    quoteCta: "Richiedi un preventivo",
    sampleCta: "Richiedi un campione",
    whatsappCta: "Scrivi su WhatsApp",
    responseLabel: "Contatto diretto",
    responseText: "Indica la tua e-mail aziendale e le tue esigenze. Usiamo i dati solo per rispondere e gestire la richiesta.",
    buyerTypeLabel: "Sono",
    buyerTypeOptions: ["Importatore", "Distributore / grossista", "Rivenditore", "Produttore alimentare", "Altro acquirente professionale"],
    productInterestLabel: "Prodotto di interesse",
    productOptions: ["Fichi secchi interi", "Fornitura sfusa", "Fornitura confezionata", "Richiesta campione", "Non ho ancora deciso"],
    volumeLabel: "Volume stimato",
    volumeOptions: ["Sto confrontando le opzioni", "Piccolo ordine di prova", "Fornitura regolare", "Esigenza di grandi volumi", "Da discutere"],
    packagingLabel: "Preferenza di confezionamento",
    packagingOptions: ["Sfuso / industriale", "Confezionato / pronto vendita", "Aperto alle opzioni", "Da discutere"],
    phoneHint: "Telefono (facoltativo)",
    privacyLink: "Leggi le informazioni sulla privacy",
    brochureCta: "Scarica il brief per acquirenti"
  },
  nl: {
    sectionLabel: "Voor zakelijke inkopers",
    sectionTitle: "Van productvraag naar een helder gesprek over levering.",
    sectionIntro: "Wij werken met importeurs, distributeurs, retailers en voedingsbedrijven die gedroogde vijgen uit Türkiye zoeken. Vertel ons wat u nodig heeft; actuele productinformatie, beschikbaarheid, verpakking en toepasselijke documenten bevestigen we rechtstreeks.",
    supplyCards: [
      { title: "Bulklevering", text: "Bespreek bulk gedroogde vijgen voor import, distributie of voedselproductie. Formaten en beschikbaarheid worden per aanvraag bevestigd." },
      { title: "Verpakte levering", text: "Vraag naar verpakte of retailklare opties. De verpakkingsdetails worden op basis van uw briefing bevestigd." },
      { title: "Eerst een sample", text: "Bespreek een sample voordat u bestelt. We geven aan welke informatie nodig is voor een goede beoordeling." }
    ],
    processLabel: "Zo werkt een aanvraag",
    processTitle: "Een praktisch B2B-gesprek, zonder vaste bestelroute.",
    processSteps: [
      { title: "1. Deel uw briefing", text: "Vertel ons uw markt, productinteresse, verpakkingsvoorkeur en ongeveer volume." },
      { title: "2. Actuele details bekijken", text: "We bevestigen de product- en leveringsinformatie die op uw aanvraag van toepassing is." },
      { title: "3. Sample of prijs bespreken", text: "Als het relevant is, bespreken we samples, voorwaarden en de volgende stap rechtstreeks." }
    ],
    marketLabel: "Europa · VS · Zwitserland",
    marketTitle: "Voor inkopers die rechtstreeks met een leverancier willen spreken.",
    marketText: "Onze pagina's zijn beschikbaar in het Engels, Duits, Frans, Italiaans en Nederlands. Gebruik het formulier of neem rechtstreeks contact op voor een offerte of sample. We publiceren geen onbevestigde certificaten, prijzen of leveringsbeloften.",
    quoteCta: "Offerte aanvragen",
    sampleCta: "Sample aanvragen",
    whatsappCta: "Bericht via WhatsApp",
    responseLabel: "Direct contact",
    responseText: "Deel uw zakelijke e-mailadres en behoefte. We gebruiken de gegevens alleen om uw aanvraag te beantwoorden en te beheren.",
    buyerTypeLabel: "Ik ben een",
    buyerTypeOptions: ["Importeur", "Distributeur / groothandel", "Retailer", "Voedingsproducent", "Andere zakelijke inkoper"],
    productInterestLabel: "Productinteresse",
    productOptions: ["Hele gedroogde vijgen", "Bulklevering", "Verpakte levering", "Sampleaanvraag", "Nog niet zeker"],
    volumeLabel: "Geschat volume",
    volumeOptions: ["Ik vergelijk opties", "Kleine proeforder", "Regelmatige groothandelslevering", "Grote volumebehoefte", "Te bespreken"],
    packagingLabel: "Verpakkingsvoorkeur",
    packagingOptions: ["Bulk / industrieel", "Verpakt / retailklaar", "Open voor opties", "Te bespreken"],
    phoneHint: "Telefoon (optioneel)",
    privacyLink: "Lees onze privacy-informatie",
    brochureCta: "Download buyer brief"
  }
};
