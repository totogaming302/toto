/**
 * Procedural Web Audio Sound Engine
 * Zero external audio files — 100% programmatic real-time synthesis.
 * Provides cinematic Hollywood / Bloomberg Terminal audio feedback.
 */

export class SoundEngine {
  private static instance: SoundEngine | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isAudioMuted: boolean = false;
  private isUnlocked: boolean = false;

  // Crisis alarm nodes
  private sirenOsc1: OscillatorNode | null = null;
  private sirenOsc2: OscillatorNode | null = null;
  private sirenLfo: OscillatorNode | null = null;
  private sirenGain: GainNode | null = null;
  private isSirenPlaying: boolean = false;

  // Ambient tension drone nodes
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private isDroneStarted: boolean = false;

  // Debounce timers
  private lastScrollTickTime: number = 0;
  private lastSliderTickTime: number = 0;

  // Listeners for mute state change
  private listeners: ((muted: boolean) => void)[] = [];

  private constructor() {
    // Lazy AudioContext creation on first user interaction
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      try {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn('Web Audio API not supported in this environment', e);
      }
    }
  }

  public static getInstance(): SoundEngine {
    if (!SoundEngine.instance) {
      SoundEngine.instance = new SoundEngine();
    }
    return SoundEngine.instance;
  }

  /**
   * Resumes AudioContext on user gesture (browser autoplay compliance)
   */
  public unlockAudio(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
        this.initAmbientDrone();
      }).catch((e) => console.warn('Audio resume error', e));
    } else if (this.ctx && this.ctx.state === 'running' && !this.isUnlocked) {
      this.isUnlocked = true;
      this.initAmbientDrone();
    }
  }

  public isMuted(): boolean {
    return this.isAudioMuted;
  }

  public toggleMute(): boolean {
    this.unlockAudio();
    this.isAudioMuted = !this.isAudioMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isAudioMuted ? 0 : 0.75;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    this.listeners.forEach((fn) => fn(this.isAudioMuted));
    return this.isAudioMuted;
  }

  public onMuteChange(listener: (muted: boolean) => void): void {
    this.listeners.push(listener);
  }

  // =========================================================================
  // SOUND PRESETS & SYNTHESIZERS
  // =========================================================================

  /**
   * 1. Cinematic Beat Transition / Sub-Drop Impact
   * Low pitch dive (65Hz -> 26Hz) + filtered resonant white noise air whoosh.
   */
  public playBeatTransition(): void {
    if (!this.ctx || this.isAudioMuted || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;

    // A. Sub-Bass Braam / Dive
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(65, t);
    subOsc.frequency.exponentialRampToValueAtTime(26, t + 0.65);

    subGain.gain.setValueAtTime(0.001, t);
    subGain.gain.linearRampToValueAtTime(0.5, t + 0.04);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain!);
    subOsc.start(t);
    subOsc.stop(t + 0.9);

    // B. Filtered Air Whoosh (Procedural White Noise)
    const bufferSize = this.ctx.sampleRate * 0.45;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, t);
    filter.frequency.exponentialRampToValueAtTime(1400, t + 0.2);
    filter.frequency.exponentialRampToValueAtTime(180, t + 0.45);
    filter.Q.setValueAtTime(3.5, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, t);
    noiseGain.gain.linearRampToValueAtTime(0.22, t + 0.15);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain!);
    whiteNoise.start(t);
  }

  /**
   * 2. Tactile Mechanical Glass Click
   * Used for card clicks, chevron navigation, toggle buttons.
   */
  public playBeatClick(): void {
    if (!this.ctx || this.isAudioMuted || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(450, t + 0.025);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, t);
    filter.Q.setValueAtTime(4.0, t);

    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.028);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  /**
   * 3. Subtle Velocity-Scaled Scroll Tick
   * Debounced to max 1 every 65ms for tactile micro-feedback.
   */
  public playScrollTick(velocity: number = 1): void {
    const now = performance.now();
    if (now - this.lastScrollTickTime < 65) return;
    this.lastScrollTickTime = now;

    if (!this.ctx || this.isAudioMuted || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 800 + Math.min(velocity * 0.4, 400);
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.012);

    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.018);
  }

  /**
   * 4. Radar / Sonar Sci-Fi Ping
   * For J-Curve coordinate tracking and Cause Tree nodes.
   */
  public playRadarPing(freq: number = 1050): void {
    if (!this.ctx || this.isAudioMuted || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.75, t + 0.28);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.32);
  }

  /**
   * 5. Analog Potentiometer Slider Click
   * Pitch dynamically ascends as slider value increases.
   */
  public playSliderStep(normalizedValue: number = 0.5): void {
    const now = performance.now();
    if (now - this.lastSliderTickTime < 45) return;
    this.lastSliderTickTime = now;

    if (!this.ctx || this.isAudioMuted || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const pitch = 220 + normalizedValue * 380;
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.6, t + 0.02);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  /**
   * 6. Emergency Crisis Room Panic Siren / Klaxon
   * Two-tone emergency siren alternating between 780Hz and 580Hz with LFO FM synthesis.
   */
  public playCrisisAlarm(): void {
    if (this.isSirenPlaying || !this.ctx || this.ctx.state !== 'running') return;
    this.isSirenPlaying = true;

    const t = this.ctx.currentTime;

    // Siren master gain
    this.sirenGain = this.ctx.createGain();
    this.sirenGain.gain.setValueAtTime(0.001, t);
    this.sirenGain.gain.linearRampToValueAtTime(this.isAudioMuted ? 0 : 0.28, t + 0.3);
    this.sirenGain.connect(this.masterGain!);

    // Primary Siren Oscillator (Sawtooth with filter)
    this.sirenOsc1 = this.ctx.createOscillator();
    this.sirenOsc1.type = 'sawtooth';
    this.sirenOsc1.frequency.setValueAtTime(680, t);

    // Secondary Sub-Harmonic (Square)
    this.sirenOsc2 = this.ctx.createOscillator();
    this.sirenOsc2.type = 'square';
    this.sirenOsc2.frequency.setValueAtTime(340, t);

    // LFO to modulate pitch (Two-tone emergency siren pulse)
    this.sirenLfo = this.ctx.createOscillator();
    this.sirenLfo.type = 'sine';
    this.sirenLfo.frequency.setValueAtTime(1.8, t); // 1.8 Hz wailing cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, t); // Depth of pitch wail ±140Hz

    this.sirenLfo.connect(lfoGain);
    lfoGain.connect(this.sirenOsc1.frequency);
    lfoGain.connect(this.sirenOsc2.frequency);

    // Resonant Filter for emergency acoustic enclosure feel
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.Q.setValueAtTime(2.5, t);

    this.sirenOsc1.connect(filter);
    this.sirenOsc2.connect(filter);
    filter.connect(this.sirenGain);

    this.sirenLfo.start(t);
    this.sirenOsc1.start(t);
    this.sirenOsc2.start(t);
  }

  /**
   * Stops the Emergency Crisis Room Panic Siren with smooth fadeout.
   */
  public stopCrisisAlarm(): void {
    if (!this.isSirenPlaying || !this.ctx || !this.sirenGain) return;
    this.isSirenPlaying = false;

    const t = this.ctx.currentTime;
    this.sirenGain.gain.setTargetAtTime(0.001, t, 0.25);

    setTimeout(() => {
      try {
        this.sirenOsc1?.stop();
        this.sirenOsc2?.stop();
        this.sirenLfo?.stop();
        this.sirenOsc1?.disconnect();
        this.sirenOsc2?.disconnect();
        this.sirenLfo?.disconnect();
        this.sirenGain?.disconnect();
      } catch {
        // Safe disposal
      }
      this.sirenOsc1 = null;
      this.sirenOsc2 = null;
      this.sirenLfo = null;
      this.sirenGain = null;
    }, 400);
  }

  /**
   * 7. Ambient Tension Drone
   * Subtle low-frequency cybernetic bed (44Hz & 46Hz binaural beat).
   */
  private initAmbientDrone(): void {
    if (this.isDroneStarted || !this.ctx) return;
    this.isDroneStarted = true;

    const t = this.ctx.currentTime;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, t);
    this.droneGain.gain.linearRampToValueAtTime(0.045, t + 2.0);
    this.droneGain.connect(this.masterGain!);

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(43.5, t);

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(45.5, t);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, t);

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);
    filter.connect(this.droneGain);

    this.droneOsc1.start(t);
    this.droneOsc2.start(t);
  }

  /**
   * Modulates ambient tension drone intensity based on page location.
   * e.g., 0.0 at Prologue, up to 1.0 at Crisis Room.
   */
  public setAmbientTension(level: number): void {
    if (!this.ctx || !this.droneGain) return;
    const clamped = Math.max(0, Math.min(1, level));
    const targetGain = 0.03 + clamped * 0.09;
    this.droneGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.2);
  }
}
