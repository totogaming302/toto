import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface GlobalBackgroundOptions {
  canvasId: string;
}

interface CoinData {
  basePosition: THREE.Vector3;
  rotation: THREE.Euler;
  rotationSpeed: THREE.Vector3;
  floatSpeed: number;
  floatOffset: number;
  scale: number;
}

interface BanknoteData {
  mesh: THREE.Mesh;
  basePosition: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  floatSpeed: number;
  floatOffset: number;
  flutterSpeed: number;
}

export class GlobalBackground3D {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  
  // Coin InstancedMeshes (USD, IDR, EUR)
  private usdInstancedMesh!: THREE.InstancedMesh;
  private idrInstancedMesh!: THREE.InstancedMesh;
  private eurInstancedMesh!: THREE.InstancedMesh;

  private usdCoinsData: CoinData[] = [];
  private idrCoinsData: CoinData[] = [];
  private eurCoinsData: CoinData[] = [];

  // Banknotes
  private banknotes: BanknoteData[] = [];
  private banknoteGroup = new THREE.Group();

  // Particle System
  private particleSystem!: THREE.Points;
  private particleCount = 420;

  // Lighting
  private keyLight!: THREE.DirectionalLight;
  private rimLight!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;

  // Animation & Physics state
  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  private scrollProgress = 0;
  private scrollVelocity = 0;
  private targetScrollProgress = 0;
  private animationFrameId: number | null = null;
  private clock = new THREE.Clock();
  private dummy = new THREE.Object3D();

  // Color theme moods
  private currentBgColor = new THREE.Color(0x080c14);
  private targetBgColor = new THREE.Color(0x080c14);

  constructor(options: GlobalBackgroundOptions) {
    const el = document.getElementById(options.canvasId) as HTMLCanvasElement;
    if (!el) {
      throw new Error(`Canvas #${options.canvasId} not found`);
    }
    this.canvas = el;

    // High performance WebGL setup with alpha transparency
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    // Scene & Perspective Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x080c14, 0.032);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    this.camera.position.set(0, 0, 14);

    this.setupLighting();
    this.initCoinMeshes();
    this.initBanknotes();
    this.initDustParticles();
    this.bindEvents();
    this.initScrollChoreography();
    this.render();
  }

  private setupLighting(): void {
    this.ambientLight = new THREE.AmbientLight(0x0e1726, 2.0);
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xffb84d, 3.5);
    this.keyLight.position.set(8, 12, 10);
    this.scene.add(this.keyLight);

    this.rimLight = new THREE.DirectionalLight(0x10b981, 2.8);
    this.rimLight.position.set(-10, -6, 6);
    this.scene.add(this.rimLight);

    const fillLight = new THREE.PointLight(0xf59e0b, 2.2, 35);
    fillLight.position.set(0, 0, 8);
    this.scene.add(fillLight);
  }

  /**
   * Generates procedural high-resolution mint coin texture
   */
  private createCoinTexture(symbol: string, subtitle: string, mainColor: string, accentColor: string): THREE.CanvasTexture {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const center = size / 2;
    const radius = size * 0.46;

    // Base Radial Gradient
    const bgGrad = ctx.createRadialGradient(center, center, 10, center, center, radius);
    bgGrad.addColorStop(0, '#1c2436');
    bgGrad.addColorStop(0.7, '#0b111e');
    bgGrad.addColorStop(1, '#05080e');

    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fill();

    // Concentric micro-milling ridges
    ctx.lineWidth = 1.5;
    for (let r = radius - 6; r > radius - 26; r -= 3.5) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.arc(center, center, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Outer Rim
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(center, center, radius - 2, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Accent Ring
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(center, center, radius - 35, 0, Math.PI * 2);
    ctx.stroke();

    // Center Currency Glyph
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 160px "Cinzel", "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = 24;
    ctx.fillText(symbol, center, center - 10);
    ctx.shadowBlur = 0;

    // Inscribed Subtitle
    ctx.fillStyle = mainColor;
    ctx.font = '600 24px "JetBrains Mono", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText(subtitle, center, center + 105);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }

  /**
   * Initializes InstancedMesh for USD, IDR, and EUR coins (total ~54 coins)
   */
  private initCoinMeshes(): void {
    const coinGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.14, 48);
    // Rotate so coin face points outward
    coinGeo.rotateX(Math.PI / 2);

    const configs = [
      {
        type: 'USD',
        count: 20,
        symbol: '$',
        sub: 'USD // RESERVE',
        mainCol: '#F59E0B',
        accentCol: '#FCD34D',
        metalColor: 0xdfa037
      },
      {
        type: 'IDR',
        count: 20,
        symbol: 'Rp',
        sub: 'IDR // SPOT',
        mainCol: '#10B981',
        accentCol: '#34D399',
        metalColor: 0x1f9d6c
      },
      {
        type: 'EUR',
        count: 16,
        symbol: '€',
        sub: 'EUR // BLOC',
        mainCol: '#38BDF8',
        accentCol: '#93C5FD',
        metalColor: 0x2563eb
      }
    ];

    configs.forEach((cfg) => {
      const texture = this.createCoinTexture(cfg.symbol, cfg.sub, cfg.mainCol, cfg.accentCol);
      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.9,
        roughness: 0.25,
        bumpMap: texture,
        bumpScale: 0.025
      });

      const instancedMesh = new THREE.InstancedMesh(coinGeo, mat, cfg.count);
      instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      instancedMesh.frustumCulled = true;

      const dataArray: CoinData[] = [];

      for (let i = 0; i < cfg.count; i++) {
        // Scatter coins in wide 3D space across all depth layers
        const x = (Math.random() - 0.5) * 28;
        const y = (Math.random() - 0.5) * 40;
        const z = -14 + Math.random() * 18; // From deep background to close to camera
        const scale = 0.55 + Math.random() * 0.75;

        dataArray.push({
          basePosition: new THREE.Vector3(x, y, z),
          rotation: new THREE.Euler(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          ),
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.5
          ),
          floatSpeed: 0.8 + Math.random() * 0.8,
          floatOffset: Math.random() * Math.PI * 2,
          scale
        });

        this.dummy.position.set(x, y, z);
        this.dummy.rotation.copy(dataArray[i].rotation);
        this.dummy.scale.setScalar(scale);
        this.dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, this.dummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      this.scene.add(instancedMesh);

      if (cfg.type === 'USD') {
        this.usdInstancedMesh = instancedMesh;
        this.usdCoinsData = dataArray;
      } else if (cfg.type === 'IDR') {
        this.idrInstancedMesh = instancedMesh;
        this.idrCoinsData = dataArray;
      } else {
        this.eurInstancedMesh = instancedMesh;
        this.eurCoinsData = dataArray;
      }
    });
  }

  /**
   * Generates procedural banknote textures for USD greenback & IDR rupiah
   */
  private createBanknoteTexture(type: 'USD' | 'IDR'): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    if (type === 'USD') {
      // Dark olive-slate vintage greenback
      ctx.fillStyle = '#0d1811';
      ctx.fillRect(0, 0, 512, 256);

      // Guilloche patterned outer border
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, 492, 236);

      ctx.strokeStyle = 'rgba(34, 197, 94, 0.25)';
      ctx.lineWidth = 1.5;
      for (let i = 18; i < 490; i += 16) {
        ctx.strokeRect(i, 18, 10, 220);
      }

      // Center Medallion
      ctx.fillStyle = 'rgba(34, 197, 94, 0.12)';
      ctx.beginPath();
      ctx.ellipse(256, 128, 120, 80, 0, 0, Math.PI * 2);
      ctx.fill();

      // Banknote Typography
      ctx.fillStyle = '#86efac';
      ctx.font = 'bold 36px "Cinzel", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('FEDERAL RESERVE', 256, 65);

      ctx.font = 'bold 80px "Cinzel", Georgia, serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('$100', 256, 145);

      ctx.font = '600 18px "JetBrains Mono", monospace';
      ctx.fillStyle = '#4ade80';
      ctx.fillText('ONE HUNDRED DOLLARS // VALAS', 256, 195);
    } else {
      // Indonesian Rupiah Red/Crimson & Gold note
      ctx.fillStyle = '#1c080c';
      ctx.fillRect(0, 0, 512, 256);

      // Outer Crimson & Gold border
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, 492, 236);

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 1.5;
      for (let i = 18; i < 490; i += 16) {
        ctx.strokeRect(i, 18, 10, 220);
      }

      // Center Medallion
      ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.beginPath();
      ctx.ellipse(256, 128, 130, 80, 0, 0, Math.PI * 2);
      ctx.fill();

      // Banknote Typography
      ctx.fillStyle = '#fca5a5';
      ctx.font = 'bold 32px "Cinzel", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('BANK INDONESIA', 256, 65);

      ctx.font = 'bold 70px "Cinzel", Georgia, serif';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('100.000', 256, 145);

      ctx.font = '600 18px "JetBrains Mono", monospace';
      ctx.fillStyle = '#f87171';
      ctx.fillText('SERATUS RIBU RUPIAH // DOMESTIK', 256, 195);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }

  /**
   * Initializes 30 floating curled banknotes in 3D space
   */
  private initBanknotes(): void {
    const count = 30;
    const usdTex = this.createBanknoteTexture('USD');
    const idrTex = this.createBanknoteTexture('IDR');

    const usdMat = new THREE.MeshStandardMaterial({
      map: usdTex,
      side: THREE.DoubleSide,
      roughness: 0.55,
      metalness: 0.15
    });

    const idrMat = new THREE.MeshStandardMaterial({
      map: idrTex,
      side: THREE.DoubleSide,
      roughness: 0.55,
      metalness: 0.15
    });

    for (let i = 0; i < count; i++) {
      // Create curved plane geometry for natural fluttering paper look
      const width = 2.4;
      const height = 1.2;
      const segW = 12;
      const segH = 6;
      const geo = new THREE.PlaneGeometry(width, height, segW, segH);

      // Curve the vertices slightly
      const posAttr = geo.attributes.position;
      for (let p = 0; p < posAttr.count; p++) {
        const px = posAttr.getX(p);
        const py = posAttr.getY(p);
        const pz = Math.sin((px / width) * Math.PI) * 0.15 + Math.cos((py / height) * Math.PI) * 0.08;
        posAttr.setZ(p, pz);
      }
      geo.computeVertexNormals();

      const isUsd = i % 2 === 0;
      const mesh = new THREE.Mesh(geo, isUsd ? usdMat : idrMat);
      mesh.frustumCulled = true;

      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 36;
      const z = -12 + Math.random() * 16;
      const scale = 0.7 + Math.random() * 0.5;

      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      mesh.scale.setScalar(scale);

      this.banknoteGroup.add(mesh);

      this.banknotes.push({
        mesh,
        basePosition: new THREE.Vector3(x, y, z),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.3
        ),
        floatSpeed: 0.7 + Math.random() * 0.7,
        floatOffset: Math.random() * Math.PI * 2,
        flutterSpeed: 1.5 + Math.random() * 1.5
      });
    }

    this.scene.add(this.banknoteGroup);
  }

  /**
   * Initializes 420 ambient glowing gold/emerald telemetry dust particles
   */
  private initDustParticles(): void {
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    const gold = new THREE.Color(0xf59e0b);
    const emerald = new THREE.Color(0x10b981);
    const crimson = new THREE.Color(0xef4444);
    const slate = new THREE.Color(0x64748b);

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 32;
      positions[i3 + 1] = (Math.random() - 0.5) * 44;
      positions[i3 + 2] = (Math.random() - 0.5) * 24;

      const rand = Math.random();
      const col = rand > 0.6 ? gold : rand > 0.35 ? emerald : rand > 0.2 ? crimson : slate;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(geo, mat);
    this.particleSystem.frustumCulled = true;
    this.scene.add(this.particleSystem);
  }

  private bindEvents(): void {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handleVisibilityChange = (): void => {
    if (document.hidden) {
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    } else {
      if (this.animationFrameId === null) {
        this.clock.start();
        this.render();
      }
    }
  };

  /**
   * Coordinates scroll progress & per-section mood transitions
   */
  private initScrollChoreography(): void {
    // Expose global mood setter for direct timeline synchronization
    (window as any).__setMoodColor = (hex: string) => this.setMoodColor(hex);

    // Global continuous scroll progress tracker
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        this.targetScrollProgress = self.progress;
        this.scrollVelocity = Math.abs(self.getVelocity() || 0);
      }
    });

    // Hero stage mood trigger
    const heroEl = document.getElementById('hero-stage');
    if (heroEl) {
      ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: 'bottom 40%',
        onEnter: () => this.setMoodColor('#080C14'),
        onEnterBack: () => this.setMoodColor('#080C14')
      });
    }

    // All sections (1 through 7) are now pinned, interactive, and self-managed
    const laterSections: { id: string; color: string }[] = [];

    laterSections.forEach((cfg) => {
      const section = document.getElementById(cfg.id);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => this.setMoodColor(cfg.color),
        onEnterBack: () => this.setMoodColor(cfg.color)
      });
    });
  }

  public setMoodColor(hexColor: string): void {
    this.targetBgColor.set(hexColor);
    gsap.to(document.body, {
      backgroundColor: hexColor,
      duration: 0.9,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }

  private updateCoins(
    mesh: THREE.InstancedMesh,
    coinsData: CoinData[],
    time: number,
    velocityFactor: number
  ): void {
    for (let i = 0; i < coinsData.length; i++) {
      const c = coinsData[i];
      // Continuous float
      const floatY = Math.sin(time * c.floatSpeed + c.floatOffset) * 0.25;
      
      // Scroll translation across vertical corridor
      // As scroll progress goes 0 -> 1, coins drift vertically and gently rotate
      const scrollDriftY = (this.scrollProgress * 22) % 36;
      let currY = c.basePosition.y + floatY + scrollDriftY;
      if (currY > 18) currY -= 36;
      if (currY < -18) currY += 36;

      // Tumbling rotation accelerated by scroll velocity
      c.rotation.x += c.rotationSpeed.x * (0.01 + velocityFactor * 0.03);
      c.rotation.y += c.rotationSpeed.y * (0.012 + velocityFactor * 0.03);
      c.rotation.z += c.rotationSpeed.z * (0.008 + velocityFactor * 0.02);

      this.dummy.position.set(c.basePosition.x, currY, c.basePosition.z);
      this.dummy.rotation.copy(c.rotation);
      this.dummy.scale.setScalar(c.scale);
      this.dummy.updateMatrix();

      mesh.setMatrixAt(i, this.dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  private updateBanknotes(time: number, velocityFactor: number): void {
    for (let i = 0; i < this.banknotes.length; i++) {
      const b = this.banknotes[i];
      const floatY = Math.sin(time * b.floatSpeed + b.floatOffset) * 0.3;
      
      const scrollDriftY = (this.scrollProgress * 26) % 38;
      let currY = b.basePosition.y + floatY + scrollDriftY;
      if (currY > 19) currY -= 38;
      if (currY < -19) currY += 38;

      b.mesh.position.set(b.basePosition.x, currY, b.basePosition.z);

      // Multi-axis rotation and gentle paper fluttering
      b.mesh.rotation.x += b.rotationSpeed.x * (0.008 + velocityFactor * 0.025);
      b.mesh.rotation.y += b.rotationSpeed.y * (0.01 + velocityFactor * 0.025);
      b.mesh.rotation.z = Math.sin(time * b.flutterSpeed + b.floatOffset) * 0.3;
    }
  }

  private render = (): void => {
    this.animationFrameId = requestAnimationFrame(this.render);

    const time = this.clock.getElapsedTime();

    // Smooth lerp for scroll progress & mouse coordinates
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.08;
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Decay scroll velocity
    this.scrollVelocity *= 0.92;
    const velocityFactor = Math.min(this.scrollVelocity / 500, 2.5);

    // Smoothly interpolate background fog color
    this.currentBgColor.lerp(this.targetBgColor, 0.04);
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.copy(this.currentBgColor);
    }

    // Camera spatial choreography
    // Camera breathes and gently shifts perspective with scroll
    const cameraScrollZ = 14 + Math.sin(this.scrollProgress * Math.PI * 3) * 1.5;
    const cameraScrollY = -this.scrollProgress * 4;
    this.camera.position.z = cameraScrollZ;
    this.camera.position.y = cameraScrollY + this.mouse.y * 0.5;
    this.camera.position.x = this.mouse.x * 0.8;
    this.camera.lookAt(0, cameraScrollY * 0.8, 0);

    // Dynamic light movement
    this.keyLight.position.x = 8 + this.mouse.x * 4;
    this.keyLight.position.y = 12 + this.mouse.y * 3;

    // Update coins (USD, IDR, EUR)
    if (this.usdInstancedMesh) this.updateCoins(this.usdInstancedMesh, this.usdCoinsData, time, velocityFactor);
    if (this.idrInstancedMesh) this.updateCoins(this.idrInstancedMesh, this.idrCoinsData, time, velocityFactor);
    if (this.eurInstancedMesh) this.updateCoins(this.eurInstancedMesh, this.eurCoinsData, time, velocityFactor);

    // Update banknotes
    this.updateBanknotes(time, velocityFactor);

    // Ambient dust particles slow drift
    if (this.particleSystem) {
      this.particleSystem.rotation.y = time * 0.025;
      this.particleSystem.rotation.x = time * 0.012;
      this.particleSystem.position.y = -this.scrollProgress * 6;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.renderer.dispose();
  }
}
