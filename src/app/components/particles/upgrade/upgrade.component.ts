import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {ComponentService} from "../../../services/component.service";
import {Subscription} from "rxjs";
import {EnhancementService} from "../../../services/enhancement.service";

@Component({
    selector: 'app-upgrade',
    templateUrl: './upgrade.component.html',
    styleUrls: ['./upgrade.component.css'],
    standalone: false
})
export class UpgradeComponent {
  @Input() upgrade: Upgrade = UpgradeRecord.redGeneratorExtension;
  private sub: Subscription;

  constructor(
    public cd: ChangeDetectorRef,
    private componentService: ComponentService,
    private enhancementService: EnhancementService
  ) {
    this.sub = this.componentService.reload$.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  buy() {
    if (this.isEnhancing()) {
      this.enhancementService.enhance(this.upgrade);
    } else if (this.getIsBuyable()) {
      this.upgrade.buy();
    }
  }

  getDescription() {
    return this.upgrade.getDescription();
  }

  getCost() {
    return this.upgrade.cost;
  }

  getCurrencyAbbreviation() {
    return this.upgrade.currency.abbreviation;
  }

  getDisplayName() {
    return this.upgrade.getDisplayName();
  }

  getIsBuyable(): boolean {
    return this.upgrade.isBuyable();
  }

  getEffect() {
    return this.upgrade.effectString();
  }

  getIsMaxed(): boolean {
    return this.upgrade.isMaxed();
  }


  isEnhancing(): boolean {
    return this.enhancementService.isEnhancing() && this.upgrade.canEnhance() && this.upgrade.enhancement !== this.enhancementService.enhancing;
  }

  getEnhancementStyle(): string {
    if (this.enhancementService.enhancing) {
      return this.enhancementService.enhancing.style;
    }
    return '';
  }

  isEnhanced() {
    return this.upgrade.enhancement !== null;
  }

  getEnhancedStyle() {
    return this.upgrade.enhancement?.style;
  }

  getEnhancementString(): string {
    if (this.enhancementService.enhancing) {
      return this.upgrade.enhancementString(
        this.enhancementService.enhancing
      );
    }
    return '';
  }

  getCostString() {
    return this.upgrade.getCostString();
  }
}
