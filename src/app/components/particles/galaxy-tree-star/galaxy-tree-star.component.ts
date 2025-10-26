import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewChild,
  HostListener
} from '@angular/core';
import {GalaxyTreeUpgrade, RequireParent} from "../../../classes/features/upgrades/galaxy-tree-upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {EnhancementService} from "../../../services/enhancement.service";
import {GalaxyTreeService} from "../../../services/galaxy-tree.service";

type Line = { x1:number; y1:number; x2:number; y2:number };

@Component({
    selector: 'app-galaxy-tree-star',
    templateUrl: './galaxy-tree-star.component.html',
    styleUrls: ['./galaxy-tree-star.component.css'],
    standalone: false
})
export class GalaxyTreeStarComponent implements OnInit, AfterViewInit {
  @Input() galaxyTreeStar: GalaxyTreeUpgrade = UpgradeRecord.unlockFirstGreenGenerator
  @ViewChild('starEl', { static: true }) starEl!: ElementRef<HTMLElement>;
  /** All descendant components (children are a subset) */
  @ViewChildren(GalaxyTreeStarComponent) descendantComps!: QueryList<GalaxyTreeStarComponent>;

  childLines: Line[] = [];

  constructor(
    private enhancementService: EnhancementService,
    public galaxyTreeService: GalaxyTreeService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Recalculate when descendants change (children mounted)
    this.descendantComps.changes.subscribe(() => this.updateChildLines());
    // Initial draw after first render
    queueMicrotask(() => this.updateChildLines());
  }


  /** Keep lines in place on viewport resize (pan/zoom transform doesn’t need special handling
   because the overlay SVG lives in the same transformed layer as the nodes). */
  @HostListener('window:resize')
  onResize() { this.updateChildLines(); }

  /** Call this after any state that may move/unlock nodes (e.g., buy). */
  private updateChildLines() {
    this.childLines = [];
    if (!this.galaxyTreeStar.hasBought()) return;

    const canvas = this.starEl.nativeElement.closest('.tree-canvas') as HTMLElement | null;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const parentRect = this.starEl.nativeElement.getBoundingClientRect();
    const p = this.center(parentRect, canvasRect);

    // Only direct children get a line
    const renderedChildren = this.descendantComps
      .toArray()
      .filter(c => c !== this)        // exclude self
      .filter(c => this.galaxyTreeStar.getChildren()?.includes(c.galaxyTreeStar));

    for (const childComp of renderedChildren) {
      // child might be hidden until unlocked, skip if DOM not visible
      const el = childComp.starEl?.nativeElement;
      if (!el || el.offsetParent === null) continue;

      const childRect = el.getBoundingClientRect();
      const c = this.center(childRect, canvasRect);

      this.childLines.push({ x1: p.x, y1: p.y, x2: c.x, y2: c.y });
    }
  }

  private center(nodeRect: DOMRect, canvasRect: DOMRect) {
    return {
      x: nodeRect.left - canvasRect.left + nodeRect.width / 2,
      y: nodeRect.top  - canvasRect.top  + nodeRect.height / 2,
    };
  }

  protected readonly faStar = faStar;

  buy() {
    if (this.isEnhancing()) {
      this.enhancementService.enhance(this.galaxyTreeStar);
    } else if (this.getIsBuyable()) {
      this.galaxyTreeStar.buy();
    }
  }

  getDescription() {
    return this.galaxyTreeStar.getDescription();
  }

  getCost() {
    return this.galaxyTreeStar.cost;
  }

  getCurrencyAbbreviation() {
    return this.galaxyTreeStar.currency.abbreviation;
  }

  getDisplayName() {
    return this.galaxyTreeStar.displayName;
  }

  getIsBuyable(): boolean {
    return this.galaxyTreeStar.isBuyable();
  }

  getEffect() {
    return this.galaxyTreeStar.effectString();
  }

  getIsMaxed(): boolean {
    return this.galaxyTreeStar.isMaxed();
  }


  isEnhancing(): boolean {
    return this.enhancementService.isEnhancing() && this.galaxyTreeStar.canEnhance() && this.galaxyTreeStar.enhancement !== this.enhancementService.enhancing;
  }

  getEnhancementStyle(): string {
    if (this.enhancementService.enhancing) {
      return this.enhancementService.enhancing.style;
    }
    return '';
  }

  isEnhanced() {
    return this.galaxyTreeStar.enhancement !== null;
  }

  getEnhancedStyle() {
    return this.galaxyTreeStar.enhancement?.style;
  }

  getEnhancementString(): string {
    if (this.enhancementService.enhancing) {
      return this.galaxyTreeStar.enhancementString(
        this.enhancementService.enhancing
      );
    }
    return '';
  }

  displayChildren() {
    return this.galaxyTreeStar.getChildren()?.length && this.galaxyTreeStar.hasBought()
  }

  openStarDetails() {
    console.log('openStarDetails');
    this.galaxyTreeService.setSelectedGalaxyStar(this.galaxyTreeStar);
  }

  isHidden() {
    // Returns true if one parent or every parent has been bought
    if (this.galaxyTreeStar.requireParent === RequireParent.ANY) {
      return this.galaxyTreeStar.getParents()?.some(p => !p.hasBought())
    } else if (this.galaxyTreeStar.requireParent === RequireParent.ALL) {
      return this.galaxyTreeStar.getParents()?.every(p => !p.hasBought())
    } else {
      return false;
    }
  }
}
