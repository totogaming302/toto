/**
 * Procedural Web Audio API Sound Engine
 * Provides zero-dependency, low-latency synthesized audio feedback for:
 * - Micro-scroll haptic ticks
 * - Narrative beat change chimes
 * - Chapter transition whooshes
 * - Slider potentiometer ticks & toggle clicks
 * - Crisis Room panic sirens & emergency alert warbles
 */

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isUnlocked: boolean = false;
  private lastScrollTickTime: number = 0;

  // Crisis Siren active nodes
  private sirenOsc1: OscillatorNode | null = null;
  private sirenOsc2: OscillatorNode | null = null;
  private sirenLFO: OscillatorNode | null = null;
  private sirenGain: GainNode | null = null;
  private isSirenPlaying: boolean = false;

  constructor() {
    this.setupUnlockListeners();
  }

  /**
   * Lazy initializes the AudioContext upon user gesture.
   */
  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.38, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Binds one-time user gesture listeners to unlock browser audio restrictions.
   */
  private setupUnlockListeners(): void {
    const unlock = () => {
      if (this.isUnlocked) return;
      const ctx = this.getContext();
      if (ctx) {
        if (ctx.state === 'suspended') {
          ctx.resume().then(() => {
            this.isUnlocked = true;
          }).catch(() => {});
        } else {
          this.isUnlocked = true;
        }
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('click', unlock, { passive: true, once: true });
    window.addEventListener('keydown', unlock, { passive: true, once: true });
    window.addEventListener('touchstart', unlock, { passive: true, once: true });
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.38, this.ctx.currentTime);
    }
    if (this.isMuted && this.isSirenPlaying) {
      this.stopCrisisSiren();
    }
    return this.isMuted;
  }

  /**
   * Ultra-subtle, haptic mechanical micro-click while scrolling.
   * Throttled to maximum once every 90ms to emulate precision hardware gears.
   */
  public playScrollTick(): void {
    if (this.isMuted) return;
    const now = performance.now();
    if (now - this.lastScrollTickTime < 90) return;
    this.lastScrollTickTime = now;

    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running' || !this.masterGain) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.018);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.018);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // Ignore audio interruptions
    }
  }

  /**
   * Resonant harmonic electronic chime when narrative beats change or are clicked.
   */
  public playBeatChime(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running' || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      // Dual harmonic frequencies: C5 (523Hz) and G5 (784Hz) with soft bloom
      const freqs = [523.25, 783.99];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + 0.35);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, now);

        const initialVol = idx === 0 ? 0.12 : 0.08;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(initialVol, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 0.4);
      });
    } catch {}
  }

  /**
   * Deep cinematic sub-frequency whoosh during section travel.
   */
  public playTransitionWhoosh(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running' || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, now);
      filter.frequency.linearRampToValueAtTime(80, now + 0.5);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.55);
    } catch {}
  }

  /**
   * Tactile click when adjusting Crisis Room policy sliders.
   */
  public playSliderTick(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running' || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(980, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.025);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }

  /**
   * Switch toggle click sound (up-chirp when enabled, down-chirp when disabled).
   */
  public playToggleSwitch(active: boolean): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running' || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      if (active) {
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(920, now + 0.06);
      } else {
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(360, now + 0.06);
      }

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  }

  /**
   * Crisis Room Emergency Alarm Siren (Panic Mode)
   * Alternating warble dual-frequency klaxon simulating a high-security emergency room.
   */
  public startCrisisSiren(): void {
    if (this.isMuted || this.isSirenPlaying) return;
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running' || !this.masterGain) return;

    try {
      this.isSirenPlaying = true;
      const now = ctx.currentTime;

      // Master siren gain with soft fade-in
      this.sirenGain = ctx.createGain();
      this.sirenGain.gain.setValueAtTime(0.0001, now);
      this.sirenGain.gain.linearRampToValueAtTime(0.12, now + 0.3);

      // Lowpass filter to give realistic acoustics
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.Q.setValueAtTime(3.5, now);

      // Dual oscillating carrier voices (Sawtooth for urgency)
      this.sirenOsc1 = ctx.createOscillator();
      this.sirenOsc1.type = 'sawtooth';
      this.sirenOsc1.frequency.setValueAtTime(740, now);

      this.sirenOsc2 = ctx.createOscillator();
      this.sirenOsc2.type = 'sine';
      this.sirenOsc2.frequency.setValueAtTime(920, now);

      // LFO for periodic pitch warble (2.2 Hz)
      this.sirenLFO = ctx.createOscillator();
      this.sirenLFO.type = 'sine';
      this.sirenLFO.frequency.setValueAtTime(2.2, now);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(180, now);

      this.sirenLFO.connect(lfoGain);
      lfoGain.connect(this.sirenOsc1.frequency);
      lfoGain.connect(this.sirenOsc2.frequency);

      this.sirenOsc1.connect(filter);
      this.sirenOsc2.connect(filter);
      filter.connect(this.sirenGain);
      this.sirenGain.connect(this.masterGain);

      this.sirenOsc1.start(now);
      this.sirenOsc2.start(now);
      this.sirenLFO.start(now);
    } catch {
      this.isSirenPlaying = false;
    }
  }

  /**
   * Silences the Crisis Room Emergency Siren smoothly.
   */
  public stopCrisisSiren(): void {
    if (!this.isSirenPlaying || !this.ctx || !this.sirenGain) {
      this.isSirenPlaying = false;
      return;
    }

    try {
      const now = this.ctx.currentTime;
      this.sirenGain.gain.cancelScheduledValues(now);
      this.sirenGain.gain.linearRampToValueAtTime(0.0001, now + 0.25);

      setTimeout(() => {
        try {
          this.sirenOsc1?.stop();
          this.sirenOsc2?.stop();
          this.sirenLFO?.stop();
          this.sirenOsc1?.disconnect();
          this.sirenOsc2?.disconnect();
          this.sirenLFO?.disconnect();
          this.sirenGain?.disconnect();
        } catch {}
        this.sirenOsc1 = null;
        this.sirenOsc2 = null;
        this.sirenLFO = null;
        this.sirenGain = null;
        this.isSirenPlaying = false;
      }, 260);
    } catch {
      this.isSirenPlaying = false;
    }
  }
}

// Global Singleton Instance
export const SoundManager = new SoundEngine();
