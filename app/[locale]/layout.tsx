import "../globals.css";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { isLocale } from "@/lib/copy";
import { baseMetadata } from "@/lib/site-metadata";

export const metadata = baseMetadata;

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body>{children}<WhatsAppButton locale={locale} /></body>
    </html>
  );
}
