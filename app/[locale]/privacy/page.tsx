import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandLockup } from "@/components/brand-lockup";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { copy, isLocale, languageLabel, locales, type Locale } from "@/lib/copy";
import { faqCopy } from "@/lib/faq-copy";
import { privacyCopy } from "@/lib/privacy-copy";
import { alternateLanguages } from "@/lib/seo";
import { recordPageView } from "@/lib/analytics";

type PageProps = { params: Promise<{ locale: string }> };
const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const mainNavigationLabel: Record<Locale, string> = { en: "Main navigation", de: "Hauptnavigation", fr: "Navigation principale", it: "Navigazione principale", nl: "Hoofdnavigatie" };

export const dynamicParams = false;
export const dynamic = "force-dynamic";
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const locale = value as Locale;
  const text = privacyCopy[locale];
  return {
    title: { absolute: `${text.title} | Orchard to Global` },
    description: text.intro,
    ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: `${origin}/${locale}/privacy`, languages: alternateLanguages(origin, "/privacy") } } : {})
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value as Locale;
  const text = privacyCopy[locale];
  const pageCopy = copy[locale];
  const faq = faqCopy[locale];
  await recordPageView(`/${locale}/privacy`);
  return (
    <div className="site" lang={locale}>
      <header className="site-header">
        <BrandLockup href={`/${locale}`} />
        <nav className="main-nav" aria-label={mainNavigationLabel[locale]}>
          <Link href={`/${locale}`}>{pageCopy.navSupply}</Link>
          <Link href={`/${locale}/about`}>{pageCopy.navAbout}</Link>
          <Link href={`/${locale}/faq`}>{faq.navLabel}</Link>
          <Link href={`/${locale}/privacy`} aria-current="page">{text.label}</Link>
        </nav>
        <div className="header-actions"><LocaleSwitcher current={locale} label={languageLabel[locale]} suffix="/privacy" /></div>
        <details className="mobile-menu">
          <summary aria-label={pageCopy.menuLabel}><span className="menu-icon" aria-hidden="true"><i /><i /><i /></span><span>{pageCopy.menuLabel}</span></summary>
          <nav className="mobile-menu-panel" aria-label={mainNavigationLabel[locale]}>
            <Link href={`/${locale}`}>{pageCopy.navSupply}</Link>
            <Link href={`/${locale}/about`}>{pageCopy.navAbout}</Link>
            <Link href={`/${locale}/faq`}>{faq.navLabel}</Link>
            <Link href={`/${locale}/privacy`} aria-current="page">{text.label}</Link>
          </nav>
        </details>
      </header>
      <main className="privacy-page section-wrap">
        <nav className="faq-breadcrumb" aria-label={mainNavigationLabel[locale]}><Link href={`/${locale}`}>{pageCopy.title}</Link><span aria-hidden="true">/</span><span aria-current="page">{text.label}</span></nav>
        <header className="privacy-hero"><p className="eyebrow">{text.label}</p><h1>{text.title}</h1><p className="section-lede">{text.intro}</p></header>
        <div className="privacy-content">
          <section><h2>{text.collectedTitle}</h2><p>{text.collected}</p></section>
          <section><h2>{text.purposeTitle}</h2><p>{text.purpose}</p></section>
          <section><h2>{text.retentionTitle}</h2><p>{text.retention}</p></section>
          <section><h2>{text.contactTitle}</h2><p>{text.contact}</p></section>
        </div>
      </main>
      <footer className="site-footer section-wrap"><BrandLockup href={`/${locale}`} footer /><nav className="footer-links" aria-label={mainNavigationLabel[locale]}><Link href={`/${locale}/about`}>{pageCopy.navAbout}</Link><Link href={`/${locale}/faq`}>{faq.navLabel}</Link><Link href={`/${locale}/privacy`} aria-current="page">{text.label}</Link></nav></footer>
    </div>
  );
}
