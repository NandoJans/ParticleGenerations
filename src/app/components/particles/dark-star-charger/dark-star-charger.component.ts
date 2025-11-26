import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ComponentService} from '../../../services/component.service';
import {Subscription} from 'rxjs';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from '@angular/common';
import {Charger} from "../../../classes/features/charger";
import {RedGeneratorDarkStarCharger} from "../../../classes/features/chargers/red-generator-dark-star-charger";
import {Num} from "../../../num";
import {faPlay, faPause, faLock, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {ChallengeRecord} from "../../../classes/records/challenges/challenge-record";
import {DropDownMessageService} from "../../../services/visuals/drop-down-message.service";
import {RomanNumeralsHelper} from "../../../classes/helpers/roman-numerals-helper";

@Component({
  selector: 'app-dark-star-charger',
  imports: [
    FontAwesomeModule,
    CommonModule
  ],
  templateUrl: './dark-star-charger.component.html',
  styleUrl: './dark-star-charger.component.css',
})
export class DarkStarChargerComponent {
  @Input() charger: Charger = new RedGeneratorDarkStarCharger("redGeneratorDarkStarCharger");
  private sub: Subscription;

  // FontAwesome icons
  faPlay = faPlay;
  faPause = faPause;
  faArrowUp = faArrowUp;

  constructor(
    public cd: ChangeDetectorRef,
    private componentService: ComponentService,
    private dropDownMessageService: DropDownMessageService
  ) {
    this.sub = this.componentService.reload$.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleCharging() {
    if (ChallengeRecord.currentChallenges['green'] === ChallengeRecord.darkGalaxy) {
      this.dropDownMessageService.dropDown("Error", "Cannot toggle charging while in Dark Galaxy Challenge.", 'error');
      return;
    }
    if (this.charger.charging) {
      this.charger.stopCharging();
    } else {
      this.charger.startCharging();
    }
  }

  toggleCollapsed() {
    this.charger.collapsed = !this.charger.collapsed;
  }

  isCollapsed(): boolean {
    return this.charger.collapsed;
  }

  getProgress(): number {
    if (this.charger.getCharge().lte(new Num(0, 0))) {
      return 0;
    }
    if (this.charger.getCharge().greq(this.charger.maxCharge)) {
      return 100;
    }

    // Logarithmic scaling
    const start = new Num(1, 0);
    const goal = this.charger.maxCharge.div(start);
    const progress = this.charger.getCharge().div(start);

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
    return `${this.charger.getCharge().toString()}/${this.charger.maxCharge.toString()}`;
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

  getChargerType(): string {
    // Extract the type from the charger name (e.g., "red-generator-dark-star-charger" -> "red")
    const name = this.charger.saveName || this.charger.name || '';
    if (name.startsWith('red')) return 'red';
    if (name.startsWith('yellow')) return 'yellow';
    if (name.startsWith('star')) return 'star';
    if (name.startsWith('combine')) return 'combine';
    return 'default';
  }

  getCollapsedEffectDisplay(): string {
    const breakdown = this.getEffectBreakdown();
    return breakdown.effects.length > 0 ? breakdown.effects[breakdown.effects.length - 1] : '';
  }

  isFirstUnlocked(): boolean {
    return this.charger.isFirstUnlocked();
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

  getTierRomanNumerals(): string {
    return RomanNumeralsHelper.convert(this.charger.tier.toNumber());
  }

  getHighestTierRomanNumerals() {
    return RomanNumeralsHelper.convert(this.charger.highestTier.toNumber());
  }

  canTierUp(): boolean {
    return this.charger.canTierUp();
  }

  tierUp(): void {
    if (this.charger.canTierUp()) {
      this.charger.tierUp();
    }
  }

  getTierMilestoneBoostDescription(): string {
    return this.charger.getTierMilestoneBoostDescription();
  }

  protected readonly faArrowDown = faArrowDown;

  canNavigateToTier(number: number): boolean {
    const num: Num = new Num(number, 0);
    return this.charger.canSwitchTier(this.charger.tier.add(num));
  }

  navigateTier(number: number) {
    if (ChallengeRecord.currentChallenges['green'] === ChallengeRecord.darkGalaxy) {
      this.dropDownMessageService.dropDown("Error", "Cannot navigate to tier while in Dark Galaxy Challenge.", 'error');
      return;
    }
    if (!this.canNavigateToTier(number)) {
      return;
    }
    this.charger.switchTier(this.charger.tier.add(new Num(number, 0)));
  }
}
