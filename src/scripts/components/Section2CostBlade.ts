import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION_2_COPY } from '../../data/editorialCopy.ts';
import { Typewriter } from '../utils/typewriter.ts';

gsap.registerPlugin(ScrollTrigger);

export class Section2CostBlade {
  private container: HTMLElement;
  private timeline!: gsap.core.Timeline;
  private typewriter!: Typewriter;

  constructor(containerId: string = 'section-2') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Section 2 container #${containerId} not found`);
    }
    this.container = el;
    this.renderSectionStructure();
    this.initTypewriter();
    this.initScrollytellingTimeline();
  }

  /**
   * Renders the Section 2 editorial DOM elements strictly using SECTION_2_COPY.
   */
  private renderSectionStructure(): void {
    this.container.innerHTML = `
      <div class="pinned-viewport s2-stage-bg" id="s2-pinned-viewport">
        
        <!-- Fullscreen Question Anchor Hero (Initial State) -->
        <div class="s2-question-hero" id="s2-question-hero">
          <div class="section-tag crimson-tag">${SECTION_2_COPY.tagline}</div>
          <h2 class="question-anchor-huge" id="s2-hero-headline">${SECTION_2_COPY.questionAnchor}</h2>
          <div class="scroll-hint-micro crimson-hint">
            <span class="pulse-line crimson-pulse"></span>
            <span>GULIR UNTUK MEMBEDAH ANATOMI PISAU BERMATA DUA</span>
          </div>
        </div>

        <!-- Main Narrative & Visual Stage Container -->
        <div class="container-editorial split-stage s2-split-stage" id="s2-split-stage">
          
          <!-- Left Column: Narrative Card with Typewriter Hook & Cost Mechanism -->
          <div class="narrative-card s2-narrative-card">
            <div class="s2-compact-header">
              <span class="section-tag crimson-tag">${SECTION_2_COPY.tagline}</span>
              <h3 class="s2-compact-question">${SECTION_2_COPY.questionAnchor}</h3>
            </div>

            <div class="s2-narrative-content">
              <!-- Beat 1: Cinematic Typewriter -->
              <div class="s2-beat-item" id="s2-beat-1">
                <div class="beat-indicator">
                  <span class="beat-number crimson-num">01</span>
                  <span class="beat-title text-crimson">${SECTION_2_COPY.beats[0].label}</span>
                </div>
                <div class="typewriter-container" id="s2-typewriter-target"></div>
              </div>

              <!-- Beat 2: Cost Mechanism & Margin Squeeze -->
              <div class="s2-beat-item" id="s2-beat-2">
                <div class="beat-indicator">
                  <span class="beat-number crimson-num">02</span>
                  <span class="beat-title text-crimson">${SECTION_2_COPY.beats[1].label}</span>
                </div>
                <p class="text-beat" id="s2-beat-2-text">${SECTION_2_COPY.beats[1].text}</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Visual Stage (Double-Edged Blade SVG & Margin Compression Chart) -->
          <div class="visual-stage s2-visual-stage" id="s2-visual-stage">
            
            <!-- Visual State 1: Double-Sided Spear Graphic (Tombak Bermata Dua) -->
            <div class="s2-visual-card" id="s2-blade-visual">
              <div class="visual-badge crimson-badge">METAFORA: TOMBAK BERMATA DUA // DUAL-SIDED IMPACT</div>
              
              <div class="blade-canvas-container">
                <svg class="spear-svg" viewBox="0 0 640 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <!-- Metallic Spearhead Gradient (Upper Bevel Light) -->
                    <linearGradient id="spearBladeLight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
                      <stop offset="35%" stop-color="#cbd5e1" stop-opacity="0.85" />
                      <stop offset="70%" stop-color="#64748b" stop-opacity="0.6" />
                      <stop offset="100%" stop-color="#1e293b" stop-opacity="0.9" />
                    </linearGradient>

                    <!-- Left Spear Point (Export Market - Gold / Amber Radiance) -->
                    <linearGradient id="spearLeftGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stop-color="#f59e0b" />
                      <stop offset="60%" stop-color="#fbbf24" />
                      <stop offset="100%" stop-color="#10b981" />
                    </linearGradient>

                    <!-- Right Spear Point (Imported Inflation - Alert Crimson Pierce) -->
                    <linearGradient id="spearRightGlow" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stop-color="#7f1d1d" />
                      <stop offset="50%" stop-color="#ef4444" />
                      <stop offset="100%" stop-color="#f87171" />
                    </linearGradient>

                    <!-- Center Combat Shaft Gradient -->
                    <linearGradient id="spearShaft" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#64748b" />
                      <stop offset="25%" stop-color="#1e293b" />
                      <stop offset="75%" stop-color="#090d16" />
                      <stop offset="100%" stop-color="#334155" />
                    </linearGradient>

                    <!-- Glow Filters -->
                    <filter id="spearGoldFilter" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="spearCrimsonFilter" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="7" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <!-- Background Cutting Axis (Economic Severance Line) -->
                  <line x1="20" y1="120" x2="620" y2="120" stroke="rgba(255,255,255,0.08)" stroke-dasharray="8 6" stroke-width="2" />

                  <!-- Double-Sided Spear Kinetic Group -->
                  <g class="blade-group" id="svg-blade-group">
                    
                    <!-- 1. LEFT SPEARHEAD (Pointed at x=40, y=120) -->
                    <!-- Outer Silhouette & Upper Bevel -->
                    <path d="M 40 120 L 105 78 L 142 98 L 182 114 L 182 120 L 40 120 Z" fill="url(#spearBladeLight)" stroke="#f59e0b" stroke-width="1.5" />
                    <!-- Lower Bevel (Shaded Steel) -->
                    <path d="M 40 120 L 182 120 L 182 126 L 142 142 L 105 162 Z" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2" />
                    <!-- Center Ridge Spine Line -->
                    <line x1="40" y1="120" x2="182" y2="120" stroke="#f59e0b" stroke-width="2.5" />
                    <line x1="40" y1="120" x2="182" y2="120" stroke="#ffffff" stroke-width="0.8" opacity="0.8" />
                    <!-- Socket Mount Rings -->
                    <rect x="180" y="112" width="8" height="16" rx="2" fill="#334155" stroke="#f59e0b" stroke-width="1" />

                    <!-- 2. CENTER REINFORCED SHAFT (x=188 to x=452) -->
                    <rect x="188" y="115" width="264" height="10" rx="2" fill="url(#spearShaft)" stroke="#475569" stroke-width="1" />
                    
                    <!-- Tactical Grip / Knurling (x=270 to x=370) -->
                    <rect x="270" y="113" width="100" height="14" rx="2" fill="#0b101b" stroke="#64748b" stroke-width="1.2" />
                    <!-- Grip Wire Rings -->
                    <line x1="282" y1="113" x2="282" y2="127" stroke="#f59e0b" stroke-width="1.5" opacity="0.7" />
                    <line x1="294" y1="113" x2="294" y2="127" stroke="#94a3b8" stroke-width="1" opacity="0.6" />
                    <line x1="306" y1="113" x2="306" y2="127" stroke="#f59e0b" stroke-width="1.5" opacity="0.7" />
                    <line x1="334" y1="113" x2="334" y2="127" stroke="#ef4444" stroke-width="1.5" opacity="0.7" />
                    <line x1="346" y1="113" x2="346" y2="127" stroke="#94a3b8" stroke-width="1" opacity="0.6" />
                    <line x1="358" y1="113" x2="358" y2="127" stroke="#ef4444" stroke-width="1.5" opacity="0.7" />
                    <!-- Central Balance Gem / Axis -->
                    <circle cx="320" cy="120" r="8" fill="#1e293b" stroke="#ffffff" stroke-width="1.5" />
                    <circle cx="320" cy="120" r="3" fill="#f59e0b" />

                    <!-- Dual Chevrons on Shaft -->
                    <!-- Leftward Thrust Chevrons (Gold) -->
                    <path d="M 252 117 L 246 120 L 252 123 M 240 117 L 234 120 L 240 123" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <!-- Rightward Thrust Chevrons (Crimson) -->
                    <path d="M 388 117 L 394 120 L 388 123 M 400 117 L 406 120 L 400 123" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

                    <!-- 3. RIGHT SPEARHEAD (Pointed at x=600, y=120) -->
                    <!-- Socket Mount Rings -->
                    <rect x="452" y="112" width="8" height="16" rx="2" fill="#334155" stroke="#ef4444" stroke-width="1" />
                    <!-- Upper Bevel (Dark Steel Edge) -->
                    <path d="M 458 114 L 498 98 L 535 78 L 600 120 L 458 120 Z" fill="url(#spearBladeLight)" stroke="#ef4444" stroke-width="1.5" />
                    <!-- Lower Bevel (Alarming Crimson Glow) -->
                    <path d="M 458 120 L 600 120 L 535 162 L 498 142 L 458 126 Z" fill="url(#spearRightGlow)" stroke="#ef4444" stroke-width="1.2" />
                    <!-- Center Ridge Spine Line -->
                    <line x1="458" y1="120" x2="600" y2="120" stroke="#ef4444" stroke-width="2.5" />
                    <line x1="458" y1="120" x2="600" y2="120" stroke="#ffffff" stroke-width="0.8" opacity="0.8" />

                    <!-- Tip Energy Flares -->
                    <!-- Left Tip Point Energy Flare -->
                    <circle cx="40" cy="120" r="5" fill="#f59e0b" filter="url(#spearGoldFilter)" />
                    <!-- Right Tip Point Energy Flare -->
                    <circle cx="600" cy="120" r="5" fill="#ef4444" filter="url(#spearCrimsonFilter)" />
                  </g>

                  <!-- Thrust Telemetry Kinetic Vectors -->
                  <g opacity="0.85">
                    <line x1="32" y1="120" x2="16" y2="120" stroke="#f59e0b" stroke-width="2" />
                    <path d="M 22 114 L 14 120 L 22 126" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <text x="38" y="55" fill="#f59e0b" font-family="var(--font-mono)" font-size="10" font-weight="700" letter-spacing="1">◄ UJUNG 1: PENETRASI EKSPOR</text>
                  </g>
                  
                  <text x="320" y="96" text-anchor="middle" fill="#94a3b8" font-family="var(--font-mono)" font-size="9" letter-spacing="1.5">POROS DEVALUASI</text>

                  <g opacity="0.85">
                    <line x1="608" y1="120" x2="624" y2="120" stroke="#ef4444" stroke-width="2" />
                    <path d="M 618 114 L 626 120 L 618 126" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <text x="602" y="55" text-anchor="end" fill="#ef4444" font-family="var(--font-mono)" font-size="10" font-weight="700" letter-spacing="1">UJUNG 2: TIKAMAN INFLASI IMPOR ►</text>
                  </g>
                </svg>

                <!-- Dual Spear Points Legend -->
                <div class="spear-points-legend">
                  <div class="spear-side left-side">
                    <div class="spear-tip-indicator gold">
                      <span>◄</span>
                      <span>UJUNG 1 // EKSPOR</span>
                    </div>
                    <h4 class="spear-side-title text-gold">Daya Saing Harga Global</h4>
                    <p class="spear-side-desc">Menusuk pasar internasional dengan harga relatif lebih murah bagi pembeli valuta asing.</p>
                  </div>
                  <div class="spear-side right-side">
                    <div class="spear-tip-indicator crimson">
                      <span>UJUNG 2 // INFLASI IMPOR</span>
                      <span>►</span>
                    </div>
                    <h4 class="spear-side-title text-crimson">Beban Bahan Baku Impor</h4>
                    <p class="spear-side-desc">Menusuk pembukuan domestik; lonjakan harga komponen impor seketika menggerus margin laba.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visual State 2: Manufacturing Cost Structure & Margin Squeeze Chart -->
            <div class="s2-visual-card" id="s2-cost-chart-visual">
              <div class="visual-badge crimson-badge">ANATOMI PEMBUKUAN // INDUSTRI BERBASIS IMPOR</div>
              
              <div class="margin-squeeze-container">
                <div class="industry-tag-row">
                  <span class="ind-name">CONTOH RIIL: INDUSTRI FARMASI & GARMEN INPUT-IMPOR</span>
                  <span class="ind-shock-pill">SHOCK VALAS (-30%)</span>
                </div>

                <div class="stacked-bars-deck">
                  <!-- Bar 1: Normal Exchange Rate -->
                  <div class="stacked-bar-group">
                    <div class="bar-header">
                      <span class="bar-title">1. Kondisi Kurs Stabil (Normal)</span>
                      <strong class="text-emerald">Laba Bersih: +25% (Sehat)</strong>
                    </div>
                    <div class="bar-track-stacked">
                      <div class="stack-seg seg-raw-normal" style="width: 40%;" title="Bahan Baku Impor: 40%">
                        <span>Bahan Baku 40%</span>
                      </div>
                      <div class="stack-seg seg-labor" style="width: 35%;" title="Biaya Operasional & Tenaga Kerja: 35%">
                        <span>Operasional 35%</span>
                      </div>
                      <div class="stack-seg seg-profit" style="width: 25%;" title="Laba Kotor: 25%">
                        <span>Laba 25%</span>
                      </div>
                    </div>
                  </div>

                  <!-- Bar 2: Depreciated Exchange Rate (Margin Crushed) -->
                  <div class="stacked-bar-group crushed-group">
                    <div class="bar-header">
                      <span class="bar-title text-crimson">2. Pasca Depresiasi Rupiah (-30%)</span>
                      <strong class="text-crimson alert-flash">MARGIN LABA TERGERUS HABIS: -10% (RUGI)</strong>
                    </div>
                    <div class="bar-track-stacked exploded-track">
                      <div class="stack-seg seg-raw-surged" style="width: 75%;" title="Bahan Baku Impor Melonjak: 75%">
                        <span class="seg-warning">Bahan Baku Impor Melonjak 75% (+87.5% Biaya)</span>
                      </div>
                      <div class="stack-seg seg-labor" style="width: 35%;" title="Biaya Operasional & Tenaga Kerja: 35%">
                        <span>Operasional 35%</span>
                      </div>
                    </div>
                    <!-- Deficit Overflow Indicator -->
                    <div class="deficit-indicator-banner">
                      <span class="deficit-icon">⚠️</span>
                      <span class="deficit-text">Total Biaya Produksi (110%) Melampaui 100% Harga Jual Maksimal Konsumen! Margin Tergerus Menjadi Defisit Bersih.</span>
                    </div>
                  </div>
                </div>

                <div class="cost-summary-pills">
                  <div class="p-pill">
                    <span class="p-label">BIAYA INPUT VALAS</span>
                    <span class="p-val text-crimson">MELONJAK SEKETIKA</span>
                  </div>
                  <div class="p-pill">
                    <span class="p-label">DAYA BELI PASAR</span>
                    <span class="p-val text-muted">MENOLAK KENAIKAN HARGA</span>
                  </div>
                  <div class="p-pill">
                    <span class="p-label">HASIL AKHIR</span>
                    <span class="p-val text-crimson">OPERATING LOSS</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }

  private initTypewriter(): void {
    const target = document.getElementById('s2-typewriter-target');
    if (target) {
      this.typewriter = new Typewriter({
        element: target,
        text: SECTION_2_COPY.beats[0].text,
        speed: 30
      });
    }
  }

  /**
   * Scrollytelling Timeline for Section 2 with atmospheric background shift.
   */
  private initScrollytellingTimeline(): void {
    const viewport = document.getElementById('s2-pinned-viewport');
    const questionHero = document.getElementById('s2-question-hero');
    const splitStage = document.getElementById('s2-split-stage');
    
    const beat1 = document.getElementById('s2-beat-1');
    const beat2 = document.getElementById('s2-beat-2');
    const bladeVisual = document.getElementById('s2-blade-visual');
    const costChartVisual = document.getElementById('s2-cost-chart-visual');
    const bladeSvgGroup = document.getElementById('svg-blade-group');

    if (!viewport || !questionHero || !splitStage || !beat1 || !beat2 || !bladeVisual || !costChartVisual) {
      return;
    }

    gsap.set(splitStage, { opacity: 0, y: 50, pointerEvents: 'none' });
    gsap.set(beat2, { opacity: 0.2, filter: 'blur(2px)' });

    // Set initial visual card visibility cleanly via GSAP autoAlpha
    gsap.set(bladeVisual, { autoAlpha: 1, y: 0 });
    gsap.set(costChartVisual, { autoAlpha: 0, y: 30 });

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.container,
        start: 'top top',
        end: '+=350%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onEnter: () => {
          (window as any).__setMoodColor?.('#1A080C');
        },
        onEnterBack: () => {
          (window as any).__setMoodColor?.('#1A080C');
        }
      }
    });

    const typeObj = { progress: 0 };

    // Stage 0 -> 1: Question Hero Transition
    this.timeline
      .to(questionHero, {
        opacity: 0,
        y: -60,
        scale: 0.94,
        duration: 1.0,
        ease: 'power2.inOut',
        onComplete: () => {
          questionHero.style.pointerEvents = 'none';
        }
      }, 0)
      .to(splitStage, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power2.out',
        onStart: () => {
          splitStage.style.pointerEvents = 'auto';
        }
      }, 0.4)
      // Typewriter starts typing at 0.5 and completes 100% by 1.6, well before Beat 1 plateau midpoint
      .to(typeObj, {
        progress: 1,
        duration: 1.1,
        ease: 'none',
        onUpdate: () => {
          this.typewriter.setProgress(typeObj.progress);
        }
      }, 0.5);

    // Spear kinetic thrust & balance tilt animation
    if (bladeSvgGroup) {
      this.timeline.fromTo(
        bladeSvgGroup,
        { x: -18, rotation: -3.5, transformOrigin: '320px 120px' },
        { x: 18, rotation: 3.5, transformOrigin: '320px 120px', duration: 1.4, ease: 'sine.inOut' },
        0.6
      );
    }

    // Stage 1 -> 2: Beat 1 -> Beat 2 & Margin Squeeze Chart Transition (Begins at 2.8 after generous Beat 1 plateau)
    this.timeline
      .to(beat1, { opacity: 0.35, filter: 'blur(1.5px)', duration: 0.8 }, 2.8)
      .to(beat2, { opacity: 1, filter: 'blur(0px)', duration: 0.8 }, 2.8)
      .to(bladeVisual, {
        autoAlpha: 0,
        y: -30,
        duration: 0.6,
        ease: 'power2.inOut'
      }, 2.8)
      .to(costChartVisual, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, 3.2)
      // Dedicated resting window for Beat 2
      .to({}, { duration: 1.2 }, 3.9);
  }

  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}
