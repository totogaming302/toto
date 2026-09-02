/**
 * CINEMATIC TYPEWRITER UTILITY
 * Supports both scrubbed scroll progress and real-time cadence typing with glowing cursor.
 */

export interface TypewriterOptions {
  element: HTMLElement;
  text: string;
  speed?: number; // ms per character in autonomous mode
  cursorChar?: string;
  onComplete?: () => void;
}

export class Typewriter {
  private element: HTMLElement;
  private fullText: string;
  private speed: number;
  private cursorChar: string;
  private cursorSpan: HTMLSpanElement;
  private textSpan: HTMLSpanElement;
  private timer: number | null = null;
  private currentIndex = 0;
  private onComplete?: () => void;

  constructor(options: TypewriterOptions) {
    this.element = options.element;
    this.fullText = options.text;
    this.speed = options.speed ?? 35;
    this.cursorChar = options.cursorChar ?? '█';
    this.onComplete = options.onComplete;

    this.element.innerHTML = '';
    this.textSpan = document.createElement('span');
    this.textSpan.className = 'typewriter-text';
    this.cursorSpan = document.createElement('span');
    this.cursorSpan.className = 'typewriter-cursor';
    this.cursorSpan.textContent = this.cursorChar;

    this.element.appendChild(this.textSpan);
    this.element.appendChild(this.cursorSpan);
  }

  /**
   * Set typed text length directly according to a 0.0 - 1.0 scrub progress
   */
  public setProgress(progress: number): void {
    const clamped = Math.max(0, Math.min(1, progress));
    const targetLength = Math.floor(clamped * this.fullText.length);
    this.textSpan.textContent = this.fullText.slice(0, targetLength);
    if (clamped >= 1) {
      this.cursorSpan.classList.add('blink');
    } else {
      this.cursorSpan.classList.remove('blink');
    }
  }

  /**
   * Autonomous play with realistic cadence
   */
  public play(): Promise<void> {
    return new Promise((resolve) => {
      this.stop();
      this.currentIndex = 0;
      this.cursorSpan.classList.remove('blink');

      const typeNextChar = () => {
        if (this.currentIndex <= this.fullText.length) {
          this.textSpan.textContent = this.fullText.slice(0, this.currentIndex);
          this.currentIndex++;
          // Randomize typing cadence slightly for realistic human/terminal rhythm
          const jitter = (Math.random() - 0.5) * 20;
          this.timer = window.setTimeout(typeNextChar, Math.max(15, this.speed + jitter));
        } else {
          this.cursorSpan.classList.add('blink');
          if (this.onComplete) this.onComplete();
          resolve();
        }
      };

      typeNextChar();
    });
  }

  public stop(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public reset(): void {
    this.stop();
    this.currentIndex = 0;
    this.textSpan.textContent = '';
    this.cursorSpan.classList.remove('blink');
  }
}
