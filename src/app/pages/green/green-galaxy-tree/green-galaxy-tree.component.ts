import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GalaxyTreeUpgrade} from "../../../classes/features/upgrades/galaxy-tree-upgrade";
import {faArrowDown, faArrowUp, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {LocalStorageHelper} from "../../../classes/helpers/local-storage-helper";
import {GalaxyTreeService} from "../../../services/galaxy-tree.service";
import {Styles} from "../../../classes/enums/styles";

@Component({
  selector: 'app-green-galaxy-tree',
  templateUrl: './green-galaxy-tree.component.html',
  styleUrls: ['./green-galaxy-tree.component.css'],
  standalone: false
})
export class GreenGalaxyTreeComponent implements OnInit {
  darkEnergy: Holding = HoldingRecord.darkEnergy;
  upgrades: Upgrade[] = [
    UpgradeRecord.redParticleSacrifice,
    UpgradeRecord.yellowParticleSacrifice,
    UpgradeRecord.greenParticleSacrifice,
  ];
  galaxyTreeStarRoot: GalaxyTreeUpgrade = UpgradeRecord.unlockFirstGreenGenerator;
  infoText: string[] = [
    'The Green Galaxy Tree represents the ultimate progression system in Particle Generations!',
    'Dark Energy is the currency for this tree, earned through particle sacrifices.',
    'The galaxy tree features a branching upgrade system where each node unlocks new paths and possibilities.',
    'Particle Sacrifice upgrades convert your accumulated particles into Dark Energy for permanent benefits.',
    'Navigate the tree strategically - each path offers different bonuses and unlocks.',
    'This is the endgame content - master the galaxy tree to achieve maximum power!'
  ]
  @ViewChild('galaxyTreeWrapper') galaxyTreeWrapper!: ElementRef;

  bottomSectionOpen: boolean = true;

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('pages', 'green-galaxy-tree');
  protected readonly faArrowUp = faArrowUp;

  protected readonly faArrowDown = faArrowDown;
  constructor(
    public galaxyTreeService: GalaxyTreeService,
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
  }

  getStars(): GalaxyTreeUpgrade[] {
    return this.galaxyTreeService.getStars();
  }

  private setPositions() {
    UpgradeRecord.unlockFirstGreenGenerator.setPos(0, 0);
    // Children are increaseRedGeneratorMultiplier, cheaperBoosterAcceleration, fasterHydrogenGeneration

    UpgradeRecord.increaseRedGeneratorMultiplier.setPos(125, 0);
    // Children are strongerRedExtensionGalaxyTree
    UpgradeRecord.strongerRedExtensionGalaxyTree.setPos(225, -75);

    UpgradeRecord.cheaperBoosterAcceleration.setPos(-125, 0);
    // Children are redAcceleratorStart, increaseBoosterAccelerationPower
    UpgradeRecord.redAcceleratorStart.setPos(-225, 75);
    UpgradeRecord.increaseBoosterAccelerationPower.setPos(-225, -50);

    UpgradeRecord.fasterHydrogenGeneration.setPos(0, 125);
    // Children are strongerHydrogenPower, improveYellowFusion
    UpgradeRecord.strongerHydrogenGalaxyTree.setPos(75, 225);
    UpgradeRecord.improveYellowFusion.setPos(-75, 225);
    // Children are yellowFusionBoostRedAccelerators
    UpgradeRecord.yellowFusionBoostRedAccelerators.setPos(-200, 200);

    UpgradeRecord.strongerYellowPower.setPos(0, -125);
    // Children are moreYellowKeys
    UpgradeRecord.moreYellowKeys.setPos(75, -225);
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
