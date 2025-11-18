import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {Charger} from "../../../classes/features/charger";
import {RedGeneratorDarkStarCharger} from "../../../classes/features/chargers/red-generator-dark-star-charger";
import {ComponentService} from "../../../services/component.service";
import {Subscription} from "rxjs";
import {Num} from "../../../num";
import {NgIf, NgFor} from "@angular/common";

@Component({
  selector: 'app-dark-star-charger',
  imports: [NgIf, NgFor],
  templateUrl: './dark-star-charger.component.html',
  styleUrl: './dark-star-charger.component.css',
})
export class DarkStarChargerComponent {
  @Input() charger: Charger = new RedGeneratorDarkStarCharger("redGeneratorDarkStarCharger");
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

  toggleCharging() {
    this.charger.charging = !this.charger.charging;
  }

  getProgress(): number {
    if (this.charger.amount.leq(new Num(0, 0))) {
      return 0;
    }
    if (this.charger.amount.geq(this.charger.max)) {
      return 100;
    }
    
    // Logarithmic scaling
    const start = new Num(1, 0);
    const goal = this.charger.max.div(start);
    const progress = this.charger.amount.div(start);
    
    const percentage = progress.log(10)
      .div(goal.log(10))
      .mul(new Num(1, 2))
      .toNumber();
    
    if (percentage > 100) {
      return 100;
    } else if (percentage < 0) {
      return 0;
    } else {
      return percentage;
    }
  }

  getAmountDisplay(): string {
    return `${this.charger.amount.toString()}/${this.charger.max.toString()}`;
  }

  getDisplayName(): string {
    return this.charger.displayName;
  }

  isCharging(): boolean {
    return this.charger.charging;
  }

  getNerfDescription(): string {
    return this.charger.getNerfDescription();
  }

  getChargeDescription(): string {
    return this.charger.getChargeDescription();
  }

  getRewardDescription(): string {
    return this.charger.getRewardDescription();
  }

  getEffectBreakdown(): {formula: string, effects: string[]} {
    return this.charger.getEffectBreakdown();
  }
}
