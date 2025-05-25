import { Component, OnInit, Input } from '@angular/core';
import {GalaxyTreeUpgrade} from "../../../classes/features/upgrades/galaxy-tree-upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {EnhancementService} from "../../../services/enhancement.service";

@Component({
  selector: 'app-galaxy-tree-star',
  templateUrl: './galaxy-tree-star.component.html',
  styleUrls: ['./galaxy-tree-star.component.css']
})
export class GalaxyTreeStarComponent implements OnInit {
  @Input() galaxyTreeStar: GalaxyTreeUpgrade = UpgradeRecord.unlockFirstGreenGenerator
  constructor(
    private enhancementService: EnhancementService
  ) { }

  ngOnInit(): void {
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
}
