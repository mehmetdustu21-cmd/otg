import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { copy, imageDisclosure, isLocale, languageLabel, locales, type Locale } from "@/lib/copy";

type PageProps = { params: Promise<{ locale: string }> };
const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const languages = origin ? {
  "en-US": `${origin}/en`, "en-CH": `${origin}/en`, "de-DE": `${origin}/de`, "de-CH": `${origin}/de`,
  "fr-FR": `${origin}/fr`, "fr-CH": `${origin}/fr`, "it-IT": `${origin}/it`,
  "it-CH": `${origin}/it`, "nl-NL": `${origin}/nl`, "x-default": `${origin}/en`
} : undefined;

const contactLocations: Record<Locale, string> = {
  en: "Zurich · Istanbul · Aydın",
  de: "Zürich · Istanbul · Aydın",
  fr: "Zurich · Istanbul · Aydın",
  it: "Zurigo · Istanbul · Aydın",
  nl: "Zürich · Istanbul · Aydın"
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const locale = value as Locale;
  const text = copy[locale];
  const localeTag = { en: "en_US", de: "de_DE", fr: "fr_FR", it: "it_IT", nl: "nl_NL" }[locale];
  return {
    title: text.title,
    description: text.description,
    keywords: [text.market, ...text.seoKeywords],
    ...(origin ? {
      metadataBase: new URL(origin),
      alternates: { canonical: `${origin}/${locale}`, languages },
      openGraph: { type: "website" as const, siteName: "Orchard to Global", title: text.title, description: text.description, url: `${origin}/${locale}`, locale: localeTag, images: [{ url: `${origin}/images/figs-hero.webp`, width: 1920, height: 1080, alt: text.h1 }] },
      twitter: { card: "summary_large_image" as const, title: text.title, description: text.description, images: [`${origin}/images/figs-hero.webp`] }
    } : {
      openGraph: { type: "website" as const, siteName: "Orchard to Global", title: text.title, description: text.description, locale: localeTag },
      twitter: { card: "summary" as const, title: text.title, description: text.description }
    })
  };
}

function BrandMark() {
  return (
    <svg className="brand-symbol" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 5c3.6 5.5 12.8 7.6 12.8 19.3C36.8 35.7 31 43 24 43S11.2 35.7 11.2 24.3C11.2 12.6 20.4 10.5 24 5Z" fill="currentColor" />
      <path d="M24 9c.2-4 2.2-6.1 5.6-7M24 12c-4.1-4-7.7-3.4-10.3-1.4 2.6 3.8 5.9 4.8 10.3 3.5M24 15c3.7-3.7 7.5-3.1 9.8-1.4-2.5 3.3-5.7 4.3-9.8 3.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 22v15" stroke="#F7F3EA" strokeWidth="1.3" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}

export default async function LocalizedHome({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value as Locale;
  const text = copy[locale];

  return (
    <div className="site" lang={locale}>
      <header className="site-header">
        <Link className="brand" href={`/${locale}`} aria-label="Orchard to Global home"><BrandMark /><span className="brand-name">Orchard <i>to</i> Global</span></Link>
        <nav className="main-nav" aria-label={text.navContact}>
          <a href="#supply">{text.navSupply}</a><a href="#documentation">{text.navDocs}</a><a href="#contact">{text.navContact}</a>
        </nav>
        <div className="header-actions"><LocaleSwitcher current={locale} label={languageLabel[locale]} /><a className="header-cta" href="#contact">{text.navCta}<span aria-hidden="true">↗</span></a></div>
      </header>

      <main>
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{text.eyebrow}</p>
            <h1>{text.h1}</h1>
            <p className="hero-lede">{text.subheading}</p>
            <div className="hero-actions"><a className="button button-dark" href="#contact">{text.navCta}<span aria-hidden="true">↗</span></a><a className="text-link" href="#supply">{text.sampleCta}<span aria-hidden="true">→</span></a></div>
            <div className="hero-proof"><span className="proof-mark" aria-hidden="true">✳</span><span>{text.advantages[0]}</span><span className="proof-divider" /><span>{text.advantages[1]}</span></div>
          </div>
          <div className="hero-visual">
            <Image src="/images/figs-hero.webp" alt={text.h1} fill priority sizes="(max-width: 760px) 100vw, 58vw" className="hero-image" />
            <div className="image-caption"><span>01</span><span>{imageDisclosure[locale]}</span></div>
            <div className="hero-stamp"><strong>Türkiye</strong><small>{imageDisclosure[locale]}</small></div>
          </div>
          <span className="hero-side-note" aria-hidden="true">ORCHARD · TO · GLOBAL</span>
        </section>

        <section className="supply-section section-wrap" id="supply">
          <div className="section-heading"><p className="eyebrow">01 / {text.navSupply}</p><h2>{text.supplyTitle}</h2></div>
          <div className="supply-content">
            <div className="supply-copy"><p className="section-lede">{text.productIntro}</p>
              <ul className="supply-points">{text.advantages.map((item, index) => <li key={item}><span className="point-index">0{index + 1}</span><span>{item}</span><span aria-hidden="true">↗</span></li>)}</ul>
              <p className="muted-note">{text.latestInfoNote}</p>
            </div>
            <figure className="detail-figure"><Image src="/images/figs-detail.webp" alt={text.productIntro} width={1920} height={1280} sizes="(max-width: 760px) 100vw, 42vw" /><figcaption><span>Türkiye</span><span>{imageDisclosure[locale]}</span></figcaption></figure>
          </div>
        </section>

        <section className="documentation-section" id="documentation"><div className="documentation-inner section-wrap">
          <div className="documentation-heading"><p className="eyebrow eyebrow-light">02 / {text.docsLabel}</p><h2>{text.docsTitle}</h2></div>
          <div className="documentation-copy"><span className="document-icon" aria-hidden="true">✳</span><p>{text.documentationCopy}</p><a className="light-link" href="#contact">{text.navContact}<span aria-hidden="true">↗</span></a></div>
        </div></section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-intro"><p className="eyebrow">03 / {text.navContact}</p><h2>{text.contactSection}</h2><p className="section-lede">{text.formIntro}</p>
            <div className="contact-details">
              <div className="contact-detail"><span className="detail-label">{text.locationsLabel}</span><p>{contactLocations[locale]}</p></div>
              <div className="contact-detail"><span className="detail-label">{text.emailLabel}</span><a href="mailto:info@orchardtoglobal.com">info@orchardtoglobal.com</a></div>
              <div className="contact-detail"><span className="detail-label">{text.phoneLabel}</span><a href="tel:+41783360425">+41 78 336 04 25</a><a href="tel:+905368476521">+90 536 847 6521</a></div>
            </div>
          </div>
          <div className="contact-form-panel"><div className="form-heading"><span aria-hidden="true">✳</span><h3>{text.formTitle}</h3></div><ContactForm locale={locale} /></div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><Link className="brand footer-brand" href={`/${locale}`}><BrandMark /><span className="brand-name">Orchard <i>to</i> Global</span></Link><p>{text.footerNote}</p><span className="footer-country">Türkiye <span aria-hidden="true">✳</span></span></footer>
    </div>
  );
}
