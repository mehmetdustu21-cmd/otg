# Orchard to Global

Beş dilli (İngilizce, Almanca, Fransızca, İtalyanca ve Hollandaca), SEO odaklı kuru incir toptan satış sitesi. Uygulama Next.js App Router ve TypeScript ile hazırlanmıştır; Vercel'e aktarılabilir. Açık site ve form arayüzü çalışır. Gerçek teklif kayıtlarının kalıcı tutulması için PostgreSQL ve üretim ortam değişkenleri kurulmalıdır.

## Yerel geliştirme

- Node.js 20.9 veya üstü, pnpm 11.25.0 kullanın (`package.json` içindeki `packageManager` sürümü sabitler).
- `pnpm install --frozen-lockfile`
- `.env.example` dosyasını `.env.local` olarak kopyalayıp Neon bağlantı dizesini ve gereken değişkenleri tanımlayın.
- Neon SQL Editor'da sırasıyla `db/001_init.sql`, `db/002_analytics.sql` ve `db/003_site_settings.sql` dosyalarını bir kez çalıştırın.
- `pnpm dev` ile açın; `pnpm typecheck` ve `pnpm build` derleme kontrolleridir.

## Vercel'e dağıtım

1. Kaynak kodu GitHub gibi bir Git sağlayıcısına yükleyin ve Vercel'de **Add New → Project** ile içe aktarın. Arşivden aktarılıyorsa depo içeriğini proje kök dizinine yükleyin. Root Directory depo kökü olmalıdır; Next.js framework'ü otomatik algılanır.
2. Project Settings → Environment Variables bölümünde aşağıdaki değerleri ekleyin. Canlı kullanım için en az Production scope'u; önizlemelerde test edecekseniz Preview/Development scope'larını da ayarlayın.
3. Neon'da bir proje oluşturun ve Connect ekranındaki **pooled** bağlantı dizesini Vercel'de `DATABASE_URL` olarak kaydedin. Neon SQL Editor'da `db/001_init.sql`, `db/002_analytics.sql` ve `db/003_site_settings.sql` dosyalarını **bir kez** çalıştırın; uygulama otomatik migration yürütmez.
4. Vercel Project → Settings → Domains bölümünde gerçek alan adını ekleyip alan adı sağlayıcınızın istediği DNS kayıtlarını tamamlayın. Domain belli olduğunda `NEXT_PUBLIC_SITE_URL` değerini `https://gercek-alan-adiniz` biçiminde, sondaki `/` olmadan girin. Vercel'in oluşturduğu `https://proje-adiniz.vercel.app` alan adı kullanılacaksa o origin'i girin. Canonical, hreflang, Open Graph ve sitemap adresleri bu değişkenden üretilir; alan adı bilinmeden tahmini URL kullanılmaz. Bu değişken build sırasında kullanıldığı için değiştirildiğinde yeniden deploy edin.
5. Değişkenleri ve SQL şemasını doğruladıktan sonra Vercel Dashboard'dan deploy edin veya projeyi yerelde Vercel CLI ile bağlayıp `vercel --prod` çalıştırın. `vercel.json` retention Cron'unu günlük 03:00 UTC için tanımlar; Vercel Cron Production deploy'unda `/api/cron/retention` çağrısını yapar. Cron doğrulaması için Vercel'de `CRON_SECRET` tanımlı olmalıdır.
6. Yayından sonra beş `/{locale}` ana sayfasını ve beş `/{locale}/faq` rotasını, hreflang/canonical adreslerini, sitemap'i, iletişim formunu, `/admin` girişini ve cron çalışma kaydını kontrol edin. Üretimden önce işletmenin yasal unvanı, veri sorumlusu iletişim bilgisi, geçerli hukuki dayanak ve ilgili gizlilik yükümlülüklerini işletme doğrulamalıdır.

| Değişken | Açıklama |
| --- | --- |
| `DATABASE_URL` | Neon pooled PostgreSQL bağlantı dizesi; istek sırasında kullanılır, build aşamasında okunmaz. `NEON_DATABASE_URL` ve `POSTGRES_URL` yedek isimlerdir. |
| `ANALYTICS_HASH_SALT` | IP ve tarayıcı bilgisinden benzersiz ziyaretçi tahmini üretmek için kullanılan rastgele, gizli değer. |
| `ADMIN_USERNAME` | Yönetim paneli kullanıcı adı; başlangıç varsayılanı `mehmetdustu`. Üretimde açıkça tanımlanabilir. |
| `ADMIN_PASSWORD` | `/admin` için güçlü yönetici parolası. Yalnızca Vercel Environment Variables içinde saklayın. |
| `SESSION_SECRET` | İmzalı yönetici oturumları için rastgele, en az 32 karakterlik gizli değer. |
| `CRON_SECRET` | Vercel Cron'un `Authorization: Bearer ...` başlığında kullanacağı gizli değerle aynı olmalıdır. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, hreflang, Open Graph ve sitemap için gerçek, dışarıdan erişilen site origin'i; sondaki `/` olmamalıdır. |

`SESSION_SECRET`, `CRON_SECRET` ve `ANALYTICS_HASH_SALT` için ayrı değerler üretin; örneğin güvenli bir terminalde her biri için `openssl rand -base64 48` çalıştırabilirsiniz. Oluşan değerleri kaynak koda, Git'e, issue'lara veya dağıtım arşivine koymayın. `DATABASE_URL` build sırasında zorunlu değildir; fakat Neon şeması ve bağlantısı kurulmadan form kayıtları, admin kayıt listesi, ziyaret istatistikleri ve retention temizliği çalışmaz. `ADMIN_PASSWORD` tanımlanmazsa admin girişi kapalı kalır; `SESSION_SECRET` en az 32 karakter olmalıdır. Yönetici oturum çerezi HttpOnly, Secure ve SameSite=None ayarlarıyla 8 saat geçerlidir; admin sayfası noindex'tir ve admin API yanıtları cache dışıdır.

Formda honeypot ve alan doğrulaması bulunur; ancak form ve admin giriş uç noktalarında dağıtık rate limit uygulama koduna dahil değildir. Üretime açmadan önce Vercel planınızın desteklediği Firewall/WAF kuralıyla `POST /api/auth/login` ve `POST /api/contact` isteklerini sınırlayın ve admin için uzun, benzersiz bir parola kullanın. Admin login/logout POST istekleri ayrıca same-origin doğrulamasından geçer.

## Form, gizlilik ve retention

Form; ad-soyad, telefon, e-posta, isteğe bağlı şirket adı, ülke ve mesajı PostgreSQL'e kaydeder. Sunucu ayrıca IP adresi ve User-Agent tarayıcı bilgisini alır. Formun yanındaki bildirim toplanan alanları, yalnızca talebi yanıtlama/işletme takibi amacını ve en fazla 60 aylık saklama süresini açıklar. Günlük Vercel Cron, 60 aydan eski kayıtları siler. Bu uygulama hukuki danışmanlık değildir.

Ziyaret analitiği, herkese açık sayfaların sunucu tarafı görüntülenmelerini `site_visits` tablosuna kaydeder. Günlük, son 7 gün, son 30 gün ve toplam görüntüleme sayıları admin panelinde gösterilir. Benzersiz ziyaretçi sayısı IP + User-Agent bilgilerinin geri döndürülemez hash değerine dayanır; bu nedenle gerçek kişi sayısı değil, gizlilik dostu bir tahmindir. Reklam engelleyiciler veya JavaScript kapalı olması bu server-side görüntüleme ölçümünü etkilemez; bot trafiği ayrıca filtrelenmediği için raporlar insan ziyaretinden biraz yüksek olabilir.

`site_settings` tablosu üzerinden e-posta, iki telefon numarası ve iletişim konumları yönetilir. Yönetici `/admin` panelindeki “İletişim bilgileri” formunu kaydettiğinde ana sayfanın iletişim alanı ve Organization yapılandırılmış verisi yeni değerleri kullanır.

## İçerik doğruluğu ve iletişim

Ürün Türkiye menşeli kuru incirdir; minimum sipariş miktarı yoktur ve dökme veya ambalajlı tedarik görüşülebilir. Güncel ürün bilgisi, stok/erişilebilirlik ve numune talepleri için doğrudan iletişim çağrısı yapılır. İşletmenin doğrulanmış sertifika listesi sağlanmadığı için belirli sertifika, organik ürün, analiz sonucu veya teyitsiz uygunluk iddiası sunulmaz; kalite ve ihracat belgelerinin kapsamı talep üzerine teyit edilerek paylaşılabilir.

İletişim: `info@orchardtoglobal.com`, `+41 78 336 04 25`, `+90 536 847 6521`. Şehirler: Zürih, İstanbul ve Aydın; açık adres verilmez.
