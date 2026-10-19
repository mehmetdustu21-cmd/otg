import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandLockup } from "@/components/brand-lockup";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { buyerCopy } from "@/lib/buyer-copy";
import { copy, isLocale, languageLabel, locales, type Locale } from "@/lib/copy";
import { faqCopy } from "@/lib/faq-copy";
import { getMarketText, marketSlugs, type MarketSlug } from "@/lib/market-copy";
import { alternateLanguages } from "@/lib/seo";
import { recordPageView } from "@/lib/analytics";

type PageProps = { params: Promise<{ locale: string; market: string }> };
const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const mainNavigationLabel: Record<Locale, string> = { en: "Main navigation", de: "Hauptnavigation", fr: "Navigation principale", it: "Navigazione principale", nl: "Hoofdnavigatie" };

export const dynamicParams = false;
export const dynamic = "force-dynamic";
export function generateStaticParams() { return locales.flatMap((locale) => marketSlugs.map((market) => ({ locale, market }))); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: value, market: slug } = await params;
  if (!isLocale(value) || !marketSlugs.includes(slug as MarketSlug)) return {};
  const locale = value as Locale;
  const text = getMarketText(locale, slug as MarketSlug);
  return { title: { absolute: `${text.title} | Orchard to Global` }, description: text.description, ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: `${origin}/${locale}/markets/${slug}`, languages: alternateLanguages(origin, `/markets/${slug}`) } } : {}) };
}

export default async function MarketPage({ params }: PageProps) {
  const { locale: value, market: slug } = await params;
  if (!isLocale(value) || !marketSlugs.includes(slug as MarketSlug)) notFound();
  const locale = value as Locale;
  const text = copy[locale];
  const buyer = buyerCopy[locale];
  const faq = faqCopy[locale];
  const market = getMarketText(locale, slug as MarketSlug);
  await recordPageView(`/${locale}/markets/${slug}`);
  return (
    <div className="site" lang={locale}>
      <header className="site-header">
        <BrandLockup href={`/${locale}`} />
        <nav className="main-nav" aria-label={mainNavigationLabel[locale]}><Link href={`/${locale}`}>{text.navSupply}</Link><Link href={`/${locale}/about`}>{text.navAbout}</Link><Link href={`/${locale}/faq`}>{faq.navLabel}</Link><Link href={`/${locale}/privacy`}>{buyer.privacyLink}</Link></nav>
        <div className="header-actions"><LocaleSwitcher current={locale} label={languageLabel[locale]} suffix={`/markets/${slug}`} /></div>
        <details className="mobile-menu"><summary aria-label={text.menuLabel}><span className="menu-icon" aria-hidden="true"><i /><i /><i /></span><span>{text.menuLabel}</span></summary><nav className="mobile-menu-panel" aria-label={mainNavigationLabel[locale]}><Link href={`/${locale}`}>{text.navSupply}</Link><Link href={`/${locale}/about`}>{text.navAbout}</Link><Link href={`/${locale}/faq`}>{faq.navLabel}</Link><Link href={`/${locale}/privacy`}>{buyer.privacyLink}</Link></nav></details>
      </header>
      <main className="market-page section-wrap">
        <nav className="faq-breadcrumb" aria-label={mainNavigationLabel[locale]}><Link href={`/${locale}`}>{text.title}</Link><span aria-hidden="true">/</span><span aria-current="page">{market.name}</span></nav>
        <header className="market-page-hero"><p className="eyebrow">{market.name} · {buyer.sectionLabel}</p><h1>{market.title}</h1><p className="section-lede">{market.body}</p><Link className="button button-dark" href={`/${locale}#contact`}>{market.cta}</Link></header>
        <section className="market-page-grid"><article><p className="eyebrow">01 / {buyer.productInterestLabel}</p><h2>{buyer.sectionTitle}</h2><p className="section-lede">{buyer.sectionIntro}</p></article><article><p className="eyebrow">02 / {buyer.processLabel}</p><h2>{buyer.processTitle}</h2><p className="section-lede">{buyer.marketText}</p></article></section>
      </main>
      <footer className="site-footer section-wrap"><BrandLockup href={`/${locale}`} footer /><nav className="footer-links" aria-label={mainNavigationLabel[locale]}><Link href={`/${locale}/about`}>{text.navAbout}</Link><Link href={`/${locale}/faq`}>{faq.navLabel}</Link><Link href={`/${locale}/privacy`}>{buyer.privacyLink}</Link></nav></footer>
    </div>
  );
}
