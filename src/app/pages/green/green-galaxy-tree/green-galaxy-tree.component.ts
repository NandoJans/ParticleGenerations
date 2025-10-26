import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GalaxyTreeUpgrade} from "../../../classes/features/upgrades/galaxy-tree-upgrade";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {LocalStorageHelper} from "../../../classes/helpers/local-storage-helper";

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

  constructor() {

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

  private pointers = new Map<number, {x:number, y:number}>();
  private isPanning = false;
  private lastPan = {x: 0, y: 0};

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
    this.galaxyTreeWrapper.nativeElement.setPointerCapture(e.pointerId);
    this.pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});

    if (this.pointers.size === 1) {
      // Begin panning
      this.isPanning = true;
      this.lastPan = {x: e.clientX, y: e.clientY};
    } else if (this.pointers.size === 2) {
      // Begin pinch
      const [p1, p2] = Array.from(this.pointers.values());
      const rect = this.galaxyTreeWrapper.nativeElement.getBoundingClientRect();
      const midX = ((p1.x + p2.x) / 2) - rect.left;
      const midY = ((p1.y + p2.y) / 2) - rect.top;

      this.pinchStart.scale = this.scale;
      this.pinchStart.tx = this.tx;
      this.pinchStart.ty = this.ty;
      this.pinchStart.dist = this.distance(p1, p2);

      // Convert midpoint to content space (so we can keep it stable)
      const content = this.screenToContent(midX, midY);
      this.pinchStart.cx = content.x;
      this.pinchStart.cy = content.y;
    }
  }

  onPointerMove(e: PointerEvent) {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});

    if (this.pointers.size === 1 && this.isPanning) {
      // Pan with single finger / mouse drag
      const dx = e.clientX - this.lastPan.x;
      const dy = e.clientY - this.lastPan.y;
      this.lastPan = {x: e.clientX, y: e.clientY};

      this.tx += dx;
      this.ty += dy;
      this.snapUpdate();
    } else if (this.pointers.size === 2) {
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
    if (this.pointers.size === 0) {
      this.isPanning = false;
    }
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

  private distance(a: {x:number,y:number}, b: {x:number,y:number}) {
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
}
