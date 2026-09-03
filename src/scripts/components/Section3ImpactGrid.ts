import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION_3_COPY } from '../../data/editorialCopy.ts';

gsap.registerPlugin(ScrollTrigger);

export class Section3ImpactGrid {
  private container: HTMLElement;
  private timeline!: gsap.core.Timeline;

  constructor(containerId: string = 'section-3') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Section 3 container #${containerId} not found`);
    }
    this.container = el;
    this.renderSectionStructure();
    this.initScrollytellingTimeline();
  }

  /**
   * Renders Section 3 macro-stakeholder matrix using SECTION_3_COPY assets.
   */
  private renderSectionStructure(): void {
    const [eksportir, importir, konsumen, produsen] = SECTION_3_COPY.actors;

    this.container.innerHTML = `
      <div class="pinned-viewport" id="s3-pinned-viewport">
        <!-- Fullscreen Question Anchor Hero -->
        <div class="s3-question-hero" id="s3-question-hero">
          <div class="section-tag">${SECTION_3_COPY.tagline}</div>
          <h2 class="question-anchor-huge" id="s3-hero-headline">${SECTION_3_COPY.questionAnchor}</h2>
          <div class="scroll-hint-micro">
            <span class="pulse-line"></span>
            <span>GULIR UNTUK MENELUSURI PETA DAMPAK MAKROEKONOMI</span>
          </div>
        </div>

        <!-- Main Split Stage Container -->
        <div class="container-editorial split-stage s3-split-stage" id="s3-split-stage">
          
          <!-- Left Column: 4 Stakeholder Narrative Cards -->
          <div class="narrative-card s3-narrative-card">
            <div class="s3-compact-header">
              <span class="section-tag">${SECTION_3_COPY.tagline}</span>
              <h3 class="s3-compact-question">${SECTION_3_COPY.questionAnchor}</h3>
            </div>

            <div class="s3-actors-stack">
              <!-- Actor 1: Eksportir -->
              <div class="s3-actor-item active-actor" id="s3-actor-1" data-beat-id="s3-b1" title="Klik untuk menuju ke beat ini">
                <div class="actor-header-row">
                  <span class="actor-chip emerald">[SURPLUS VALAS // NET BENEFICIARY]</span>
                  <span class="actor-brand">${eksportir.brandingContext}</span>
                </div>
                <h4 class="actor-role-title text-emerald">${eksportir.role} — ${eksportir.status}</h4>
                <p class="actor-text">${eksportir.text}</p>
              </div>

              <!-- Actor 2: Importir -->
              <div class="s3-actor-item" id="s3-actor-2" data-beat-id="s3-b2" title="Klik untuk menuju ke beat ini">
                <div class="actor-header-row">
                  <span class="actor-chip crimson">[MARGIN CRUNCH // IMPORT PENALTY]</span>
                  <span class="actor-brand">${importir.brandingContext}</span>
                </div>
                <h4 class="actor-role-title text-crimson">${importir.role} — ${importir.status}</h4>
                <p class="actor-text">${importir.text}</p>
              </div>

              <!-- Actor 3: Konsumen -->
              <div class="s3-actor-item" id="s3-actor-3" data-beat-id="s3-b3" title="Klik untuk menuju ke beat ini">
                <div class="actor-header-row">
                  <span class="actor-chip amber">[INFLASI DAYA BELI // CASUALTY]</span>
                  <span class="actor-brand">${konsumen.brandingContext}</span>
                </div>
                <h4 class="actor-role-title text-gold">${konsumen.role} — ${konsumen.status}</h4>
                <p class="actor-text">${konsumen.text}</p>
              </div>

              <!-- Actor 4: Produsen Domestik -->
              <div class="s3-actor-item" id="s3-actor-4" data-beat-id="s3-b4" title="Klik untuk menuju ke beat ini">
                <div class="actor-header-row">
                  <span class="actor-chip cyan">[CONDITIONAL // BIFURCATED EXPOSURE]</span>
                  <span class="actor-brand">${produsen.brandingContext}</span>
                </div>
                <h4 class="actor-role-title text-cyan">${produsen.role} — ${produsen.status}</h4>
                <p class="actor-text">${produsen.text}</p>
              </div>
            </div>
          </div>

          <!-- Right Column: 4 Dynamic Visual Telemetry Stages -->
          <div class="visual-stage s3-visual-stage" id="s3-visual-stage">
            
            <!-- Visual 1: Eksportir Telemetry (PT Freeport Indonesia) -->
            <div class="s3-visual-card" id="s3-visual-1">
              <div class="visual-badge text-emerald">TELEMETRI VALAS // REVENUE EXPANSION</div>
              
              <!-- Brand Identity Banner: PT Freeport Indonesia -->
              <div class="company-brand-banner freeport">
                <img src="./images/freeport-indonesia.svg" alt="PT Freeport Indonesia Official Logo" class="company-brand-logo freeport-logo" />
                <div class="company-brand-meta">
                  <span class="meta-tag text-emerald">KOMODITAS & MINERAL EKSPOR</span>
                  <span class="meta-sub">Papua Operations // Net Forex Earner</span>
                </div>
              </div>

              <div class="telemetry-box">
                <div class="telemetry-top-badge">
                  <span class="badge-icon">▲</span>
                  <span>STUDI KASUS EKSPORTIR: PT FREEPORT INDONESIA (KOMODITAS & MINERAL)</span>
                </div>

                <div class="metric-comparison-deck">
                  <div class="metric-row">
                    <span class="metric-label">Inflow Valuta Asing (USD)</span>
                    <strong class="metric-value text-slate">$10,000,000 USD (Volume Tetap)</strong>
                  </div>

                  <div class="fx-conversion-grid">
                    <div class="fx-node normal">
                      <span class="fx-node-label">KURS LAMA (Rp 14.500)</span>
                      <strong class="fx-node-amount text-slate">Rp 145,0 Milyar</strong>
                    </div>
                    <div class="fx-node-arrow">→</div>
                    <div class="fx-node surge">
                      <span class="fx-node-label">KURS TERDEPRESIASI (Rp 19.330)</span>
                      <strong class="fx-node-amount text-emerald">Rp 193,3 Milyar</strong>
                    </div>
                  </div>

                  <div class="surplus-readout-pill">
                    <span class="pill-tag">WINDFALL SURPLUS:</span>
                    <span class="vault-coin-beacon">🪙</span>
                    <strong>+Rp 48,3 Milyar (+33.3% Laba Tambahan Konversi IDR)</strong>
                  </div>

                  <div class="gauge-bar-wrap">
                    <div class="gauge-fill emerald" style="width: 95%;"></div>
                    <span class="gauge-label">BIAYA OPERASIONAL LOKAL TETAP DALAM RUPIAH → MARGIN TERBANG</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visual 2: Importir Telemetry (Samsung Electronics Indonesia) -->
            <div class="s3-visual-card" id="s3-visual-2">
              <div class="visual-badge text-crimson">ANATOMI MARGIN CRUNCH // TEKANAN BIAYA IMPOR</div>
              
              <!-- Brand Identity Banner: Samsung Electronics Indonesia -->
              <div class="company-brand-banner samsung">
                <img src="./images/samsung-electronics.svg" alt="Samsung Electronics Official Logo" class="company-brand-logo samsung-logo" />
                <div class="company-brand-meta">
                  <span class="meta-tag text-crimson">DISTRIBUSI GADGET & CHIPSET</span>
                  <span class="meta-sub">PT Samsung Electronics Indonesia // Foreign Input Exposure</span>
                </div>
              </div>

              <div class="telemetry-box crimson-glow">
                <div class="telemetry-top-badge crimson">
                  <span class="badge-icon">▼</span>
                  <span>STUDI KASUS IMPORTIR: SAMSUNG ELECTRONICS (DISTRIBUSI GADGET & CHIP)</span>
                </div>

                <div class="metric-comparison-deck">
                  <div class="crunch-dilemma-grid">
                    <div class="dilemma-card">
                      <span class="dilemma-header">DILEMA 1: NAIKKAN HARGA</span>
                      <p class="dilemma-stat text-crimson">-35% Volume Penjualan</p>
                      <span class="dilemma-desc">Konsumen menolak membeli smartphone baru; pasar beralih ke barang sekunder.</span>
                    </div>

                    <div class="dilemma-card">
                      <span class="dilemma-header">DILEMA 2: TAHAN HARGA</span>
                      <p class="dilemma-stat text-crimson">-12% Defisit Margin</p>
                      <span class="dilemma-desc">Biaya pembelian valas melahap seluruh cadangan margin laba operasional.</span>
                    </div>
                  </div>

                  <!-- Interactive Price Dilemma Mechanical Balance Scale SVG -->
                  <div class="dilemma-balance-visual">
                    <svg class="balance-scale-svg" viewBox="0 0 280 85">
                      <!-- Fulcrum Base -->
                      <polygon points="140,50 126,80 154,80" fill="#1e293b" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
                      <circle cx="140" cy="50" r="4" fill="#ef4444" stroke="#ffffff" stroke-width="1.2" />
                      <!-- Beam (Tilted showing dilemma tension) -->
                      <g class="balance-beam-group" transform="rotate(-5 140 50)">
                        <line x1="30" y1="50" x2="250" y2="50" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" />
                        <!-- Left Pan (Dilemma 1) -->
                        <line x1="45" y1="50" x2="35" y2="68" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
                        <line x1="45" y1="50" x2="55" y2="68" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
                        <path d="M 28 68 Q 45 76 62 68 Z" fill="#ef4444" opacity="0.9" />
                        <!-- Right Pan (Dilemma 2) -->
                        <line x1="235" y1="50" x2="225" y2="68" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
                        <line x1="235" y1="50" x2="245" y2="68" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
                        <path d="M 218 68 Q 235 76 252 68 Z" fill="#f59e0b" opacity="0.9" />
                      </g>
                    </svg>
                    <div class="balance-caption">
                      <span>⚖️ BEBAN TIDAK SEIMBANG: KEDUA OPSI MENGGERUS FINANSIAL PERUSAHAAN</span>
                    </div>
                  </div>

                  <div class="surplus-readout-pill crimson">
                    <span class="pill-tag">BUNGA & BIAYA PENGADAAN:</span>
                    <strong>+33.3% Lonjakan Tagihan Impor Pembukuan Kuartalan</strong>
                  </div>

                  <div class="gauge-bar-wrap">
                    <div class="gauge-fill crimson" style="width: 88%;"></div>
                    <span class="gauge-label">TERJEPIT: HARGA VALAS TINGGI VS DAYA BELI DOMESTIK TERBATAS</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visual 3: Konsumen — Buntung, Silent Casualty (Editorial Cartoon) -->
            <div class="s3-visual-card s3-art-card" id="s3-visual-3">
              <div class="s3-full-art-frame">
                <img 
                  src="./images/consumer-fate.jpg" 
                  alt="Editorial Cartoon: Konsumen — Yowes, Accept Your Fate (Silent Casualty)" 
                  class="editorial-cartoon-img" 
                />
              </div>
            </div>

            <!-- Visual 4: Produsen Domestik Telemetry (Bifurcated Exposure) -->
            <div class="s3-visual-card" id="s3-visual-4">
              <div class="visual-badge text-cyan">MATRIKS DIVERGENSI // DUA NASIB PRODUSEN LOKAL</div>
              <div class="telemetry-box cyan-glow">
                <div class="telemetry-top-badge cyan">
                  <span class="badge-icon">◆</span>
                  <span>KONDISIONAL: KOMPOSISI BAHAN BAKU MENENTUKAN KELANGSUNGAN HIDUP</span>
                </div>

                <!-- Divergence Spectrum Metric Bar -->
                <div class="divergence-spectrum-bar">
                  <div class="spectrum-track">
                    <div class="spectrum-segment local-zone" style="width: 50%;">
                      <span class="spec-label text-emerald">0% KOMPONEN IMPOR (DAYA TAHAN TINGGI)</span>
                    </div>
                    <div class="spectrum-divider"></div>
                    <div class="spectrum-segment import-zone" style="width: 50%;">
                      <span class="spec-label text-crimson">70%+ KOMPONEN IMPOR (MARGIN CRUNCH)</span>
                    </div>
                  </div>
                </div>

                <div class="divergence-grid">
                  <!-- Case Local 100% -->
                  <div class="div-column local-wins">
                    <div class="div-badge-wrap">
                      <span class="div-badge emerald">JALUR 1: 100% BAHAN LOKAL</span>
                      <strong class="div-status text-emerald">MENANG (OPPORTUNITY)</strong>
                    </div>
                    <p class="div-desc">Contoh: Kerajinan rotan, perkebunan rempah, pakan ternak mandiri.</p>
                    <ul class="div-bullet-points">
                      <li>Biaya produksi stabil rupiah</li>
                      <li>Barang substitusi impor jadi mahal</li>
                      <li><strong class="text-emerald">+24% Rebutan Pasar Domestik</strong></li>
                    </ul>
                  </div>

                  <!-- Case Import Input -->
                  <div class="div-column import-losses">
                    <div class="div-badge-wrap">
                      <span class="div-badge crimson">JALUR 2: INPUT BERBASIS IMPOR</span>
                      <strong class="div-status text-crimson">KALAH (MERUGI)</strong>
                    </div>
                    <p class="div-desc">Contoh: Industri tempe (kedelai impor), garmen polyester impor.</p>
                    <ul class="div-bullet-points">
                      <li>Biaya melonjak seketika dalam valas</li>
                      <li>Daya beli pembeli lokal terbatas</li>
                      <li><strong class="text-crimson">-18% Margin Usaha Tertekan</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }

  /**
   * Initializes 4-stage pinned scrollytelling timeline for Section 3.
   */
  private initScrollytellingTimeline(): void {
    const questionHero = document.getElementById('s3-question-hero');
    const splitStage = document.getElementById('s3-split-stage');
    
    // Actor items
    const actor1 = document.getElementById('s3-actor-1');
    const actor2 = document.getElementById('s3-actor-2');
    const actor3 = document.getElementById('s3-actor-3');
    const actor4 = document.getElementById('s3-actor-4');

    // Visual cards
    const visual1 = document.getElementById('s3-visual-1');
    const visual2 = document.getElementById('s3-visual-2');
    const visual3 = document.getElementById('s3-visual-3');
    const visual4 = document.getElementById('s3-visual-4');

    if (!questionHero || !splitStage || !actor1 || !actor2 || !actor3 || !actor4 || !visual1 || !visual2 || !visual3 || !visual4) {
      return;
    }

    // Set initial layout states
    gsap.set(splitStage, { opacity: 0, y: 50, pointerEvents: 'none' });
    gsap.set([actor2, actor3, actor4], { opacity: 0.28, filter: 'blur(1px)' });
    gsap.set(actor1, { opacity: 1, filter: 'blur(0px)' });

    // Set initial visual card visibility cleanly via GSAP autoAlpha
    gsap.set(visual1, { autoAlpha: 1, y: 0 });
    gsap.set([visual2, visual3, visual4], { autoAlpha: 0, y: 30 });

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.container,
        start: 'top top',
        end: '+=580%',
        pin: true,
        scrub: 1.4,
        anticipatePin: 1,
        onEnter: () => {
          (window as any).__setMoodColor?.('#0A0E17');
        },
        onEnterBack: () => {
          (window as any).__setMoodColor?.('#0A0E17');
        }
      }
    });

    // Stage 0 -> 1: Question Hero transition to compact header & split stage reveal
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
      .to(splitStage, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power2.out',
        onStart: () => {
          splitStage.style.pointerEvents = 'auto';
        }
      }, 0.7);

    // Stage 1 -> 2: Eksportir -> Importir Transition (Deliberate & cinematic)
    this.timeline
      .to(actor1, { 
        opacity: 0.32, 
        filter: 'blur(1.5px)', 
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        duration: 1.2 
      }, 3.4)
      .to(actor2, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        borderColor: 'rgba(239, 68, 68, 0.45)',
        backgroundColor: 'rgba(239, 68, 68, 0.06)',
        duration: 1.2 
      }, 3.4)
      .to(visual1, {
        autoAlpha: 0,
        y: -30,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 3.4)
      .to(visual2, {
        autoAlpha: 1,
        y: 0,
        duration: 1.3,
        ease: 'power2.out'
      }, 4.0);

    // Stage 2 -> 3: Importir -> Konsumen Transition (Deliberate & cinematic)
    this.timeline
      .to(actor2, { 
        opacity: 0.32, 
        filter: 'blur(1.5px)', 
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        duration: 1.2 
      }, 6.6)
      .to(actor3, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        borderColor: 'rgba(245, 158, 11, 0.45)',
        backgroundColor: 'rgba(245, 158, 11, 0.06)',
        duration: 1.2 
      }, 6.6)
      .to(visual2, {
        autoAlpha: 0,
        y: -30,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 6.6)
      .to(visual3, {
        autoAlpha: 1,
        y: 0,
        duration: 1.3,
        ease: 'power2.out'
      }, 7.2);

    // Stage 3 -> 4: Konsumen -> Produsen Domestik Transition (Deliberate & cinematic)
    this.timeline
      .to(actor3, { 
        opacity: 0.32, 
        filter: 'blur(1.5px)', 
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        duration: 1.2 
      }, 9.8)
      .to(actor4, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        borderColor: 'rgba(56, 189, 248, 0.45)',
        backgroundColor: 'rgba(56, 189, 248, 0.06)',
        duration: 1.2 
      }, 9.8)
      .to(visual3, {
        autoAlpha: 0,
        y: -30,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 9.8)
      .to(visual4, {
        autoAlpha: 1,
        y: 0,
        duration: 1.3,
        ease: 'power2.out'
      }, 10.4)
      // Dedicated resting window for Stakeholder 4
      .to({}, { duration: 1.4 }, 11.6);
  }

  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}
