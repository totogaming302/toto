import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION_1_COPY } from '../../data/editorialCopy.ts';
import { SoundEngine } from '../audio/SoundEngine.ts';

gsap.registerPlugin(ScrollTrigger);

export class Section1Erdogan {
  private container: HTMLElement;
  private timeline!: gsap.core.Timeline;

  constructor(containerId: string = 'section-1') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Section 1 container #${containerId} not found`);
    }
    this.container = el;
    this.renderSectionStructure();
    this.bindVisualInteractions();
    this.initScrollytellingTimeline();
  }

  /**
   * Binds click events for interactive simulation pills in Visual 2
   */
  private bindVisualInteractions(): void {
    const btnNormal = document.getElementById('s1-btn-kurs-normal');
    const btnDepresiasi = document.getElementById('s1-btn-kurs-depresiasi');
    const rowNormal = document.getElementById('s1-row-normal');
    const rowSurge = document.getElementById('s1-row-surge');
    const multiplierPill = document.getElementById('s1-multiplier-pill');

    if (!btnNormal || !btnDepresiasi) return;

    btnNormal.addEventListener('click', () => {
      SoundEngine.getInstance().playBeatClick();
      btnNormal.classList.add('active');
      btnDepresiasi.classList.remove('active');
      rowNormal?.classList.add('highlight');
      rowSurge?.classList.remove('highlight');
      if (multiplierPill) {
        multiplierPill.innerHTML = '<span class="multiplier-dot" style="background: var(--text-muted);"></span><span>KURS NORMAL: DAYA BELI DASAR (1.0x BASELINE)</span>';
      }
    });

    btnDepresiasi.addEventListener('click', () => {
      SoundEngine.getInstance().playBeatClick();
      btnDepresiasi.classList.add('active');
      btnNormal.classList.remove('active');
      rowSurge?.classList.add('highlight');
      rowNormal?.classList.remove('highlight');
      if (multiplierPill) {
        multiplierPill.innerHTML = '<span class="multiplier-dot"></span><span>ARBITRASE VALAS: +33.5% DAYA UNGKIT PEMBELIAN ASING</span>';
      }
    });
  }

  /**
   * Renders Section 1 editorial DOM elements strictly using SECTION_1_COPY.
   * Redesigned with 3 focused narrative beats and premium editorial pacing.
   */
  private renderSectionStructure(): void {
    this.container.innerHTML = `
      <div class="pinned-viewport" id="s1-pinned-viewport">
        <!-- Fullscreen Question Anchor Hero (Initial State) -->
        <div class="s1-question-hero" id="s1-question-hero">
          <div class="section-tag">${SECTION_1_COPY.tagline}</div>
          <h2 class="question-anchor-huge" id="s1-hero-headline">${SECTION_1_COPY.questionAnchor}</h2>
          <div class="scroll-hint-micro">
            <span class="pulse-line"></span>
            <span>GULIR UNTUK MENELUSURI STRUKTUR DAYA SAING</span>
          </div>
        </div>

        <!-- Main Narrative & Visual Stage Container -->
        <div class="container-editorial split-stage s1-split-stage" id="s1-split-stage">
          
          <!-- Left Column: Narrative Card with 3 High-Impact Beats -->
          <div class="narrative-card s1-narrative-card">
            <div class="s1-compact-header">
              <span class="section-tag">${SECTION_1_COPY.tagline}</span>
              <h3 class="s1-compact-question">${SECTION_1_COPY.questionAnchor}</h3>
            </div>

            <div class="s1-beats-stack">
              <!-- Beat 1: Diskon Internasional -->
              <div class="s1-beat-item active-beat" id="s1-beat-1" data-beat-id="s1-b1" title="Klik untuk menuju ke beat ini">
                <div class="beat-indicator">
                  <span class="beat-number">01</span>
                  <span class="beat-title">${SECTION_1_COPY.beats[0].label}</span>
                  <span class="beat-status-badge">ARBITRASE HARGA</span>
                </div>
                <p class="text-beat">${SECTION_1_COPY.beats[0].text}</p>
              </div>

              <!-- Beat 2: Perspektif Pembeli Valas -->
              <div class="s1-beat-item" id="s1-beat-2" data-beat-id="s1-b2" title="Klik untuk menuju ke beat ini">
                <div class="beat-indicator">
                  <span class="beat-number">02</span>
                  <span class="beat-title">${SECTION_1_COPY.beats[1].label}</span>
                  <span class="beat-status-badge">DAYA BELI VALAS</span>
                </div>
                <p class="text-beat">${SECTION_1_COPY.beats[1].text}</p>
              </div>

              <!-- Beat 3: Dua Strategi Eksportir -->
              <div class="s1-beat-item" id="s1-beat-3" data-beat-id="s1-b3" title="Klik untuk menuju ke beat ini">
                <div class="beat-indicator">
                  <span class="beat-number">03</span>
                  <span class="beat-title">${SECTION_1_COPY.beats[2].label}</span>
                  <span class="beat-status-badge">PILIHAN STRATEGIS</span>
                </div>
                <p class="text-beat">${SECTION_1_COPY.beats[2].text}</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Dynamic Visual Stage (3 Interactive Visual States) -->
          <div class="visual-stage s1-visual-stage" id="s1-visual-stage">
            
            <!-- Visual State 1: Diskon Internasional Editorial Illustration -->
            <div class="s1-visual-card" id="s1-visual-1">
              <div class="visual-badge">ILUSTRASI EDITORIAL // MEKANISME DISKON EKSPOR</div>
              <div class="editorial-art-wrapper">
                <div class="editorial-image-frame">
                  <img 
                    src="./images/nickel-discount.jpg" 
                    alt="Prabowo's Nickel Emporium - Diskon Komoditas Ekspor Akibat Devaluasi Rupiah" 
                    class="editorial-cartoon-img" 
                  />
                </div>
                <div class="editorial-image-caption">
                  <span class="caption-tag">STUDI KASUS KOMODITAS:</span>
                  Ketika nilai Rupiah melemah drastis, komoditas ekspor Indonesia (seperti bijih nikel) mendadak "didiskon" di mata mitra dagang global yang memegang valuta asing kuat, memicu lonjakan pesanan dan daya saing harga internasional.
                </div>
              </div>
            </div>

            <!-- Visual State 2: Foreign Purchasing Power Comparison -->
            <div class="s1-visual-card" id="s1-visual-2">
              <div class="visual-badge">DAYA BELI VALUTA ASING (USD BUYER)</div>
              
              <!-- Interactive FX Simulation Switcher -->
              <div class="fx-interactive-toggle-bar">
                <span class="toggle-bar-label">// SIMULASI KURS GLOBAL:</span>
                <div class="fx-pill-group">
                  <button type="button" class="fx-sim-pill" id="s1-btn-kurs-normal">KURS Rp 14.500</button>
                  <button type="button" class="fx-sim-pill active" id="s1-btn-kurs-depresiasi">KURS Rp 19.330 (DEPRESIASI)</button>
                </div>
              </div>

              <div class="purchasing-power-deck">
                <div class="buyer-budget-card">
                  <div class="buyer-budget-label">ANGGARAN PEMBELI GLOBAL</div>
                  <div class="buyer-budget-val">$10,000 USD</div>
                  <div class="buyer-budget-desc">Total alokasi modal pembelian di pasar internasional</div>
                </div>

                <div class="purchasing-bars-container">
                  <div class="power-bar-row" id="s1-row-normal">
                    <div class="power-row-header">
                      <span>KURS NORMAL (1 USD = Rp 14.500)</span>
                      <strong class="text-slate" id="s1-val-normal">689 Unit</strong>
                    </div>
                    <div class="power-bar-track">
                      <div class="power-bar-progress base" id="s1-prog-normal" style="width: 65%;"></div>
                    </div>
                    <div class="power-subtext" id="s1-sub-normal">Menebus total Rp 145.000.000 volume barang</div>
                  </div>

                  <div class="power-bar-row highlight" id="s1-row-surge">
                    <div class="power-row-header">
                      <span>KURS MELEMAH (1 USD = Rp 19.330)</span>
                      <strong class="text-emerald" id="s1-val-surge">920 Unit (+33.5%)</strong>
                    </div>
                    <div class="power-bar-track">
                      <div class="power-bar-progress surge" id="s1-prog-surge" style="width: 100%;"></div>
                    </div>
                    <div class="power-subtext text-emerald" id="s1-sub-surge">Menebus total Rp 193.300.000 volume barang (+231 unit gratis dalam daya beli valas)</div>
                  </div>
                </div>

                <!-- Dynamic Real-Time Multiplier Badge -->
                <div class="fx-multiplier-badge" id="s1-multiplier-pill">
                  <span class="multiplier-dot"></span>
                  <span>ARBITRASE VALAS: +33.5% DAYA UNGKIT PEMBELIAN ASING</span>
                </div>
              </div>
            </div>

            <!-- Visual State 3: Dual Strategic Pathways (Split Matrix) -->
            <div class="s1-visual-card" id="s1-visual-3">
              <div class="visual-badge">DUA JALUR STRATEGIS EKSPORTIR</div>
              
              <!-- Visual Bifurcation Bridge Graphic -->
              <div class="strategy-bifurcation-bridge">
                <div class="bridge-branch left">
                  <span class="bridge-tag text-emerald">JALUR 01: VOLUME BOOM</span>
                  <div class="bridge-arrow-line"></div>
                </div>
                <div class="bridge-hub">
                  <span class="hub-icon">⚖️</span>
                  <span class="hub-label">DILEMA STRATEGIS</span>
                </div>
                <div class="bridge-branch right">
                  <span class="bridge-tag text-gold">JALUR 02: WINDFALL MARGIN</span>
                  <div class="bridge-arrow-line"></div>
                </div>
              </div>

              <div class="strategy-matrix">
                
                <!-- Pathway A -->
                <div class="strategy-card strategy-a">
                  <div class="strat-header">
                    <span class="strat-pill">STRATEGI A</span>
                    <h4>Pangkas Harga Valas</h4>
                  </div>
                  <div class="strat-objective">Fokus: Perebutan Pangsa Pasar Global</div>
                  <ul class="strat-metrics">
                    <li><span>Harga Jual Valas:</span> <strong>Turun ($100 → $75)</strong></li>
                    <li><span>Volume Ekspor:</span> <strong class="text-emerald">Melonjak (+60%)</strong></li>
                    <li><span>Keuntungan:</span> <strong>Dominasi skala ekonomi baru</strong></li>
                  </ul>
                  <div class="strat-outcome">Tembus pasar pembeli global & rebut pasar mitra dagang</div>
                </div>

                <!-- Pathway B -->
                <div class="strategy-card strategy-b">
                  <div class="strat-header">
                    <span class="strat-pill gold">STRATEGI B</span>
                    <h4>Pertahankan Harga Valas</h4>
                  </div>
                  <div class="strat-objective">Fokus: Windfall Margin Domestik</div>
                  <ul class="strat-metrics">
                    <li><span>Harga Jual Valas:</span> <strong>Tetap ($100.00)</strong></li>
                    <li><span>Konversi Rupiah:</span> <strong class="text-gold">Rp 1.45M → Rp 1.93M</strong></li>
                    <li><span>Margin Laba:</span> <strong class="text-emerald">+33% Keuntungan Bersih</strong></li>
                  </ul>
                  <div class="strat-outcome">Meraup rezeki nomplok saat devisa dirupiahkan</div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }

  /**
   * High-performance pinned scrollytelling timeline for 3 clean beats.
   */
  private initScrollytellingTimeline(): void {
    const questionHero = document.getElementById('s1-question-hero');
    const splitStage = document.getElementById('s1-split-stage');
    
    // Beat text items
    const beat1 = document.getElementById('s1-beat-1');
    const beat2 = document.getElementById('s1-beat-2');
    const beat3 = document.getElementById('s1-beat-3');

    // Visual cards
    const visual1 = document.getElementById('s1-visual-1');
    const visual2 = document.getElementById('s1-visual-2');
    const visual3 = document.getElementById('s1-visual-3');

    if (!questionHero || !splitStage || !beat1 || !beat2 || !beat3 || !visual1 || !visual2 || !visual3) {
      return;
    }

    // Set initial layout states
    gsap.set(splitStage, { opacity: 0, y: 50, pointerEvents: 'none' });
    gsap.set([beat2, beat3], { opacity: 0.28, filter: 'blur(1px)' });
    gsap.set(beat1, { opacity: 1, filter: 'blur(0px)' });

    // Set initial visual card visibility cleanly via GSAP autoAlpha
    gsap.set(visual1, { autoAlpha: 1, y: 0 });
    gsap.set([visual2, visual3], { autoAlpha: 0, y: 30 });

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.container,
        start: 'top top',
        end: '+=440%',
        pin: true,
        scrub: 1.4,
        anticipatePin: 1,
        onEnter: () => {
          (window as any).__setMoodColor?.('#091220');
        },
        onEnterBack: () => {
          (window as any).__setMoodColor?.('#091220');
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

    // Stage 1 -> 2: Beat 1 Active -> Beat 2 Transition (Deliberate & cinematic)
    this.timeline
      .to(beat1, { 
        opacity: 0.32, 
        filter: 'blur(1.5px)', 
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        duration: 1.2 
      }, 3.2)
      .to(beat2, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        borderColor: 'rgba(56, 189, 248, 0.45)',
        backgroundColor: 'rgba(56, 189, 248, 0.06)',
        duration: 1.2 
      }, 3.2)
      .to(visual1, {
        autoAlpha: 0,
        y: -30,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 3.2)
      .to(visual2, {
        autoAlpha: 1,
        y: 0,
        duration: 1.3,
        ease: 'power2.out'
      }, 3.8);

    // Stage 2 -> 3: Beat 2 Active -> Beat 3 Transition (Deliberate & cinematic)
    this.timeline
      .to(beat2, { 
        opacity: 0.32, 
        filter: 'blur(1.5px)', 
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        duration: 1.2 
      }, 5.8)
      .to(beat3, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        borderColor: 'rgba(245, 158, 11, 0.45)',
        backgroundColor: 'rgba(245, 158, 11, 0.06)',
        duration: 1.2 
      }, 5.8)
      .to(visual2, {
        autoAlpha: 0,
        y: -30,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 5.8)
      .to(visual3, {
        autoAlpha: 1,
        y: 0,
        duration: 1.3,
        ease: 'power2.out'
      }, 6.4)
      // Dedicated resting window for Beat 3
      .to({}, { duration: 1.4 }, 7.6);
  }

  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}
