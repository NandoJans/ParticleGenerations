import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GalaxyTreeUpgrade} from "../../../classes/features/upgrades/galaxy-tree-upgrade";
import {faArrowDown, faArrowUp, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {LocalStorageHelper} from "../../../classes/helpers/local-storage-helper";
import {GalaxyTreeService} from "../../../services/galaxy-tree.service";
import {Styles} from "../../../classes/enums/styles";

interface Star {
  id: number;
  x: number;       // Position as percentage (0-100)
  y: number;       // Position as percentage (0-100)
  size: number;
  duration: number;
  delay: number;
  layer: number;   // 1 = far (slow), 2 = mid, 3 = near (fast)
  opacity: number; // Current opacity for animation
  phase: number;   // Current phase in animation cycle (0-1)
}

@Component({
  selector: 'app-green-galaxy-tree',
  templateUrl: './green-galaxy-tree.component.html',
  styleUrls: ['./green-galaxy-tree.component.css'],
  standalone: false
})
export class GreenGalaxyTreeComponent implements OnInit, AfterViewInit, OnDestroy {
  darkEnergy: Holding = HoldingRecord.darkEnergy;
  upgrades: Upgrade[] = [
    UpgradeRecord.redParticleSacrifice,
    UpgradeRecord.yellowParticleSacrifice,
    UpgradeRecord.greenParticleSacrifice,
  ];
  galaxyTreeStarRoot: GalaxyTreeUpgrade = UpgradeRecord.unlockFirstGreenGeneratorGalaxyTree;
  infoText: string[] = [
    'The Green Galaxy Tree represents the ultimate progression system in Particle Generations!',
    'Dark Energy is the currency for this tree, earned through particle sacrifices.',
    'The galaxy tree features a branching upgrade system where each node unlocks new paths and possibilities.',
    'Particle Sacrifice upgrades convert your accumulated particles into Dark Energy for permanent benefits.',
    'Navigate the tree strategically - each path offers different bonuses and unlocks.',
    'This is the endgame content - master the galaxy tree to achieve maximum power!'
  ]
  @ViewChild('galaxyTreeWrapper') galaxyTreeWrapper!: ElementRef;
  @ViewChild('starCanvas1') starCanvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('starCanvas2') starCanvas2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('starCanvas3') starCanvas3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('nebulaCanvas') nebulaCanvas!: ElementRef<HTMLCanvasElement>;

  stars: Star[] = [];
  private animationFrameId: number | null = null;
  private lastFrameTime: number = 0;
  private nebulaAnimationPhase: number = 0;
  private resizeHandler = this.resizeCanvases.bind(this);

  // Performance configuration constants
  private static readonly MOBILE_MAX_SCREEN_WIDTH = 768;
  private static readonly MOBILE_TARGET_FPS = 30;
  private static readonly DESKTOP_TARGET_FPS = 60;
  private static readonly STAR_LAYERS = 3;
  private static readonly STARS_PER_UPGRADE = 3;

  // Mobile detection and performance settings
  private readonly isMobile: boolean = this.detectMobile();
  private readonly starLayers: number = GreenGalaxyTreeComponent.STAR_LAYERS;
  private readonly starsPerUpgrade: number = GreenGalaxyTreeComponent.STARS_PER_UPGRADE;

  private detectMobile(): boolean {
    // Detect mobile devices using touch capability combined with screen size
    // This catches most phones while allowing tablets and touch-enabled laptops to use full settings
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= GreenGalaxyTreeComponent.MOBILE_MAX_SCREEN_WIDTH;
    return hasTouchScreen && isSmallScreen;
  }

  // Cache nebula brightness values to avoid recalculating on every render
  private cachedNebulaBrightness = {
    redGenerator: 0.1,
    redAccelerator: 0.1,
    yellow: 0.1,
    fusion: 0.1
  };

  // Define nebula region boundaries as constants for maintainability
  private readonly NEBULA_REGIONS = {
    redGenerator: { minX: 75, maxX: 375, minY: -100, maxY: 100 },
    redAccelerator: { minX: -375, maxX: -75, minY: -100, maxY: 100 },
    yellow: { minX: -150, maxX: 150, minY: -475, maxY: -75 },
    fusion: { minX: -150, maxX: 150, minY: 75, maxY: 375 }
  };

  bottomSectionOpen: boolean = true;

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('pages', 'green-galaxy-tree');
  protected readonly faArrowUp = faArrowUp;

  protected readonly faArrowDown = faArrowDown;

  // Viewport culling for performance - only render stars within visible bounds
  private visibleStars: GalaxyTreeUpgrade[] = [];
  private viewportBounds = { minX: -1000, maxX: 1000, minY: -1000, maxY: 1000 };
  // Margin (in world units) to add around the viewport for preloading off-screen elements
  private static readonly VIEWPORT_MARGIN = 200;

  constructor(
    public galaxyTreeService: GalaxyTreeService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.bottomSectionOpen = this.localStorageHelper.load(true, 'bottomSectionOpen');
    // Load persisted pan/zoom
    const saved = this.localStorageHelper.load(null, 'viewport');
    if (saved) {
      this.tx = saved.x;
      this.ty = saved.y;
      this.scale = this.clamp(saved.scale, this.minScale, this.maxScale);
      this.updateTransform();
    }

    this.setPositions();
    this.updateStars();

    // Update stars periodically to match purchased upgrades
    setInterval(() => {
      this.updateStars();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.resizeCanvases();
    this.startAnimation();
    // Update viewport bounds and trigger change detection to render visible stars
    this.updateViewportBounds();
    this.cdr.detectChanges();

    // Handle window resize
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resizeHandler);
  }

  getStars(): GalaxyTreeUpgrade[] {
    return this.galaxyTreeService.getStars();
  }

  /**
   * Returns only stars that are visible within the current viewport.
   * This provides significant performance improvement on devices with many upgrade elements.
   */
  getVisibleStars(): GalaxyTreeUpgrade[] {
    return this.visibleStars;
  }

  /**
   * Updates the viewport bounds based on the current transform and viewport size.
   * Called whenever the transform changes (pan/zoom) or window resizes.
   */
  private updateViewportBounds(): void {
    if (!this.galaxyTreeWrapper?.nativeElement) return;

    const rect = this.galaxyTreeWrapper.nativeElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Convert screen bounds to world coordinates
    // screen = world * scale + translate
    // world = (screen - translate) / scale
    const margin = GreenGalaxyTreeComponent.VIEWPORT_MARGIN;

    this.viewportBounds = {
      minX: (0 - this.tx) / this.scale - margin,
      maxX: (width - this.tx) / this.scale + margin,
      minY: (0 - this.ty) / this.scale - margin,
      maxY: (height - this.ty) / this.scale + margin
    };

    this.updateVisibleStars();
  }

  /**
   * Filters all stars to only those within the current viewport bounds.
   */
  private updateVisibleStars(): void {
    const bounds = this.viewportBounds;
    const allStars = this.galaxyTreeService.getStars();
    this.visibleStars = allStars.filter(star => {
      const x = star.worldX;
      const y = star.worldY;
      return x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY;
    });
  }

  private updateStars() {
    const purchasedCount = this.getPurchasedStarsCount();
    // On mobile: fewer stars per upgrade for better performance
    const baseStars = 0;
    const targetCount = baseStars + (purchasedCount * this.starsPerUpgrade);

    // Only regenerate if the count has changed
    if (this.stars.length !== targetCount) {
      this.generateStars(targetCount);
    }

    // Update cached nebula brightness values when star count changes
    this.updateNebulaBrightness();
  }

  private getPurchasedStarsCount(): number {
    return this.galaxyTreeService.getStars().filter(star => star.hasBought()).length;
  }

  private getPurchasedStarsInRegion(minX: number, maxX: number, minY: number, maxY: number): number {
    return this.galaxyTreeService.getStars().filter(star => {
      if (!star.hasBought()) return false;
      const x = star.worldX;
      const y = star.worldY;
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }).length;
  }

  private updateNebulaBrightness(): void {
    // Calculate brightness for each nebula region and cache the values
    const calculateBrightness = (region: { minX: number, maxX: number, minY: number, maxY: number }) => {
      const purchased = this.getPurchasedStarsInRegion(region.minX, region.maxX, region.minY, region.maxY);
      return Math.min(1.0, 0.1 + (purchased * 0.05));
    };

    this.cachedNebulaBrightness.redGenerator = calculateBrightness(this.NEBULA_REGIONS.redGenerator);
    this.cachedNebulaBrightness.redAccelerator = calculateBrightness(this.NEBULA_REGIONS.redAccelerator);
    this.cachedNebulaBrightness.yellow = calculateBrightness(this.NEBULA_REGIONS.yellow);
    this.cachedNebulaBrightness.fusion = calculateBrightness(this.NEBULA_REGIONS.fusion);
  }

  private generateStars(count: number) {
    const currentCount = this.stars.length;

    // If we need more stars, add new ones
    if (count > currentCount) {
      for (let i = currentCount; i < count; i++) {
        this.stars.push(this.createStar(i));
      }
    }
    // If we need fewer stars, remove from the end
    else if (count < currentCount) {
      this.stars = this.stars.slice(0, count);
    }
  }

  private createStar(id: number): Star {
    // Use seeded random for consistent star properties
    const seedRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Distribute stars across layers (1-3 on desktop, only layer 1 on mobile)
    const layer = (id % this.starLayers) + 1;

    const size = 0.5 + seedRandom(id * 1.1) * 1;            // 0.5–1.5 px (smaller, more dot-like)
    const duration = 5 + seedRandom(id * 2.2) * 7;           // 5–12 s
    const delay = seedRandom(id * 3.3) * 10;                 // 0–10 s

    return {
      id,
      x: seedRandom(id * 4.4) * 100,        // 0-100%
      y: seedRandom(id * 5.5) * 100,        // 0-100%
      size,
      duration,
      delay,
      layer,
      opacity: 0,
      phase: delay / duration  // Start at delay phase
    };
  }

  getBackgroundStars(): Star[] {
    return this.stars;
  }

  getStarsByLayer(layer: number): Star[] {
    return this.stars.filter(star => star.layer === layer);
  }

  private resizeCanvases(): void {
    if (!this.galaxyTreeWrapper) return;

    const rect = this.galaxyTreeWrapper.nativeElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Set canvas sizes with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;

    [this.starCanvas1, this.starCanvas2, this.starCanvas3, this.nebulaCanvas].forEach((canvasRef) => {
      if (canvasRef?.nativeElement) {
        const canvas = canvasRef.nativeElement;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    });

    // Re-render nebula after resize
    this.renderNebula();
    // Update viewport bounds for culling
    this.updateViewportBounds();
  }

  // Calculate frame interval from target FPS
  private readonly targetFrameInterval: number = this.isMobile
    ? Math.round(1000 / GreenGalaxyTreeComponent.MOBILE_TARGET_FPS)
    : Math.round(1000 / GreenGalaxyTreeComponent.DESKTOP_TARGET_FPS);
  private lastRenderTime: number = 0;

  private startAnimation(): void {
    const animate = (currentTime: number) => {
      if (this.lastFrameTime === 0) {
        this.lastFrameTime = currentTime;
        this.lastRenderTime = currentTime;
      }

      const deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convert to seconds
      this.lastFrameTime = currentTime;

      // Always update animations to maintain smooth state
      this.updateStarAnimations(deltaTime);
      this.updateNebulaAnimation(deltaTime);

      // Throttle rendering on mobile for better performance
      const timeSinceLastRender = currentTime - this.lastRenderTime;
      if (timeSinceLastRender >= this.targetFrameInterval) {
        this.renderStars();
        this.renderNebula();
        this.lastRenderTime = currentTime;
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  private updateNebulaAnimation(deltaTime: number): void {
    // Slowly cycle the nebula animation (8 second cycle like CSS)
    this.nebulaAnimationPhase = (this.nebulaAnimationPhase + deltaTime / 8) % 1;
  }

  private updateStarAnimations(deltaTime: number): void {
    this.stars.forEach(star => {
      // Update phase (0 to 1 cycle)
      star.phase = (star.phase + deltaTime / star.duration) % 1;

      // Calculate opacity based on phase
      // 0-0.4: fade in
      // 0.4-0.6: stay bright
      // 0.6-1.0: fade out
      if (star.phase < 0.4) {
        star.opacity = star.phase / 0.4;
      } else if (star.phase < 0.6) {
        star.opacity = 1;
      } else {
        star.opacity = 1 - ((star.phase - 0.6) / 0.4);
      }
    });
  }

  private renderStars(): void {
    const allCanvases = [
      { canvas: this.starCanvas1, layer: 1, parallax: 0.1, opacity: 0.6 },
      { canvas: this.starCanvas2, layer: 2, parallax: 0.3, opacity: 0.8 },
      { canvas: this.starCanvas3, layer: 3, parallax: 0.5, opacity: 1.0 }
    ];

    // On mobile, only render layers up to starLayers
    const canvases = allCanvases.filter(c => c.layer <= this.starLayers);

    canvases.forEach(({ canvas, layer, parallax, opacity }) => {
      if (!canvas?.nativeElement) return;

      const ctx = canvas.nativeElement.getContext('2d');
      if (!ctx) return;

      const width = canvas.nativeElement.width / (window.devicePixelRatio || 1);
      const height = canvas.nativeElement.height / (window.devicePixelRatio || 1);

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate parallax offset
      const offsetX = this.tx * parallax;
      const offsetY = this.ty * parallax;

      // Draw stars for this layer
      const layerStars = this.getStarsByLayer(layer);
      layerStars.forEach(star => {
        if (star.opacity <= 0) return;

        // Calculate position with parallax and wrap around
        let x = (star.x / 100 * width + offsetX);
        let y = (star.y / 100 * height + offsetY);

        // Wrap coordinates to create infinite scrolling effect
        const wrapWidth = width * 1.5;
        const wrapHeight = height * 1.5;
        x = ((x % wrapWidth) + wrapWidth) % wrapWidth;
        y = ((y % wrapHeight) + wrapHeight) % wrapHeight;

        // Create gradient for star glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * opacity})`);
        gradient.addColorStop(0.5, `rgba(201, 255, 230, ${star.opacity * opacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - star.size * 2, y - star.size * 2, star.size * 4, star.size * 4);
      });
    });
  }

  private renderNebula(): void {
    if (!this.nebulaCanvas?.nativeElement) return;

    const canvas = this.nebulaCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate world-to-screen transform
    const worldToScreenX = (worldX: number) => worldX * this.scale + this.tx;
    const worldToScreenY = (worldY: number) => worldY * this.scale + this.ty;

    // Pre-calculate nebula animation value
    const nebulaSin = Math.sin(this.nebulaAnimationPhase * Math.PI * 2);

    // Use cached brightness values instead of recalculating on every render
    const redGenBrightness = this.cachedNebulaBrightness.redGenerator;
    const redAccelBrightness = this.cachedNebulaBrightness.redAccelerator;
    const yellowBrightness = this.cachedNebulaBrightness.yellow;
    const fusionBrightness = this.cachedNebulaBrightness.fusion;

    // Define nebula regions with increased spacing and reduced initial brightness
    const nebulae = [
      {
        // Red Generator Nebula - moved further right
        worldX: 275,   // Moved from 225 to 275
        worldY: 0,
        radius: 350 * this.scale,  // Reduced from 400 to 350
        colors: [
          { stop: 0, r: 232, g: 59, b: 29, a: 0.15 * redGenBrightness },    // Reduced from 0.4
          { stop: 0.6, r: 255, g: 80, b: 50, a: 0.08 * redGenBrightness },  // Reduced from 0.2
          { stop: 1, r: 0, g: 0, b: 0, a: 0 }
        ]
      },
      {
        // Red Accelerator Nebula - moved further left
        worldX: -275,  // Moved from -225 to -275
        worldY: 0,
        radius: 350 * this.scale,  // Reduced from 400 to 350
        colors: [
          { stop: 0, r: 180, g: 30, b: 20, a: 0.12 * redAccelBrightness },  // Reduced from 0.35
          { stop: 0.6, r: 220, g: 50, b: 40, a: 0.08 * redAccelBrightness }, // Reduced from 0.2
          { stop: 1, r: 0, g: 0, b: 0, a: 0 }
        ]
      },
      {
        // Yellow Nebula - moved further up
        worldX: 0,
        worldY: -325,  // Moved from -275 to -325
        radius: 400 * this.scale,  // Reduced from 450 to 400
        colors: [
          { stop: 0, r: 255, g: 216, b: 59, a: 0.15 * yellowBrightness },   // Reduced from 0.4
          { stop: 0.6, r: 255, g: 200, b: 100, a: 0.08 * yellowBrightness }, // Reduced from 0.2
          { stop: 1, r: 0, g: 0, b: 0, a: 0 }
        ]
      },
      {
        // Fusion Nebula - moved further down (with color shift animation)
        worldX: 0,
        worldY: 275,   // Moved from 225 to 275
        radius: 375 * this.scale,  // Reduced from 425 to 375
        colors: [
          {
            stop: 0,
            r: 255,
            g: 150 + nebulaSin * 30,
            b: 51 + nebulaSin * 20,
            a: 0.18 * fusionBrightness  // Reduced from 0.45
          },
          {
            stop: 0.6,
            r: 255,
            g: 180 + nebulaSin * 20,
            b: 100 + nebulaSin * 10,
            a: 0.08 * fusionBrightness  // Reduced from 0.2
          },
          { stop: 1, r: 0, g: 0, b: 0, a: 0 }
        ]
      }
    ];

    // Set blend mode for nebula effect
    ctx.globalCompositeOperation = 'screen';

    nebulae.forEach(nebula => {
      const screenX = worldToScreenX(nebula.worldX);
      const screenY = worldToScreenY(nebula.worldY);

      // Only render if nebula is somewhat visible on screen
      if (screenX + nebula.radius < 0 || screenX - nebula.radius > width ||
          screenY + nebula.radius < 0 || screenY - nebula.radius > height) {
        return;
      }

      const gradient = ctx.createRadialGradient(
        screenX, screenY, 0,
        screenX, screenY, nebula.radius
      );

      nebula.colors.forEach(color => {
        gradient.addColorStop(
          color.stop,
          `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a})`
        );
      });

      ctx.fillStyle = gradient;
      ctx.filter = 'blur(80px)';
      ctx.fillRect(
        screenX - nebula.radius,
        screenY - nebula.radius,
        nebula.radius * 2,
        nebula.radius * 2
      );
      ctx.filter = 'none';
    });

    // Reset blend mode
    ctx.globalCompositeOperation = 'source-over';
  }

  private setPositions() {
    UpgradeRecord.unlockFirstGreenGeneratorGalaxyTree.setPos(0, 0);
    // Children are increaseRedGeneratorMultiplier, cheaperBoosterAcceleration, fasterHydrogenGeneration, strongerYellowPower

    // Red Generators Section
    UpgradeRecord.betterRedGeneratorsMultiplierGalaxyTree.setPos(125, 0);
    // Children are moreYellowKeys, increaseBoosterAccelerationPower, redGeneratorEfficiency
    UpgradeRecord.betterRedBoosterGalaxyTree.setPos(225, 75);
    UpgradeRecord.redExpertiseGalaxyTree.setPos(325, 0);

    UpgradeRecord.strongerRedExtensionGalaxyTree.setPos(225, -75);
    // Children are cheaperRedGenerators
    UpgradeRecord.betterRedSubMultipliersGalaxyTree.setPos(325, -125);

    // Red Accelerators Section
    UpgradeRecord.cheaperBoosterAccelerationGalaxyTree.setPos(-125, 0);
    // Children are redAcceleratorStart, increaseBoosterAccelerationPower
    UpgradeRecord.redAcceleratorStartGalaxyTree.setPos(-225, 75);
    UpgradeRecord.strongerBoosterAccelerationGalaxyTree.setPos(-225, -75);
    UpgradeRecord.acceleratorExpertiseGalaxyTree.setPos(-325, 0);

    // Yellow Fusion Section
    UpgradeRecord.fasterHydrogenGenerationGalaxyTree.setPos(0, 125);
    // Children are strongerHydrogenPower, improveYellowFusion
    UpgradeRecord.strongerHydrogenGalaxyTree.setPos(75, 225);
    UpgradeRecord.fusionExpertiseGalaxyTree.setPos(0, -325);
    UpgradeRecord.strongerYellowFusionGalaxyTree.setPos(-75, 225);
    // Children are yellowFusionBoostRedAccelerators
    UpgradeRecord.fusedAccelerationGalaxyTree.setPos(-200, 200);

    // Yellow Upgrades/Generators Section
    UpgradeRecord.strongerYellowPowerGalaxyTree.setPos(0, -125);
    // Children are moreYellowKeys, betterYellowParticles
    UpgradeRecord.betterYellowGeneratorsGalaxyTree.setPos(-75, -225);

    UpgradeRecord.betterYellowKeyGainGalaxyTree.setPos(75, -225);
    // Children are strongerYellowGenerators, moreYellowKeysGain
    UpgradeRecord.betterYellowMultipliersGalaxyTree.setPos(-75, -425);
    UpgradeRecord.amplifiedYellowKeysGalaxyTree.setPos(125, -325);
    UpgradeRecord.expandedYellowKeyScalingGalaxyTree.setPos(225, -425);
    UpgradeRecord.yellowExpertiseGalaxyTree.setPos(0, 325);

    // Mix-upgrades between sections
    UpgradeRecord.synergizedPowerGalaxyTree.setPos(200, -200);
    UpgradeRecord.amplifiedFusionGalaxyTree.setPos(200, 200);
    UpgradeRecord.powerAccelerationGalaxyTree.setPos(-200, -200);

    UpgradeRecord.improveFusionCompressionGalaxyTree.setPos(150, 325);

    UpgradeRecord.unlockSecondGreenGeneratorGalaxyTree.setPos(325, 150);

    UpgradeRecord.moreYellowParticlesGalaxyTree.setPos(-125, -325);
    UpgradeRecord.slowerCompressionTimeIncreaseGalaxyTree.setPos(-150, 325);

    UpgradeRecord.betterRedAcceleratorGenerationGalaxyTree.setPos(-325, 125);
    UpgradeRecord.betterRedAcceleratorEffectGalaxyTree.setPos(-325, -125);

    UpgradeRecord.hydrogenCompressionGalaxyTree.setPos(300, 300);
    UpgradeRecord.acceleratedCompressionGalaxyTree.setPos(-300, 300);
    UpgradeRecord.poweredCompressionGalaxyTree.setPos(-300, -300);
    UpgradeRecord.generatedCompressionGalaxyTree.setPos(300, -300);

    UpgradeRecord.cheaperFourthYellowGeneratorGalaxyTreeUpgrade.setPos(-200, -425);
    UpgradeRecord.cheaperFifthYellowGeneratorGalaxyTreeUpgrade.setPos(-275, -525);
  }

  isBottomSectionOpen() {
    return this.bottomSectionOpen;
  }

  toggleBottomSection() {
    this.bottomSectionOpen = !this.bottomSectionOpen;
    this.localStorageHelper.save(this.bottomSectionOpen, 'bottomSectionOpen');
  }

  /* ========= Pan & Zoom implementation ========= */

  // Current transform state
  scale = 1;
  readonly minScale = 0.25;
  readonly maxScale = 3;
  tx = 0; // translateX
  ty = 0; // translateY
  transform = 'translate(0px, 0px) scale(1)';

  private pointers = new Map<number, { x: number, y: number }>();
  private isPanning = false;
  private lastPan = {x: 0, y: 0};

  // add fields
  private dragThreshold = 5; // px
  private maybePan = false;
  private dragged = false;
  private downPos = {x: 0, y: 0};

  // Pinch state
  private pinchStart = {
    scale: 1,
    tx: 0,
    ty: 0,
    dist: 0,
    cx: 0,  // content-space center X
    cy: 0   // content-space center Y
  };

  onWheel(e: WheelEvent) {
    // Zoom towards mouse position
    const rect = this.galaxyTreeWrapper.nativeElement.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const zoomIntensity = 1.0015; // smoothness
    const delta = -e.deltaY;      // wheel up => zoom in
    const factor = Math.pow(zoomIntensity, delta);

    this.zoomAt(mx, my, factor);
  }

  onPointerDown(e: PointerEvent) {
    this.pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});
    this.maybePan = true;
    this.dragged = false;
    this.downPos = {x: e.clientX, y: e.clientY};
    this.lastPan = {x: e.clientX, y: e.clientY};

    // Initialize pinch state when second pointer is added
    if (this.pointers.size === 2) {
      const [p1, p2] = Array.from(this.pointers.values());
      const rect = this.galaxyTreeWrapper.nativeElement.getBoundingClientRect();
      const midX = ((p1.x + p2.x) / 2) - rect.left;
      const midY = ((p1.y + p2.y) / 2) - rect.top;

      this.pinchStart = {
        scale: this.scale,
        tx: this.tx,
        ty: this.ty,
        dist: this.distance(p1, p2),
        cx: (midX - this.tx) / this.scale,
        cy: (midY - this.ty) / this.scale
      };
    }
  }

  onPointerMove(e: PointerEvent) {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});

    if (this.pointers.size === 2) {
      // Pinch-zoom
      const [p1, p2] = Array.from(this.pointers.values());
      const newDist = this.distance(p1, p2);
      if (this.pinchStart.dist <= 0) return;

      const factor = newDist / this.pinchStart.dist;
      const newScale = this.clamp(this.pinchStart.scale * factor, this.minScale, this.maxScale);

      // Recompute tx/ty so the content point (cx,cy) stays under the current midpoint
      const rect = this.galaxyTreeWrapper.nativeElement.getBoundingClientRect();
      const midX = ((p1.x + p2.x) / 2) - rect.left;
      const midY = ((p1.y + p2.y) / 2) - rect.top;

      // screen = content * scale + translate  => translate = screen - content * scale
      this.scale = newScale;
      this.tx = midX - this.pinchStart.cx * this.scale;
      this.ty = midY - this.pinchStart.cy * this.scale;

      this.snapUpdate();
      return;
    }

    // Single pointer: decide when to start panning
    if (this.maybePan && !this.isPanning) {
      const dx0 = e.clientX - this.downPos.x;
      const dy0 = e.clientY - this.downPos.y;
      if (Math.hypot(dx0, dy0) >= this.dragThreshold) {
        // Now we *start* panning
        this.galaxyTreeWrapper.nativeElement.setPointerCapture(e.pointerId);
        this.isPanning = true;
        this.dragged = true;
      }
    }

    if (this.isPanning) {
      const dx = e.clientX - this.lastPan.x;
      const dy = e.clientY - this.lastPan.y;
      this.lastPan = {x: e.clientX, y: e.clientY};

      this.tx += dx;
      this.ty += dy;
      this.snapUpdate();
    }
  }

  onPointerUp(e: PointerEvent) {
    if (this.pointers.has(e.pointerId)) {
      this.pointers.delete(e.pointerId);
    }
    if (this.pointers.size < 2) {
      // end pinch
      this.pinchStart.dist = 0;
    }

    if (this.isPanning) {
      try {
        this.galaxyTreeWrapper.nativeElement.releasePointerCapture(e.pointerId);
      } catch {
      }
      this.isPanning = false;

      // Prevent the synthetic 'click' that follows pointerup
      e.preventDefault();
      e.stopPropagation();
    }

    // If we never started panning (no movement), allow the click to bubble
    this.maybePan = false;
  }

  /* ---------- helpers ---------- */

  private zoomAt(screenX: number, screenY: number, factor: number) {
    const before = this.screenToContent(screenX, screenY);
    const newScale = this.clamp(this.scale * factor, this.minScale, this.maxScale);

    // If clamped, recompute factor so we keep pointer-stability
    const applied = newScale / this.scale;
    this.scale = newScale;

    // Adjust translation so content point under cursor remains fixed
    // screen = content * scale + translate -> translate = screen - content * scale
    this.tx = screenX - before.x * this.scale;
    this.ty = screenY - before.y * this.scale;

    this.snapUpdate();
  }

  private screenToContent(screenX: number, screenY: number) {
    // content = (screen - translate) / scale
    return {
      x: (screenX - this.tx) / this.scale,
      y: (screenY - this.ty) / this.scale
    };
  }

  private distance(a: { x: number, y: number }, b: { x: number, y: number }) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }

  private clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
  }

  private updateTransform() {
    this.transform = `translate(${this.tx}px, ${this.ty}px) scale(${this.scale})`;
  }

  private snapUpdate() {
    this.updateTransform();
    // Persist
    this.localStorageHelper.save({x: this.tx, y: this.ty, scale: this.scale}, 'viewport');
    // Update viewport bounds for culling
    this.updateViewportBounds();
  }

  isStarSelected(): boolean {
    return this.galaxyTreeService.hasSelectedGalaxyStar();
  }

  getSelectedStarName(): string {
    return this.galaxyTreeService.getSelectedGalaxyStar()?.displayName ?? 'None';
  }

  getSelectedStarDescription(): string {
    return this.galaxyTreeService.getSelectedGalaxyStar()?.getDescription() ?? 'None';
  }

  closeStarDetails() {
    this.galaxyTreeService.clearSelectedGalaxyStar();
  }

  getSelectedStarEffect() {
    return this.galaxyTreeService.getSelectedGalaxyStar()?.getEffectDisplay() ?? 'None';
  }

  getSelectedStarStyle(): string {
    return this.galaxyTreeService.getSelectedGalaxyStar()?.style ?? 'None';
  }

  protected readonly faWindowClose = faWindowClose;

  isSelectedStarBuyable(): boolean {
    return this.galaxyTreeService.getSelectedGalaxyStar()?.isBuyable() ?? false;
  }

  getSelectedStarCost(): string {
    const cost = this.galaxyTreeService.getSelectedGalaxyStar()?.cost.toString() ?? '0';
    const costHolding = this.galaxyTreeService.getSelectedGalaxyStar()?.currency.abbreviation ?? '';
    return `${cost} ${costHolding}`;
  }

  isSelectedStarMaxed(): boolean {
    return this.galaxyTreeService.getSelectedGalaxyStar()?.isMaxed() ?? false;
  }

  buySelectedStar(): void {
    this.galaxyTreeService.getSelectedGalaxyStar()?.buy();
  }

  canvasW = 10000;  // must match .tree-canvas size
  canvasH = 10000;

  resolveColor(star: GalaxyTreeUpgrade): string {
    switch (star.style) {
      case Styles.STAR_RED:
        return '#e83b1d';
      case Styles.STAR_ORANGE:
        return '#ff9633';
      case Styles.STAR_YELLOW:
        return '#ffd83b';
      case Styles.STAR_WHITE:
        return '#aab5ff';
      case Styles.STAR_BLUE:
        return '#5c83ff';
      default:
        return '#7a7a7a';
    }
  }

  respecGalaxyTree() {
    this.galaxyTreeService.respec()
  }

  confirmingRespec: boolean = false;

  isConfirmingRespec(): boolean {
    return this.confirmingRespec;
  }

  toggleConfirmRespec(): void {
    this.confirmingRespec = !this.confirmingRespec;
  }

  recenterGalaxyTree(): void {
    const wrapper = this.galaxyTreeWrapper.nativeElement;
    const rect = wrapper.getBoundingClientRect();

    // viewport center (in screen coordinates)
    const viewportCX = rect.width / 2;
    const viewportCY = rect.height / 2;

    // world coordinates of the root star
    const root = this.galaxyTreeStarRoot;
    const rootX = root.worldX;
    const rootY = root.worldY;

    // reset zoom
    this.scale = 1;

    // translation that brings root to the center of the viewport
    this.tx = viewportCX - rootX * this.scale;
    this.ty = viewportCY - rootY * this.scale;

    this.snapUpdate();
  }
}
