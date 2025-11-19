import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {DarkStarCharger} from '../../../classes/features/chargers/dark-star-charger';
import {ComponentService} from '../../../services/component.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dark-star-charger',
  imports: [],
  templateUrl: './dark-star-charger.component.html',
  styleUrl: './dark-star-charger.component.css',
})
export class DarkStarChargerComponent {
  @Input() charger!: DarkStarCharger;
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

  toggleNerf() {
    if (this.charger.isUnlocked()) {
      this.charger.toggleNerf();
    }
  }

  getDisplayName(): string {
    return this.charger.displayName;
  }

  getNerfDescription(): string {
    return this.charger.getNerfDescription();
  }

  getEffectDescription(): string {
    return this.charger.getEffectDescription();
  }

  getCharge(): string {
    return this.charger.charge.toString();
  }

  getTier(): string {
    return this.charger.tier.toString();
  }

  getMaxCharge(): string {
    return this.charger.maxCharge.toString();
  }

  isActive(): boolean {
    return this.charger.isActive();
  }

  isUnlocked(): boolean {
    return this.charger.isUnlocked();
  }
}
