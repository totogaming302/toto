import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createIcons, Globe, TrendingUp, TrendingDown, AlertTriangle, Cpu, DollarSign, Activity } from 'lucide';
import { GlobalBackground3D } from './components/GlobalBackground3D.ts';
import { Section1Erdogan } from './components/Section1Erdogan.ts';
import { Section2CostBlade } from './components/Section2CostBlade.ts';
import { Section3ImpactGrid } from './components/Section3ImpactGrid.ts';
import { Section4JCurve } from './components/Section4JCurve.ts';
import { Section5SupplyChain } from './components/Section5SupplyChain.ts';
import { Section6CauseTree } from './components/Section6CauseTree.ts';
import { Section7Simulator } from './components/Section7Simulator.ts';
import { Section8Closing } from './components/Section8Closing.ts';
import { BeatNavigator } from './components/BeatNavigator.ts';
import { HERO_COPY } from '../data/editorialCopy.ts';
import { SoundEngine } from './audio/SoundEngine.ts';
import { isSluggishDevice } from './utils/math.ts';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class WebDocumentaryApp {
  private lenis!: Lenis;
  public soundEngine!: SoundEngine;
  public background3D!: GlobalBackground3D;
  public section1!: Section1Erdogan;
  public section2!: Section2CostBlade;
  public section3!: Section3ImpactGrid;
  public section4!: Section4JCurve;
  public section5!: Section5SupplyChain;
  public section6!: Section6CauseTree;
  public section7!: Section7Simulator;
  public section8!: Section8Closing;
  public beatNavigator!: BeatNavigator;
  private progressBar: HTMLElement | null = null;

  constructor() {
    this.initSoundEngine();
    this.initFullscreenController();
    this.hydrateHeroContent();
    this.initLenis();
    this.initIcons();
    this.initGlobal3D();
    this.initSections();
    this.initTelemetryTracker();
    this.initEditorialQuestionAnimations();
    this.initCursorSpotlight();
    this.initCardTiltEffect();
    this.bindInteractions();
    this.bindResizeHandler();
    ScrollTrigger.refresh();
    this.initBeatNavigator();
  }

  /**
   * Initializes the bottom-right HUD Beat Navigator.
   */
  private initBeatNavigator(): void {
    try {
      this.beatNavigator = new BeatNavigator(this.lenis);
    } catch (err) {
      console.error('Failed to initialize BeatNavigator:', err);
    }
  }

  /**
   * Hydrates the Hero stage with immutable copy assets
   */
  private hydrateHeroContent(): void {
    const titleEl = document.getElementById('hero-title');
    const subtitleEl = document.getElementById('hero-subtitle');
    const taglineEl = document.getElementById('hero-tagline');
    const scrollLabelEl = document.getElementById('hero-scroll-label');
    const watermarkEl = document.getElementById('hud-watermark-text');

    if (titleEl) titleEl.textContent = HERO_COPY.title;
    if (subtitleEl) subtitleEl.textContent = HERO_COPY.subtitle;
    if (taglineEl) taglineEl.textContent = HERO_COPY.tagline;
    if (scrollLabelEl) scrollLabelEl.textContent = HERO_COPY.scrollPrompt;
    if (watermarkEl) watermarkEl.textContent = HERO_COPY.hudBadge;
  }

  /**
   * Initializes the procedural Web Audio sound engine and binds global audio controls.
   */
  private initSoundEngine(): void {
    this.soundEngine = SoundEngine.getInstance();

    // Auto-unlock audio context on first user gesture
    const unlockGesture = () => {
      this.soundEngine.unlockAudio();
      window.removeEventListener('pointerdown', unlockGesture);
      window.removeEventListener('keydown', unlockGesture);
      window.removeEventListener('wheel', unlockGesture);
      window.removeEventListener('touchstart', unlockGesture);
    };

    window.addEventListener('pointerdown', unlockGesture, { passive: true });
    window.addEventListener('keydown', unlockGesture, { passive: true });
    window.addEventListener('wheel', unlockGesture, { passive: true });
    window.addEventListener('touchstart', unlockGesture, { passive: true });

    // HUD Audio Toggle button
    const audioBtn = document.getElementById('hud-audio-toggle');
    const audioLabel = document.getElementById('hud-audio-label');

    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMuted = this.soundEngine.toggleMute();
        if (isMuted) {
          audioBtn.classList.add('muted');
          if (audioLabel) audioLabel.textContent = 'AUDIO: OFF';
        } else {
          audioBtn.classList.remove('muted');
          if (audioLabel) audioLabel.textContent = 'AUDIO: ON';
          this.soundEngine.playBeatClick();
        }
      });
    }

    this.soundEngine.onMuteChange((muted) => {
      if (audioBtn) {
        if (muted) {
          audioBtn.classList.add('muted');
          if (audioLabel) audioLabel.textContent = 'AUDIO: OFF';
        } else {
          audioBtn.classList.remove('muted');
          if (audioLabel) audioLabel.textContent = 'AUDIO: ON';
        }
      }
    });
  }

  /**
   * Dedicated Fullscreen Controller for Android Smartboards & Touch Displays.
   * Enables 1-tap full-screen toggling without requiring an F11 physical key.
   */
  private initFullscreenController(): void {
    const fsToggleBtn = document.getElementById('hud-fullscreen-toggle');
    const fsLabel = document.getElementById('hud-fullscreen-label');
    const fsExpandIcon = fsToggleBtn?.querySelector('.fs-icon-expand') as HTMLElement | null;
    const fsCompressIcon = fsToggleBtn?.querySelector('.fs-icon-compress') as HTMLElement | null;

    const isFullscreenActive = (): boolean => {
      const d = document as any;
      return !!(d.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement || d.msFullscreenElement);
    };

    const updateUI = () => {
      const active = isFullscreenActive();
      const navFsBtn = document.getElementById('hud-nav-fs');
      const navExpand = navFsBtn?.querySelector('.fs-icon-expand') as HTMLElement | null;
      const navCompress = navFsBtn?.querySelector('.fs-icon-compress') as HTMLElement | null;

      if (active) {
        fsToggleBtn?.classList.add('is-fullscreen');
        if (fsLabel) fsLabel.textContent = 'KELUAR FS';
        if (fsExpandIcon) fsExpandIcon.style.display = 'none';
        if (fsCompressIcon) fsCompressIcon.style.display = 'inline-block';

        navFsBtn?.classList.add('is-fullscreen');
        if (navExpand) navExpand.style.display = 'none';
        if (navCompress) navCompress.style.display = 'inline-block';
      } else {
        fsToggleBtn?.classList.remove('is-fullscreen');
        if (fsLabel) fsLabel.textContent = 'FULLSCREEN';
        if (fsExpandIcon) fsExpandIcon.style.display = 'inline-block';
        if (fsCompressIcon) fsCompressIcon.style.display = 'none';

        navFsBtn?.classList.remove('is-fullscreen');
        if (navExpand) navExpand.style.display = 'inline-block';
        if (navCompress) navCompress.style.display = 'none';
      }
    };

    const triggerToggle = (e?: Event) => {
      if (e) e.stopPropagation();
      this.soundEngine?.playBeatClick();

      const doc = document as any;
      const docEl = document.documentElement as any;

      if (!isFullscreenActive()) {
        if (docEl.requestFullscreen) {
          docEl.requestFullscreen().catch((err: any) => console.warn('Fullscreen request error:', err));
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
          docEl.mozRequestFullScreen();
        } else if (docEl.msRequestFullscreen) {
          docEl.msRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          doc.exitFullscreen().catch((err: any) => console.warn('Exit fullscreen error:', err));
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      }
    };

    fsToggleBtn?.addEventListener('click', triggerToggle);

    // Support bottom-right capsule button via event delegation
    document.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('#hud-nav-fs');
      if (target) {
        triggerToggle(e);
      }
    });

    // Synchronize UI on browser or smartboard system fullscreen changes
    document.addEventListener('fullscreenchange', updateUI);
    document.addEventListener('webkitfullscreenchange', updateUI);
    document.addEventListener('mozfullscreenchange', updateUI);
    document.addEventListener('MSFullscreenChange', updateUI);
  }

  /**
   * Initializes Lenis smooth scrolling and couples it with GSAP's RAF tick loop.
   */
  private initLenis(): void {
    const isLowPerf = isSluggishDevice();

    this.lenis = new Lenis({
      duration: isLowPerf ? 1.0 : 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.0,
      wheelMultiplier: 0.95
    });

    // Synchronize Lenis scroll event with GSAP ScrollTrigger and sound engine
    this.lenis.on('scroll', (e: { velocity: number }) => {
      ScrollTrigger.update();
      this.updateTelemetryProgress();

      // Tactile debounced scroll tick on active motion
      if (Math.abs(e.velocity) > 0.45) {
        this.soundEngine.playScrollTick(Math.abs(e.velocity));
      }

      // Modulate ambient tension drone based on vertical travel
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      this.soundEngine.setAmbientTension(progress);
    });

    // Drive Lenis through GSAP ticker for 60fps lockstep animation
    gsap.ticker.add((time: number) => {
      this.lenis.raf(time * 1000);
    });

    // Smooth delta clamping: Prevents violent animation jumps if low-end CPU drops a frame
    gsap.ticker.lagSmoothing(500, 33);
  }

  /**
   * Initializes Lucide icon set across current document
   */
  private initIcons(): void {
    createIcons({
      icons: {
        Globe,
        TrendingUp,
        TrendingDown,
        AlertTriangle,
        Cpu,
        DollarSign,
        Activity
      }
    });
  }

  /**
   * Instantiates persistent Global 3D background with InstancedMesh coins, cash & particles
   */
  private initGlobal3D(): void {
    try {
      this.background3D = new GlobalBackground3D({
        canvasId: 'global-canvas'
      });
    } catch (err) {
      console.error('Failed to initialize GlobalBackground3D:', err);
    }
  }

  /**
   * Global 2.5px Telemetry Progress Bar Tracker
   */
  private initTelemetryTracker(): void {
    this.progressBar = document.getElementById('telemetry-progress');
  }

  private updateTelemetryProgress(): void {
    if (!this.progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    this.progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  /**
   * Initializes all 7 pinned interactive scrollytelling components
   */
  private initSections(): void {
    try {
      this.section1 = new Section1Erdogan('section-1');
      this.section2 = new Section2CostBlade('section-2');
      this.section3 = new Section3ImpactGrid('section-3');
      this.section4 = new Section4JCurve('section-4');
      this.section5 = new Section5SupplyChain('section-5');
      this.section6 = new Section6CauseTree('section-6');
      this.section7 = new Section7Simulator('section-7');
      this.section8 = new Section8Closing('section-8');
    } catch (err) {
      console.error('Failed to initialize editorial sections:', err);
    }
  }

  /**
   * Sets up ScrollTrigger entrances for any generic question headlines (if any remain)
   */
  private initEditorialQuestionAnimations(): void {
    const questionSections = document.querySelectorAll<HTMLElement>(
      '.scrolly-section[data-section]:not(#section-1):not(#section-2):not(#section-3):not(#section-4):not(#section-5):not(#section-6):not(#section-7):not(#section-8)'
    );

    questionSections.forEach((section) => {
      const headline = section.querySelector<HTMLElement>('.question-headline');
      const narrativeCard = section.querySelector<HTMLElement>('.narrative-card');
      const visualStage = section.querySelector<HTMLElement>('.visual-stage');

      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0.25, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headline,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.8
            }
          }
        );
      }

      if (narrativeCard) {
        gsap.fromTo(
          narrativeCard,
          { borderColor: 'rgba(255, 255, 255, 0.05)' },
          {
            borderColor: 'rgba(245, 158, 11, 0.3)',
            duration: 1,
            scrollTrigger: {
              trigger: narrativeCard,
              start: 'top 75%',
              end: 'top 40%',
              scrub: true
            }
          }
        );
      }

      if (visualStage) {
        gsap.fromTo(
          visualStage,
          { opacity: 0.4, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: visualStage,
              start: 'top 80%',
              end: 'top 45%',
              scrub: true
            }
          }
        );
      }
    });
  }

  /**
   * Click interactions (e.g. hero scroll prompt smoothly travels to Section 1)
   */
  private bindInteractions(): void {
    const scrollPrompt = document.getElementById('hero-scroll-prompt');
    if (scrollPrompt) {
      scrollPrompt.addEventListener('click', () => {
        this.lenis.scrollTo('#section-1', {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      });
    }
  }

  /**
   * Smooth ambient luminous cursor spotlight that projects subtle illumination onto borders and glass cards.
   */
  private initCursorSpotlight(): void {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0 || isSluggishDevice()) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'ambient-cursor-spotlight';
    document.body.appendChild(spotlight);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    gsap.ticker.add(() => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    });
  }

  /**
   * Subtle 3D card parallax perspective tilt on active cards and visual stages for desktop.
   */
  private initCardTiltEffect(): void {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0 || isSluggishDevice()) return;

    const tiltTargets = document.querySelectorAll<HTMLElement>('.narrative-card, .visual-stage, .telemetry-box');
    tiltTargets.forEach((card) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        card.style.transition = 'transform 0.5s ease-out';
        setTimeout(() => {
          card.style.transition = '';
        }, 500);
      });
    });
  }

  /**
   * Resilient debounced resize & orientation listener for smartboards, classroom projectors, and window scaling.
   */
  private bindResizeHandler(): void {
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        this.beatNavigator?.recalculatePositions();
      }, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener('change', handleResize);
    }
  }
}

// Bootstrap once DOM content is ready
window.addEventListener('DOMContentLoaded', () => {
  new WebDocumentaryApp();
});
