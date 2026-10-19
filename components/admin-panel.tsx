"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { BrandSymbol } from "@/components/brand-lockup";

type Submission = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string;
  company: string | null;
  country: string;
  message: string;
  ip_address: string;
  user_agent: string;
  buyer_type: string | null;
  product_interest: string | null;
  estimated_volume: string | null;
  packaging_preference: string | null;
  locale: string | null;
  lead_status: string;
  submitted_at: string;
};

type Analytics = {
  summary: {
    todayViews: number;
    weekViews: number;
    monthViews: number;
    totalViews: number;
    todayVisitors: number;
    weekVisitors: number;
    monthVisitors: number;
    totalVisitors: number;
  };
  topPaths: { path: string; views: number }[];
  topEvents: { eventName: string; events: number }[];
};

type ContactSettings = {
  contact_email: string;
  phone_primary: string;
  phone_secondary: string;
  contact_locations: string;
};

type ViewState = "checking" | "login" | "loading" | "ready" | "error";
const leadStatuses = [
  ["new", "Yeni"], ["contacted", "Ä°letiÅŸime geÃ§ildi"], ["qualified", "Nitelikli"],
  ["sample_sent", "Numune gÃ¶nderildi"], ["quoted", "Teklif verildi"], ["won", "KazanÄ±ldÄ±"], ["lost", "Kaybedildi"]
] as const;

export function AdminPanel() {
  const [state, setState] = useState<ViewState>("checking");
  const [rows, setRows] = useState<Submission[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);
  const [settingsMessage, setSettingsMessage] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [username, setUsername] = useState("mehmetdustu");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loadAnalytics = useCallback(async () => {
    const response = await fetch("/api/admin/analytics", { cache: "no-store" });
    const data = await response.json() as Analytics & { error?: string };
    if (!response.ok) throw new Error(data.error || "Ziyaret verileri alÄ±namadÄ±.");
    setAnalytics(data);
  }, []);

  const loadSettings = useCallback(async () => {
    const response = await fetch("/api/admin/settings", { cache: "no-store" });
    const data = await response.json() as { settings?: ContactSettings; error?: string };
    if (!response.ok || !data.settings) throw new Error(data.error || "Ä°letiÅŸim ayarlarÄ± alÄ±namadÄ±.");
    setContactSettings(data.settings);
  }, []);

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!contactSettings) return;
    setSavingSettings(true);
    setSettingsMessage("");
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactSettings)
      });
      const data = await response.json() as { settings?: ContactSettings; error?: string };
      if (!response.ok || !data.settings) throw new Error(data.error || "Ä°letiÅŸim ayarlarÄ± kaydedilemedi.");
      setContactSettings(data.settings);
      setSettingsMessage("Ä°letiÅŸim bilgileri kaydedildi.");
    } catch (error) {
      setSettingsMessage(error instanceof Error ? error.message : "Ä°letiÅŸim ayarlarÄ± kaydedilemedi.");
    } finally {
      setSavingSettings(false);
    }
  }

  const loadRows = useCallback(async (cursor?: string, append = false) => {
    if (append) setLoadingMore(true);
    else setState("loading");
    try {
      const suffix = cursor ? `?before=${encodeURIComponent(cursor)}` : "";
      const response = await fetch(`/api/admin/submissions${suffix}`, { cache: "no-store" });
      if (response.status === 401) {
        setState("login");
        return;
      }
      const data = await response.json() as { submissions?: Submission[]; nextCursor?: string | null; error?: string };
      if (!response.ok) throw new Error(data.error || "KayÄ±tlar alÄ±namadÄ±.");
      const incoming = data.submissions || [];
      setRows((current) => append ? [...current, ...incoming] : incoming);
      setNextCursor(data.nextCursor || null);
      setMessage("");
      setState("ready");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "KayÄ±tlar alÄ±namadÄ±.");
      setState("error");
    } finally {
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { authenticated?: boolean }) => {
        if (!active) return;
        if (data.authenticated) {
          void loadRows();
          void loadAnalytics().catch((error: unknown) => setMessage(error instanceof Error ? error.message : "Ziyaret verileri alÄ±namadÄ±."));
          void loadSettings().catch((error: unknown) => setSettingsMessage(error instanceof Error ? error.message : "Ä°letiÅŸim ayarlarÄ± alÄ±namadÄ±."));
        }
        else setState("login");
      })
      .catch(() => { if (active) setState("login"); });
    return () => { active = false; };
  }, [loadAnalytics, loadRows, loadSettings]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setState("loading");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json() as { error?: string };
      if (!response.ok) {
        setMessage(data.error || "GiriÅŸ baÅŸarÄ±sÄ±z.");
        setState("login");
        return;
      }
      setPassword("");
      await loadRows();
      await loadAnalytics().catch((error: unknown) => setMessage(error instanceof Error ? error.message : "Ziyaret verileri alÄ±namadÄ±."));
      await loadSettings().catch((error: unknown) => setSettingsMessage(error instanceof Error ? error.message : "Ä°letiÅŸim ayarlarÄ± alÄ±namadÄ±."));
    } catch {
      setMessage("GiriÅŸ yapÄ±lamadÄ±. Ortam deÄŸiÅŸkenlerini kontrol edin.");
      setState("login");
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setRows([]);
    setAnalytics(null);
    setContactSettings(null);
    setNextCursor(null);
    setPassword("");
    setState("login");
  }

  async function updateLeadStatus(id: string, status: string) {
    const response = await fetch("/api/admin/submissions", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    if (!response.ok) {
      const data = await response.json().catch(() => ({})) as { error?: string };
      setMessage(data.error || "BaÅŸvuru durumu kaydedilemedi.");
      return;
    }
    setRows((current) => current.map((row) => row.id === id ? { ...row, lead_status: status } : row));
  }

  if (state === "checking" || state === "loading") {
    return <div className="admin-state">YÃ¼kleniyorâ€¦</div>;
  }

  if (state === "login") {
    return (
      <section className="admin-login">
        <a className="back-link" href="/">â† Ana siteye dÃ¶n</a>
        <div className="admin-login-card">
          <div className="small-mark" aria-hidden="true"><BrandSymbol className="admin-mark-image" /></div>
          <p className="eyebrow">ORCHARD TO GLOBAL</p>
          <h1>YÃ¶netici giriÅŸi</h1>
          <p className="admin-muted">Teklif ve numune taleplerini gÃ¶rÃ¼ntÃ¼lemek iÃ§in giriÅŸ yapÄ±n.</p>
          <form onSubmit={login} className="admin-login-form">
            <label>KullanÄ±cÄ± adÄ±<input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required /></label>
            <label>Parola<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
            {message && <p className="form-feedback error" role="alert">{message}</p>}
            <button className="button button-dark" type="submit">GiriÅŸ yap</button>
          </form>
          <p className="admin-footnote">Parola uygulama kaynak kodunda tutulmaz; Vercel ortam deÄŸiÅŸkeninden okunur.</p>
        </div>
      </section>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div><p className="eyebrow">ORCHARD TO GLOBAL</p><h1>BaÅŸvuru kayÄ±tlarÄ±</h1></div>
        <div className="admin-actions"><span>{rows.length} kayÄ±t gÃ¶steriliyor</span><button className="button button-outline" onClick={() => void loadRows()}>Yenile</button><button className="button button-dark" onClick={() => void logout()}>Ã‡Ä±kÄ±ÅŸ</button></div>
      </header>
      {contactSettings && <section className="settings-panel">
        <div className="analytics-heading"><div><p className="eyebrow">Site ayarlarÄ±</p><h2>Ä°letiÅŸim bilgileri</h2></div></div>
        <form className="settings-form" onSubmit={saveSettings}>
          <label>E-posta<input type="email" value={contactSettings.contact_email} onChange={(event) => setContactSettings({ ...contactSettings, contact_email: event.target.value })} required /></label>
          <label>Birincil telefon<input type="tel" value={contactSettings.phone_primary} onChange={(event) => setContactSettings({ ...contactSettings, phone_primary: event.target.value })} required /></label>
          <label>Ä°kincil telefon<input type="tel" value={contactSettings.phone_secondary} onChange={(event) => setContactSettings({ ...contactSettings, phone_secondary: event.target.value })} required /></label>
          <label>Ä°letiÅŸim konumlarÄ±<input value={contactSettings.contact_locations} onChange={(event) => setContactSettings({ ...contactSettings, contact_locations: event.target.value })} required /></label>
          <div className="settings-submit"><button className="button button-dark" type="submit" disabled={savingSettings}>{savingSettings ? "Kaydediliyor..." : "Ä°letiÅŸim bilgilerini kaydet"}</button>{settingsMessage && <span className="settings-message">{settingsMessage}</span>}</div>
        </form>
      </section>}
      {analytics && <section className="analytics-panel" aria-label="Ziyaret istatistikleri">
        <div className="analytics-heading"><div><p className="eyebrow">Site analitiÄŸi</p><h2>Ziyaret Ã¶zeti</h2></div><button className="button button-outline" onClick={() => void loadAnalytics()}>Ä°statistikleri yenile</button></div>
        <div className="analytics-grid">
          <article className="analytics-card"><span>BugÃ¼n</span><strong>{analytics.summary.todayViews}</strong><small>{analytics.summary.todayVisitors} tahmini ziyaretÃ§i</small></article>
          <article className="analytics-card"><span>Son 7 gÃ¼n</span><strong>{analytics.summary.weekViews}</strong><small>{analytics.summary.weekVisitors} tahmini ziyaretÃ§i</small></article>
          <article className="analytics-card"><span>Son 30 gÃ¼n</span><strong>{analytics.summary.monthViews}</strong><small>{analytics.summary.monthVisitors} tahmini ziyaretÃ§i</small></article>
          <article className="analytics-card"><span>Toplam</span><strong>{analytics.summary.totalViews}</strong><small>{analytics.summary.totalVisitors} tahmini ziyaretÃ§i</small></article>
        </div>
        {analytics.topPaths.length > 0 && <div className="analytics-paths"><h3>Son 30 gÃ¼nde en Ã§ok gÃ¶rÃ¼ntÃ¼lenen sayfalar</h3>{analytics.topPaths.map((item) => <div className="analytics-path" key={item.path}><span>{item.path}</span><strong>{item.views}</strong></div>)}</div>}
        {analytics.topEvents.length > 0 && <div className="analytics-paths"><h3>Son 30 gÃ¼nde en Ã§ok kullanÄ±lan aksiyonlar</h3>{analytics.topEvents.map((item) => <div className="analytics-path" key={item.eventName}><span>{item.eventName}</span><strong>{item.events}</strong></div>)}</div>}
        <p className="analytics-note">GÃ¶rÃ¼ntÃ¼leme sayÄ±larÄ± sunucu tarafÄ±nda kaydedilir. ZiyaretÃ§i sayÄ±larÄ±, IP ve tarayÄ±cÄ± bilgisinin geri dÃ¶ndÃ¼rÃ¼lemez hash deÄŸerine dayalÄ± yaklaÅŸÄ±k benzersiz ziyaretÃ§i sayÄ±sÄ±dÄ±r.</p>
      </section>}
      {state === "error" && <p className="form-feedback error" role="alert">{message}</p>}
      {rows.length === 0 && state !== "error" ? (
        <section className="empty-state"><h2>HenÃ¼z baÅŸvuru yok</h2><p>Ä°letiÅŸim formundan gelen yeni talepler burada listelenecek.</p></section>
      ) : (
        <>
          <div className="submissions-list">
            {rows.map((row) => (
              <article className="submission-card" key={row.id}>
                <header className="submission-head"><div><h2>{row.full_name}</h2><p>{row.company || "Åirket bilgisi paylaÅŸÄ±lmadÄ±"} Â· {row.country}</p></div><time dateTime={row.submitted_at}>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Istanbul" }).format(new Date(row.submitted_at))}</time></header>
                <div className="submission-contact"><a href={`mailto:${row.email}`}>{row.email}</a>{row.phone && <a href={`tel:${row.phone.replace(/[^+\d]/g, "")}`}>{row.phone}</a>}</div>
                <dl className="lead-details"><div><dt>AlÄ±cÄ± tipi</dt><dd>{row.buyer_type || "Belirtilmedi"}</dd></div><div><dt>ÃœrÃ¼n ilgisi</dt><dd>{row.product_interest || "Belirtilmedi"}</dd></div><div><dt>Tahmini hacim</dt><dd>{row.estimated_volume || "Belirtilmedi"}</dd></div><div><dt>Ambalaj</dt><dd>{row.packaging_preference || "Belirtilmedi"}</dd></div></dl>
                <label className="lead-status-field">Lead durumu<select value={row.lead_status || "new"} onChange={(event) => void updateLeadStatus(row.id, event.target.value)}>{leadStatuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                <p className="submission-message">{row.message}</p>
                <details className="submission-tech"><summary>Teknik kayÄ±t bilgileri</summary><dl><div><dt>IP adresi</dt><dd>{row.ip_address}</dd></div><div><dt>TarayÄ±cÄ± / User-Agent</dt><dd>{row.user_agent}</dd></div></dl></details>
              </article>
            ))}
          </div>
          {nextCursor && <div className="admin-load-more"><button className="button button-outline" disabled={loadingMore} onClick={() => void loadRows(nextCursor, true)}>{loadingMore ? "YÃ¼kleniyorâ€¦" : "Daha fazla kayÄ±t yÃ¼kle"}</button></div>}
        </>
      )}
      <p className="admin-retention">KayÄ±tlar, oluÅŸturulma tarihinden itibaren 60 ay sonunda otomatik silinir.</p>
    </main>
  );
}
