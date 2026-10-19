"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { BrandSymbol } from "@/components/brand-lockup";

type Submission = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  company: string | null;
  country: string;
  message: string;
  ip_address: string;
  user_agent: string;
  submitted_at: string;
};

type ViewState = "checking" | "login" | "loading" | "ready" | "error";

export function AdminPanel() {
  const [state, setState] = useState<ViewState>("checking");
  const [rows, setRows] = useState<Submission[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [username, setUsername] = useState("mehmetdustu");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
      if (!response.ok) throw new Error(data.error || "Kayıtlar alınamadı.");
      const incoming = data.submissions || [];
      setRows((current) => append ? [...current, ...incoming] : incoming);
      setNextCursor(data.nextCursor || null);
      setMessage("");
      setState("ready");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Kayıtlar alınamadı.");
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
        if (data.authenticated) void loadRows();
        else setState("login");
      })
      .catch(() => { if (active) setState("login"); });
    return () => { active = false; };
  }, [loadRows]);

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
        setMessage(data.error || "Giriş başarısız.");
        setState("login");
        return;
      }
      setPassword("");
      await loadRows();
    } catch {
      setMessage("Giriş yapılamadı. Ortam değişkenlerini kontrol edin.");
      setState("login");
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setRows([]);
    setNextCursor(null);
    setPassword("");
    setState("login");
  }

  if (state === "checking" || state === "loading") {
    return <div className="admin-state">Yükleniyor…</div>;
  }

  if (state === "login") {
    return (
      <section className="admin-login">
        <a className="back-link" href="/">← Ana siteye dön</a>
        <div className="admin-login-card">
          <div className="small-mark" aria-hidden="true"><BrandSymbol className="admin-mark-image" /></div>
          <p className="eyebrow">ORCHARD TO GLOBAL</p>
          <h1>Yönetici girişi</h1>
          <p className="admin-muted">Teklif ve numune taleplerini görüntülemek için giriş yapın.</p>
          <form onSubmit={login} className="admin-login-form">
            <label>Kullanıcı adı<input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required /></label>
            <label>Parola<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
            {message && <p className="form-feedback error" role="alert">{message}</p>}
            <button className="button button-dark" type="submit">Giriş yap</button>
          </form>
          <p className="admin-footnote">Parola uygulama kaynak kodunda tutulmaz; Vercel ortam değişkeninden okunur.</p>
        </div>
      </section>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div><p className="eyebrow">ORCHARD TO GLOBAL</p><h1>Başvuru kayıtları</h1></div>
        <div className="admin-actions"><span>{rows.length} kayıt gösteriliyor</span><button className="button button-outline" onClick={() => void loadRows()}>Yenile</button><button className="button button-dark" onClick={() => void logout()}>Çıkış</button></div>
      </header>
      {state === "error" && <p className="form-feedback error" role="alert">{message}</p>}
      {rows.length === 0 && state !== "error" ? (
        <section className="empty-state"><h2>Henüz başvuru yok</h2><p>İletişim formundan gelen yeni talepler burada listelenecek.</p></section>
      ) : (
        <>
          <div className="submissions-list">
            {rows.map((row) => (
              <article className="submission-card" key={row.id}>
                <header className="submission-head"><div><h2>{row.full_name}</h2><p>{row.company || "Şirket bilgisi paylaşılmadı"} · {row.country}</p></div><time dateTime={row.submitted_at}>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Istanbul" }).format(new Date(row.submitted_at))}</time></header>
                <div className="submission-contact"><a href={`mailto:${row.email}`}>{row.email}</a><a href={`tel:${row.phone.replace(/[^+\d]/g, "")}`}>{row.phone}</a></div>
                <p className="submission-message">{row.message}</p>
                <details className="submission-tech"><summary>Teknik kayıt bilgileri</summary><dl><div><dt>IP adresi</dt><dd>{row.ip_address}</dd></div><div><dt>Tarayıcı / User-Agent</dt><dd>{row.user_agent}</dd></div></dl></details>
              </article>
            ))}
          </div>
          {nextCursor && <div className="admin-load-more"><button className="button button-outline" disabled={loadingMore} onClick={() => void loadRows(nextCursor, true)}>{loadingMore ? "Yükleniyor…" : "Daha fazla kayıt yükle"}</button></div>}
        </>
      )}
      <p className="admin-retention">Kayıtlar, oluşturulma tarihinden itibaren 60 ay sonunda otomatik silinir.</p>
    </main>
  );
}
