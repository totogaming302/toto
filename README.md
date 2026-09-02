# 📉 Mata Uang Melemah, Ekspor Meningkat?
> **An Interactive Macroeconomics Scrollytelling Web Documentary & Policy Simulator**

Sebuah presentasi interaktif scrollytelling yang membedah paradoks depresiasi nilai tukar rupiah, dinamika transmisi inflasi (*imported inflation*), anomali Kurva-J (*J-Curve dynamics*), hingga simulasi ruang krisis kebijakan makroekonomi (*Crisis Room Policy Simulator*).

---

## 🏛️ Struktur Narasi & Fitur Utama

1. **Section 1: Paradoks Erdogan & Ilusi Devaluasi**
   - Headline interaktif: *"Mata Uang Melemah, Ekspor Meningkat?"*
   - Analisis studi kasus historis (Turki 2021-2023) dan krisis inflasi 85.5%.
   - Ilustrasi editorial: *Prabowo's Nickel Emporium*.
2. **Section 2: Pisau Bermata Dua & Belanja Bahan Baku**
   - Typewriter scrubbed dynamic copy.
   - Pembedahan porsi komponen impor pada manufaktur ekspor unggulan Indonesia (elektronik, tekstil, otomotif).
3. **Section 3: Grid Dampak Sektoral (Pemenang vs Pecundang)**
   - Kuadran komparasi: Eksportir Komoditas Murni (*Untung*), Manufaktur Bergantung Impor (*Buntung*), Produsen Domestik (*Substitusi Impor*), dan Konsumen Akhir (*Silent Casualty*).
4. **Section 4: Anomali Kurva-J (J-Curve Dynamics)**
   - Laser vector SVG trajectory engine dengan koordinat Bézier presisi matematis.
   - Fase 1 (*The Dip / Defisit Perdagangan*), Fase 2 (*Rebound / Net Zero*), dan Fase 3 (*Surplus Peak*).
   - 3 Syarat Elastisitas Marshall-Lerner.
5. **Section 5: Jalur Penularan Inflasi (Imported Inflation)**
   - Efek domino 3 tingkat: Barang konsumsi impor langsung, biaya input industri, hingga logistik & ICP minyak mentah valas.
   - Komik 4 panel transmisi inflasi energi ke supermarket.
6. **Section 6: Diagram Sebab-Akibat (Bifurcated Cause Tree)**
   - Pohon kausalitas interaktif dengan laser branch drawing.
   - Pilihan interaktif pemirsa: *Jalur Optimis (Rebound)* vs *Jalur Pesimis (Stagflasi)*.
7. **Section 7: Crisis Room Simulator (Interactive Policy Sandbox)**
   - Pusat simulasi krisis interaktif dengan scanlines darurat & ticker berita valas.
   - 4 Tuas Kebijakan: Suku Bunga Acuan BI-Rate, Cadangan Devisa (Intervensi Valas), Subsidi Energi, dan Devisa Hasil Ekspor (DHE).
   - Telemetry gauges real-time: Nilai Tukar USD/IDR, Cadangan Devisa, Inflasi IHK, dan Pertumbuhan PDB.
8. **Section 8: Epilogue & Sesi Tanya Jawab**
   - Pinned conclusion stage: Discussion Floor (Q&A) & Final Sign-Off.
9. **HUD Beat Telemetry Navigator**
   - Floating glassmorphic capsule di sudut kanan bawah dengan 28 beat deterministik dan kontrol keyboard/touch.

---

## 🛠️ Tech Stack & Architecture

- **Core**: [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) coupled lockstep with GSAP Ticker
- **Animation & Scrollytelling**: [GSAP 3](https://gsap.com/) + ScrollTrigger
- **3D Atmospheric Backdrop**: [Three.js](https://threejs.org/) (InstancedMesh USD/IDR/EUR coins, dynamic banknotes, particle dust, lighting and fog choreography)
- **Icons & Typography**: [Lucide Icons](https://lucide.dev/), Cinzel / Playfair Display / JetBrains Mono
- **Hardware & Multi-Resolution**: Dynamic dvh units, GPU compositor layer hardware acceleration (translate3d), 48px touch targets, full 4K UHD smartboard and 1080p projector support.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm

### 2. Installation
`ash
git clone <repository-url>
cd <repository-directory>
npm install
`

### 3. Development Server
Jalankan server lokal dengan hot reload:
`ash
npm run dev
`
Buka browser di http://localhost:5173/.

### 4. Production Build
Kompilasi kode untuk produksi:
`ash
npm run build
`
Preview hasil build:
`ash
npm run preview
`

---

## 📄 License
Privat / Educational Web Documentary Presentation.
