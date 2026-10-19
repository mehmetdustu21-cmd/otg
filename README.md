# Orchard to Global

BeÅŸ dilli (Ä°ngilizce, Almanca, FransÄ±zca, Ä°talyanca ve Hollandaca), SEO odaklÄ± kuru incir toptan satÄ±ÅŸ sitesi. Uygulama Next.js App Router ve TypeScript ile hazÄ±rlanmÄ±ÅŸtÄ±r; Vercel'e aktarÄ±labilir. AÃ§Ä±k site ve form arayÃ¼zÃ¼ Ã§alÄ±ÅŸÄ±r. GerÃ§ek teklif kayÄ±tlarÄ±nÄ±n kalÄ±cÄ± tutulmasÄ± iÃ§in PostgreSQL ve Ã¼retim ortam deÄŸiÅŸkenleri kurulmalÄ±dÄ±r.

## Yerel geliÅŸtirme

- Node.js 20.9 veya Ã¼stÃ¼, pnpm 11.25.0 kullanÄ±n (`package.json` iÃ§indeki `packageManager` sÃ¼rÃ¼mÃ¼ sabitler).
- `pnpm install --frozen-lockfile`
- `.env.example` dosyasÄ±nÄ± `.env.local` olarak kopyalayÄ±p Neon baÄŸlantÄ± dizesini ve gereken deÄŸiÅŸkenleri tanÄ±mlayÄ±n.
- Neon SQL Editor'da sÄ±rasÄ±yla `db/001_init.sql`, `db/002_analytics.sql`, `db/003_site_settings.sql`, `db/004_lead_fields.sql`, `db/005_events.sql`, `db/006_lead_status.sql` ve `db/007_contact_email.sql` dosyalarÄ±nÄ± bir kez Ã§alÄ±ÅŸtÄ±rÄ±n.
- `pnpm dev` ile aÃ§Ä±n; `pnpm typecheck` ve `pnpm build` derleme kontrolleridir.

## Vercel'e daÄŸÄ±tÄ±m

1. Kaynak kodu GitHub gibi bir Git saÄŸlayÄ±cÄ±sÄ±na yÃ¼kleyin ve Vercel'de **Add New â†’ Project** ile iÃ§e aktarÄ±n. ArÅŸivden aktarÄ±lÄ±yorsa depo iÃ§eriÄŸini proje kÃ¶k dizinine yÃ¼kleyin. Root Directory depo kÃ¶kÃ¼ olmalÄ±dÄ±r; Next.js framework'Ã¼ otomatik algÄ±lanÄ±r.
2. Project Settings â†’ Environment Variables bÃ¶lÃ¼mÃ¼nde aÅŸaÄŸÄ±daki deÄŸerleri ekleyin. CanlÄ± kullanÄ±m iÃ§in en az Production scope'u; Ã¶nizlemelerde test edecekseniz Preview/Development scope'larÄ±nÄ± da ayarlayÄ±n.
3. Neon'da bir proje oluÅŸturun ve Connect ekranÄ±ndaki **pooled** baÄŸlantÄ± dizesini Vercel'de `DATABASE_URL` olarak kaydedin. Neon SQL Editor'da `db/001_init.sql`, `db/002_analytics.sql`, `db/003_site_settings.sql`, `db/004_lead_fields.sql`, `db/005_events.sql`, `db/006_lead_status.sql` ve `db/007_contact_email.sql` dosyalarÄ±nÄ± **bir kez** Ã§alÄ±ÅŸtÄ±rÄ±n; uygulama otomatik migration yÃ¼rÃ¼tmez.
4. Vercel Project â†’ Settings â†’ Domains bÃ¶lÃ¼mÃ¼nde gerÃ§ek alan adÄ±nÄ± ekleyip alan adÄ± saÄŸlayÄ±cÄ±nÄ±zÄ±n istediÄŸi DNS kayÄ±tlarÄ±nÄ± tamamlayÄ±n. Domain belli olduÄŸunda `NEXT_PUBLIC_SITE_URL` deÄŸerini `https://gercek-alan-adiniz` biÃ§iminde, sondaki `/` olmadan girin. Vercel'in oluÅŸturduÄŸu `https://proje-adiniz.vercel.app` alan adÄ± kullanÄ±lacaksa o origin'i girin. Canonical, hreflang, Open Graph ve sitemap adresleri bu deÄŸiÅŸkenden Ã¼retilir; alan adÄ± bilinmeden tahmini URL kullanÄ±lmaz. Bu deÄŸiÅŸken build sÄ±rasÄ±nda kullanÄ±ldÄ±ÄŸÄ± iÃ§in deÄŸiÅŸtirildiÄŸinde yeniden deploy edin.
5. DeÄŸiÅŸkenleri ve SQL ÅŸemasÄ±nÄ± doÄŸruladÄ±ktan sonra Vercel Dashboard'dan deploy edin veya projeyi yerelde Vercel CLI ile baÄŸlayÄ±p `vercel --prod` Ã§alÄ±ÅŸtÄ±rÄ±n. `vercel.json` retention Cron'unu gÃ¼nlÃ¼k 03:00 UTC iÃ§in tanÄ±mlar; Vercel Cron Production deploy'unda `/api/cron/retention` Ã§aÄŸrÄ±sÄ±nÄ± yapar. Cron doÄŸrulamasÄ± iÃ§in Vercel'de `CRON_SECRET` tanÄ±mlÄ± olmalÄ±dÄ±r.
6. YayÄ±ndan sonra beÅŸ `/{locale}` ana sayfasÄ±nÄ±, `/{locale}/about`, `/{locale}/faq` ve `/{locale}/privacy` rotalarÄ±nÄ±, hreflang/canonical adreslerini, sitemap'i, WhatsApp baÄŸlantÄ±sÄ±nÄ±, PDF buyer brief indirmesini, iletiÅŸim formunu, `/admin` giriÅŸini ve cron Ã§alÄ±ÅŸma kaydÄ±nÄ± kontrol edin. Ãœretimden Ã¶nce iÅŸletmenin yasal unvanÄ±, veri sorumlusu iletiÅŸim bilgisi, geÃ§erli hukuki dayanak ve ilgili gizlilik yÃ¼kÃ¼mlÃ¼lÃ¼klerini iÅŸletme doÄŸrulamalÄ±dÄ±r.

| DeÄŸiÅŸken | AÃ§Ä±klama |
| --- | --- |
| `DATABASE_URL` | Neon pooled PostgreSQL baÄŸlantÄ± dizesi; istek sÄ±rasÄ±nda kullanÄ±lÄ±r, build aÅŸamasÄ±nda okunmaz. `NEON_DATABASE_URL` ve `POSTGRES_URL` yedek isimlerdir. |
| `ANALYTICS_HASH_SALT` | IP ve tarayÄ±cÄ± bilgisinden benzersiz ziyaretÃ§i tahmini Ã¼retmek iÃ§in kullanÄ±lan rastgele, gizli deÄŸer. |
| `ADMIN_USERNAME` | YÃ¶netim paneli kullanÄ±cÄ± adÄ±; baÅŸlangÄ±Ã§ varsayÄ±lanÄ± `mehmetdustu`. Ãœretimde aÃ§Ä±kÃ§a tanÄ±mlanabilir. |
| `ADMIN_PASSWORD` | `/admin` iÃ§in gÃ¼Ã§lÃ¼ yÃ¶netici parolasÄ±. YalnÄ±zca Vercel Environment Variables iÃ§inde saklayÄ±n. |
| `SESSION_SECRET` | Ä°mzalÄ± yÃ¶netici oturumlarÄ± iÃ§in rastgele, en az 32 karakterlik gizli deÄŸer. |
| `CRON_SECRET` | Vercel Cron'un `Authorization: Bearer ...` baÅŸlÄ±ÄŸÄ±nda kullanacaÄŸÄ± gizli deÄŸerle aynÄ± olmalÄ±dÄ±r. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, hreflang, Open Graph ve sitemap iÃ§in gerÃ§ek, dÄ±ÅŸarÄ±dan eriÅŸilen site origin'i; sondaki `/` olmamalÄ±dÄ±r. |
| `INQUIRY_NOTIFICATION_WEBHOOK_URL` | Ä°steÄŸe baÄŸlÄ± JSON webhook. Yeni bir baÅŸvuru kaydedildiÄŸinde kurum iÃ§i otomasyon veya bildirim endpoint'ine gÃ¶nderilir. |

`SESSION_SECRET`, `CRON_SECRET` ve `ANALYTICS_HASH_SALT` iÃ§in ayrÄ± deÄŸerler Ã¼retin; Ã¶rneÄŸin gÃ¼venli bir terminalde her biri iÃ§in `openssl rand -base64 48` Ã§alÄ±ÅŸtÄ±rabilirsiniz. OluÅŸan deÄŸerleri kaynak koda, Git'e, issue'lara veya daÄŸÄ±tÄ±m arÅŸivine koymayÄ±n. `DATABASE_URL` build sÄ±rasÄ±nda zorunlu deÄŸildir; fakat Neon ÅŸemasÄ± ve baÄŸlantÄ±sÄ± kurulmadan form kayÄ±tlarÄ±, admin kayÄ±t listesi, ziyaret istatistikleri ve retention temizliÄŸi Ã§alÄ±ÅŸmaz. `ADMIN_PASSWORD` tanÄ±mlanmazsa admin giriÅŸi kapalÄ± kalÄ±r; `SESSION_SECRET` en az 32 karakter olmalÄ±dÄ±r. YÃ¶netici oturum Ã§erezi HttpOnly, Secure ve SameSite=None ayarlarÄ±yla 8 saat geÃ§erlidir; admin sayfasÄ± noindex'tir ve admin API yanÄ±tlarÄ± cache dÄ±ÅŸÄ±dÄ±r.

Formda honeypot, alan doÄŸrulamasÄ± ve process baÅŸÄ±na temel rate limit bulunur; serverless instanceâ€™lar arasÄ±nda ortak limit iÃ§in Ã¼retimde Vercel Firewall/WAF kuralÄ±yla `POST /api/auth/login`, `POST /api/contact` ve gerekirse `POST /api/events` isteklerini ayrÄ±ca sÄ±nÄ±rlayÄ±n. Admin login/logout ve ayar gÃ¼ncelleme POST/PUT istekleri same-origin doÄŸrulamasÄ±ndan geÃ§er.

## Form, gizlilik ve retention

Form; ad-soyad, isteÄŸe baÄŸlÄ± telefon, e-posta, isteÄŸe baÄŸlÄ± ÅŸirket adÄ±, alÄ±cÄ± tipi, Ã¼lke, Ã¼rÃ¼n ilgisi, tahmini hacim, ambalaj tercihi, dil ve mesajÄ± PostgreSQL'e kaydeder. Sunucu ayrÄ±ca IP adresi ve User-Agent tarayÄ±cÄ± bilgisini alÄ±r. Formun yanÄ±ndaki bildirim toplanan alanlarÄ±, yalnÄ±zca talebi yanÄ±tlama/iÅŸletme takibi amacÄ±nÄ± ve en fazla 60 aylÄ±k saklama sÃ¼resini aÃ§Ä±klar. GÃ¼nlÃ¼k Vercel Cron, 60 aydan eski kayÄ±tlarÄ± siler. Bu uygulama hukuki danÄ±ÅŸmanlÄ±k deÄŸildir.

Ziyaret analitiÄŸi, herkese aÃ§Ä±k sayfalarÄ±n sunucu tarafÄ± gÃ¶rÃ¼ntÃ¼lenmelerini `site_visits` tablosuna kaydeder. GÃ¼nlÃ¼k, son 7 gÃ¼n, son 30 gÃ¼n ve toplam gÃ¶rÃ¼ntÃ¼leme sayÄ±larÄ± admin panelinde gÃ¶sterilir. Benzersiz ziyaretÃ§i sayÄ±sÄ± IP + User-Agent bilgilerinin geri dÃ¶ndÃ¼rÃ¼lemez hash deÄŸerine dayanÄ±r; bu nedenle gerÃ§ek kiÅŸi sayÄ±sÄ± deÄŸil, gizlilik dostu bir tahmindir. Reklam engelleyiciler veya JavaScript kapalÄ± olmasÄ± bu server-side gÃ¶rÃ¼ntÃ¼leme Ã¶lÃ§Ã¼mÃ¼nÃ¼ etkilemez; bot trafiÄŸi ayrÄ±ca filtrelenmediÄŸi iÃ§in raporlar insan ziyaretinden biraz yÃ¼ksek olabilir.

`site_settings` tablosu Ã¼zerinden e-posta, iki telefon numarasÄ± ve iletiÅŸim konumlarÄ± yÃ¶netilir. YÃ¶netici `/admin` panelindeki â€œÄ°letiÅŸim bilgileriâ€ formunu kaydettiÄŸinde ana sayfanÄ±n iletiÅŸim alanÄ± ve Organization yapÄ±landÄ±rÄ±lmÄ±ÅŸ verisi yeni deÄŸerleri kullanÄ±r.

Ana sayfadaki teklif, numune, WhatsApp, e-posta, PDF indirme ve form baÅŸlangÄ±Ã§/gÃ¶nderim aksiyonlarÄ± `site_events` tablosunda anonim ziyaretÃ§i hash'i ile Ã¶lÃ§Ã¼lÃ¼r. Admin paneli son 30 gÃ¼ndeki en sÄ±k aksiyonlarÄ± gÃ¶sterir. `public/downloads/orchard-to-global-buyer-brief.pdf`, doÄŸrulanmamÄ±ÅŸ fiyat, sertifika veya sevkiyat sÃ¶zÃ¼ iÃ§ermeyen genel bir alÄ±cÄ± brifidir.

## Ä°Ã§erik doÄŸruluÄŸu ve iletiÅŸim

ÃœrÃ¼n TÃ¼rkiye menÅŸeli kuru incirdir; minimum sipariÅŸ miktarÄ± yoktur ve dÃ¶kme veya ambalajlÄ± tedarik gÃ¶rÃ¼ÅŸÃ¼lebilir. GÃ¼ncel Ã¼rÃ¼n bilgisi, stok/eriÅŸilebilirlik ve numune talepleri iÃ§in doÄŸrudan iletiÅŸim Ã§aÄŸrÄ±sÄ± yapÄ±lÄ±r. Ä°ÅŸletmenin doÄŸrulanmÄ±ÅŸ sertifika listesi saÄŸlanmadÄ±ÄŸÄ± iÃ§in belirli sertifika, organik Ã¼rÃ¼n, analiz sonucu veya teyitsiz uygunluk iddiasÄ± sunulmaz; kalite ve ihracat belgelerinin kapsamÄ± talep Ã¼zerine teyit edilerek paylaÅŸÄ±labilir.

Ä°letiÅŸim: `info@orchardtoglobal.com`, `+41 78 336 04 25`, `+90 536 847 6521`. Åehirler: ZÃ¼rih, Ä°stanbul ve AydÄ±n; aÃ§Ä±k adres verilmez.
