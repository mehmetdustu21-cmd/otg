"use client";

import { useRef, useState, type FormEvent } from "react";
import { buyerCopy } from "@/lib/buyer-copy";
import { copy, type Locale } from "@/lib/copy";

const errors: Record<Locale, { generic: string; required: string }> = {
  en: { generic: "We couldn't send your request. Please try again or contact us directly.", required: "Please check the required fields and try again." },
  de: { generic: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.", required: "Bitte prüfen Sie die Pflichtfelder und versuchen Sie es erneut." },
  fr: { generic: "Votre demande n'a pas pu être envoyée. Réessayez ou contactez-nous directement.", required: "Vérifiez les champs obligatoires et réessayez." },
  it: { generic: "Non è stato possibile inviare la richiesta. Riprova o contattaci direttamente.", required: "Controlla i campi obbligatori e riprova." },
  nl: { generic: "Uw aanvraag kon niet worden verzonden. Probeer het opnieuw of neem rechtstreeks contact op.", required: "Controleer de verplichte velden en probeer het opnieuw." }
};

export function ContactForm({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const buyer = buyerCopy[locale];
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const started = useRef(false);

  function trackStart() {
    if (started.current) return;
    started.current = true;
    void fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventName: "form_start", path: window.location.pathname }) }).catch(() => undefined);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setBusy(true);
    setNotice(null);
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setNotice({ kind: "error", text: response.status === 400 ? errors[locale].required : (result.error || errors[locale].generic) });
        return;
      }
      void fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventName: "form_submit", path: window.location.pathname }) }).catch(() => undefined);
      formElement.reset();
      started.current = false;
      setNotice({ kind: "success", text: text.successMessage });
    } catch {
      setNotice({ kind: "error", text: errors[locale].generic });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} onFocus={trackStart}>
      <input type="hidden" name="locale" value={locale} />
      <div className="form-grid">
        <label><span>{text.nameLabel} <i aria-hidden="true">*</i></span><input name="fullName" autoComplete="name" minLength={2} maxLength={140} required /></label>
        <label><span>{buyer.phoneHint}</span><input name="phone" type="tel" autoComplete="tel" maxLength={50} /></label>
        <label><span>{text.emailLabel} <i aria-hidden="true">*</i></span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label><span>{text.companyOptionalLabel}</span><input name="company" autoComplete="organization" maxLength={200} /></label>
        <label><span>{buyer.buyerTypeLabel} <i aria-hidden="true">*</i></span><select name="buyerType" defaultValue="" required><option value="" disabled>{buyer.buyerTypeLabel}</option>{buyer.buyerTypeOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><span>{text.countryLabel} <i aria-hidden="true">*</i></span><select name="country" defaultValue="" required><option value="" disabled>{text.countryLabel}</option>{text.countryOptions.map((country) => <option key={country} value={country}>{country}</option>)}</select></label>
        <label><span>{buyer.productInterestLabel}</span><select name="productInterest" defaultValue=""><option value="">{buyer.productInterestLabel}</option>{buyer.productOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><span>{buyer.volumeLabel}</span><select name="estimatedVolume" defaultValue=""><option value="">{buyer.volumeLabel}</option>{buyer.volumeOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-wide"><span>{buyer.packagingLabel}</span><select name="packagingPreference" defaultValue=""><option value="">{buyer.packagingLabel}</option>{buyer.packagingOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="form-wide"><span>{text.messageLabel} <i aria-hidden="true">*</i></span><textarea name="message" rows={5} minLength={8} maxLength={5000} required /></label>
      </div>
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="privacy-note">{buyer.responseText} <a href={`/${locale}/privacy`}>{buyer.privacyLink}</a></p>
      {notice && <p className={`form-feedback ${notice.kind}`} role="status">{notice.text}</p>}
      <button className="button button-dark form-submit" type="submit" disabled={busy}>{busy ? "..." : text.submitLabel}</button>
    </form>
  );
}
