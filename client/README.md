🛒 Full-Stack Grocery Delivery Platform (Geliştirme Aşamasında)

Bu proje, modern bir grocery (market) sipariş ve teslimat sistemi geliştirmek için oluşturulmuş full-stack bir uygulamadır.

⚠️ Proje hâlâ geliştirme aşamasındadır, bazı özellikler tamamlanmamış veya iyileştirme gerektirmektedir.

📌 İçindekiler
Proje Hakkında
Özellikler
Kullanılan Teknolojiler
Klasör Yapısı
Kurulum
Geliştirme Durumu
🧠 Proje Hakkında

Bu frontend uygulama, Instacart / Blinkit benzeri bir market sipariş sistemi simüle eder.

Amaç:

Kullanıcıların ürünleri inceleyip sipariş verebilmesi
Admin paneli üzerinden ürün ve sipariş yönetimi
Kurye/delivery akışı simülasyonu
⚙️ Kullanılan Teknolojiler
React 19 + TypeScript
Vite
Tailwind CSS
React Router DOM
Axios
Context API
Leaflet (harita & takip)
🧩 Özellikler
👤 Kullanıcı
Ürün listeleme
Sepet sistemi
Checkout akışı
Sipariş oluşturma
Sipariş geçmişi
Sipariş takibi (kısmen)
👨‍💼 Admin
Ürün yönetimi
Sipariş görüntüleme
Teslimat süreci kontrolü
🚚 Delivery
Sipariş atama ekranı
Durum güncelleme
OTP doğrulama (kısmen)
📁 Klasör Yapısı
src/
├── assets/        # Görseller ve sabit veriler
├── components/    # UI bileşenleri
├── context/       # Global state (Auth, Cart)
├── pages/         # Sayfalar
├── config/        # API ayarları
├── types/         # TypeScript tipleri
🚀 Kurulum
git clone https://github.com/your-username/project.git
cd client
npm install
npm run dev
🌍 Environment
VITE_BASE_URL=http://localhost:5000/api
VITE_CURRENCY_SYMBOL=$
⚠️ Geliştirme Durumu (ÖNEMLİ)

Bu proje şu an:

Bazı API response’ları tam stabil değil
Order / Cart akışında edge-case hatalar var
UI tarafında küçük bug’lar bulunuyor
Delivery tracking sistemi tamamlanmadı
Performans ve state yönetimi iyileştirilecek

👉 Kısaca: production hazır değil, aktif geliştirme devam ediyor