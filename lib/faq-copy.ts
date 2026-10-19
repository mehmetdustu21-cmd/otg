import type { Locale } from "@/lib/copy";

export type FaqEntry = { question: string; answer: string };

export const faqCopy: Record<Locale, {
  navLabel: string;
  homeLabel: string;
  contactLabel: string;
  title: string;
  description: string;
  intro: string;
  keywords: string[];
  questions: FaqEntry[];
}> = {
  en: {
    navLabel: "FAQ", homeLabel: "Home", contactLabel: "Contact our team",
    title: "Dried Fig Wholesale FAQs",
    description: "Answers about Turkish dried fig origin, minimum order quantity, bulk or packed supply, samples and export documentation.",
    intro: "Answers for wholesale buyers about origin, supply options, samples and documentation. For current product details and availability, contact us directly.",
    keywords: ["dried figs wholesale FAQ", "Turkish dried fig supplier", "bulk dried figs", "dried fig sample request", "dried fig export documents"],
    questions: [
      { question: "Where do your dried figs come from?", answer: "We supply dried figs from Türkiye. Contact us for current product details and availability." },
      { question: "Is there a minimum order quantity?", answer: "There is no minimum order quantity. We can discuss a supply option based on your inquiry." },
      { question: "Can I request bulk or packed supply?", answer: "Bulk or packed options can be discussed. Contact us to confirm current availability and the details that apply to your order." },
      { question: "How do I request a sample?", answer: "Send us an inquiry with your sample request. We will discuss the request and current sample availability directly." },
      { question: "Which quality or export documents are available?", answer: "Applicable quality and export-compliance documents can be discussed or shared on request after we confirm which documents apply." },
      { question: "How can I get current product information?", answer: "Email or call us using the contact details on this site. We confirm product details, availability and sample requests directly." }
    ]
  },
  de: {
    navLabel: "FAQ", homeLabel: "Startseite", contactLabel: "Kontakt aufnehmen",
    title: "Häufige Fragen zu getrockneten Feigen",
    description: "Antworten zu Herkunft, Mindestbestellmenge, Bulk- oder Packware, Mustern und Exportdokumenten für getrocknete Feigen.",
    intro: "Antworten für Geschäftskunden zu Herkunft, Lieferoptionen, Mustern und Dokumenten. Aktuelle Produktdetails und Verfügbarkeit klären wir direkt mit Ihnen.",
    keywords: ["getrocknete Feigen Großhandel FAQ", "Feigen Lieferant Türkiye", "Bulk Feigen", "Feigen Muster anfragen", "Exportdokumente Feigen"],
    questions: [
      { question: "Woher stammen die getrockneten Feigen?", answer: "Wir liefern getrocknete Feigen aus Türkiye. Aktuelle Produktdetails und Verfügbarkeit klären wir gerne direkt mit Ihnen." },
      { question: "Gibt es eine Mindestbestellmenge?", answer: "Es gibt keine Mindestbestellmenge. Eine passende Lieferoption besprechen wir auf Grundlage Ihrer Anfrage." },
      { question: "Sind Bulk- oder Packware möglich?", answer: "Bulk- oder Packware kann besprochen werden. Kontaktieren Sie uns, um aktuelle Verfügbarkeit und die Details Ihrer Anfrage zu klären." },
      { question: "Wie kann ich ein Muster anfragen?", answer: "Senden Sie uns Ihre Anfrage mit dem Musterwunsch. Wir besprechen die Anfrage und die aktuelle Musterverfügbarkeit direkt." },
      { question: "Welche Qualitäts- oder Exportdokumente sind verfügbar?", answer: "Anwendbare Qualitäts- und Exportdokumente können auf Anfrage besprochen oder geteilt werden, nachdem wir geklärt haben, welche Dokumente zutreffen." },
      { question: "Wie erhalte ich aktuelle Produktinformationen?", answer: "Schreiben Sie uns eine E-Mail oder rufen Sie uns über die Kontaktdaten auf dieser Website an. Produktdetails, Verfügbarkeit und Musteranfragen klären wir direkt." }
    ]
  },
  fr: {
    navLabel: "FAQ", homeLabel: "Accueil", contactLabel: "Nous contacter",
    title: "FAQ sur les figues séchées en gros",
    description: "Réponses sur l’origine des figues séchées, la quantité minimale, le vrac, le conditionnement, les échantillons et les documents.",
    intro: "Réponses destinées aux acheteurs professionnels sur l’origine, l’approvisionnement, les échantillons et les documents. Contactez-nous pour les informations et disponibilités actuelles.",
    keywords: ["figues séchées en gros FAQ", "fournisseur figues Turquie", "figues séchées en vrac", "demande échantillon figues", "documents export figues"],
    questions: [
      { question: "D’où viennent vos figues séchées ?", answer: "Nous fournissons des figues séchées de Türkiye. Contactez-nous pour connaître les informations sur le produit et les disponibilités actuelles." },
      { question: "Y a-t-il une quantité minimale de commande ?", answer: "Aucune quantité minimale de commande n’est imposée. Nous pouvons discuter d’une option d’approvisionnement adaptée à votre demande." },
      { question: "Peut-on demander du vrac ou des produits conditionnés ?", answer: "Les options en vrac ou conditionnées peuvent être discutées. Contactez-nous pour confirmer les disponibilités actuelles et les détails applicables à votre commande." },
      { question: "Comment demander un échantillon ?", answer: "Envoyez-nous une demande en précisant votre souhait d’échantillon. Nous discuterons directement de la demande et des disponibilités actuelles." },
      { question: "Quels documents de qualité ou d’exportation sont disponibles ?", answer: "Les documents applicables relatifs à la qualité et à la conformité à l’exportation peuvent être discutés ou communiqués sur demande, après confirmation de leur portée." },
      { question: "Comment obtenir des informations produit à jour ?", answer: "Écrivez-nous ou appelez-nous grâce aux coordonnées affichées sur ce site. Nous confirmons directement les détails du produit, les disponibilités et les demandes d’échantillons." }
    ]
  },
  it: {
    navLabel: "FAQ", homeLabel: "Home", contactLabel: "Contattaci",
    title: "FAQ sui fichi secchi all’ingrosso",
    description: "Informazioni su origine, quantitativo minimo, fornitura sfusa o confezionata, campioni e documenti per l’esportazione.",
    intro: "Risposte per gli acquirenti professionali su origine, opzioni di fornitura, campioni e documentazione. Contattaci per i dettagli aggiornati e la disponibilità.",
    keywords: ["fichi secchi all’ingrosso FAQ", "fornitore fichi Türkiye", "fichi secchi sfusi", "richiedere campioni fichi", "documenti export fichi"],
    questions: [
      { question: "Da dove provengono i fichi secchi?", answer: "Forniamo fichi secchi dalla Türkiye. Contattaci per i dettagli aggiornati sul prodotto e sulla disponibilità." },
      { question: "È previsto un quantitativo minimo d’ordine?", answer: "Non è previsto un quantitativo minimo d’ordine. Possiamo discutere una fornitura adatta alla tua richiesta." },
      { question: "Posso richiedere una fornitura sfusa o confezionata?", answer: "Le opzioni sfuse o confezionate si possono discutere. Contattaci per confermare la disponibilità attuale e i dettagli applicabili al tuo ordine." },
      { question: "Come posso richiedere un campione?", answer: "Inviaci una richiesta indicando che desideri un campione. Discuteremo direttamente la richiesta e la disponibilità attuale." },
      { question: "Quali documenti di qualità o per l’esportazione sono disponibili?", answer: "I documenti applicabili sulla qualità e sulla conformità all’esportazione possono essere discussi o condivisi su richiesta, dopo averne confermato l’applicabilità." },
      { question: "Come ottengo informazioni aggiornate sul prodotto?", answer: "Scrivici o chiamaci usando i recapiti presenti su questo sito. Confermiamo direttamente i dettagli del prodotto, la disponibilità e le richieste di campioni." }
    ]
  },
  nl: {
    navLabel: "FAQ", homeLabel: "Home", contactLabel: "Neem contact op",
    title: "Gedroogde vijgen: veelgestelde vragen",
    description: "Informatie over herkomst, minimale bestelhoeveelheid, bulk of verpakking, samples en exportdocumentatie voor gedroogde vijgen.",
    intro: "Antwoorden voor zakelijke inkopers over herkomst, leveringsvormen, samples en documentatie. Neem contact op voor actuele productinformatie en beschikbaarheid.",
    keywords: ["gedroogde vijgen groothandel FAQ", "Turkse vijgen leverancier", "gedroogde vijgen bulk", "vijgen sample aanvragen", "exportdocumenten vijgen"],
    questions: [
      { question: "Waar komen de gedroogde vijgen vandaan?", answer: "Wij leveren gedroogde vijgen uit Türkiye. Neem contact op voor actuele productinformatie en beschikbaarheid." },
      { question: "Is er een minimale bestelhoeveelheid?", answer: "Er geldt geen minimale bestelhoeveelheid. We bespreken graag een leveringsoptie op basis van uw aanvraag." },
      { question: "Kan ik bulk of verpakte levering aanvragen?", answer: "Bulk- of verpakte opties zijn bespreekbaar. Neem contact op om de actuele beschikbaarheid en details voor uw order te bevestigen." },
      { question: "Hoe vraag ik een sample aan?", answer: "Stuur ons een aanvraag met uw verzoek om een sample. We bespreken uw aanvraag en de actuele beschikbaarheid rechtstreeks." },
      { question: "Welke kwaliteits- of exportdocumenten zijn beschikbaar?", answer: "Toepasselijke kwaliteits- en exportdocumenten kunnen op verzoek worden besproken of gedeeld nadat is bevestigd welke documenten van toepassing zijn." },
      { question: "Hoe ontvang ik actuele productinformatie?", answer: "Mail of bel ons via de contactgegevens op deze website. We bevestigen productdetails, beschikbaarheid en sampleaanvragen rechtstreeks." }
    ]
  }
};
