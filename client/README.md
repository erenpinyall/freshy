# 🛒 Freshy Full-Stack Grocery Delivery Platform

 Blinkit / BigBasket benzeri, React + Node.js ile geliştirilmiş full stack market sipariş ve teslimat uygulaması.

⚠️ Proje hâlâ geliştirme aşamasındadır.

## 🧠 Proje Hakkında

Bu uygulama, gerçek bir market sipariş ve teslimat sürecini simüle eder.

- Kullanıcılar ürünleri görüntüleyip sipariş verebilir
- Admin paneli üzerinden ürün, sipariş ve kurye yönetimi yapılabilir
- Delivery partner'lar siparişleri teslim edebilir ve canlı konum paylaşabilir
- Stripe ile güvenli ödeme alınabilir
- Sipariş takibi canlı harita ile yapılabilir

## ✨ Özellikler

### 👤 Kullanıcı

- Kayıt ve giriş (JWT ile güvenli oturum)
- Ana sayfada popüler ürünler, kategoriler ve promosyon banner'ı
- 10 farklı kategoride ürün listeleme (meyve-sebze, süt ürünleri, kişisel bakım, atıştırmalık, dondurulmuş gıda, bebek bakımı, et-balık, bakkaliye, fırın, içecek)
- Ürün arama ve filtreleme (kategori, fiyat aralığı)
- Ürün detay sayfası (görsel, fiyat, stok durumu, puan, benzer ürünler)
- Sepet sistemi (ürün ekleme/çıkarma, miktar artırma/azaltma)
- 3 adımlı checkout akışı (adres seçimi → ödeme yöntemi → sipariş onayı)
- Adres yönetimi (ekleme, düzenleme, silme, GPS konumu otomatik alma)
- Stripe ile kart ödemesi veya kapıda ödeme
- Sipariş geçmişi ve durum takibi
- Canlı sipariş takibi harita üzerinde (Leaflet)
- OTP ile teslimat doğrulama
- Flash deals sayfası (indirimli ürünler)
- Duyuru banner'ı (kargo eşiği bilgisi)
- Newsletter aboneliği

### 👨‍💼 Admin

- Dashboard istatistikleri (toplam sipariş, kullanıcı, ürün, stokta olmayan ürünler)
- Son siparişler tablosu
- Ürün yönetimi (ekleme, düzenleme, silme, görsel yükleme)
- Sipariş yönetimi (tüm siparişleri görüntüleme, durum güncelleme)
- Kurye atama (siparişlere aktif kurye atama, OTP oluşturma)
- Kurye yönetimi (yeni kurye kaydetme, aktif/pasif durum değiştirme)

### 🚚 Delivery Partner

- Özel login sayfası
- Atanan siparişleri görüntüleme (aktif / tamamlanan)
- Sipariş durumu güncelleme (Assigned → Packed → Out for Delivery → Delivered)
- OTP ile teslimat doğrulama
- Canlı GPS konum paylaşımı (müşteri haritada takip edebilir)
- Teslimat iptal etme (sebep belirterek)

### ⚡ Backend & Altyapı

- Stripe ödeme entegrasyonu (Checkout Session + Webhook)
- Cloudinary ile ürün görseli yükleme ve CDN üzerinden sunma
- Inngest ile arka plan job'ları:
  - Düşük stok uyarısı (stok < 10 ise admin'e e-posta)
  - Aylık indirim e-postası (her ayın 1'inde tüm kullanıcılara)
  - Otomatik kurye atama (sipariş oluşturulunca 5 dk sonra)
- Nodemailer ile e-posta gönderimi (Brevo SMTP)
- JWT authentication + Admin middleware + Delivery auth middleware
- Prisma ORM ile PostgreSQL veritabanı
- Sipariş yaşam döngüsü: Placed → Confirmed → Assigned → Packed → Out for Delivery → Delivered (veya Cancelled)
- Her durum değişikliği `statusHistory` JSON'ında loglanır

## 🛠️ Teknoloji

| Katman | Teknoloji |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express.js, Prisma ORM |
| Database | PostgreSQL |
| Payment | Stripe |
| Image Hosting | Cloudinary |
| Background Jobs | Inngest |
| Email | Nodemailer |
| Maps | Leaflet + React Leaflet |
