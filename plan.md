# Orchard to Global — Uygulama Planı

## Amaç ve kapsam

Türkiye menşeli kuru incirleri toptan alıcılara tanıtan, ABD ve seçili Avrupa pazarlarında keşfedilebilir, güven veren bir B2B web sitesi. Hedef pazarlar ABD, İsviçre, Almanya, Hollanda, İtalya ve Fransa; diller İngilizce, Almanca, Fransızca, İtalyanca ve Hollandaca. Alıcı güncel ürün bilgisi ve numune için işletmeyle iletişime geçer. Sabit minimum sipariş miktarı olmadığı, dökme veya ambalajlı tedarik seçeneklerinin görüşülebileceği açıkça söylenir.

## Görsel yön

**Alternatifler:** Ege ürünleri için editoryal Akdeniz dergisi (0,04); İsviçre ticaret kataloğu sadeliği (0,07); çağdaş emtia ticareti minimalizmi (0,09).

**Seçilen yön: Editoryal Akdeniz dergisi.**

- **Tasarım hareketi:** çağdaş Avrupa gıda editoryali; üretim yeri hissi veren doğal fotoğraf, tipografi ve bol nefes alan alanlar.
- **Temel ilkeler:** ticari güven; sıcak ama abartısız ürün anlatımı; teklif/numuneye kısa yol; mobilde ve beş dilde okunabilirlik.
- **Renk yaklaşımı:** krem taş zemin, zeytin-yeşili bilgi alanları ve incir moru marka vurgusu; bakır/amber detaylar ürün fotoğrafına eşlik eder. Doğal palet sertifika/organik iddiası anlamına gelmez.
- **Yerleşim:** asimetrik, geniş hero alanı; metin solda, ürün fotoğrafı sağda; aşağıda toptan tedarik seçenekleri, uygunluk yaklaşımı ve iletişim bölümleri. Sabit, yoğun kart ızgaraları kullanılmaz.
- **İmza öğeleri:** incir çekirdeğini çağrıştıran küçük nokta dizileri; ince dal/hasat çizgileri; büyük editoryal başlıklar ve fotoğrafın kenarında ince çerçeve.
- **Etkileşim ve hareket:** form alanlarında görünür odak göstergeleri, kolay dil geçişi ve yumuşak CTA durumları. Hareket kısa ve düşük yoğunluklu; `prefers-reduced-motion` desteklenir.
- **Tipografi:** başlıklarda Georgia tabanlı kontrastlı serif, metin ve arayüzde sistem sans-serif; harici font servislerine zorunlu bağımlılık yok.
- **Marka özü:** Türkiye'nin incir üretim bölgesinden gelen toptan kuru incir tedarikini, güncel taleplere göre işletmeyle doğrudan görüşme imkânıyla uluslararası alıcıya sunar. Kişilik: doğal, açık, güvenilir.
- **Marka sesi:** kısa, bilgi veren, iddiasını kanıtlanabilir kapsamda tutan B2B dili. Örnek: “İhtiyacınıza göre dökme veya ambalajlı tedariki konuşalım.” / “Güncel ürün bilgisi ve numune için bize ulaşın.”
- **Wordmark/logo fikri:** “Orchard to Global” metin işareti yanında incir formu ve tek yaprak çizgisinden oluşan özgün, küçük bir vektör sembol.
- **İmza rengi:** derin incir moru (`#5B2F3B`).

## Uygulama yaklaşımı

- Next.js App Router, TypeScript ve CSS ile Vercel uyumlu uygulama; açık sayfalar dil başına statik üretilebilir (`/en`, `/de`, `/fr`, `/it`, `/nl`), locale root layout'u HTML `lang` niteliğini ilgili dile göre üretir ve `/` İngilizce varsayılana yönlendirir. Ayrı `(default)` root layout'u `/` ve `/admin` rotalarını kapsar.
- Her dil için ayrı SEO başlığı/açıklaması ve içerik; hreflang (İngilizce ABD, Almanca Almanya/İsviçre, Fransızca Fransa/İsviçre, İtalyanca İtalya, Hollandaca Hollanda), sitemap, robots, Open Graph ve sosyal paylaşım metadata'sı.
- Web sitesi domaini kullanıcı tarafından henüz doğrulanmadığından `NEXT_PUBLIC_SITE_URL` ortam değişkeni ayarlanmadan canonical/og:url için tahmini alan adı üretilmez.
- Teklif formu Next.js route handler üzerinden doğrulanır ve standart PostgreSQL bağlantı dizisi (`DATABASE_URL`) ile saklanır. Şema migrasyonu `db/001_init.sql` dosyasında yer alır; Vercel kurulumunda kalıcı Postgres hizmeti gereklidir.
- Form gönderiminde ad-soyad, telefon, e-posta, opsiyonel şirket, ülke, mesaj; sunucu tarafında IP ve User-Agent toplanır. Kayıtlar sadece talebi cevaplama/işletme takibi amacıyla kullanılır; form yanında kısa şeffaf bildirim yer alır. Vercel cron günde bir kez 60 aydan eski kayıtları siler.
- `/admin` sayfası form kayıtları için tek kullanıcılı paneldir. Kullanıcı adı/parola `ADMIN_USERNAME` ve `ADMIN_PASSWORD`; oturum imza anahtarı `SESSION_SECRET` üzerinden çalışır. Hiçbir parola koda, Git'e ya da arşive yazılmaz; kullanıcı Vercel Environment Variables alanında tanımlar. Oturum HttpOnly, Secure ve SameSite korumalı çerezdir; admin login/logout POST istekleri same-origin doğrulamasından geçer, özel API cevapları cache dışıdır ve admin/noindex yapılır.
- Kayıtlı sertifika veya kalite şeması bilgisi verilmedi; belirli sertifika adı, organik iddiası, laboratuvar sonucu veya doğrulanmamış uygunluk iddiası yazılmaz. Yalnızca kalite/ihracat belge ayrıntılarının talep üzerine teyit edilerek paylaşılabileceği söylenir.
- `README.md`, `.env.example`, SQL şema ve Vercel cron/dağıtım yönergeleri Vercel'e aktarmayı kolaylaştırır. `.env.example` yalnızca anahtar adlarını ve yer tutucuları içerir.

## Proje yapısı

- `app/`: Next.js sayfaları, çok dilli `[locale]` ve `(default)` root layout'ları, admin rotası ve API route handler'ları (`api/contact`, `api/auth/*`, `api/admin/*`, `api/cron/retention`).
- `components/`: ana navigasyon, dil seçici, form ve admin kayıt tablosu gibi paylaşılan etkileşimli parçalar.
- `lib/`: locale metinleri/SEO, form doğrulama, PostgreSQL istemcisi ve oturum/imza doğrulama.
- `db/`: kalıcı form tablosu ve retention indeksi için SQL migrasyonu.
- `public/`: Vercel statik görselleri ve site ikonları.
- Kök dosyalar: Vercel cron yapılandırması, Next/TypeScript yapılandırmaları, `.env.example` ve dağıtım README'si.
