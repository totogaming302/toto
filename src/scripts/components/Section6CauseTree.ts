import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION_6_COPY } from '../../data/editorialCopy.ts';

gsap.registerPlugin(ScrollTrigger);

interface NodeTelemetryData {
  title: string;
  badge: string;
  badgeType: 'emerald' | 'crimson' | 'gold';
  summary: string;
  metrics: { label: string; value: string }[];
  policyInsight: string;
}

export class Section6CauseTree {
  private container: HTMLElement;
  private timeline!: gsap.core.Timeline;

  private telemetryData: Record<string, NodeTelemetryData> = {
    'root': {
      title: 'Pelemahan Nilai Tukar Rupiah',
      badge: 'TITIK AWAL // INITIAL MACRO SHOCK',
      badgeType: 'gold',
      summary: 'Depresiasi mata uang terjadi ketika permintaan terhadap valuta asing (USD) melebihi pasokan, atau terjadi capital outflow masif akibat suku bunga global yang lebih tinggi.',
      metrics: [
        { label: 'Indikator Kurs Tertekan', value: 'Rp 14.500 → Rp 19.330 (-33%)' },
        { label: 'Pemicu Utama', value: 'Capital Outflow & Fed Rate Hike' },
        { label: 'Dampak Volatilitas', value: 'Tinggi pada Semua Transaksi Lintas Batas' }
      ],
      policyInsight: 'Bank Sentral harus cermat memantau apakah devaluasi ini bersifat temporer (spekulasi) atau struktural (defisit transaksi berjalan).'
    },
    'l1': {
      title: 'Produk Indonesia Relatif Lebih Murah Bagi Pembeli Luar Negeri',
      badge: 'DAYA SAING HARGA // GLOBAL ARBITRAGE',
      badgeType: 'emerald',
      summary: 'Karena nilai tukar rupiah melemah, pembeli internasional yang memegang dolar hanya membutuhkan lebih sedikit valas untuk membeli kuantitas barang Indonesia yang sama.',
      metrics: [
        { label: 'Diskon Efektif Valas', value: '-25% s.d. -33% di Pasar Ekspor' },
        { label: 'Indeks REER', value: 'Kompetitif vs Negara Pesaing ASEAN' },
        { label: 'Sektor Diuntungkan', value: 'Tekstil, Kerajinan, Alas Kaki, CPO, Nikel' }
      ],
      policyInsight: 'Kelebihan harga ini hanya bertahan jika inflasi domestik tidak segera melesat dan melenyapkan diferensial harga tersebut.'
    },
    'l2': {
      title: 'Permintaan dan Daya Saing Ekspor Meningkat',
      badge: 'LONJAKAN VOLUME ORDER // CONTRACT BOOM',
      badgeType: 'emerald',
      summary: 'Mitra dagang luar negeri mengalihkan kontrak pengadaan mereka ke produsen Indonesia karena harga penawaran produk kita lebih murah dibanding negara produsen pesaing.',
      metrics: [
        { label: 'Kenaikan Permintaan Order', value: '+18% s.d. +24% YoY' },
        { label: 'Utilisasi Kapasitas Pabrik', value: 'Meningkat Menuju 85%' },
        { label: 'Penetrasi Pasar Baru', value: 'Ekspansi ke Uni Eropa, Timur Tengah, & Afrika' }
      ],
      policyInsight: 'Pabrik manufaktur lokal harus memiliki kapasitas cadangan (spare capacity) agar lonjakan pesanan baru dapat benar-benar diproduksi.'
    },
    'l3': {
      title: 'Pendapatan Devisa Berpotensi Meningkat',
      badge: 'AKUMULASI VALAS // CASH INFLOW',
      badgeType: 'emerald',
      summary: 'Volume ekspor yang membesar menghasilkan arus masuk valuta asing (USD) yang lebih masif ke dalam sistem keuangan nasional.',
      metrics: [
        { label: 'Inflow Devisa Hasil Ekspor (DHE)', value: 'Peningkatan +22% Aliran Valas' },
        { label: 'Surplus Transaksi Berjalan', value: 'Potensi Berbalik Positif' },
        { label: 'Ketahanan Cadangan Devisa', value: 'Membantu Mempertebal Bantalan Moneter' }
      ],
      policyInsight: 'Pemerintah perlu memberlakukan aturan repatriasi Devisa Hasil Ekspor (DHE) agar valas benar-benar mengendap di perbankan domestik.'
    },
    'l4': {
      title: 'Pertumbuhan Ekonomi Dapat Terdorong',
      badge: 'EKSPANSI PDB // NET EXPORT GROWTH',
      badgeType: 'emerald',
      summary: 'Ekspor bersih (Net Exports = X - M) yang positif berkontribusi langsung pada perhitungan Produk Domestik Bruto (PDB), menciptakan lapangan kerja baru dan menyerap tenaga kerja lokal.',
      metrics: [
        { label: 'Kontribusi ke PDB Riil', value: '+0.4% s.d. +0.8% PDB Tambahan' },
        { label: 'Penyerapan Tenaga Kerja', value: 'Ekspansi di Sentra Industri Ekspor' },
        { label: 'Hasil Akhir Jalur 1', value: 'Pertumbuhan Berbasis Ekspor (Export-Led Growth)' }
      ],
      policyInsight: 'Kondisi ideal ini tercapai penuh apabila rantai pasok domestik mandiri dan tidak tercekik oleh komponen impor.'
    },
    'r1': {
      title: 'Harga Barang dan Bahan Baku Impor Meningkat',
      badge: 'IMPORT PRICE SHOCK // BIAYA PENGADAAN',
      badgeType: 'crimson',
      summary: 'Setiap barang dan komponen impor harus ditebus dengan valuta asing. Begitu rupiah jatuh, nilai tukar membebankan lonjakan biaya langsung dalam pembukuan rupiah.',
      metrics: [
        { label: 'Lonjakan Biaya Impor (IDR)', value: '+33.3% Kenaikan Seketika' },
        { label: 'Porsi Input Impor Manufaktur', value: 'Mencapai ~70% di Beberapa Sektor' },
        { label: 'Komoditas Paling Rentan', value: 'Gandum, Kedelai, Chip, Obat-obatan' }
      ],
      policyInsight: 'Perusahaan tanpa lindung nilai (forex hedging) akan menanggung beban rugi selisih kurs yang meremukkan arus kas.'
    },
    'r2': {
      title: 'Biaya Produksi Perusahaan Meningkat',
      badge: 'MARGIN COMPRESSION // BIAYA PABRIK',
      badgeType: 'crimson',
      summary: 'Biaya pembelian bahan baku yang mahal menggelembungkan total biaya pokok produksi (Cost of Goods Sold/COGS), menekan margin laba operasional perusahaan secara brutal.',
      metrics: [
        { label: 'Peningkatan COGS Pabrik', value: '+20% s.d. +28% Beban Produksi' },
        { label: 'Erosi Margin Laba Bersih', value: 'Menyusut Menuju Teritori Defisit' },
        { label: 'Dilema Strategis', value: 'Menanggung Kerugian vs Menaikkan Harga Jual' }
      ],
      policyInsight: 'Industri yang padat input impor akan mengurangi kapasitas produksi atau memangkas jam lembur karyawan untuk bertahan hidup.'
    },
    'r3': {
      title: 'Harga Barang Dalam Negeri Meningkat',
      badge: 'COST-PUSH INFLATION // PASSTHROUGH',
      badgeType: 'crimson',
      summary: 'Produsen tidak mampu menanggung lonjakan biaya input sendirian, sehingga terpaksa melimpahkan beban kenaikan biaya ke harga jual eceran yang harus dibayar konsumen.',
      metrics: [
        { label: 'Kenaikan Harga Barang Ritel', value: '+15% s.d. +25% di Pasar Domestik' },
        { label: 'Transmisi ke IHK', value: 'Inflasi Inti dan Volatile Foods Melonjak' },
        { label: 'Penyebaran Efek Domino', value: 'Merata dari Produk Jadi hingga Pangan' }
      ],
      policyInsight: 'Imported inflation kini resmi bermutasi menjadi inflasi domestik yang menggerus seluruh lapisan masyarakat.'
    },
    'r4': {
      title: 'Inflasi Meningkat & Daya Beli Masyarakat Menurun (Stagflation)',
      badge: 'STAGFLASI // CASUALTY EKONOMI',
      badgeType: 'crimson',
      summary: 'Kenaikan harga barang di pasar tidak diimbangi oleh kenaikan upah riil. Konsumen terpaksa memangkas konsumsi, roda ekonomi melambat, dan ancaman stagflasi (inflasi tinggi + ekonomi macet) membayangi.',
      metrics: [
        { label: 'Penurunan Daya Beli Riil', value: '-28% Kemampuan Belanja Konsumen' },
        { label: 'Risiko Stagflasi', value: 'Tinggi (Pertumbuhan Lambat + Inflasi Tinggi)' },
        { label: 'Hasil Akhir Jalur 2', value: 'Kelesuan Konsumsi Domestik & Krisis Biaya Hidup' }
      ],
      policyInsight: 'Pemerintah wajib menyalurkan bantalan sosial (bansos tunai) dan menstabilkan pasokan pangan pokok untuk mencegah krisis kemiskinan baru.'
    }
  };

  constructor(containerId: string = 'section-6') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Section 6 container #${containerId} not found`);
    }
    this.container = el;
    this.renderSectionStructure();
    this.initInteractiveModal();
    this.initScrollytellingTimeline();
  }

  /**
   * Renders Section 6 Cause-and-Effect flowchart architecture.
   */
  private renderSectionStructure(): void {
    const p1 = SECTION_6_COPY.path1.nodes;
    const p2 = SECTION_6_COPY.path2.nodes;

    this.container.innerHTML = `
      <div class="pinned-viewport" id="s6-pinned-viewport">
        <!-- Fullscreen Question Anchor Hero -->
        <div class="s6-question-hero" id="s6-question-hero">
          <div class="section-tag">${SECTION_6_COPY.tagline}</div>
          <h2 class="question-anchor-huge" id="s6-hero-headline">${SECTION_6_COPY.challengeAnchor}</h2>
          <div class="scroll-hint-micro">
            <span class="pulse-line"></span>
            <span>GULIR UNTUK MENELUSURI POHON SEBAB-AKIBAT MAKROEKONOMI</span>
          </div>
        </div>

        <!-- Main Tree Canvas Stage -->
        <div class="container-editorial s6-tree-stage" id="s6-tree-stage">
          
          <!-- Section Compact Header -->
          <div class="s6-tree-top-bar">
            <div>
              <span class="section-tag">${SECTION_6_COPY.tagline}</span>
              <h3 class="s6-compact-challenge">${SECTION_6_COPY.challengeAnchor}</h3>
            </div>
            <div class="s6-interactive-hint">
              <span class="hint-icon">ⓘ</span>
              <span>KLIK SETIAP SIMPUL (NODE) UNTUK MELIHAT TELEMETRI MENDALAM</span>
            </div>
          </div>

          <!-- Flowchart Coordinate Stage -->
          <div class="s6-flowchart-wrapper" id="s6-flowchart-wrap">
            
            <!-- SVG Connecting Vector Cables Canvas -->
            <svg class="s6-flow-svg" id="s6-flow-svg" viewBox="0 0 1200 680" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <!-- Emerald Cable Gradient -->
                <linearGradient id="emeraldCableGrad" x1="50%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#f59e0b" />
                  <stop offset="40%" stop-color="#10b981" />
                  <stop offset="100%" stop-color="#34d399" />
                </linearGradient>

                <!-- Crimson Cable Gradient -->
                <linearGradient id="crimsonCableGrad" x1="50%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f59e0b" />
                  <stop offset="40%" stop-color="#ef4444" />
                  <stop offset="100%" stop-color="#f87171" />
                </linearGradient>

                <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <filter id="crimsonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <!-- Left Branch SVG Paths (Emerald: Positif Ekspor) -->
              <!-- Root (600, 60) -> L1 (300, 160) -->
              <path id="path-root-l1" d="M 600 60 C 500 60, 300 100, 300 150" stroke="rgba(255, 255, 255, 0.08)" stroke-width="3" fill="none" />
              <path id="laser-root-l1" d="M 600 60 C 500 60, 300 100, 300 150" stroke="url(#emeraldCableGrad)" stroke-width="3.5" fill="none" filter="url(#emeraldGlow)" stroke-linecap="round" />

              <!-- L1 (300, 240) -> L2 (300, 290) -->
              <path id="path-l1-l2" d="M 300 230 L 300 280" stroke="rgba(255, 255, 255, 0.08)" stroke-width="3" fill="none" />
              <path id="laser-l1-l2" d="M 300 230 L 300 280" stroke="url(#emeraldCableGrad)" stroke-width="3.5" fill="none" filter="url(#emeraldGlow)" stroke-linecap="round" />

              <!-- L2 (300, 360) -> L3 (300, 410) -->
              <path id="path-l2-l3" d="M 300 360 L 300 410" stroke="rgba(255, 255, 255, 0.08)" stroke-width="3" fill="none" />
              <path id="laser-l2-l3" d="M 300 360 L 300 410" stroke="url(#emeraldCableGrad)" stroke-width="3.5" fill="none" filter="url(#emeraldGlow)" stroke-linecap="round" />

              <!-- L3 (300, 490) -> L4 (300, 540) -->
              <path id="path-l3-l4" d="M 300 490 L 300 540" stroke="rgba(255, 255, 255, 0.08)" stroke-width="3" fill="none" />
              <path id="laser-l3-l4" d="M 300 490 L 300 540" stroke="url(#emeraldCableGrad)" stroke-width="3.5" fill="none" filter="url(#emeraldGlow)" stroke-linecap="round" />

              <!-- Right Branch SVG Paths (Crimson: Negatif Impor & Inflasi) -->
              <!-- Root (600, 60) -> R1 (900, 160) -->
              <path id="path-root-r1" d="M 600 60 C 700 60, 900 100, 900 150" stroke="rgba(255, 255, 255, 0.08)" stroke-width="3" fill="none" />
              <path id="laser-root-r1" d="M 600 60 C 700 60, 900 100, 900 150" stroke="url(#crimsonCableGrad)" stroke-width="3.5" fill="none" filter="url(#crimsonGlow)" stroke-linecap="round" />

              <!-- R1 (900, 230) -> R2 (900, 280) -->
              <path id="path-r1-r2" d="M 900 230 L 900 280" stroke="rgba(255, 255, 255, 0.08)" stroke-width="3" fill="none" />
              <path id="laser-r1-r2" d="M 900 230 L 900 280" stroke="url(#crimsonCableGrad)" stroke-width="3.5" fill="none" filter="url(#crimsonGlow)" stroke-linecap="round" />

              <!-- R2 (900, 360) -> R3 (900, 410) -->
              <path id="path-r2-r3" d="M 900 360 L 900 410" stroke="rgba(255, 255, 255, 0.08)" stroke-width="3" fill="none" />
              <path id="laser-r2-r3" d="M 900 360 L 900 410" stroke="url(#crimsonCableGrad)" stroke-width="3.5" fill="none" filter="url(#crimsonGlow)" stroke-linecap="round" />

              <!-- R3 (900, 490) -> R4 (900, 540) -->
              <path id="path-r3-r4" d="M 900 490 L 900 540" stroke="rgba(255, 255, 255, 0.08)" stroke-width="3" fill="none" />
              <path id="laser-r3-r4" d="M 900 490 L 900 540" stroke="url(#crimsonCableGrad)" stroke-width="3.5" fill="none" filter="url(#crimsonGlow)" stroke-linecap="round" />
            </svg>

            <!-- Node Elements Stack (Positioned in Grid / Columns) -->
            <div class="s6-nodes-container">
              
              <!-- Root Node: Pelemahan nilai tukar rupiah (Top Center) -->
              <div class="tree-root-row">
                <div class="tree-node root-node active-node" id="node-root" data-node="root">
                  <div class="node-badge-row">
                    <span class="node-chip gold">INITIAL SHOCK</span>
                    <span class="node-click-tag">KLIK DETAIL ↗</span>
                  </div>
                  <h4 class="node-text root-title">${p1[0]}</h4>
                </div>
              </div>

              <!-- Branches Grid: Left (Positif Ekspor) & Right (Negatif Impor) -->
              <div class="tree-branches-grid">
                
                <!-- Left Branch: Jalur 1 Positif Ekspor (Emerald) -->
                <div class="branch-column branch-emerald">
                  <div class="branch-header-banner emerald">
                    <span class="branch-dot emerald"></span>
                    <span class="branch-title">JALUR EKSPOR // DAMPAK POSITIF</span>
                  </div>

                  <!-- Node L1 -->
                  <div class="tree-node emerald-node" id="node-l1" data-node="l1">
                    <div class="node-badge-row">
                      <span class="node-chip emerald">TAHAP 01</span>
                      <span class="node-click-tag">KLIK ↗</span>
                    </div>
                    <p class="node-text">${p1[1]}</p>
                  </div>

                  <!-- Node L2 -->
                  <div class="tree-node emerald-node" id="node-l2" data-node="l2">
                    <div class="node-badge-row">
                      <span class="node-chip emerald">TAHAP 02</span>
                      <span class="node-click-tag">KLIK ↗</span>
                    </div>
                    <p class="node-text">${p1[2]}</p>
                  </div>

                  <!-- Node L3 -->
                  <div class="tree-node emerald-node" id="node-l3" data-node="l3">
                    <div class="node-badge-row">
                      <span class="node-chip emerald">TAHAP 03</span>
                      <span class="node-click-tag">KLIK ↗</span>
                    </div>
                    <p class="node-text">${p1[3]}</p>
                  </div>

                  <!-- Node L4 (Terminal) -->
                  <div class="tree-node emerald-node terminal-node" id="node-l4" data-node="l4">
                    <div class="node-badge-row">
                      <span class="node-chip emerald">HASIL AKHIR</span>
                      <span class="node-click-tag">KLIK ↗</span>
                    </div>
                    <strong class="node-text terminal-highlight">${p1[4]}</strong>
                  </div>
                </div>

                <!-- Right Branch: Jalur 2 Negatif Impor & Inflasi (Crimson) -->
                <div class="branch-column branch-crimson">
                  <div class="branch-header-banner crimson">
                    <span class="branch-dot crimson"></span>
                    <span class="branch-title">JALUR IMPOR & INFLASI // DAMPAK NEGATIF</span>
                  </div>

                  <!-- Node R1 -->
                  <div class="tree-node crimson-node" id="node-r1" data-node="r1">
                    <div class="node-badge-row">
                      <span class="node-chip crimson">TAHAP 01</span>
                      <span class="node-click-tag">KLIK ↗</span>
                    </div>
                    <p class="node-text">${p2[1]}</p>
                  </div>

                  <!-- Node R2 -->
                  <div class="tree-node crimson-node" id="node-r2" data-node="r2">
                    <div class="node-badge-row">
                      <span class="node-chip crimson">TAHAP 02</span>
                      <span class="node-click-tag">KLIK ↗</span>
                    </div>
                    <p class="node-text">${p2[2]}</p>
                  </div>

                  <!-- Node R3 -->
                  <div class="tree-node crimson-node" id="node-r3" data-node="r3">
                    <div class="node-badge-row">
                      <span class="node-chip crimson">TAHAP 03</span>
                      <span class="node-click-tag">KLIK ↗</span>
                    </div>
                    <p class="node-text">${p2[3]}</p>
                  </div>

                  <!-- Node R4 (Terminal) -->
                  <div class="tree-node crimson-node terminal-node" id="node-r4" data-node="r4">
                    <div class="node-badge-row">
                      <span class="node-chip crimson">HASIL AKHIR</span>
                      <span class="node-click-tag">KLIK ↗</span>
                    </div>
                    <strong class="node-text terminal-highlight">${p2[4]}</strong>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        <!-- Interactive Telemetry Modal / Drawer -->
        <div class="s6-telemetry-modal" id="s6-telemetry-modal" style="display: none;">
          <div class="modal-backdrop" id="s6-modal-backdrop"></div>
          <div class="modal-card" id="s6-modal-card">
            <div class="modal-header">
              <div class="modal-badge-row">
                <span class="modal-badge" id="modal-badge">TELEMETRI</span>
                <span class="modal-kicker">ANALISIS EKONOMI MENDALAM</span>
              </div>
              <button class="modal-close-btn" id="s6-modal-close" aria-label="Tutup">✕</button>
            </div>
            
            <h3 class="modal-title" id="modal-title">Judul Simpul</h3>
            <p class="modal-summary" id="modal-summary">Ringkasan fenomena ekonomi di simpul ini.</p>

            <div class="modal-metrics-deck" id="modal-metrics-deck">
              <!-- Dynamically populated metrics -->
            </div>

            <div class="modal-policy-box">
              <span class="policy-label">IMPLIKASI KEBIJAKAN & MITIGASI:</span>
              <p class="policy-text" id="modal-policy-text">Tindakan pencegahan moneter atau fiskal.</p>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  /**
   * Initializes interactive modal drawer on node click.
   */
  private initInteractiveModal(): void {
    const modal = document.getElementById('s6-telemetry-modal');
    const backdrop = document.getElementById('s6-modal-backdrop');
    const closeBtn = document.getElementById('s6-modal-close');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalSummary = document.getElementById('modal-summary');
    const modalMetricsDeck = document.getElementById('modal-metrics-deck');
    const modalPolicyText = document.getElementById('modal-policy-text');

    if (!modal || !backdrop || !closeBtn || !modalBadge || !modalTitle || !modalSummary || !modalMetricsDeck || !modalPolicyText) {
      return;
    }

    const openModal = (nodeKey: string) => {
      const data = this.telemetryData[nodeKey];
      if (!data) return;

      modalBadge.textContent = data.badge;
      modalBadge.className = `modal-badge ${data.badgeType}`;
      modalTitle.textContent = data.title;
      modalSummary.textContent = data.summary;
      modalPolicyText.textContent = data.policyInsight;

      modalMetricsDeck.innerHTML = data.metrics.map(m => `
        <div class="modal-metric-card">
          <span class="m-label">${m.label}</span>
          <strong class="m-value ${data.badgeType}">${m.value}</strong>
        </div>
      `).join('');

      modal.style.display = 'flex';
      gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo('#s6-modal-card', { y: 40, scale: 0.95 }, { y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.5)' });
    };

    const closeModal = () => {
      gsap.to(modal, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          modal.style.display = 'none';
        }
      });
    };

    // Attach click listeners to all nodes
    const nodeEls = this.container.querySelectorAll<HTMLElement>('.tree-node[data-node]');
    nodeEls.forEach(node => {
      node.addEventListener('click', () => {
        const key = node.getAttribute('data-node');
        if (key) openModal(key);
      });
    });

    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // Escape key listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display !== 'none') {
        closeModal();
      }
    });
  }

  /**
   * Initializes pinned scrollytelling timeline driving SVG laser drawing & node illumination.
   */
  private initScrollytellingTimeline(): void {
    const questionHero = document.getElementById('s6-question-hero');
    const treeStage = document.getElementById('s6-tree-stage');

    // Laser SVG path elements
    const laserRootL1 = document.getElementById('laser-root-l1') as SVGPathElement | null;
    const laserL1L2 = document.getElementById('laser-l1-l2') as SVGPathElement | null;
    const laserL2L3 = document.getElementById('laser-l2-l3') as SVGPathElement | null;
    const laserL3L4 = document.getElementById('laser-l3-l4') as SVGPathElement | null;

    const laserRootR1 = document.getElementById('laser-root-r1') as SVGPathElement | null;
    const laserR1R2 = document.getElementById('laser-r1-r2') as SVGPathElement | null;
    const laserR2R3 = document.getElementById('laser-r2-r3') as SVGPathElement | null;
    const laserR3R4 = document.getElementById('laser-r3-r4') as SVGPathElement | null;

    // Node elements
    const nodeRoot = document.getElementById('node-root');
    const nodeL1 = document.getElementById('node-l1');
    const nodeL2 = document.getElementById('node-l2');
    const nodeL3 = document.getElementById('node-l3');
    const nodeL4 = document.getElementById('node-l4');

    const nodeR1 = document.getElementById('node-r1');
    const nodeR2 = document.getElementById('node-r2');
    const nodeR3 = document.getElementById('node-r3');
    const nodeR4 = document.getElementById('node-r4');

    if (!questionHero || !treeStage || !laserRootL1 || !laserL1L2 || !laserL2L3 || !laserL3L4 ||
        !laserRootR1 || !laserR1R2 || !laserR2R3 || !laserR3R4 ||
        !nodeRoot || !nodeL1 || !nodeL2 || !nodeL3 || !nodeL4 ||
        !nodeR1 || !nodeR2 || !nodeR3 || !nodeR4) {
      return;
    }

    const lasers = [laserRootL1, laserL1L2, laserL2L3, laserL3L4, laserRootR1, laserR1R2, laserR2R3, laserR3R4];
    lasers.forEach(laser => {
      const len = laser.getTotalLength();
      gsap.set(laser, { strokeDasharray: len, strokeDashoffset: len });
    });

    // Initial node states: Root illuminated, branches dimmed
    gsap.set(treeStage, { opacity: 0, y: 50, pointerEvents: 'none' });
    gsap.set([nodeL1, nodeL2, nodeL3, nodeL4, nodeR1, nodeR2, nodeR3, nodeR4], {
      opacity: 0.28,
      filter: 'blur(1px)'
    });
    gsap.set(nodeRoot, { opacity: 1, filter: 'blur(0px)' });

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.container,
        start: 'top top',
        end: '+=560%',
        pin: true,
        scrub: 1.4,
        anticipatePin: 1,
        onEnter: () => {
          (window as any).__setMoodColor?.('#120E08');
        },
        onEnterBack: () => {
          (window as any).__setMoodColor?.('#120E08');
        }
      }
    });

    // Stage 0 -> 1: Question Hero transition & tree reveal
    this.timeline
      .to(questionHero, {
        opacity: 0,
        y: -60,
        scale: 0.94,
        duration: 1.4,
        ease: 'power2.inOut',
        onComplete: () => {
          questionHero.style.pointerEvents = 'none';
        }
      }, 0)
      .to(treeStage, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power2.out',
        onStart: () => {
          treeStage.style.pointerEvents = 'auto';
        }
      }, 0.7);

    // Stage 1: Level 1 Split (Root -> L1 & R1)
    this.timeline
      .to(laserRootL1, { strokeDashoffset: 0, duration: 1.8, ease: 'none' }, 1.8)
      .to(laserRootR1, { strokeDashoffset: 0, duration: 1.8, ease: 'none' }, 1.8)
      .to(nodeL1, { opacity: 1, filter: 'blur(0px)', duration: 0.8 }, 2.6)
      .to(nodeR1, { opacity: 1, filter: 'blur(0px)', duration: 0.8 }, 2.6);

    // Stage 2: Level 2 Progression (L1 -> L2 & R1 -> R2)
    this.timeline
      .to(laserL1L2, { strokeDashoffset: 0, duration: 1.8, ease: 'none' }, 3.8)
      .to(laserR1R2, { strokeDashoffset: 0, duration: 1.8, ease: 'none' }, 3.8)
      .to(nodeL2, { opacity: 1, filter: 'blur(0px)', duration: 0.8 }, 4.6)
      .to(nodeR2, { opacity: 1, filter: 'blur(0px)', duration: 0.8 }, 4.6);

    // Stage 3: Level 3 Progression (L2 -> L3 & R2 -> R3)
    this.timeline
      .to(laserL2L3, { strokeDashoffset: 0, duration: 1.8, ease: 'none' }, 5.8)
      .to(laserR2R3, { strokeDashoffset: 0, duration: 1.8, ease: 'none' }, 5.8)
      .to(nodeL3, { opacity: 1, filter: 'blur(0px)', duration: 0.8 }, 6.6)
      .to(nodeR3, { opacity: 1, filter: 'blur(0px)', duration: 0.8 }, 6.6);

    // Stage 4: Level 4 Terminal Boom (L3 -> L4 & R3 -> R4)
    this.timeline
      .to(laserL3L4, { strokeDashoffset: 0, duration: 1.8, ease: 'none' }, 7.8)
      .to(laserR3R4, { strokeDashoffset: 0, duration: 1.8, ease: 'none' }, 7.8)
      .to(nodeL4, { opacity: 1, filter: 'blur(0px)', scale: 1.03, duration: 0.9 }, 8.6)
      .to(nodeR4, { opacity: 1, filter: 'blur(0px)', scale: 1.03, duration: 0.9 }, 8.6)
      // Dedicated resting window for complete bifurcated tree
      .to({}, { duration: 1.8 }, 9.8);
  }

  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}
