import "../globals.css";
import { baseMetadata } from "@/lib/site-metadata";

export const metadata = baseMetadata;

export default function DefaultRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
