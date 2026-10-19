import type { Locale } from "@/lib/copy";

type AboutContent = {
  label: string;
  title: string;
  body: string;
  foundersLabel: string;
  founders: string;
  storyTitle: string;
  story: string;
  modelTitle: string;
  model: string;
  buyerTitle: string;
  buyerGuide: string;
  productionTitle: string;
  production: string;
  sourcingTitle: string;
  sourcing: string;
  qualityTitle: string;
  quality: string;
};

export const aboutCopy: Record<Locale, AboutContent> = {
  en: {
    label: "About us",
    title: "The people, product and sourcing story behind Orchard to Global",
    body: "Since 2017, Muhammed Mehmet DÃ¼ÅŸtu and Ziya Teleti have worked together from TÃ¼rkiye to build a focused dried fig and dried fruit supply business for wholesale buyers, importers, food manufacturers and retail brands.",
    foundersLabel: "Founders",
    founders: "Ziya Teleti and Muhammed Mehmet DÃ¼ÅŸtu",
    storyTitle: "A TÃ¼rkiye-born business built around dried fruit",
    story: "Orchard to Global grew from a shared understanding of TÃ¼rkiyeâ€™s dried fruit culture and the needs of buyers who require more than a product listing. Ziya Teleti and Muhammed Mehmet DÃ¼ÅŸtu started working together in 2017, developing relationships with producers, learning the details that affect dried fig quality, and building a direct way for international businesses to discuss supply. Their story is rooted in TÃ¼rkiye, where dried figs are produced, selected, packed and prepared for markets around the world. Today, they continue to combine local knowledge with an international wholesale perspective.\n\nFor Ziya and Muhammed, the business is built through conversations that are specific to each customer: what the product will be used for, how it should be packed, when it needs to arrive and which documents the destination market requires. They believe a reliable supply relationship starts by listening carefully before promising availability. That is why the Orchard to Global approach connects product knowledge with practical purchasing support, from the first sample discussion to the final delivery planning.\n\nTheir long-term goal is to make Turkish dried figs easier for professional buyers to source with clarity and confidence. Rather than treating wholesale supply as a one-size-fits-all transaction, they continue to develop a model that can respond to different volumes, packaging formats and business needs while keeping the origin and character of the product at the center.",
    modelTitle: "One team for production and supply",
    model: "The business operates with a flexible two-part model. Orchard to Global develops and offers its own production, while also sourcing additional dried fruit and dried fig products according to a buyerâ€™s specification, volume, destination market and packaging requirements. This approach helps wholesale customers compare practical options instead of being limited to a single standard item. It also gives buyers one point of contact for availability, samples, pack formats, documentation and the next steps in an order.",
    buyerTitle: "For businesses buying dried figs wholesale",
    buyerGuide: "If you are looking to buy Turkish dried figs in bulk, the right questions usually include product grade, size, moisture and texture expectations, packaging format, private-label needs, target quantity, delivery country, required documents and sample approval. Our team discusses these details directly so an inquiry can move from a general request to a realistic supply proposal. Whether you need bulk dried figs for food production, packed dried figs for retail, or a recurring wholesale supply, we can review your requirements and explain what is currently available.",
    productionTitle: "Our own production",
    production: "Our own production gives us a direct perspective on product preparation, consistency and presentation. We focus on dried figs from TÃ¼rkiye and can discuss the available product characteristics, pack sizes and current supply position with each buyer. Product information is confirmed for the individual inquiry rather than presented as a one-size-fits-all promise.",
    sourcingTitle: "Demand-based sourcing",
    sourcing: "When a customer needs a particular specification, packaging approach or additional dried fruit product, we can work through our sourcing network and review suitable options. We aim to match the request with the right origin, quality expectations, quantity and destination requirements before confirming a proposal.",
    qualityTitle: "Clear communication from inquiry to shipment",
    quality: "A wholesale order works best when expectations are clear at the beginning. We help buyers discuss samples, product details, export-related documentation, packaging, delivery planning and availability before they commit. Quality and compliance documents are shared or confirmed according to the product and destination market that apply to the order."
  },
  de: {
    label: "Ãœber uns",
    title: "Die Menschen, Produkte und Beschaffung hinter Orchard to Global",
    body: "Seit 2017 fÃ¼hren Muhammed Mehmet DÃ¼ÅŸtu und Ziya Teleti gemeinsam von TÃ¼rkiye aus ein spezialisiertes GeschÃ¤ft fÃ¼r getrocknete Feigen und TrockenfrÃ¼chte fÃ¼r GroÃŸhÃ¤ndler, Importeure und Lebensmittelunternehmen.",
    foundersLabel: "GrÃ¼nder",
    founders: "Ziya Teleti und Muhammed Mehmet DÃ¼ÅŸtu",
    storyTitle: "Ein in TÃ¼rkiye verwurzeltes TrockenfruchtgeschÃ¤ft",
    story: "Orchard to Global entstand aus dem gemeinsamen VerstÃ¤ndnis fÃ¼r die Trockenfruchtkultur in TÃ¼rkiye und fÃ¼r die Anforderungen professioneller KÃ¤ufer. Seit 2017 arbeiten Ziya Teleti und Muhammed Mehmet DÃ¼ÅŸtu zusammen, pflegen Kontakte zu Produzenten und schaffen einen direkten Weg fÃ¼r internationale Unternehmen, getrocknete Feigen und weitere TrockenfrÃ¼chte anzufragen.",
    modelTitle: "Eigene Produktion und bedarfsgerechte Beschaffung",
    model: "Wir bieten eigene Produktion an und beschaffen zusÃ¤tzlich Produkte nach Vorgaben zu QualitÃ¤t, Menge, Zielmarkt und Verpackung. So erhalten GroÃŸhandelskunden einen Ansprechpartner fÃ¼r VerfÃ¼gbarkeit, Muster, Verpackungsformate und Dokumentation.",
    buyerTitle: "FÃ¼r den Einkauf getrockneter Feigen im GroÃŸhandel",
    buyerGuide: "Wer getrocknete Feigen aus TÃ¼rkiye kaufen mÃ¶chte, sollte ProduktgrÃ¶ÃŸe, QualitÃ¤t, Verpackung, Menge, Zielland, Muster und erforderliche Unterlagen frÃ¼h besprechen. Wir prÃ¼fen die Anforderungen direkt mit dem KÃ¤ufer und entwickeln daraus ein realistisches Angebot fÃ¼r Bulk-, Retail- oder wiederkehrende Lieferungen.",
    productionTitle: "Unsere eigene Produktion",
    production: "Unsere eigene Produktion ermÃ¶glicht einen direkten Blick auf Aufbereitung, Produktdarstellung und verfÃ¼gbare PackungsgrÃ¶ÃŸen. Die konkreten Eigenschaften werden fÃ¼r jede Anfrage bestÃ¤tigt.",
    sourcingTitle: "Beschaffung nach Bedarf",
    sourcing: "Wenn eine besondere Spezifikation oder Verpackung benÃ¶tigt wird, prÃ¼fen wir passende Optionen Ã¼ber unser Beschaffungsnetzwerk und stimmen Herkunft, QualitÃ¤t, Menge und Zielmarkt ab.",
    qualityTitle: "Klare Kommunikation bis zum Versand",
    quality: "Wir besprechen Muster, Produktdetails, exportbezogene Unterlagen, Verpackung, VerfÃ¼gbarkeit und Lieferplanung, bevor eine Bestellung bestÃ¤tigt wird."
  },
  fr: {
    label: "Ã€ propos",
    title: "Les personnes, les produits et lâ€™approvisionnement derriÃ¨re Orchard to Global",
    body: "Depuis 2017, Muhammed Mehmet DÃ¼ÅŸtu et Ziya Teleti travaillent ensemble depuis la TÃ¼rkiye dans le commerce des figues sÃ©chÃ©es et des fruits secs pour les acheteurs professionnels.",
    foundersLabel: "Fondateurs",
    founders: "Ziya Teleti et Muhammed Mehmet DÃ¼ÅŸtu",
    storyTitle: "Une entreprise de fruits secs nÃ©e en TÃ¼rkiye",
    story: "Orchard to Global est nÃ©e dâ€™une connaissance directe de la culture des fruits secs en TÃ¼rkiye et des besoins des acheteurs professionnels. Depuis 2017, Ziya Teleti et Muhammed Mehmet DÃ¼ÅŸtu dÃ©veloppent des relations avec les producteurs et proposent aux entreprises internationales un contact direct pour leurs besoins en figues sÃ©chÃ©es.",
    modelTitle: "Production propre et approvisionnement selon la demande",
    model: "Nous proposons notre propre production et recherchons Ã©galement des produits selon la qualitÃ©, le volume, le marchÃ© de destination et le conditionnement souhaitÃ©s. Les acheteurs disposent ainsi dâ€™un interlocuteur pour les disponibilitÃ©s, les Ã©chantillons, les emballages et la documentation.",
    buyerTitle: "Pour acheter des figues sÃ©chÃ©es en gros",
    buyerGuide: "Un acheteur doit gÃ©nÃ©ralement prÃ©ciser le calibre, la qualitÃ©, le conditionnement, la quantitÃ©, le pays de livraison, les Ã©chantillons et les documents nÃ©cessaires. Nous Ã©tudions ces Ã©lÃ©ments directement afin de prÃ©parer une proposition rÃ©aliste pour le vrac, le retail ou les approvisionnements rÃ©guliers.",
    productionTitle: "Notre propre production",
    production: "Notre production nous permet de suivre directement la prÃ©paration, la prÃ©sentation et les formats disponibles. Les caractÃ©ristiques sont confirmÃ©es pour chaque demande.",
    sourcingTitle: "Approvisionnement sur mesure",
    sourcing: "Pour une spÃ©cification ou un emballage particulier, nous recherchons des options adaptÃ©es et vÃ©rifions lâ€™origine, la qualitÃ©, le volume et la destination.",
    qualityTitle: "Une communication claire jusquâ€™Ã  lâ€™expÃ©dition",
    quality: "Nous clarifions les Ã©chantillons, les dÃ©tails produit, les documents dâ€™exportation, le conditionnement, la disponibilitÃ© et la livraison avant confirmation."
  },
  it: {
    label: "Chi siamo",
    title: "Le persone, i prodotti e la fornitura dietro Orchard to Global",
    body: "Dal 2017, Muhammed Mehmet DÃ¼ÅŸtu e Ziya Teleti lavorano insieme dalla TÃ¼rkiye nel commercio di fichi secchi e frutta secca per acquirenti professionali.",
    foundersLabel: "Fondatori",
    founders: "Ziya Teleti e Muhammed Mehmet DÃ¼ÅŸtu",
    storyTitle: "Unâ€™attivitÃ  di frutta secca nata in TÃ¼rkiye",
    story: "Orchard to Global nasce dalla conoscenza della cultura della frutta secca in TÃ¼rkiye e dalle esigenze degli acquirenti professionali. Dal 2017 Ziya Teleti e Muhammed Mehmet DÃ¼ÅŸtu costruiscono relazioni con i produttori e offrono alle aziende internazionali un contatto diretto per lâ€™approvvigionamento di fichi secchi.",
    modelTitle: "Produzione propria e fornitura su richiesta",
    model: "Proponiamo la nostra produzione e cerchiamo anche prodotti in base a qualitÃ , quantitÃ , mercato di destinazione e confezione richiesti. Un unico interlocutore segue disponibilitÃ , campioni, formati, documenti e prossimi passi.",
    buyerTitle: "Per chi acquista fichi secchi allâ€™ingrosso",
    buyerGuide: "Ãˆ utile indicare calibro, qualitÃ , confezione, quantitÃ , paese di consegna, campioni e documenti necessari. Analizziamo questi elementi per preparare una proposta concreta per prodotto sfuso, retail o forniture ricorrenti.",
    productionTitle: "La nostra produzione",
    production: "La produzione propria ci permette di seguire direttamente preparazione, presentazione e formati disponibili. Le caratteristiche vengono confermate per ogni richiesta.",
    sourcingTitle: "Fornitura in base alla domanda",
    sourcing: "Per specifiche o confezioni particolari cerchiamo opzioni adeguate e verifichiamo origine, qualitÃ , quantitÃ  e destinazione.",
    qualityTitle: "Comunicazione chiara fino alla spedizione",
    quality: "Discutiamo campioni, dettagli del prodotto, documenti export, confezione, disponibilitÃ  e pianificazione della consegna prima della conferma."
  },
  nl: {
    label: "Over ons",
    title: "De mensen, producten en inkoop achter Orchard to Global",
    body: "Sinds 2017 werken Muhammed Mehmet DÃ¼ÅŸtu en Ziya Teleti vanuit TÃ¼rkiye samen in gedroogde vijgen en gedroogd fruit voor zakelijke kopers.",
    foundersLabel: "Oprichters",
    founders: "Ziya Teleti en Muhammed Mehmet DÃ¼ÅŸtu",
    storyTitle: "Een bedrijf voor gedroogd fruit met wortels in TÃ¼rkiye",
    story: "Orchard to Global is ontstaan vanuit kennis van de Turkse gedroogd-fruitsector en de behoeften van professionele inkopers. Sinds 2017 werken Ziya Teleti en Muhammed Mehmet DÃ¼ÅŸtu samen met producenten en bieden zij internationale bedrijven een direct aanspreekpunt voor gedroogde vijgen.",
    modelTitle: "Eigen productie en levering op aanvraag",
    model: "We bieden eigen productie en zoeken daarnaast producten volgens de gewenste kwaliteit, hoeveelheid, bestemming en verpakking. Zo hebben zakelijke klanten Ã©Ã©n aanspreekpunt voor beschikbaarheid, samples, verpakkingen en documentatie.",
    buyerTitle: "Voor inkopers van gedroogde vijgen in bulk",
    buyerGuide: "Bespreek vooraf formaat, kwaliteit, verpakking, hoeveelheid, land van levering, samples en vereiste documenten. Wij vertalen deze wensen naar een realistische optie voor bulk, retail of terugkerende leveringen.",
    productionTitle: "Onze eigen productie",
    production: "Onze eigen productie geeft ons direct inzicht in voorbereiding, presentatie en beschikbare verpakkingsformaten. Eigenschappen worden per aanvraag bevestigd.",
    sourcingTitle: "Inkoop op basis van de vraag",
    sourcing: "Voor een specifieke productspecificatie of verpakking zoeken we passende opties en controleren we herkomst, kwaliteit, volume en bestemming.",
    qualityTitle: "Duidelijke communicatie tot aan verzending",
    quality: "We bespreken samples, productdetails, exportdocumenten, verpakking, beschikbaarheid en leverplanning voordat een order wordt bevestigd."
  }
};
