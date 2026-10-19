import { buyerCopy } from "@/lib/buyer-copy";
import type { Locale } from "@/lib/copy";

const whatsappHref = "https://wa.me/41783360425?text=Hello%2C%20I%20am%20interested%20in%20wholesale%20dried%20figs.";

export function WhatsAppButton({ locale }: { locale: Locale }) {
  return <a className="whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer" aria-label={buyerCopy[locale].whatsappCta}><span aria-hidden="true">WA</span>{buyerCopy[locale].whatsappCta}</a>;
}
