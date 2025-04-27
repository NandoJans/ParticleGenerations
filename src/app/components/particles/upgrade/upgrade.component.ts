import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {ComponentService} from "../../../services/component.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent {
  @Input() upgrade: Upgrade = UpgradeRecord.redGeneratorExtension;
  private sub: Subscription;

  constructor(
    public cd: ChangeDetectorRef,
    private componentService: ComponentService
  ) {
    this.sub = this.componentService.reload$.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  buy() {
    if (this.getIsBuyable()) {
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
    return this.upgrade.displayName;
  }

  getIsBuyable(): boolean {
    return this.upgrade.isBuyable();
  }

  getEffect() {
    return this.upgrade.effectString();
  }
}
