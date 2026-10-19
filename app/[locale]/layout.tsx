import "../globals.css";
import { notFound } from "next/navigation";
<<<<<<< HEAD
import { WhatsAppButton } from "@/components/whatsapp-button";
=======
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
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
<<<<<<< HEAD
      <body>{children}<WhatsAppButton locale={locale} /></body>
=======
      <body>{children}</body>
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
    </html>
  );
}
