import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class Section8Closing {
  private container: HTMLElement;
  private timeline!: gsap.core.Timeline;

  constructor(containerId: string = 'section-8') {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Section 8 container #${containerId} not found`);
    }
    this.container = el;
    this.renderSectionStructure();
    this.initScrollytellingTimeline();
  }

  /**
   * Renders the Epilogue Q&A and Final Closing markup.
   */
  private renderSectionStructure(): void {
    this.container.innerHTML = `
      <div class="s8-pinned-viewport" id="s8-pinned-viewport">
        <!-- Ambient Vignette & Calm Gradient -->
        <div class="s8-ambient-backdrop"></div>

        <!-- Phase 1: The Discussion Floor (Q&A) -->
        <div class="s8-phase-qa" id="s8-phase-qa">
          <div class="section-tag s8-kicker">// SESI TANYA JAWAB & DISKUSI</div>
          <h1 class="s8-qa-headline">Any Questions?</h1>
          <div class="scroll-hint-micro s8-scroll-hint">
            <span class="pulse-line"></span>
            <span>GULIR UNTUK PENUTUP DOKUMENTER</span>
          </div>
        </div>

        <!-- Phase 2: Formal Sign-off (Closing) -->
        <div class="s8-phase-closing" id="s8-phase-closing">
          <div class="s8-closing-wrapper">
            <span class="s8-closing-badge">DOKUMENTER SELESAI</span>
            <h2 class="s8-closing-headline">Sekian dari kami, Terima kasih.</h2>
            <div class="s8-divider"></div>
            <p class="s8-metadata-title">Mata Uang Melemah, Ekspor Meningkat? • Kelompok 2 Ekonomi</p>
            <div class="s8-status-tag">
              <span class="hud-pulse-dot"></span>
              <span>[STATUS: DOKUMENTASI SELESAI // SESI PRESENTASI DITUTUP]</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Initializes 2-phase pinned scrollytelling timeline:
   * Phase 1: "Any Questions?" illuminates the discussion floor.
   * Phase 2: "Sekian dari kami, Terima kasih." reveals the formal documentary sign-off.
   */
  private initScrollytellingTimeline(): void {
    const phaseQa = document.getElementById('s8-phase-qa');
    const phaseClosing = document.getElementById('s8-phase-closing');

    if (!phaseQa || !phaseClosing) {
      return;
    }

    // Set initial states
    gsap.set(phaseQa, { opacity: 1, y: 0, scale: 1 });
    gsap.set(phaseClosing, { opacity: 0, y: 40, scale: 0.95, pointerEvents: 'none' });

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.container,
        start: 'top top',
        end: '+=240%',
        pin: true,
        pinSpacing: true,
        scrub: 1.4,
        anticipatePin: 1,
        onEnter: () => {
          (window as any).__setMoodColor?.('#080C14');
        },
        onEnterBack: () => {
          (window as any).__setMoodColor?.('#080C14');
        }
      }
    });

    // Phase 1 -> Phase 2 Transition on scroll scrub
    this.timeline
      // Q&A holds steady initially, then drifts up and fades deliberately
      .to(phaseQa, {
        opacity: 0,
        y: -50,
        scale: 1.04,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          phaseQa.style.pointerEvents = 'none';
        }
      }, 1.2)

      // Formal Closing fades and scales in gracefully and slowly
      .to(phaseClosing, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        onStart: () => {
          phaseClosing.style.pointerEvents = 'auto';
        }
      }, 2.0)

      // Settling rest window so the closing card sits comfortably at the final scroll limit
      .to({}, { duration: 1.5 }, 3.5);
  }

  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}
