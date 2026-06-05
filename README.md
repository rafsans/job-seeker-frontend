# Job Matching Platform - Frontend

Ini adalah antarmuka pengguna (Frontend) untuk **Job Matching Platform**. Aplikasi ini menjembatani pencari kerja dan perekrut dengan desain modern, cepat, dan responsif.

## Tech Stack
- **React.js** (dengan bundler **Vite** yang super cepat)
- **Tailwind CSS** (untuk *styling* UI yang cantik dan modern)
- **React Router** (untuk manajemen navigasi antar halaman)
- **Axios** (untuk komunikasi data dengan API Backend)
- **Lucide React** (untuk ikon-ikon interaktif)

## Cara Menjalankan Secara Lokal

Pastikan kamu sudah menginstal Node.js (direkomendasikan versi 18 ke atas).

1. **Buka terminal** di dalam folder ini.
2. **Install semua paket yang dibutuhkan**:
   ```bash
   npm install
   ```
3. **Konfigurasi Environment**:
   Buat file bernama `.env` di folder utama (sejajar dengan `package.json`) dan isi dengan URL Backend:
   ```env
   VITE_API_URL="http://localhost:3000/api"
   ```
4. **Nyalakan Server Development**:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:5173` di browser kamu. Aplikasi sudah siap digunakan!

---
*Catatan: Pastikan Backend dan AI Service juga ikut dijalankan agar semua fitur (terutama parsing CV dan login) berfungsi dengan normal.*
