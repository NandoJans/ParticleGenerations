import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {DarkStarCharger} from '../../../classes/features/chargers/dark-star-charger';
import {ComponentService} from '../../../services/component.service';
import {Subscription} from 'rxjs';
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {Styles} from "../../../classes/enums/styles";

@Component({
  selector: 'app-dark-star-charger',
  imports: [
    FontAwesomeModule
  ],
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

  protected readonly faLock = faLock;

  private getRequirement() {
    return this.charger.requirement.length > 0 ? this.charger.requirement[0] : undefined;
  }

  getRequirementStyle() {
    const requirement = this.getRequirement();
    if (requirement && 'getStyle' in requirement.requirement && requirement.requirement.getStyle instanceof Function) {
      return requirement.requirement.getStyle().toString();
    } else {
      return '';
    }
  }

  getRequirementAmount() {
    const requirement = this.getRequirement();
    if (requirement) {
      return requirement.amount.toString();
    } else {
      return '';
    }
  }

  getRequirementString() {
    const requirement = this.getRequirement();
    if (requirement && 'displayName' in requirement.requirement) {
      return requirement.requirement.displayName;
    } else {
      return '';
    }
  }
}
