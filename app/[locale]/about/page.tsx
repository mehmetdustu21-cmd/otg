import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandLockup } from "@/components/brand-lockup";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { aboutCopy } from "@/lib/about-copy";
import { copy, isLocale, languageLabel, locales, type Locale } from "@/lib/copy";
import { faqCopy } from "@/lib/faq-copy";
import { alternateLanguages } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };
const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const mainNavigationLabel: Record<Locale, string> = {
  en: "Main navigation", de: "Hauptnavigation", fr: "Navigation principale", it: "Navigazione principale", nl: "Hoofdnavigatie"
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const locale = value as Locale;
  const text = aboutCopy[locale];
  return {
    title: { absolute: `${text.title} | Orchard to Global` },
    description: text.body,
    ...(origin ? {
      metadataBase: new URL(origin),
      alternates: { canonical: `${origin}/${locale}/about`, languages: alternateLanguages(origin, "/about") }
    } : {})
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value as Locale;
  const text = copy[locale];
  const about = aboutCopy[locale];
  const faq = faqCopy[locale];

  return (
    <div className="site" lang={locale}>
      <header className="site-header">
        <BrandLockup href={`/${locale}`} />
        <nav className="main-nav" aria-label={mainNavigationLabel[locale]}>
          <Link href={`/${locale}#supply`}>{text.navSupply}</Link>
          <Link href={`/${locale}#documentation`}>{text.navDocs}</Link>
          <Link href={`/${locale}#contact`}>{text.navContact}</Link>
          <Link href={`/${locale}/about`} aria-current="page">{text.navAbout}</Link>
          <Link href={`/${locale}/faq`}>{faq.navLabel}</Link>
        </nav>
        <div className="header-actions"><LocaleSwitcher current={locale} label={languageLabel[locale]} suffix="/about" /></div>
        <details className="mobile-menu">
          <summary aria-label={text.menuLabel}><span className="menu-icon" aria-hidden="true"><i /><i /><i /></span><span>{text.menuLabel}</span></summary>
          <nav className="mobile-menu-panel" aria-label={mainNavigationLabel[locale]}>
            <Link href={`/${locale}#supply`}>{text.navSupply}</Link>
            <Link href={`/${locale}#documentation`}>{text.navDocs}</Link>
            <Link href={`/${locale}#contact`}>{text.navContact}</Link>
            <Link href={`/${locale}/about`} aria-current="page">{text.navAbout}</Link>
            <Link href={`/${locale}/faq`}>{faq.navLabel}</Link>
          </nav>
        </details>
      </header>

      <main className="about-page section-wrap">
        <nav className="faq-breadcrumb" aria-label={mainNavigationLabel[locale]}>
          <Link href={`/${locale}`}>{text.title}</Link><span aria-hidden="true">/</span><span aria-current="page">{about.label}</span>
        </nav>
        <section className="about-page-hero">
          <p className="eyebrow">{about.label}</p>
          <h1>{about.title}</h1>
          <p className="section-lede">{about.body}</p>
        </section>
        <section className="about-story">
          <p className="eyebrow">{about.foundersLabel}</p>
          <h2>{about.founders}</h2>
          <h3>{about.storyTitle}</h3>
          <p className="section-lede">{about.story}</p>
        </section>
        <section className="about-content-grid">
          <article className="about-content-card">
            <p className="eyebrow">01 / {about.modelTitle}</p>
            <h2>{about.modelTitle}</h2>
            <p className="section-lede">{about.model}</p>
          </article>
          <article className="about-content-card">
            <p className="eyebrow">02 / {about.productionTitle}</p>
            <h2>{about.productionTitle}</h2>
            <p className="section-lede">{about.production}</p>
          </article>
          <article className="about-content-card">
            <p className="eyebrow">03 / {about.sourcingTitle}</p>
            <h2>{about.sourcingTitle}</h2>
            <p className="section-lede">{about.sourcing}</p>
          </article>
          <article className="about-content-card">
            <p className="eyebrow">04 / {about.qualityTitle}</p>
            <h2>{about.qualityTitle}</h2>
            <p className="section-lede">{about.quality}</p>
          </article>
        </section>
        <section className="about-buyer-guide">
          <p className="eyebrow">{about.buyerTitle}</p>
          <h2>{about.buyerTitle}</h2>
          <p className="section-lede">{about.buyerGuide}</p>
          <Link className="button button-dark" href={`/${locale}#contact`}>{text.navCta}</Link>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <BrandLockup href={`/${locale}`} footer />
        <nav className="footer-links" aria-label={mainNavigationLabel[locale]}>
          <Link href={`/${locale}/about`} aria-current="page">{text.navAbout}</Link>
          <Link href={`/${locale}/faq`}>{faq.navLabel}</Link>
          <Link href={`/${locale}#contact`}>{text.navContact}</Link>
        </nav>
      </footer>
    </div>
  );
}
