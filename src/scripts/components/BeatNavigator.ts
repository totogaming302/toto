import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SoundEngine } from '../audio/SoundEngine.ts';

export interface BeatTarget {
  id: string;
  sectionId: string;
  label: string;
  shortLabel: string;
  plateauProgress: number; // 0.0 to 1.0 within section ScrollTrigger
  calculatedScrollY: number;
}

export class BeatNavigator {
  private lenis: Lenis;
  private container: HTMLElement | null = null;
  private prevBtn: HTMLButtonElement | null = null;
  private nextBtn: HTMLButtonElement | null = null;
  private counterText: HTMLElement | null = null;
  private tooltipEl: HTMLElement | null = null;
  private currentIndex: number = 0;
  private isTraveling: boolean = false;

  private beats: BeatTarget[] = [
    // 01: Hero
    { id: 'hero', sectionId: 'hero', label: 'HERO // COVER DOKUMENTER', shortLabel: 'COVER INTRO', plateauProgress: 0.0, calculatedScrollY: 0 },
    
    // 02-05: Section 1 (Mengapa Pelemahan Mendorong Ekspor?)
    { id: 's1-q', sectionId: 'section-1', label: '01 // PERTANYAAN 01', shortLabel: 'QUESTION 01', plateauProgress: 0.0, calculatedScrollY: 0 },
    { id: 's1-b1', sectionId: 'section-1', label: '01 // DISKON VALAS GLOBAL', shortLabel: 'DISKON VALAS', plateauProgress: 0.28, calculatedScrollY: 0 },
    { id: 's1-b2', sectionId: 'section-1', label: '01 // DAYA BELI VALUTA ASING', shortLabel: 'DAYA BELI GLOBAL', plateauProgress: 0.58, calculatedScrollY: 0 },
    { id: 's1-b3', sectionId: 'section-1', label: '01 // DUA STRATEGI EKSPORTIR', shortLabel: 'STRATEGI EKSPOR', plateauProgress: 0.92, calculatedScrollY: 0 },

    // 06-08: Section 2 (Kerugian Bahan Baku Impor)
    { id: 's2-q', sectionId: 'section-2', label: '02 // PERTANYAAN 02', shortLabel: 'QUESTION 02', plateauProgress: 0.0, calculatedScrollY: 0 },
    { id: 's2-b1', sectionId: 'section-2', label: '02 // TOMBAK BERMATA DUA', shortLabel: 'TOMBAK VALAS', plateauProgress: 0.43, calculatedScrollY: 0 },
    { id: 's2-b2', sectionId: 'section-2', label: '02 // ANATOMI MARGIN SQUEEZE', shortLabel: 'MARGIN SQUEEZE', plateauProgress: 0.88, calculatedScrollY: 0 },

    // 09-13: Section 3 (Peta Dampak 4 Pemangku Kepentingan)
    { id: 's3-q', sectionId: 'section-3', label: '03 // PERTANYAAN 03', shortLabel: 'QUESTION 03', plateauProgress: 0.0, calculatedScrollY: 0 },
    { id: 's3-b1', sectionId: 'section-3', label: '03 // EKSPORTIR (FREEPORT)', shortLabel: 'EKSPORTIR UNTUNG', plateauProgress: 0.20, calculatedScrollY: 0 },
    { id: 's3-b2', sectionId: 'section-3', label: '03 // IMPORTIR (SAMSUNG)', shortLabel: 'IMPORTIR BUNTUNG', plateauProgress: 0.45, calculatedScrollY: 0 },
    { id: 's3-b3', sectionId: 'section-3', label: '03 // KONSUMEN (ACCEPT FATE)', shortLabel: 'KONSUMEN TERHIMPIT', plateauProgress: 0.69, calculatedScrollY: 0 },
    { id: 's3-b4', sectionId: 'section-3', label: '03 // PRODUSEN DOMESTIK', shortLabel: 'PRODUSEN LOKAL', plateauProgress: 0.95, calculatedScrollY: 0 },

    // 14-17: Section 4 (Kurva-J & 3 Syarat Elastisitas)
    { id: 's4-q', sectionId: 'section-4', label: '04 // PERTANYAAN 04', shortLabel: 'QUESTION 04', plateauProgress: 0.0, calculatedScrollY: 0 },
    { id: 's4-b1', sectionId: 'section-4', label: '04 // THE DIP (ANOMALI)', shortLabel: 'KURVA-J THE DIP', plateauProgress: 0.33, calculatedScrollY: 0 },
    { id: 's4-b2', sectionId: 'section-4', label: '04 // LAG KONTRAK KAKU', shortLabel: 'LAG KONTRAK', plateauProgress: 0.60, calculatedScrollY: 0 },
    { id: 's4-b3', sectionId: 'section-4', label: '04 // SURPLUS PEAK (BOOM)', shortLabel: 'SURPLUS BOOM', plateauProgress: 0.93, calculatedScrollY: 0 },

    // 18-21: Section 5 (Jalur Penularan Inflasi)
    { id: 's5-q', sectionId: 'section-5', label: '05 // PERTANYAAN 05', shortLabel: 'QUESTION 05', plateauProgress: 0.0, calculatedScrollY: 0 },
    { id: 's5-b1', sectionId: 'section-5', label: '05 // BARANG KONSUMSI IMPOR', shortLabel: 'KONSUMSI IMPOR', plateauProgress: 0.31, calculatedScrollY: 0 },
    { id: 's5-b2', sectionId: 'section-5', label: '05 // BIAYA INPUT MANUFAKTUR', shortLabel: 'BIAYA MANUFAKTUR', plateauProgress: 0.60, calculatedScrollY: 0 },
    { id: 's5-b3', sectionId: 'section-5', label: '05 // LOGISTIK & MINYAK ICP', shortLabel: 'ENERGI & LOGISTIK', plateauProgress: 0.93, calculatedScrollY: 0 },

    // 22-23: Section 6 (Diagram Sebab-Akibat)
    { id: 's6-q', sectionId: 'section-6', label: '06 // TANTANGAN ANALISIS', shortLabel: 'TANTANGAN 06', plateauProgress: 0.0, calculatedScrollY: 0 },
    { id: 's6-b1', sectionId: 'section-6', label: '06 // POHON SEBAB-AKIBAT', shortLabel: 'DIAGRAM CABANG', plateauProgress: 0.92, calculatedScrollY: 0 },

    // 24-26: Section 7 (Crisis Room Simulator)
    { id: 's7-q', sectionId: 'section-7', label: '07 // PERTANYAAN 07', shortLabel: 'QUESTION 07', plateauProgress: 0.0, calculatedScrollY: 0 },
    { id: 's7-b1', sectionId: 'section-7', label: '07 // CRISIS ROOM BRIEFING', shortLabel: 'CRISIS BRIEFING', plateauProgress: 0.38, calculatedScrollY: 0 },
    { id: 's7-b2', sectionId: 'section-7', label: '07 // SIMULATOR KEBIJAKAN', shortLabel: 'SIMULATOR TUAS', plateauProgress: 0.88, calculatedScrollY: 0 },

    // 27-28: Section 8 (Epilogue Q&A & Final Closing)
    { id: 's8-b1', sectionId: 'section-8', label: '08 // ANY QUESTIONS?', shortLabel: 'ANY QUESTIONS', plateauProgress: 0.0, calculatedScrollY: 0 },
    { id: 's8-b2', sectionId: 'section-8', label: '08 // PENUTUP DOKUMENTER', shortLabel: 'CLOSING DECK', plateauProgress: 0.84, calculatedScrollY: 0 }
  ];

  constructor(lenis: Lenis) {
    this.lenis = lenis;
    (window as any).__beatNavigator = this;
    (window as any).__navigateToBeat = (beatId: string) => this.navigateToBeatById(beatId);
    this.renderNavigatorDOM();
    this.bindDOMReferences();
    this.bindEvents();
    this.bindNarrativeBeatClicks();
    
    // Initial calculation after ScrollTrigger mounts
    setTimeout(() => {
      this.recalculatePositions();
      this.syncActiveBeatWithScroll(window.scrollY);
    }, 400);
  }

  /**
   * Injects the minimalist HUD navigator capsule into document body.
   */
  private renderNavigatorDOM(): void {
    const existing = document.getElementById('hud-beat-navigator');
    if (existing) existing.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'hud-beat-navigator';
    wrapper.className = 'hud-beat-navigator';
    wrapper.setAttribute('role', 'navigation');
    wrapper.setAttribute('aria-label', 'Navigasi Beat Dokumenter');

    wrapper.innerHTML = `
      <div class="hud-beat-tooltip" id="hud-beat-tooltip">${this.beats[0].label}</div>
      <div class="hud-nav-capsule">
        <button class="hud-nav-btn" id="hud-nav-prev" aria-label="Lompat ke Beat Sebelumnya" title="Beat Sebelumnya (Arrow Up / Page Up)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m18 15-6-6-6 6"/></svg>
        </button>
        <div class="hud-beat-counter" id="hud-beat-counter">
          <span class="hud-beat-dot"></span>
          <span id="hud-beat-text">BEAT 01 / ${this.beats.length.toString().padStart(2, '0')}</span>
        </div>
        <button class="hud-nav-btn" id="hud-nav-next" aria-label="Lompat ke Beat Berikutnya" title="Beat Berikutnya (Arrow Down / Page Down)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
    `;

    document.body.appendChild(wrapper);
  }

  /**
   * Caches DOM references.
   */
  private bindDOMReferences(): void {
    this.container = document.getElementById('hud-beat-navigator');
    this.prevBtn = document.getElementById('hud-nav-prev') as HTMLButtonElement | null;
    this.nextBtn = document.getElementById('hud-nav-next') as HTMLButtonElement | null;
    this.counterText = document.getElementById('hud-beat-text');
    this.tooltipEl = document.getElementById('hud-beat-tooltip');
  }

  /**
   * Recalculates exact scrollY target pixels for all 28 beats using ScrollTrigger positions.
   * Target Scroll = trigger.start + (plateauProgress * trigger.distance)
   */
  public recalculatePositions(): void {
    const allTriggers = ScrollTrigger.getAll();

    this.beats.forEach((beat) => {
      if (beat.sectionId === 'hero') {
        beat.calculatedScrollY = 0;
        return;
      }

      const trigger = allTriggers.find((t) => {
        return t.trigger && (t.trigger as HTMLElement).id === beat.sectionId;
      });

      if (trigger) {
        const distance = trigger.end - trigger.start;
        beat.calculatedScrollY = Math.round(trigger.start + (beat.plateauProgress * distance));
      } else {
        const el = document.getElementById(beat.sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          beat.calculatedScrollY = Math.round(rect.top + window.scrollY);
        }
      }
    });
  }

  /**
   * Navigates to a specific beat with cinematic easing.
   */
  public navigateToBeat(targetIndex: number): void {
    const clampedIndex = Math.max(0, Math.min(this.beats.length - 1, targetIndex));
    this.currentIndex = clampedIndex;

    const targetBeat = this.beats[clampedIndex];
    this.updateHUDDisplay(clampedIndex);

    SoundEngine.getInstance().playBeatClick();
    SoundEngine.getInstance().playBeatTransition();

    this.isTraveling = true;

    // Deliberate cinematic travel speed (2.4s with smooth cubic in-out deceleration)
    this.lenis.scrollTo(targetBeat.calculatedScrollY, {
      duration: 2.4,
      easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      onComplete: () => {
        this.isTraveling = false;
        this.syncActiveBeatWithScroll(window.scrollY);
      }
    });
  }

  /**
   * Navigates directly to a beat by its ID string (e.g. 's1-b1', 's3-b3', 's5-b2').
   * Recalculates fresh positions and smoothly scrolls to the target plateau.
   */
  public navigateToBeatById(beatId: string): void {
    this.recalculatePositions();
    const targetIndex = this.beats.findIndex((b) => b.id === beatId);
    if (targetIndex !== -1) {
      this.navigateToBeat(targetIndex);
    }
  }

  /**
   * Binds click handlers to all narrative beat items with [data-beat-id] or known IDs.
   * Clicking a blurred, scrolled-past, or upcoming narrative beat immediately scrolls to it.
   */
  public bindNarrativeBeatClicks(): void {
    // Delegated click on document for bulletproof responsiveness
    document.addEventListener('click', (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-beat-id]');
      if (target) {
        const beatId = target.getAttribute('data-beat-id');
        if (beatId) {
          e.preventDefault();
          SoundEngine.getInstance().playBeatClick();
          this.navigateToBeatById(beatId);
        }
      }
    });

    // Also support fallback mapping by DOM ID
    const idMap: Record<string, string> = {
      's1-beat-1': 's1-b1',
      's1-beat-2': 's1-b2',
      's1-beat-3': 's1-b3',
      's2-beat-1': 's2-b1',
      's2-beat-2': 's2-b2',
      's3-actor-1': 's3-b1',
      's3-actor-2': 's3-b2',
      's3-actor-3': 's3-b3',
      's3-actor-4': 's3-b4',
      's4-beat-1': 's4-b1',
      's4-beat-2': 's4-b2',
      's4-beat-3': 's4-b3',
      's5-pipe-1': 's5-b1',
      's5-pipe-2': 's5-b2',
      's5-pipe-3': 's5-b3'
    };

    Object.entries(idMap).forEach(([domId, beatId]) => {
      const el = document.getElementById(domId);
      if (el && !el.hasAttribute('data-beat-id')) {
        el.setAttribute('data-beat-id', beatId);
        el.setAttribute('title', 'Klik untuk menuju ke beat ini');
      }
    });
  }

  /**
   * Synchronizes active beat index based on user's manual scrolling.
   */
  private syncActiveBeatWithScroll(currentScrollY: number): void {
    if (this.isTraveling) return;

    // Find the beat with the closest calculated scrollY
    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < this.beats.length; i++) {
      const diff = Math.abs(this.beats[i].calculatedScrollY - currentScrollY);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    if (closestIndex !== this.currentIndex) {
      this.currentIndex = closestIndex;
      this.updateHUDDisplay(closestIndex);
      SoundEngine.getInstance().playBeatTransition();
    }
  }

  /**
   * Updates the HUD counter pill, tooltip text, and button disabled states.
   */
  private updateHUDDisplay(index: number): void {
    const beat = this.beats[index];
    if (!beat) return;

    const numStr = (index + 1).toString().padStart(2, '0');
    const totalStr = this.beats.length.toString().padStart(2, '0');

    if (this.counterText) {
      this.counterText.textContent = `BEAT ${numStr} / ${totalStr}`;
    }

    if (this.tooltipEl) {
      this.tooltipEl.textContent = beat.label;
    }

    if (this.prevBtn) {
      this.prevBtn.disabled = index === 0;
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = index === this.beats.length - 1;
    }
  }

  /**
   * Binds click, scroll, resize, and keyboard navigation events.
   */
  private bindEvents(): void {
    // Button clicks
    this.prevBtn?.addEventListener('click', () => {
      this.navigateToBeat(this.currentIndex - 1);
    });

    this.nextBtn?.addEventListener('click', () => {
      this.navigateToBeat(this.currentIndex + 1);
    });

    // Scroll listener for manual scroll synchronization
    window.addEventListener('scroll', () => {
      this.syncActiveBeatWithScroll(window.scrollY);
    }, { passive: true });

    // Window resize & ScrollTrigger refresh listener
    window.addEventListener('resize', () => {
      this.recalculatePositions();
    });

    ScrollTrigger.addEventListener('refresh', () => {
      this.recalculatePositions();
    });

    // Keyboard navigation (ArrowUp, ArrowDown, PageUp, PageDown)
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Don't intercept if user is interacting with an input/textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        this.navigateToBeat(this.currentIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.navigateToBeat(this.currentIndex - 1);
      }
    });
  }

  public destroy(): void {
    if (this.container) {
      this.container.remove();
    }
  }
}
