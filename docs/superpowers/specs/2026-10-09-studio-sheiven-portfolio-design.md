# Sheven Studio Company Portfolio — Design Spec

Tanggal: 2026-10-09
Status: menunggu review pengguna

## 1. Tujuan

Website company portfolio satu halaman untuk **Sheven Studio**, studio software yang baru berdiri (Agustus 2026) dan dibangun oleh dua founder. Pesan utama: membantu orang yang kesulitan membangun aplikasi besar. Tujuan konversi: menarik pengguna pertama (beta tester, pengguna produk) dan calon klien lewat konsultasi gratis.

Referensi visual: shot Dribbble "Trading Website Design Project" (Alpha Ledger, oleh Mirhayot untuk Eloqwnt): minimalis hitam-putih, hero dua tingkat, mockup laptop dengan dashboard gelap, tombol pil hitam.

## 2. Keputusan yang sudah disepakati

| Topik | Keputusan |
|---|---|
| Bahasa | Dua bahasa, ID dan EN, dengan toggle |
| Tech stack | HTML statis + Tailwind CSS (CDN) + Alpine.js, tanpa Next.js dan tanpa build step |
| Founder | Foto, nama, dan peran **placeholder** untuk 2 founder, beserta timeline historis |
| Produk | Mockup semua produk, dibuat dengan HTML/CSS |
| Kontak | WhatsApp, email, form kontak, dan link produk (semua placeholder dulu) |
| Rasa mewah | Animasi dan SVG (lihat bagian 5) |
| Testimoni dan angka | **Opsi A**: counter angka besar dari fakta yang benar + slot testimoni nyata. **Tidak ada angka klien atau testimoni palsu.** |

## 3. Struktur halaman (satu halaman, scroll)

1. **Navbar** — logo di kiri, menu tengah (Beranda, Produk, Layanan, Tentang, Kontak), toggle ID/EN dan tombol pil hitam "Konsultasi Gratis" di kanan. Hamburger di mobile.
2. **Hero** — judul dua tingkat (baris 1 abu-abu, baris 2 hitam tebal), subjudul, dua CTA (Konsultasi Gratis, Lihat Produk), mockup laptop berisi dashboard gelap.
3. **Angka** — counter animasi besar dari fakta yang valid (lihat bagian 4).
4. **Produk** — kartu dengan mockup:
   - Graciatitip: badge **Live**, tombol ke URL produk (placeholder).
   - Warehouse Management: badge **Beta**, tombol "Gabung Beta".
   - RestoPOS: badge **Segera**.
   - Kartu roadmap: HR & Payroll, CRM, Church Management.
5. **Layanan** — konsultasi, desain, pengembangan, peluncuran; untuk yang kesulitan membangun aplikasi besar.
6. **Cara Kerja** — 4 langkah, dari diskusi sampai peluncuran.
7. **Tentang** — founder (placeholder) + timeline.
8. **Testimoni** — slot kartu testimoni dengan tampilan jadi. Selama data kosong, tampil ajakan "Jadilah pengguna pertama kami".
9. **Kontak** — WhatsApp, email, form kontak (Web3Forms).
10. **Footer.**

## 4. Konten faktual (tidak boleh diganti dengan angka karangan)

**Timeline**
- Agustus 2026: Sheven Studio berdiri.
- September 2026: tiga produk mulai dikembangkan.
- Status sekarang: Graciatitip live; Warehouse Management beta; RestoPOS segera hadir.
- Roadmap: HR & Payroll, CRM, Church Management.

**Counter angka (hanya fakta valid, dapat diubah di `i18n.js`)**
- 3 produk dalam pengembangan
- 1 produk sudah live
- 6 modul dalam roadmap (3 aktif + 3 direncanakan)
- 2026 tahun berdiri

**Testimoni:** array di `i18n.js`, awalnya kosong. Kalau ada isinya, kartu tampil otomatis; kalau kosong, tampil ajakan pengguna pertama. Tidak ada kutipan contoh.

## 5. Gaya visual dan animasi

- Dasar: latar putih, teks hitam, abu-abu sebagai aksen, tombol pil hitam, font sans-serif tebal (Inter atau Geist).
- **Hero:** judul muncul kata demi kata; mockup laptop naik dengan efek 3D tilt; garis SVG tipis yang tergambar sendiri (line-draw).
- **Latar:** gradient mesh halus bergerak pelan, grain noise tipis, grid SVG samar.
- **Kartu produk:** efek spotlight mengikuti kursor, hover lift dan glow tipis, ikon SVG custom beranimasi.
- **Timeline:** garis SVG yang tergambar mengikuti scroll.
- **Interaksi:** kursor custom halus, tombol magnetic, marquee SVG, transisi antar-section yang mulus, counter angka yang naik saat terlihat.
- **Mockup produk:** bingkai laptop atau browser berisi UI dashboard sederhana (HTML/CSS), bisa diganti screenshot asli nanti.
- **Aksesibilitas:** semua animasi mengikuti `prefers-reduced-motion`; kontras teks memenuhi WCAG AA; navigasi keyboard dan focus state jelas.

## 6. Struktur teknis

```
studiosheiven porto/
├── index.html
├── js/
│   ├── i18n.js      # semua teks ID/EN + data produk, founder, timeline, angka, testimoni, kontak
│   └── app.js       # Alpine component, animasi, counter, tilt, spotlight, cursor
├── css/
│   └── styles.css   # keyframes, mesh gradient, grain, custom properties
└── assets/
    ├── img/founders/   # placeholder foto
    ├── img/products/   # screenshot opsional
    └── svg/            # logo, ikon, ornamen
```

- Tailwind lewat CDN, Alpine.js lewat CDN (versi ditentukan, bukan `latest`).
- Satu sumber data di `i18n.js`: ganti nama founder, URL produk, nomor WhatsApp, email, tahun, dan testimoni di satu tempat.
- Bahasa disimpan di `localStorage` (dibungkus try/catch), default mengikuti bahasa browser, lalu fallback ke ID. Atribut `lang` pada `<html>` ikut berubah.
- Form kontak: Web3Forms, access key placeholder `YOUR_ACCESS_KEY`. Ada status sukses dan error, serta honeypot anti-spam.
- SEO: title, meta description, Open Graph, favicon SVG. Tautan WhatsApp memakai format `https://wa.me/<nomor>`.
- Responsif dari 360px sampai desktop lebar; tidak ada scroll horizontal.

## 7. Placeholder yang harus diganti sebelum publikasi

- Nama, foto, dan peran founder
- Nomor WhatsApp dan email
- URL Graciatitip dan tautan "Gabung Beta" Warehouse
- Access key Web3Forms
- Domain di meta Open Graph
- Testimoni (isi hanya dengan testimoni asli)

## 8. Di luar cakupan

Testimoni atau angka klien palsu, blog, login, backend, CMS, dan analitik.

## 9. Pengujian

- Buka `index.html` di browser dan periksa semua section pada lebar 375px, 768px, dan 1440px.
- Toggle ID/EN mengubah semua teks tanpa teks yang tertinggal.
- Counter angka, animasi scroll, dan SVG line-draw berjalan; dengan `prefers-reduced-motion` semuanya statis.
- Form kontak menampilkan status sukses dan error; link WhatsApp dan email berfungsi.
- Tidak ada error di console; semua gambar dan SVG termuat.
