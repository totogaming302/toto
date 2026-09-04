import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION_4_COPY } from '../../data/editorialCopy.ts';
import { SoundEngine } from '../audio/SoundEngine.ts';

gsap.registerPlugin(ScrollTrigger);

export class Section4JCurve {
  private container: HTMLElement;
  private timeline!: gsap.core.Timeline;

  constructor(containerId: string = 'section-4') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Section 4 container #${containerId} not found`);
    }
    this.container = el;
    this.renderSectionStructure();
    this.bindPillarInteractions();
    this.initScrollytellingTimeline();
  }

  private bindPillarInteractions(): void {
    const pillars = this.container.querySelectorAll<HTMLElement>('.j-pillar-card');
    pillars.forEach((pillar, idx) => {
      pillar.style.cursor = 'pointer';
      pillar.addEventListener('click', () => {
        SoundEngine.getInstance().playRadarPing(880 + idx * 180);
        gsap.fromTo(pillar, { scale: 0.96 }, { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1 });
      });
    });
  }

  /**
   * Renders Section 4 J-Curve narrative and interactive graph engine.
   */
  private renderSectionStructure(): void {
    const [b1, b2, b3] = SECTION_4_COPY.beats;

    this.container.innerHTML = `
      <div class="pinned-viewport" id="s4-pinned-viewport">
        <!-- Fullscreen Question Anchor Hero -->
        <div class="s4-question-hero" id="s4-question-hero">
          <div class="section-tag">${SECTION_4_COPY.tagline}</div>
          <h2 class="question-anchor-huge" id="s4-hero-headline">${SECTION_4_COPY.questionAnchor}</h2>
          <div class="scroll-hint-micro">
            <span class="pulse-line"></span>
            <span>GULIR UNTUK MENGURAI ANOMALI KURVA-J</span>
          </div>
        </div>

        <!-- Main Split Stage Container -->
        <div class="container-editorial split-stage s4-split-stage" id="s4-split-stage">
          
          <!-- Left Column: 3 Progressive Narrative Beats -->
          <div class="narrative-card s4-narrative-card" data-lenis-prevent>
            <div class="s4-compact-header">
              <span class="section-tag">${SECTION_4_COPY.tagline}</span>
              <h3 class="s4-compact-question">${SECTION_4_COPY.questionAnchor}</h3>
            </div>

            <div class="s4-beats-stack">
              <!-- Beat 1: Fenomena Kurva J -->
              <div class="s4-beat-item active-beat" id="s4-beat-1" data-beat-id="s4-b1" title="Klik untuk menuju ke beat ini">
                <div class="beat-indicator">
                  <span class="beat-number">01</span>
                  <span class="beat-title">${b1.headline}</span>
                  <span class="beat-status-badge crimson">FASE 1: DEFISIT ANJLOK</span>
                </div>
                <p class="text-beat">${b1.text}</p>
              </div>

              <!-- Beat 2: Kekakuan Kontrak Perdagangan -->
              <div class="s4-beat-item" id="s4-beat-2" data-beat-id="s4-b2" title="Klik untuk menuju ke beat ini">
                <div class="beat-indicator">
                  <span class="beat-number">02</span>
                  <span class="beat-title">${b2.headline}</span>
                  <span class="beat-status-badge amber">FASE 2: PALUNG INFLEKSI</span>
                </div>
                <p class="text-beat">${b2.text}</p>
              </div>

              <!-- Beat 3: Prasyarat Elastisitas & Rantai Pasok -->
              <div class="s4-beat-item" id="s4-beat-3" data-beat-id="s4-b3" title="Klik untuk menuju ke beat ini">
                <div class="beat-indicator">
                  <span class="beat-number">03</span>
                  <span class="beat-title">${b3.headline}</span>
                  <span class="beat-status-badge emerald">FASE 3: SURPLUS MELEJIT</span>
                </div>
                <p class="text-beat">${b3.text}</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive J-Curve Vector Coordinate Stage -->
          <div class="visual-stage s4-visual-stage" id="s4-visual-stage">
            <div class="s4-visual-card active">
              <div class="visual-badge">TRAJEKTORI MAKRO // J-CURVE SIMULATION ENGINE</div>

              <div class="jcurve-canvas-wrap">
                <svg class="jcurve-svg" viewBox="0 0 680 340" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <!-- Laser Gradient for Curve -->
                    <linearGradient id="jCurveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#ef4444" />
                      <stop offset="35%" stop-color="#ef4444" />
                      <stop offset="55%" stop-color="#f59e0b" />
                      <stop offset="100%" stop-color="#10b981" />
                    </linearGradient>

                    <!-- Fluid Shading Gradients -->
                    <linearGradient id="deficitFluidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.28" />
                      <stop offset="100%" stop-color="#ef4444" stop-opacity="0.02" />
                    </linearGradient>
                    <linearGradient id="surplusFluidGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stop-color="#10b981" stop-opacity="0.02" />
                      <stop offset="100%" stop-color="#10b981" stop-opacity="0.25" />
                    </linearGradient>

                    <!-- Glow Filter for Laser Curve -->
                    <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    
                    <filter id="dotGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <!-- Background Grid Coordinate Lines -->
                  <g class="grid-lines" opacity="0.12" stroke="#ffffff" stroke-width="1">
                    <line x1="60" y1="50" x2="640" y2="50" stroke-dasharray="3 3" />
                    <line x1="60" y1="110" x2="640" y2="110" stroke-dasharray="3 3" />
                    <line x1="60" y1="230" x2="640" y2="230" stroke-dasharray="3 3" />
                    <line x1="60" y1="290" x2="640" y2="290" stroke-dasharray="3 3" />
                    <line x1="180" y1="30" x2="180" y2="310" stroke-dasharray="3 3" />
                    <line x1="330" y1="30" x2="330" y2="310" stroke-dasharray="3 3" />
                    <line x1="490" y1="30" x2="490" y2="310" stroke-dasharray="3 3" />
                  </g>

                  <!-- Fluid Area Shading (Deficit & Surplus Zones) -->
                  <path 
                    d="M 60 170 C 120 170, 140 270, 200 270 C 260 270, 310 220, 370 170 L 60 170 Z" 
                    fill="url(#deficitFluidGradient)" 
                    class="jcurve-area-deficit"
                  />
                  <path 
                    d="M 370 170 C 450 100, 520 50, 610 50 L 610 170 L 370 170 Z" 
                    fill="url(#surplusFluidGradient)" 
                    class="jcurve-area-surplus"
                  />

                  <!-- Baseline Zero: Net Trade Balance Equilibrium -->
                  <line x1="50" y1="170" x2="650" y2="170" stroke="rgba(148, 163, 184, 0.4)" stroke-width="2" stroke-dasharray="6 4" />
                  <text x="645" y="164" text-anchor="end" fill="#94a3b8" font-family="var(--font-mono)" font-size="10" letter-spacing="1">TITIK IMPAS NERACA (NET ZERO)</text>

                  <!-- Zone Legends -->
                  <text x="60" y="45" fill="#10b981" font-family="var(--font-mono)" font-size="10.5" font-weight="700" letter-spacing="1.2">▲ SURPLUS EKSPOR (+)</text>
                  <text x="60" y="328" fill="#ef4444" font-family="var(--font-mono)" font-size="10.5" font-weight="700" letter-spacing="1.2">▼ DEFISIT PERDAGANGAN (-)</text>

                  <!-- Timeline Axis Indicators -->
                  <text x="80" y="195" fill="#64748b" font-family="var(--font-mono)" font-size="9">t0: Devaluasi</text>
                  <text x="210" y="195" fill="#64748b" font-family="var(--font-mono)" font-size="9">t1: Jeda Kontrak</text>
                  <text x="350" y="195" fill="#64748b" font-family="var(--font-mono)" font-size="9">t2: Rebound</text>
                  <text x="540" y="195" fill="#64748b" font-family="var(--font-mono)" font-size="9">t3: Surplus Maksimal</text>

                  <!-- The J-Curve Master Path -->
                  <!-- Points: (60, 170) -> (180, 270) -> (250, 275) -> (360, 170) -> (600, 50) -->
                  <path 
                    id="jcurve-guide" 
                    d="M 60 170 C 120 170, 140 270, 200 270 C 260 270, 310 220, 370 170 C 450 100, 520 50, 610 50" 
                    stroke="rgba(255, 255, 255, 0.08)" 
                    stroke-width="4" 
                    fill="none" 
                  />

                  <!-- Active Scrubbed Laser Path -->
                  <path 
                    id="jcurve-laser-path" 
                    d="M 60 170 C 120 170, 140 270, 200 270 C 260 270, 310 220, 370 170 C 450 100, 520 50, 610 50" 
                    stroke="url(#jCurveGradient)" 
                    stroke-width="4.5" 
                    fill="none" 
                    filter="url(#laserGlow)"
                    stroke-linecap="round"
                  />

                  <!-- Phase Milestone Pulse Nodes -->
                  <!-- Phase 1 Node (The Dip) -->
                  <g class="phase-marker" id="marker-phase-1" opacity="0.3">
                    <circle cx="200" cy="270" r="7" fill="#ef4444" filter="url(#dotGlow)" />
                    <circle cx="200" cy="270" r="14" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3" />
                    <text x="200" y="242" text-anchor="middle" fill="#ef4444" font-family="var(--font-mono)" font-size="10" font-weight="700">FASE 1: THE DIP</text>
                  </g>

                  <!-- Phase 2 Node (The Trough / Inflection) -->
                  <g class="phase-marker" id="marker-phase-2" opacity="0.3">
                    <circle cx="370" cy="170" r="7" fill="#f59e0b" filter="url(#dotGlow)" />
                    <circle cx="370" cy="170" r="14" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
                    <text x="370" y="145" text-anchor="middle" fill="#f59e0b" font-family="var(--font-mono)" font-size="10" font-weight="700">FASE 2: REBOUND</text>
                  </g>

                  <!-- Phase 3 Node (The Boom / Long-term Surplus) -->
                  <g class="phase-marker" id="marker-phase-3" opacity="0.3">
                    <circle cx="610" cy="50" r="8" fill="#10b981" filter="url(#dotGlow)" />
                    <circle cx="610" cy="50" r="16" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" />
                    <text x="610" y="30" text-anchor="middle" fill="#10b981" font-family="var(--font-mono)" font-size="10" font-weight="700">FASE 3: THE BOOM</text>
                  </g>

                  <!-- Dynamic Radar Tracking Crosshair -->
                  <g class="radar-tracker-group" id="jcurve-radar-tracker">
                    <circle cx="200" cy="270" r="18" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="4 2" class="radar-spin-ring" />
                    <line x1="188" y1="270" x2="212" y2="270" stroke="#ef4444" stroke-width="1.2" />
                    <line x1="200" y1="258" x2="200" y2="282" stroke="#ef4444" stroke-width="1.2" />
                  </g>
                </svg>
              </div>

              <!-- 3 Core Economic Conditionality Pillars -->
              <div class="jcurve-pillars-grid">
                <div class="j-pillar-card" id="pillar-1">
                  <div class="pillar-top-row">
                    <span class="pillar-tag text-slate">PILAR 1</span>
                    <span class="pillar-check-badge text-emerald">✓ VERIFIED</span>
                  </div>
                  <strong class="pillar-name">Elastisitas Permintaan Valas</strong>
                  <span class="pillar-status text-emerald">Syarat: e > 1.0 (Marshall-Lerner)</span>
                </div>
                <div class="j-pillar-card" id="pillar-2">
                  <div class="pillar-top-row">
                    <span class="pillar-tag text-slate">PILAR 2</span>
                    <span class="pillar-check-badge text-gold">✓ VERIFIED</span>
                  </div>
                  <strong class="pillar-name">Kapasitas Produksi Siaga</strong>
                  <span class="pillar-status text-gold">Syarat: Siap Tampung Order Masif</span>
                </div>
                <div class="j-pillar-card" id="pillar-3">
                  <div class="pillar-top-row">
                    <span class="pillar-tag text-slate">PILAR 3</span>
                    <span class="pillar-check-badge text-cyan">✓ VERIFIED</span>
                  </div>
                  <strong class="pillar-name">Rantai Pasok Minim Impor</strong>
                  <span class="pillar-status text-cyan">Syarat: Tak Tercekik Input Valas</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;
  }

  /**
   * Pinned scrollytelling timeline driving dynamic J-Curve laser drawing.
   */
  private initScrollytellingTimeline(): void {
    const questionHero = document.getElementById('s4-question-hero');
    const splitStage = document.getElementById('s4-split-stage');
    
    // Narrative beats
    const beat1 = document.getElementById('s4-beat-1');
    const beat2 = document.getElementById('s4-beat-2');
    const beat3 = document.getElementById('s4-beat-3');

    // J-Curve path & milestone markers
    const laserPath = document.getElementById('jcurve-laser-path') as SVGPathElement | null;
    const marker1 = document.getElementById('marker-phase-1');
    const marker2 = document.getElementById('marker-phase-2');
    const marker3 = document.getElementById('marker-phase-3');

    // Pillars
    const pillar1 = document.getElementById('pillar-1');
    const pillar2 = document.getElementById('pillar-2');
    const pillar3 = document.getElementById('pillar-3');

    if (!questionHero || !splitStage || !beat1 || !beat2 || !beat3 || !laserPath) {
      return;
    }

    const pathLength = laserPath.getTotalLength();
    gsap.set(laserPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    // Initial states
    gsap.set(splitStage, { opacity: 0, y: 50, pointerEvents: 'none' });
    gsap.set([beat2, beat3], { opacity: 0.28 });
    gsap.set(beat1, { opacity: 1 });

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.container,
        start: 'top top',
        end: '+=520%',
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        onEnter: () => {
          (window as any).__setMoodColor?.('#0D1117');
        },
        onEnterBack: () => {
          (window as any).__setMoodColor?.('#0D1117');
        }
      }
    });

    // Stage 0 -> 1: Question Hero transition
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

    // Phase 1: The Dip (Path draws 0% to exactly 27.26% into deficit trough point)
    this.timeline
      .to(laserPath, {
        strokeDashoffset: pathLength * 0.7274,
        duration: 2.0,
        ease: 'none'
      }, 1.4)
      .to(marker1, { opacity: 1, scale: 1.1, duration: 0.8 }, 2.4)
      .to(pillar1, { borderColor: 'rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.08)', duration: 0.8 }, 2.4);

    // Stage 1 -> 2: Beat 1 -> Beat 2 & Path reaches Rebound Inflection (GPU Compositor-Friendly)
    this.timeline
      .to(beat1, { 
        opacity: 0.32, 
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        duration: 1.2 
      }, 4.2)
      .to(beat2, { 
        opacity: 1, 
        borderColor: 'rgba(245, 158, 11, 0.45)',
        backgroundColor: 'rgba(245, 158, 11, 0.06)',
        duration: 1.2 
      }, 4.2)
      .to(laserPath, {
        strokeDashoffset: pathLength * 0.4197,
        duration: 2.0,
        ease: 'none'
      }, 4.2)
      .to(marker2, { opacity: 1, scale: 1.1, duration: 0.8 }, 5.2)
      .to(pillar2, { borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.08)', duration: 0.8 }, 5.2);

    // Stage 2 -> 3: Beat 2 -> Beat 3 & Path rockets into Surplus Peak (GPU Compositor-Friendly)
    this.timeline
      .to(beat2, { 
        opacity: 0.32, 
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        duration: 1.2 
      }, 7.6)
      .to(beat3, { 
        opacity: 1, 
        borderColor: 'rgba(16, 185, 129, 0.45)',
        backgroundColor: 'rgba(16, 185, 129, 0.06)',
        duration: 1.2 
      }, 7.6)
      .to(laserPath, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'none'
      }, 7.6)
      .to(marker3, { opacity: 1, scale: 1.15, duration: 0.8 }, 8.8)
      .to(pillar3, { borderColor: 'rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.08)', duration: 0.8 }, 8.8)
      // Dedicated resting window for Beat 3
      .to({}, { duration: 1.6 }, 9.9);
  }

  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}
