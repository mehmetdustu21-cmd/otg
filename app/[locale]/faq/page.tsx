import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandLockup } from "@/components/brand-lockup";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { aboutCopy } from "@/lib/about-copy";
import { copy, isLocale, languageLabel, locales, type Locale } from "@/lib/copy";
import { faqCopy } from "@/lib/faq-copy";
import { imageAlt } from "@/lib/image-copy";
import { alternateLanguages, safeJsonLd } from "@/lib/seo";
<<<<<<< HEAD
import { recordPageView } from "@/lib/analytics";
=======
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728

type PageProps = { params: Promise<{ locale: string }> };
const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const localeTag: Record<Locale, string> = { en: "en_US", de: "de_DE", fr: "fr_FR", it: "it_IT", nl: "nl_NL" };
const mainNavigationLabel: Record<Locale, string> = {
  en: "Main navigation", de: "Hauptnavigation", fr: "Navigation principale", it: "Navigazione principale", nl: "Hoofdnavigatie"
};

export const dynamicParams = false;
<<<<<<< HEAD
export const dynamic = "force-dynamic";
=======
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const locale = value as Locale;
  const text = faqCopy[locale];
  const socialImage = `${origin ?? ""}/images/dried-figs-hero.webp`;
  return {
    title: { absolute: `${text.title} | Orchard to Global` },
    description: text.description,
    keywords: text.keywords,
    ...(origin ? {
      metadataBase: new URL(origin),
      alternates: { canonical: `${origin}/${locale}/faq`, languages: alternateLanguages(origin, "/faq") },
      openGraph: {
        type: "website" as const,
        siteName: "Orchard to Global",
        title: text.title,
        description: text.description,
        url: `${origin}/${locale}/faq`,
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

export default async function LocalizedFaq({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value as Locale;
  const text = faqCopy[locale];
<<<<<<< HEAD
  const faq = faqCopy[locale];
  const pageCopy = copy[locale];
  await recordPageView(`/${locale}/faq`);
=======
  const about = aboutCopy[locale];
  const pageCopy = copy[locale];
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: text.questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return (
    <div className="site" lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }} />
      <header className="site-header">
        <BrandLockup href={`/${locale}`} />
        <nav className="main-nav" aria-label={mainNavigationLabel[locale]}>
          <Link href={`/${locale}`}>{text.homeLabel}</Link>
          <Link href={`/${locale}#supply`}>{pageCopy.navSupply}</Link>
          <Link href={`/${locale}#contact`}>{pageCopy.navContact}</Link>
          <Link href={`/${locale}/about`}>{pageCopy.navAbout}</Link>
          <Link href={`/${locale}/faq`} aria-current="page">{text.navLabel}</Link>
        </nav>
        <div className="header-actions"><LocaleSwitcher current={locale} label={languageLabel[locale]} suffix="/faq" /></div>
        <details className="mobile-menu">
          <summary aria-label={pageCopy.menuLabel}><span className="menu-icon" aria-hidden="true"><i /><i /><i /></span><span>{pageCopy.menuLabel}</span></summary>
          <nav className="mobile-menu-panel" aria-label={mainNavigationLabel[locale]}>
            <Link href={`/${locale}`}>{text.homeLabel}</Link>
            <Link href={`/${locale}#supply`}>{pageCopy.navSupply}</Link>
            <Link href={`/${locale}#contact`}>{pageCopy.navContact}</Link>
            <Link href={`/${locale}/about`}>{pageCopy.navAbout}</Link>
            <Link href={`/${locale}/faq`} aria-current="page">{text.navLabel}</Link>
          </nav>
        </details>
      </header>

      <main className="faq-main section-wrap">
        <nav className="faq-breadcrumb" aria-label={mainNavigationLabel[locale]}>
          <Link href={`/${locale}`}>{text.homeLabel}</Link><span aria-hidden="true">/</span><span aria-current="page">{text.navLabel}</span>
        </nav>
        <header className="faq-intro">
          <p className="eyebrow">{text.navLabel}</p>
          <h1>{text.title}</h1>
          <p className="section-lede">{text.intro}</p>
        </header>
        <section className="faq-list" aria-label={text.title}>
          {text.questions.map(({ question, answer }) => (
            <article className="faq-item" key={question}>
              <h2>{question}</h2>
              <p>{answer}</p>
            </article>
          ))}
        </section>
        <section className="faq-contact">
          <div><p className="eyebrow eyebrow-light">Orchard to Global</p><h2>{pageCopy.contactSection}</h2></div>
          <Link className="button button-light" href={`/${locale}#contact`}>{text.contactLabel}</Link>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <BrandLockup href={`/${locale}`} footer />
        <nav className="footer-links" aria-label={mainNavigationLabel[locale]}>
<<<<<<< HEAD
          <Link href={`/${locale}/about`}>{pageCopy.navAbout}</Link>
=======
          <Link href={`/${locale}/about`}>{about.label}</Link>
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
          <Link href={`/${locale}/faq`}>{text.navLabel}</Link>
          <Link href={`/${locale}#contact`}>{pageCopy.navContact}</Link>
        </nav>
      </footer>
    </div>
  );
}
