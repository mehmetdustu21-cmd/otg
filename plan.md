# Orchard to Global — Uygulama Planı

## Amaç ve kapsam

Türkiye menşeli kuru incirleri toptan alıcılara tanıtan, ABD ve seçili Avrupa pazarlarında keşfedilebilir B2B web sitesi. Hedef pazarlar ABD, İsviçre, Almanya, Hollanda, İtalya ve Fransa; diller İngilizce, Almanca, Fransızca, İtalyanca ve Hollandaca. Alıcı güncel ürün bilgisi ve numune için işletmeyle iletişime geçer. Sabit minimum sipariş miktarı olmadığı, dökme veya ambalajlı tedarik seçeneklerinin görüşülebileceği açıkça söylenir. Ana sayfada beş dilde bir Hakkımızda bölümü 2017’den beri bu alanda çalışma bilgisini ve kurucular Ziya Teleti ile Muhammed Mehmet Düştu adlarını verir.

## Görsel yön

Mevcut proje estetiği referans alınır: **editoryal Akdeniz dergisi**. Yeni marka işareti, mevcut incir-mor/zeytin-krem paletiyle uyumlu, ölçeklenebilir bir incir ve yaprak sembolü olur; marka adı doğru HTML metni olarak yanında kalır. Logo içinde üretilmiş yazı kullanılmaz. Yeni ürün fotoğrafları, kuru inciri doğru gösteren sade ve doğal ışıklı editoryal kompozisyonlar olur; gerçek fabrika, sertifika, ambalaj markası veya organik üretim iddiası izlenimi verilmez. Tekrarlanan yıldız/simge süsleri, yinelenen görsel etiketleri ve gereksiz yan metin kaldırılır; görseller için yalnızca gerekli açıklama korunur.

**Temel ilkeler:** güvenilir B2B ürün bilgisi, sade görsel hiyerarşi, beş dilde okunabilirlik, mobil erişilebilirlik. Başlık serif ve arayüz metni sistem sans-serif kalır. Büyük başlıklar, açık zemin, incir moru marka rengi ve ölçülü zeytin/amber vurgular sürer. CTA'lar kısa, net ve aynı eylemi tekrarlamayan biçimde düzenlenir.

## Uygulama yaklaşımı

- Next.js App Router, TypeScript ve CSS ile Vercel uyumlu uygulama; açık ana sayfalar dil başına statik üretilebilir (`/en`, `/de`, `/fr`, `/it`, `/nl`), FAQ rotaları her dilde `/[locale]/faq` olur. Hakkımızda içeriği her dilde ana sayfada görünür.
- Yerelleştirilmiş ana ve FAQ sayfalarında ayrı, arama niyetine uygun başlık/açıklama ve 3–8 özgün keyword; ana HTML gövdesinde anlamlı metin; FAQ'da doğal iç linkler; doğru `lang`, hreflang, canonical, Open Graph ve Twitter Card metadata'sı.
- Organizasyon JSON-LD'si yalnızca kullanıcı tarafından verilen kurucu adları ile doğrulanmış şirket adı, telefon, e-posta, logo, site origin'i ve mevcut hedef pazarları kullanır. FAQ JSON-LD'si yalnızca görünür FAQ içeriğiyle birebir eşleşir. Bilinmeyen kuruluş tarihi, adres, sertifika, organik iddia veya ticari şart üretilmez.
- Sitemap her dil için ana ve FAQ URL'lerini, karşılıklı hreflang alternatiflerini listeler; robots `/admin` ve `/api/` yollarını dışarıda tutar. Gerçek origin `NEXT_PUBLIC_SITE_URL` olmadan tahminî canonical veya sitemap URL'si üretilmez.
- Teklif formu Next.js route handler üzerinden doğrulanır ve `DATABASE_URL` ile kalıcı PostgreSQL'de saklanır; admin oturumu ve form gizlilik metinleri korunur.

## Proje yapısı

- `app/`: `[locale]` ana sayfaları, ana sayfadaki Hakkımızda bölümü, `[locale]/faq` içerik sayfaları, `(default)` kök/admin rotaları, API ve sitemap/robots handler'ları.
- `components/`: logo/wordmark, dil seçici, iletişim formu ve admin paneli.
- `lib/copy.ts`: ana sayfa yerelleştirilmiş içerikleri; `lib/about-copy.ts`: Hakkımızda metinleri; `lib/faq-copy.ts`: FAQ metinleri; `lib/site-metadata.ts`: ortak metadata.
- `public/images/`: ürün fotoğrafları ve logo simgesi; aynı yeni PNG sembol favicon metadata'sında kullanılır.
- `db/`: kalıcı form tablosu şeması; kök dosyalar: Vercel cron, TypeScript/Next.js ve dağıtım rehberi.
