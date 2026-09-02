import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION_7_COPY } from '../../data/editorialCopy.ts';
import { calculateMacroEconomy, BASE_CRISIS_INPUTS, SimulatorInputs, SimulatorOutputs } from '../utils/math.ts';

gsap.registerPlugin(ScrollTrigger);

export class Section7Simulator {
  private container: HTMLElement;
  private timeline!: gsap.core.Timeline;
  private currentInputs: SimulatorInputs = { ...BASE_CRISIS_INPUTS };

  constructor(containerId: string = 'section-7') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Section 7 container #${containerId} not found`);
    }
    this.container = el;
    this.renderSectionStructure();
    this.initScrollytellingTimeline();
    this.bindInteractiveControls();
    this.updateDashboard(calculateMacroEconomy(this.currentInputs));
  }

  /**
   * Renders the Crisis Room dashboard, ticker tapes, and telemetry structures.
   */
  private renderSectionStructure(): void {
    const copy = SECTION_7_COPY;

    this.container.innerHTML = `
      <div class="s7-pinned-viewport" id="s7-pinned-viewport">
        <!-- Emergency Atmosphere Layers -->
        <div class="s7-emergency-backdrop"></div>
        <div class="s7-scanlines-overlay"></div>

        <!-- Breaking News Ticker Tape -->
        <div class="s7-ticker-tape" id="s7-ticker">
          <div class="ticker-track">
            <span class="ticker-item"><span class="ticker-alert-dot"></span>BREAKING: RUPIAH UNDER SPECULATIVE ATTACK (-30%)</span>
            <span class="ticker-item"><span class="ticker-alert-dot"></span>FOREX RESERVES THREATENED BY MASSIVE CAPITAL FLIGHT</span>
            <span class="ticker-item"><span class="ticker-alert-dot"></span>GLOBAL HEDGE FUNDS SHORTING EMERGING MARKETS</span>
            <span class="ticker-item"><span class="ticker-alert-dot"></span>IMPORTED INFLATION CLIMBING PAST CRITICAL THRESHOLDS</span>
            <span class="ticker-item"><span class="ticker-alert-dot"></span>CENTRAL BANK EMERGENCY CRISIS ROOM CONVENED</span>
            <!-- Repeated for seamless loop -->
            <span class="ticker-item"><span class="ticker-alert-dot"></span>BREAKING: RUPIAH UNDER SPECULATIVE ATTACK (-30%)</span>
            <span class="ticker-item"><span class="ticker-alert-dot"></span>FOREX RESERVES THREATENED BY MASSIVE CAPITAL FLIGHT</span>
            <span class="ticker-item"><span class="ticker-alert-dot"></span>GLOBAL HEDGE FUNDS SHORTING EMERGING MARKETS</span>
            <span class="ticker-item"><span class="ticker-alert-dot"></span>IMPORTED INFLATION CLIMBING PAST CRITICAL THRESHOLDS</span>
            <span class="ticker-item"><span class="ticker-alert-dot"></span>CENTRAL BANK EMERGENCY CRISIS ROOM CONVENED</span>
          </div>
        </div>

        <!-- Fullscreen Question Anchor Hero -->
        <div class="s7-question-hero" id="s7-question-hero">
          <div class="section-tag" style="border-color: var(--accent-crimson); color: var(--accent-crimson);">${copy.tagline}</div>
          <h2 class="question-anchor-huge" id="s7-hero-headline">${copy.questionAnchor}</h2>
          <div class="scroll-hint-micro">
            <span class="pulse-line"></span>
            <span>GULIR UNTUK MEMASUKI RUANG KENDALI KRISIS</span>
          </div>
        </div>

        <!-- Massive Centered "Crisis Room" Title (Entrance Transition) -->
        <div class="s7-massive-title-wrap" id="s7-massive-title-wrap">
          <h1 class="s7-massive-title" id="s7-massive-title">${copy.massiveTitle}</h1>
        </div>

        <!-- Main Interactive Crisis Dashboard Container -->
        <div class="s7-dashboard-container" id="s7-dashboard-container">
          
          <!-- Top HUD Header Bar -->
          <div class="s7-hud-bar">
            <div class="s7-hud-left">
              <span class="s7-docked-title">${copy.massiveTitle}</span>
              <span class="s7-terminal-welcome" id="s7-terminal-welcome">${copy.welcomeTerminal}</span>
            </div>
            <div class="s7-hud-right">
              <div class="s7-status-badge" id="s7-status-badge">
                <span class="status-beacon-pulse" id="s7-status-beacon"></span>
                <span id="s7-status-label">[DARURAT KRISIS]</span>
              </div>
              <button class="s7-reset-btn" id="s7-reset-btn" aria-label="Reset Kebijakan">
                <span>↺</span>
                <span>RESET KEBIJAKAN</span>
              </button>
            </div>
          </div>

          <!-- Dashboard Body Split: Left Levers vs Right Telemetry -->
          <div class="s7-dashboard-body">
            
            <!-- LEFT PANEL: Policy Levers -->
            <div class="s7-levers-panel">
              <div class="s7-briefing-callout">
                <strong>INSTRUKSI KEPALA KEBIJAKAN:</strong> ${copy.briefing}
              </div>

              <div class="s7-levers-list">
                
                <!-- Lever 1: Intervensi Pasar Valas -->
                <div class="lever-card">
                  <div class="lever-header">
                    <span class="lever-name">1. ${copy.levers[0].name}</span>
                    <span class="lever-val-badge" id="val-forex">$0 Miliar</span>
                  </div>
                  <p class="lever-desc">Jual cadangan devisa untuk meredam lonjakan USD. Konsekuensi: Menstabilkan rupiah seketika, namun membakar cadangan devisa.</p>
                  <div class="lever-slider-wrap">
                    <span class="lever-bounds-label">$0B</span>
                    <input type="range" min="0" max="30" step="1" value="0" class="lever-range-slider" id="input-forex" />
                    <span class="lever-bounds-label">$30B</span>
                  </div>
                </div>

                <!-- Lever 2: Suku Bunga Acuan (BI-Rate Hike) -->
                <div class="lever-card">
                  <div class="lever-header">
                    <span class="lever-name">2. ${copy.levers[1].name}</span>
                    <span class="lever-val-badge" id="val-rate">0 bps</span>
                  </div>
                  <p class="lever-desc">Menaikkan bunga acuan membendung capital outflow. Konsekuensi: Menahan kurs & inflasi, tetapi menekan kredit & pertumbuhan PDB.</p>
                  <div class="lever-slider-wrap">
                    <span class="lever-bounds-label">0 bps</span>
                    <input type="range" min="0" max="500" step="25" value="0" class="lever-range-slider" id="input-rate" />
                    <span class="lever-bounds-label">500 bps</span>
                  </div>
                </div>

                <!-- Lever 3: Perluasan Local Currency Settlement (LCS) -->
                <div class="lever-card">
                  <div class="lever-header">
                    <span class="lever-name">3. ${copy.levers[2].name}</span>
                    <span class="lever-val-badge" id="val-lcs">0%</span>
                  </div>
                  <p class="lever-desc">Dedolarisasi perdagangan bilateral (Yuan, Yen, Ringgit, Baht). Konsekuensi: Mengurangi ketergantungan valas tanpa membakar devisa.</p>
                  <div class="lever-slider-wrap">
                    <span class="lever-bounds-label">0%</span>
                    <input type="range" min="0" max="60" step="5" value="0" class="lever-range-slider" id="input-lcs" />
                    <span class="lever-bounds-label">60%</span>
                  </div>
                </div>

                <!-- Lever 4: Insentif Substitusi Impor -->
                <div class="lever-card">
                  <div class="lever-header">
                    <span class="lever-name">4. ${copy.levers[3].name}</span>
                    <span class="toggle-status-text inactive" id="val-substitution">NONAKTIF</span>
                  </div>
                  <p class="lever-desc">Bebas bea masuk mesin hulu & tax holiday bahan baku lokal. Konsekuensi: Melindungi industri domestik & menahan imported inflation.</p>
                  <div class="toggle-switch-wrap">
                    <span class="lever-desc" style="margin: 0;">Aktifkan Paket Insentif Fiskal Domestik</span>
                    <label class="toggle-switch">
                      <input type="checkbox" id="input-substitution" />
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            <!-- RIGHT PANEL: Macroeconomic Health Telemetry -->
            <div class="s7-telemetry-panel">
              <div class="s7-telemetry-grid">
                
                <!-- Metric 1: Kurs Spot USD/IDR -->
                <div class="telemetry-readout-card" id="card-spot">
                  <div class="t-label-row">
                    <span class="t-label">KURS SPOT USD/IDR</span>
                    <span class="t-tag danger" id="tag-spot">DEPRESIASI</span>
                  </div>
                  <div class="t-value" id="out-spot">Rp 17.500</div>
                  <div class="t-bar-track">
                    <div class="t-bar-fill" id="bar-spot" style="width: 100%; background: var(--accent-crimson);"></div>
                  </div>
                  <span class="t-subtext" id="sub-spot">Tekanan Devaluasi Spekulatif (-30%)</span>
                </div>

                <!-- Metric 2: Tingkat Inflasi (%) -->
                <div class="telemetry-readout-card" id="card-inflation">
                  <div class="t-label-row">
                    <span class="t-label">TINGKAT INFLASI IHK</span>
                    <span class="t-tag danger" id="tag-inflation">PANAS</span>
                  </div>
                  <div class="t-value" id="out-inflation">8.50%</div>
                  <div class="t-bar-track">
                    <div class="t-bar-fill" id="bar-inflation" style="width: 90%; background: var(--accent-crimson);"></div>
                  </div>
                  <span class="t-subtext" id="sub-inflation">Target Bank Indonesia: 2.5% ± 1%</span>
                </div>

                <!-- Metric 3: Pertumbuhan PDB (%) -->
                <div class="telemetry-readout-card" id="card-gdp">
                  <div class="t-label-row">
                    <span class="t-label">PERTUMBUHAN PDB</span>
                    <span class="t-tag warning" id="tag-gdp">MELAMBAT</span>
                  </div>
                  <div class="t-value" id="out-gdp">4.20%</div>
                  <div class="t-bar-track">
                    <div class="t-bar-fill" id="bar-gdp" style="width: 76%; background: var(--accent-gold);"></div>
                  </div>
                  <span class="t-subtext" id="sub-gdp">Batas Resesi: < 2.5%</span>
                </div>

                <!-- Metric 4: Cadangan Devisa ($B) -->
                <div class="telemetry-readout-card" id="card-reserves">
                  <div class="t-label-row">
                    <span class="t-label">CADANGAN DEVISA</span>
                    <span class="t-tag safe" id="tag-reserves">CUKUP</span>
                  </div>
                  <div class="t-value" id="out-reserves">$135.0 B</div>
                  <div class="t-bar-track">
                    <div class="t-bar-fill" id="bar-reserves" style="width: 100%; background: var(--accent-emerald);"></div>
                  </div>
                  <span class="t-subtext" id="sub-reserves">Ketahanan: 7.2 Bulan Impor</span>
                </div>

              </div>

              <!-- Real-Time Consequence Diagnosis -->
              <div class="s7-consequence-banner" id="s7-consequence-banner">
                <div class="consequence-badge-row">
                  <span class="consequence-tag">DIAGNOSA KONSEKUENSI KEBIJAKAN:</span>
                  <span class="lever-desc" id="s7-tradeoff-tag">TRADE-OFF MONETER AKTIF</span>
                </div>
                <p class="consequence-text" id="s7-consequence-text">
                  Rupiah terdevaluasi parah (-30%), memicu gelombang imported inflation tak terkendali.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    `;
  }

  /**
   * Pinned scrollytelling entrance timeline:
   * 1. Question Hero fades out.
   * 2. Massive "Crisis Room" scales down and docks into top HUD.
   * 3. Dashboard reveals and becomes interactively accessible.
   */
  private initScrollytellingTimeline(): void {
    const questionHero = document.getElementById('s7-question-hero');
    const massiveTitleWrap = document.getElementById('s7-massive-title-wrap');
    const massiveTitle = document.getElementById('s7-massive-title');
    const dashboard = document.getElementById('s7-dashboard-container');

    if (!questionHero || !massiveTitleWrap || !massiveTitle || !dashboard) {
      return;
    }

    gsap.set(dashboard, { opacity: 0, scale: 0.96, pointerEvents: 'none' });
    gsap.set(massiveTitleWrap, { opacity: 0, scale: 1 });

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.container,
        start: 'top top',
        end: '+=420%',
        pin: true,
        scrub: 1.4,
        anticipatePin: 1,
        onEnter: () => {
          (window as any).__setMoodColor?.('#120507');
        },
        onEnterBack: () => {
          (window as any).__setMoodColor?.('#120507');
        }
      }
    });

    // Stage 0 -> 1: Question Hero fades out, Massive "Crisis Room" appears in center
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
      .to(massiveTitleWrap, {
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out'
      }, 0.8)

      // Stage 1 -> 2: Massive Title shrinks & docks towards top-left, revealing dashboard
      .to(massiveTitle, {
        scale: 0.28,
        x: -380,
        y: -310,
        opacity: 0,
        duration: 1.8,
        ease: 'power3.inOut'
      }, 3.4)
      .to(dashboard, {
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: 'power2.out',
        onStart: () => {
          dashboard.style.pointerEvents = 'auto';
        }
      }, 4.0)
      // Dedicated resting window for Crisis Dashboard
      .to({}, { duration: 1.8 }, 5.6);
  }

  /**
   * Binds UI controls (sliders, toggle switch, reset button).
   */
  private bindInteractiveControls(): void {
    const inputForex = document.getElementById('input-forex') as HTMLInputElement | null;
    const inputRate = document.getElementById('input-rate') as HTMLInputElement | null;
    const inputLcs = document.getElementById('input-lcs') as HTMLInputElement | null;
    const inputSubstitution = document.getElementById('input-substitution') as HTMLInputElement | null;
    const resetBtn = document.getElementById('s7-reset-btn');

    const valForex = document.getElementById('val-forex');
    const valRate = document.getElementById('val-rate');
    const valLcs = document.getElementById('val-lcs');
    const valSubstitution = document.getElementById('val-substitution');

    const handleUpdate = () => {
      if (!inputForex || !inputRate || !inputLcs || !inputSubstitution) return;

      this.currentInputs = {
        forexIntervention: parseInt(inputForex.value, 10) || 0,
        interestRateHike: parseInt(inputRate.value, 10) || 0,
        lcsExpansion: parseInt(inputLcs.value, 10) || 0,
        importSubstitution: inputSubstitution.checked
      };

      if (valForex) valForex.textContent = `$${this.currentInputs.forexIntervention} Miliar`;
      if (valRate) valRate.textContent = `${this.currentInputs.interestRateHike} bps`;
      if (valLcs) valLcs.textContent = `${this.currentInputs.lcsExpansion}%`;
      
      if (valSubstitution) {
        if (this.currentInputs.importSubstitution) {
          valSubstitution.textContent = 'AKTIF';
          valSubstitution.className = 'toggle-status-text active';
        } else {
          valSubstitution.textContent = 'NONAKTIF';
          valSubstitution.className = 'toggle-status-text inactive';
        }
      }

      const results = calculateMacroEconomy(this.currentInputs);
      this.updateDashboard(results);
    };

    inputForex?.addEventListener('input', handleUpdate);
    inputRate?.addEventListener('input', handleUpdate);
    inputLcs?.addEventListener('input', handleUpdate);
    inputSubstitution?.addEventListener('change', handleUpdate);

    resetBtn?.addEventListener('click', () => {
      if (inputForex) inputForex.value = '0';
      if (inputRate) inputRate.value = '0';
      if (inputLcs) inputLcs.value = '0';
      if (inputSubstitution) inputSubstitution.checked = false;
      handleUpdate();
    });
  }

  /**
   * Updates real-time telemetry readouts and gauges based on calculated macro outcomes.
   */
  private updateDashboard(out: SimulatorOutputs): void {
    // Health Badge
    const badge = document.getElementById('s7-status-badge');
    const label = document.getElementById('s7-status-label');
    const beacon = document.getElementById('s7-status-beacon');
    const consequenceText = document.getElementById('s7-consequence-text');

    if (badge && label && beacon) {
      label.textContent = out.statusLabel;
      badge.style.borderColor = out.statusColor;
      badge.style.color = out.statusColor;
      beacon.style.backgroundColor = out.statusColor;
      beacon.style.boxShadow = `0 0 8px ${out.statusColor}`;
    }

    if (consequenceText) {
      consequenceText.textContent = out.summaryWarning;
    }

    // 1. Spot Rate (USD/IDR)
    const outSpot = document.getElementById('out-spot');
    const tagSpot = document.getElementById('tag-spot');
    const barSpot = document.getElementById('bar-spot');
    const subSpot = document.getElementById('sub-spot');

    if (outSpot && tagSpot && barSpot && subSpot) {
      outSpot.textContent = `Rp ${out.spotRate.toLocaleString('id-ID')}`;
      const pct = Math.max(10, Math.min(100, ((out.spotRate - 14500) / 3000) * 100));
      barSpot.style.width = `${pct}%`;

      if (out.spotRate <= 15500) {
        tagSpot.className = 't-tag safe';
        tagSpot.textContent = 'STABIL';
        barSpot.style.background = 'var(--accent-emerald)';
        subSpot.textContent = 'Apresiasi Menuju Keseimbangan';
      } else if (out.spotRate <= 16500) {
        tagSpot.className = 't-tag warning';
        tagSpot.textContent = 'MODERAT';
        barSpot.style.background = 'var(--accent-gold)';
        subSpot.textContent = 'Volatilitas Mereda';
      } else {
        tagSpot.className = 't-tag danger';
        tagSpot.textContent = 'DEPRESIASI';
        barSpot.style.background = 'var(--accent-crimson)';
        subSpot.textContent = 'Tekanan Devaluasi Spekulatif';
      }
    }

    // 2. Inflation Rate (%)
    const outInflation = document.getElementById('out-inflation');
    const tagInflation = document.getElementById('tag-inflation');
    const barInflation = document.getElementById('bar-inflation');

    if (outInflation && tagInflation && barInflation) {
      outInflation.textContent = `${out.inflation.toFixed(2)}%`;
      const pct = Math.max(10, Math.min(100, (out.inflation / 10) * 100));
      barInflation.style.width = `${pct}%`;

      if (out.inflation <= 4.0) {
        tagInflation.className = 't-tag safe';
        tagInflation.textContent = 'TERKENDALI';
        barInflation.style.background = 'var(--accent-emerald)';
      } else if (out.inflation <= 6.0) {
        tagInflation.className = 't-tag warning';
        tagInflation.textContent = 'WASPADA';
        barInflation.style.background = 'var(--accent-gold)';
      } else {
        tagInflation.className = 't-tag danger';
        tagInflation.textContent = 'PANAS';
        barInflation.style.background = 'var(--accent-crimson)';
      }
    }

    // 3. GDP Growth Rate (%)
    const outGdp = document.getElementById('out-gdp');
    const tagGdp = document.getElementById('tag-gdp');
    const barGdp = document.getElementById('bar-gdp');
    const subGdp = document.getElementById('sub-gdp');

    if (outGdp && tagGdp && barGdp && subGdp) {
      outGdp.textContent = `${out.gdpGrowth.toFixed(2)}%`;
      const pct = Math.max(10, Math.min(100, (out.gdpGrowth / 6.0) * 100));
      barGdp.style.width = `${pct}%`;

      if (out.gdpGrowth >= 4.5) {
        tagGdp.className = 't-tag safe';
        tagGdp.textContent = 'EKSPANSI';
        barGdp.style.background = 'var(--accent-emerald)';
        subGdp.textContent = 'Pertumbuhan Sehat';
      } else if (out.gdpGrowth >= 3.0) {
        tagGdp.className = 't-tag warning';
        tagGdp.textContent = 'MELAMBAT';
        barGdp.style.background = 'var(--accent-gold)';
        subGdp.textContent = 'Efek Pengetatan Moneter';
      } else {
        tagGdp.className = 't-tag danger';
        tagGdp.textContent = 'RISIKO RESESI';
        barGdp.style.background = 'var(--accent-crimson)';
        subGdp.textContent = 'Credit Crunch Memukul Sektor Riil';
      }
    }

    // 4. Forex Reserves ($B)
    const outReserves = document.getElementById('out-reserves');
    const tagReserves = document.getElementById('tag-reserves');
    const barReserves = document.getElementById('bar-reserves');
    const subReserves = document.getElementById('sub-reserves');

    if (outReserves && tagReserves && barReserves && subReserves) {
      outReserves.textContent = `$${out.forexReserves.toFixed(1)} B`;
      const pct = Math.max(10, Math.min(100, (out.forexReserves / 135) * 100));
      barReserves.style.width = `${pct}%`;
      subReserves.textContent = `Ketahanan: ${out.importCoverMonths} Bulan Impor`;

      if (out.importCoverMonths >= 6.5) {
        tagReserves.className = 't-tag safe';
        tagReserves.textContent = 'CUKUP';
        barReserves.style.background = 'var(--accent-emerald)';
      } else if (out.importCoverMonths >= 5.5) {
        tagReserves.className = 't-tag warning';
        tagReserves.textContent = 'TERGERUS';
        barReserves.style.background = 'var(--accent-gold)';
      } else {
        tagReserves.className = 't-tag danger';
        tagReserves.textContent = 'BAILOUT RISK';
        barReserves.style.background = 'var(--accent-crimson)';
      }
    }
  }

  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}
