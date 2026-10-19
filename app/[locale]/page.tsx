import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandLockup } from "@/components/brand-lockup";
import { ContactForm } from "@/components/contact-form";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { TrackableLink } from "@/components/trackable-link";
import { buyerCopy } from "@/lib/buyer-copy";
import { copy, isLocale, languageLabel, locales, type Locale } from "@/lib/copy";
import { faqCopy } from "@/lib/faq-copy";
import { imageAlt } from "@/lib/image-copy";
import { alternateLanguages, safeJsonLd, targetMarkets } from "@/lib/seo";
import { recordPageView } from "@/lib/analytics";
import { getSiteSettings } from "@/lib/site-settings";

type PageProps = { params: Promise<{ locale: string }> };
const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const localeTag: Record<Locale, string> = { en: "en_US", de: "de_DE", fr: "fr_FR", it: "it_IT", nl: "nl_NL" };
const mainNavigationLabel: Record<Locale, string> = {
  en: "Main navigation", de: "Hauptnavigation", fr: "Navigation principale", it: "Navigazione principale", nl: "Hoofdnavigatie"
};
const whatsappHref = "https://wa.me/41783360425?text=Hello%2C%20I%20am%20interested%20in%20wholesale%20dried%20figs.";

export const dynamicParams = false;
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const locale = value as Locale;
  const text = copy[locale];
  const socialImage = `${origin ?? ""}/images/dried-figs-hero.webp`;
  return {
    title: { absolute: `${text.title} | Orchard to Global` },
    description: text.description,
    keywords: [text.market, ...text.seoKeywords],
    ...(origin ? {
      metadataBase: new URL(origin),
      alternates: { canonical: `${origin}/${locale}`, languages: alternateLanguages(origin) },
      openGraph: {
        type: "website" as const,
        siteName: "Orchard to Global",
        title: text.title,
        description: text.description,
        url: `${origin}/${locale}`,
        locale: localeTag[locale],
        images: [{ url: socialImage, width: 1920, height: 1080, alt: imageAlt[locale].hero }]
      },
      twitter: { card: "summary_large_image" as const, title: text.title, description: text.description, images: [socialImage] }
    } : {
      openGraph: { type: "website" as const, siteName: "Orchard to Global", title: text.title, description: text.description, locale: localeTag[locale] },
      twitter: { card: "summary" as const, title: text.title, description: text.description }
    })
  };
}

export default async function LocalizedHome({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value as Locale;
  const text = copy[locale];
  const buyer = buyerCopy[locale];
  await recordPageView(`/${locale}`);
  const contact = await getSiteSettings();
  const faq = faqCopy[locale];
  const structuredData = origin ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Orchard to Global",
        url: origin,
        logo: `${origin}/images/orchard-mark.png`,
        founder: [
          { "@type": "Person", name: "Ziya Teleti" },
          { "@type": "Person", name: "Muhammed Mehmet Düştu" }
        ],
        email: contact.contact_email,
        areaServed: targetMarkets.map((name) => ({ "@type": "Country", name })),
        contactPoint: [{
          "@type": "ContactPoint",
          contactType: "sales",
          email: contact.contact_email,
          telephone: [contact.phone_primary, contact.phone_secondary],
          availableLanguage: ["English", "German", "French", "Italian", "Dutch"]
        }]
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: "Orchard to Global",
        inLanguage: locale,
        publisher: { "@id": `${origin}/#organization` }
      }
    ]
  } : null;

  return (
    <div className="site" lang={locale}>
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }} />}
      <header className="site-header">
        <BrandLockup href={`/${locale}`} />
        <nav className="main-nav" aria-label={mainNavigationLabel[locale]}>
          <a href="#supply">{text.navSupply}</a>
          <a href="#documentation">{text.navDocs}</a>
          <a href="#contact">{text.navContact}</a>
          <Link href={`/${locale}/about`}>{text.navAbout}</Link>
          <Link href={`/${locale}/faq`}>{faq.navLabel}</Link>
        </nav>
        <div className="header-actions">
          <LocaleSwitcher current={locale} label={languageLabel[locale]} />
          <a className="header-cta" href="#contact">{text.navCta}</a>
        </div>
        <details className="mobile-menu">
          <summary aria-label={text.menuLabel}><span className="menu-icon" aria-hidden="true"><i /><i /><i /></span><span>{text.menuLabel}</span></summary>
          <nav className="mobile-menu-panel" aria-label={mainNavigationLabel[locale]}>
            <a href="#supply">{text.navSupply}</a>
            <a href="#documentation">{text.navDocs}</a>
            <a href="#contact">{text.navContact}</a>
            <Link href={`/${locale}/about`}>{text.navAbout}</Link>
            <Link href={`/${locale}/faq`}>{faq.navLabel}</Link>
          </nav>
        </details>
      </header>

      <main>
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{text.eyebrow}</p>
            <h1>{text.h1}</h1>
            <p className="hero-lede">{text.subheading}</p>
            <div className="hero-actions">
              <TrackableLink className="button button-dark" href="#contact" eventName="quote_click">{buyer.quoteCta}</TrackableLink>
              <TrackableLink className="text-link" href="#contact" eventName="sample_click">{buyer.sampleCta}</TrackableLink>
            </div>
          </div>
          <div className="hero-visual">
            <Image src="/images/dried-figs-hero.webp" alt={imageAlt[locale].hero} fill priority sizes="(max-width: 760px) 100vw, 58vw" className="hero-image" />
          </div>
        </section>

        <section className="supply-section section-wrap" id="supply">
          <div className="section-heading"><p className="eyebrow">01 / {text.navSupply}</p><h2>{text.supplyTitle}</h2></div>
          <div className="supply-content">
            <div className="supply-copy">
              <p className="section-lede">{text.productIntro}</p>
            </div>
            <figure className="detail-figure">
              <Image src="/images/dried-figs-detail.webp" alt={imageAlt[locale].detail} width={1920} height={1280} sizes="(max-width: 760px) 100vw, 42vw" />
            </figure>
          </div>
        </section>

        <section className="buyer-section section-wrap" id="buyers">
          <div className="section-heading"><p className="eyebrow">{buyer.sectionLabel}</p><h2>{buyer.sectionTitle}</h2></div>
          <p className="buyer-intro section-lede">{buyer.sectionIntro}</p>
          <div className="buyer-card-grid">{buyer.supplyCards.map((card, index) => <article className="buyer-card" key={card.title}><span className="point-index">0{index + 1}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}</div>
          <div className="buyer-actions"><TrackableLink className="button button-dark" href="#contact" eventName="quote_click">{buyer.quoteCta}</TrackableLink><TrackableLink className="button button-outline" href="/downloads/orchard-to-global-buyer-brief.pdf" eventName="brochure_download" download>{buyer.brochureCta}</TrackableLink></div>
        </section>

        <section className="process-section">
          <div className="process-inner section-wrap">
            <div><p className="eyebrow eyebrow-light">{buyer.processLabel}</p><h2>{buyer.processTitle}</h2></div>
            <div className="process-steps">{buyer.processSteps.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
          </div>
        </section>

        <section className="market-section section-wrap">
          <div><p className="eyebrow">{buyer.marketLabel}</p><h2>{buyer.marketTitle}</h2></div>
          <div><p className="section-lede">{buyer.marketText}</p><TrackableLink className="text-link" href={whatsappHref} target="_blank" rel="noreferrer" eventName="whatsapp_click">{buyer.whatsappCta}</TrackableLink></div>
        </section>

        <section className="documentation-section" id="documentation">
          <div className="documentation-inner section-wrap">
            <div className="documentation-heading"><p className="eyebrow eyebrow-light">02 / {text.docsLabel}</p><h2>{text.docsTitle}</h2></div>
            <div className="documentation-copy"><p>{text.documentationCopy}</p><a className="light-link" href="#contact">{text.navContact}</a></div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-intro">
            <p className="eyebrow">03 / {text.navContact}</p><h2>{text.contactSection}</h2><p className="section-lede">{text.formIntro}</p>
            <div className="contact-details">
              <div className="contact-detail"><span className="detail-label">{text.locationsLabel}</span><p>{contact.contact_locations}</p></div>
              <div className="contact-detail"><span className="detail-label">{text.emailLabel}</span><TrackableLink href={`mailto:${contact.contact_email}`} eventName="email_click">{contact.contact_email}</TrackableLink></div>
              <div className="contact-detail"><span className="detail-label">{text.phoneLabel}</span><a href={`tel:${contact.phone_primary.replace(/[^+\d]/g, "")}`}>{contact.phone_primary}</a><a href={`tel:${contact.phone_secondary.replace(/[^+\d]/g, "")}`}>{contact.phone_secondary}</a></div>
              <TrackableLink className="contact-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" eventName="whatsapp_click">{buyer.whatsappCta}</TrackableLink>
            </div>
          </div>
          <div className="contact-form-panel"><div className="form-heading"><h3>{text.formTitle}</h3></div><ContactForm locale={locale} /></div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <BrandLockup href={`/${locale}`} footer />
        <nav className="footer-links" aria-label={mainNavigationLabel[locale]}>
          <Link href={`/${locale}/about`}>{text.navAbout}</Link>
          <Link href={`/${locale}/faq`}>{faq.navLabel}</Link>
          <a href="#contact">{text.navContact}</a>
          <Link href={`/${locale}/privacy`}>{buyer.privacyLink}</Link>
        </nav>
      </footer>
    </div>
  );
}
