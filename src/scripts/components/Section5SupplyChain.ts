import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION_5_COPY } from '../../data/editorialCopy.ts';

gsap.registerPlugin(ScrollTrigger);

export class Section5SupplyChain {
  private container: HTMLElement;
  private timeline!: gsap.core.Timeline;

  constructor(containerId: string = 'section-5') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Section 5 container #${containerId} not found`);
    }
    this.container = el;
    this.renderSectionStructure();
    this.initScrollytellingTimeline();
  }

  /**
   * Renders Section 5 supply-chain imported inflation mechanics.
   */
  private renderSectionStructure(): void {
    const [node1, node2, node3] = SECTION_5_COPY.pipelineNodes;

    this.container.innerHTML = `
      <div class="pinned-viewport" id="s5-pinned-viewport">
        <!-- Fullscreen Question Anchor Hero -->
        <div class="s5-question-hero" id="s5-question-hero">
          <div class="section-tag">${SECTION_5_COPY.tagline}</div>
          <h2 class="question-anchor-huge" id="s5-hero-headline">${SECTION_5_COPY.questionAnchor}</h2>
          <div class="scroll-hint-micro">
            <span class="pulse-line"></span>
            <span>GULIR UNTUK MEMBONGKAR TRANSMISI JALUR INFLASI</span>
          </div>
        </div>

        <!-- Main Split Stage Container -->
        <div class="container-editorial split-stage s5-split-stage" id="s5-split-stage">
          
          <!-- Left Column: Typewriter Hook & 3 Pipeline Transmission Cards -->
          <div class="narrative-card s5-narrative-card">
            <div class="s5-compact-header">
              <span class="section-tag">${SECTION_5_COPY.tagline}</span>
              <h3 class="s5-compact-question">${SECTION_5_COPY.questionAnchor}</h3>
            </div>

            <!-- Cinematic Mechanical Typewriter Block -->
            <div class="typewriter-hook-card" id="s5-typewriter-box">
              <div class="typewriter-meta-bar">
                <span class="typewriter-badge">[MEKANISME TRANSMISI // SUPPLY-SIDE]</span>
                <span class="terminal-status-dot"></span>
              </div>
              <p class="typewriter-text" id="s5-typewriter-target"></p>
              <span class="typewriter-cursor" id="s5-typewriter-cursor">▍</span>
            </div>

            <!-- Pipeline Header & Stack -->
            <div class="s5-pipeline-section">
              <div class="s5-pipeline-header-label">${SECTION_5_COPY.pipelineHeader}</div>
              
              <div class="s5-pipeline-stack">
                <!-- Node 1: Barang Konsumsi Impor -->
                <div class="s5-pipeline-item active-pipe" id="s5-pipe-1" data-beat-id="s5-b1" title="Klik untuk menuju ke beat ini">
                  <div class="pipe-header-row">
                    <span class="pipe-chip amber">[01 // KONSUMSI LANGSUNG]</span>
                    <span class="pipe-title">${node1.title}</span>
                  </div>
                  <p class="pipe-text">${node1.text}</p>
                </div>

                <!-- Node 2: Biaya Input Manufaktur -->
                <div class="s5-pipeline-item" id="s5-pipe-2" data-beat-id="s5-b2" title="Klik untuk menuju ke beat ini">
                  <div class="pipe-header-row">
                    <span class="pipe-chip crimson">[02 // INPUT MANUFAKTUR]</span>
                    <span class="pipe-title">${node2.title}</span>
                  </div>
                  <p class="pipe-text">${node2.text}</p>
                </div>

                <!-- Node 3: Beban Energi & Logistik -->
                <div class="s5-pipeline-item" id="s5-pipe-3" data-beat-id="s5-b3" title="Klik untuk menuju ke beat ini">
                  <div class="pipe-header-row">
                    <span class="pipe-chip gold">[03 // ENERGI & LOGISTIK]</span>
                    <span class="pipe-title">${node3.title}</span>
                  </div>
                  <p class="pipe-text">${node3.text}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: 3 Dynamic Pipeline Telemetry Visuals -->
          <div class="visual-stage s5-visual-stage" id="s5-visual-stage">
            
            <!-- Visual 1: Barang Konsumsi Impor Price Shock -->
            <div class="s5-visual-card active" id="s5-visual-1">
              <div class="visual-badge text-gold">TRANSMISI TINGKAT 1 // HARGA KONSUMSI LANGSUNG</div>
              
              <div class="telemetry-box amber-glow">
                <div class="telemetry-top-badge amber">
                  <span class="badge-icon">▲</span>
                  <span>KOMODITAS KONSUMSI IMPOR: LONJAKAN HARGA KEBUTUHAN POKOK</span>
                </div>

                <div class="basket-price-shock-grid">
                  <!-- Shock Item 1: Gandum -->
                  <div class="shock-price-card">
                    <div class="shock-header">
                      <span class="shock-name">GANDUM & TEPUNG IMPOR</span>
                      <span class="shock-delta text-crimson">+32.1%</span>
                    </div>
                    <div class="price-transition-row">
                      <span class="old-price">Rp 11.200 / kg</span>
                      <span class="price-arrow">→</span>
                      <strong class="new-price text-crimson">Rp 14.800 / kg</strong>
                    </div>
                    <span class="shock-sub">100% bergantung pasokan impor global (Black Sea / Australia).</span>
                  </div>

                  <!-- Shock Item 2: Kedelai -->
                  <div class="shock-price-card">
                    <div class="shock-header">
                      <span class="shock-name">KEDELAI BAHAN TEMPE & TAHU</span>
                      <span class="shock-delta text-crimson">+33.3%</span>
                    </div>
                    <div class="price-transition-row">
                      <span class="old-price">Rp 9.500 / kg</span>
                      <span class="price-arrow">→</span>
                      <strong class="new-price text-crimson">Rp 12.650 / kg</strong>
                    </div>
                    <span class="shock-sub">Biaya pengadaan importir melonjak proporsional dengan depresiasi kurs.</span>
                  </div>

                  <!-- Shock Item 3: Gawai & Elektronik -->
                  <div class="shock-price-card">
                    <div class="shock-header">
                      <span class="shock-name">GAWAI & LAPTOP ENTRY LEVEL</span>
                      <span class="shock-delta text-crimson">+30.0%</span>
                    </div>
                    <div class="price-transition-row">
                      <span class="old-price">Rp 4.500.000</span>
                      <span class="price-arrow">→</span>
                      <strong class="new-price text-crimson">Rp 5.850.000</strong>
                    </div>
                    <span class="shock-sub">Penyesuaian banderol langsung di tingkat distributor resmi.</span>
                  </div>
                </div>

              </div>
            </div>

            <!-- Visual 2: Biaya Input Manufaktur Cost-Squeeze Conveyor -->
            <div class="s5-visual-card" id="s5-visual-2">
              <div class="visual-badge text-crimson">TRANSMISI TINGKAT 2 // PASSTHROUGH BIAYA INPUT PABRIK</div>
              
              <div class="telemetry-box crimson-glow">
                <div class="telemetry-top-badge crimson">
                  <span class="badge-icon">⚙</span>
                  <span>RANTAI PRODUKSI INDUSTRI: TEKANAN BIAYA INPUT MENUJU HARGA JADI</span>
                </div>

                <!-- Interactive Factory Cost Squeeze Graphic -->
                <div class="factory-conveyor-wrap">
                  <div class="conveyor-flow-track">
                    
                    <!-- Step 1: Raw Materials Inflow -->
                    <div class="conveyor-node input-step">
                      <span class="step-num">HULU</span>
                      <strong class="step-title">BAHAN BAKU IMPOR</strong>
                      <span class="step-badge text-crimson">+33% Kurs Valas</span>
                      <span class="step-desc">Petrokimia, biji plastik, komponen baja</span>
                    </div>

                    <div class="conveyor-arrow">➔</div>

                    <!-- Step 2: Processing Squeeze -->
                    <div class="conveyor-node factory-step">
                      <span class="step-num">PROSES</span>
                      <strong class="step-title">PABRIK MANUFAKTUR</strong>
                      <span class="step-badge text-gold">Margin Terjepit</span>
                      <span class="step-desc">Kenaikan biaya melampaui buffer efisiensi</span>
                    </div>

                    <div class="conveyor-arrow">➔</div>

                    <!-- Step 3: Consumer Price Shift -->
                    <div class="conveyor-node output-step">
                      <span class="step-num">HILIR</span>
                      <strong class="step-title">KONSUMEN AKHIR</strong>
                      <span class="step-badge text-crimson">Kenaikan Harga Jual</span>
                      <span class="step-desc">Beban biaya dilimpahkan ke harga ritel</span>
                    </div>

                  </div>
                </div>

                <!-- Passthrough Transmission Lag Telemetry Badge -->
                <div class="passthrough-lag-badge">
                  <span class="lag-clock-icon">⏱️</span>
                  <span class="lag-text">TRANSMISSION LAG: <strong>T+0 (Guncangan Valas) ➔ T+3 BULAN (Puncak Inflasi IHK Konsumen)</strong></span>
                </div>

                <div class="surplus-readout-pill crimson">
                  <span class="pill-tag">LOGIKA PRODUSEN:</span>
                  <strong>Menaikkan Harga Jual ke Konsumen Akhir Adalah Satu-satunya Cara Mencegah Kebangkrutan</strong>
                </div>
              </div>
            </div>

            <!-- Visual 3: Domino Beban Energi & Logistik Nasional -->
            <div class="s5-visual-card" id="s5-visual-3">
              <div class="visual-badge text-gold">TRANSMISI TINGKAT 3 // EFEK DOMINO LOGISTIK & ENERGI</div>
              
              <div class="telemetry-box amber-glow s5-domino-telemetry-box">
                <div class="telemetry-top-badge amber">
                  <span class="badge-icon">⛽</span>
                  <span>EFEK DOMINO: ENERGI MINYAK MENTAH VALAS & TARIF TRANSPORTASI NASIONAL</span>
                </div>

                <!-- Editorial Cartoon: 4-Panel Energy & CPI Contagion Comic -->
                <div class="s5-art-container">
                  <img src="./images/oil-inflation-chain.jpg" alt="Transmisi Inflasi Energi ke Konsumen" class="s5-domino-img" />
                </div>

                <div class="domino-ripple-container">
                  <!-- Laser Energy Conduction Line Between Domino Cards -->
                  <div class="domino-conduction-line" aria-hidden="true">
                    <div class="conduction-cable">
                      <span class="conduction-photon p1"></span>
                      <span class="conduction-photon p2"></span>
                    </div>
                  </div>

                  <div class="domino-chain-grid">
                    
                    <div class="domino-card pulse-border-red">
                      <div class="domino-index">01</div>
                      <h4 class="domino-title text-crimson">Minyak Mentah (ICP USD)</h4>
                      <p class="domino-desc">Minyak impor ditransaksikan dalam USD. Depresiasi kurs membengkakkan subsidi energi dan biaya BBM industri.</p>
                    </div>

                    <div class="domino-card pulse-border-amber">
                      <div class="domino-index">02</div>
                      <h4 class="domino-title text-gold">Tarif Logistik & Kargo</h4>
                      <p class="domino-desc">Truk kontainer, kapal tol laut, dan logistik antar-pulau menaikkan tarif freight mengimbangi biaya sparepart dan operasional.</p>
                    </div>

                    <div class="domino-card pulse-border-red">
                      <div class="domino-index">03</div>
                      <h4 class="domino-title text-crimson">Semua Barang Ikut Naik</h4>
                      <p class="domino-desc">Barang yang 100% lokal sekalipun terpaksa naik harga karena ongkos kirim ke pasar dan supermarket bertambah mahal.</p>
                    </div>

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
   * Initializes pinned scrollytelling timeline with typewriter effect and pipeline progression.
   */
  private initScrollytellingTimeline(): void {
    const questionHero = document.getElementById('s5-question-hero');
    const splitStage = document.getElementById('s5-split-stage');
    
    // Typewriter targets
    const typewriterTarget = document.getElementById('s5-typewriter-target');
    const typewriterCursor = document.getElementById('s5-typewriter-cursor');
    const fullTypewriterText = SECTION_5_COPY.typewriterIntro;

    // Pipeline cards
    const pipe1 = document.getElementById('s5-pipe-1');
    const pipe2 = document.getElementById('s5-pipe-2');
    const pipe3 = document.getElementById('s5-pipe-3');

    // Visual cards
    const visual1 = document.getElementById('s5-visual-1');
    const visual2 = document.getElementById('s5-visual-2');
    const visual3 = document.getElementById('s5-visual-3');

    if (!questionHero || !splitStage || !typewriterTarget || !pipe1 || !pipe2 || !pipe3 || !visual1 || !visual2 || !visual3) {
      return;
    }

    // Set initial layout states
    gsap.set(splitStage, { opacity: 0, y: 50, pointerEvents: 'none' });
    gsap.set([pipe2, pipe3], { opacity: 0.28, filter: 'blur(1px)' });
    gsap.set(pipe1, { opacity: 1, filter: 'blur(0px)' });

    // Set initial visual card visibility cleanly via GSAP autoAlpha
    gsap.set(visual1, { autoAlpha: 1, y: 0 });
    gsap.set([visual2, visual3], { autoAlpha: 0, y: 30 });

    // Cursor pulse
    gsap.to(typewriterCursor, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Object for scrubbed typewriter text progress
    const typeObj = { charCount: 0 };

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

    // Stage 0 -> 1: Question Hero transition & split stage reveal
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
      }, 0.7)
      // Mechanical Typewriter scrub (starts at 0.8 and finishes 100% at 2.6, well before beat 2 arrives at 4.2)
      .to(typeObj, {
        charCount: fullTypewriterText.length,
        duration: 1.8,
        ease: 'none',
        onUpdate: () => {
          const currentCount = Math.floor(typeObj.charCount);
          typewriterTarget.textContent = fullTypewriterText.slice(0, currentCount);
        }
      }, 0.8);

    // Stage 1 -> 2: Node 1 -> Node 2 Transition (Begins at 4.2, LONG AFTER typewriter finishes at 2.6)
    this.timeline
      .to(pipe1, { 
        opacity: 0.32, 
        filter: 'blur(1.5px)', 
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        duration: 1.2 
      }, 4.2)
      .to(pipe2, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        borderColor: 'rgba(239, 68, 68, 0.45)',
        backgroundColor: 'rgba(239, 68, 68, 0.06)',
        duration: 1.2 
      }, 4.2)
      .to(visual1, {
        autoAlpha: 0,
        y: -30,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 4.2)
      .to(visual2, {
        autoAlpha: 1,
        y: 0,
        duration: 1.3,
        ease: 'power2.out'
      }, 4.8);

    // Stage 2 -> 3: Node 2 -> Node 3 Transition (Deliberate & cinematic)
    this.timeline
      .to(pipe2, { 
        opacity: 0.32, 
        filter: 'blur(1.5px)', 
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        duration: 1.2 
      }, 7.6)
      .to(pipe3, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        borderColor: 'rgba(245, 158, 11, 0.45)',
        backgroundColor: 'rgba(245, 158, 11, 0.06)',
        duration: 1.2 
      }, 7.6)
      .to(visual2, {
        autoAlpha: 0,
        y: -30,
        duration: 1.0,
        ease: 'power2.inOut'
      }, 7.6)
      .to(visual3, {
        autoAlpha: 1,
        y: 0,
        duration: 1.3,
        ease: 'power2.out'
      }, 8.2)
      // Dedicated resting window for Beat 3
      .to({}, { duration: 1.6 }, 9.5);
  }

  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}
