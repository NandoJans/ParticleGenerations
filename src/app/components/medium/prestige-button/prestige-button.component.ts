import { Component, OnInit, Input } from '@angular/core';
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {PrestigeLayer} from "../../../classes/features/prestiges/prestige-layer";
import {Num} from "../../../num";
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {Challenge} from "../../../classes/features/challenge";

@Component({
    selector: 'app-prestige-button',
    templateUrl: './prestige-button.component.html',
    styleUrls: ['./prestige-button.component.css'],
    standalone: false
})
export class PrestigeButtonComponent implements OnInit {
  @Input() prestigeLayer: PrestigeLayer = PrestigeLayersService.yellowPrestigeLayer;
  challenge: Challenge|undefined = undefined;

  constructor(
    private prestigeLayers: PrestigeLayersService,
    private challengeService: ChallengeService,
    public holdingRecord: HoldingRecord
  ) { }

  prestige(): void {
    if (this.inChallenge() && this.goalReached() && this.prestigeLayer.hasReached()) {
      this.challengeService.completeChallenge(this.prestigeLayer.name);
      this.prestigeLayers.prestige(this.prestigeLayer);
    }

    if (!this.inChallenge() && this.prestigeLayer.hasReached()) {
      this.prestigeLayers.prestige(this.prestigeLayer);
    }
  }

  ngOnInit(): void {

  }

  getDisplay(): string {
    return (this.prestigeLayer.isUnlocked()) ? '' : 'none';
  }

  getName(): string {
    return this.prestigeLayer.name.charAt(0).toUpperCase() + this.prestigeLayer.name.slice(1);
  }

  hasReached(): boolean {
    return this.prestigeLayer.hasReached();
  }

  getReached(): string {
    return (this.hasReached()) ? 'reached' : '';
  }

  firstTime(): boolean {
    return this.prestigeLayer.prestigedFirstTime
  }

  getFirstTimeText(): string {
    return this.prestigeLayer.firstTimeText;
  }

  getGainAmount(): Num {
    return this.prestigeLayer.holdingGain;
  }

  getGainHolding(): string {
    return this.prestigeLayer.idleGenerationHolding.displayName;
  }

  inChallenge(): boolean {
    return this.challengeService.inChallenge(this.prestigeLayer.name);
  }

  goalReached(): boolean {
    return this.challengeService.challengeGoalReached(this.prestigeLayer.name);
  }

  getChallenge(): Challenge|undefined {
    return this.challengeService.getChallenge(this.prestigeLayer.name);
  }

  getChallengeName(): string {
    return this.getChallenge()?.displayName ?? '';
  }

  getCompletionAmount(): string {
    return this.getChallenge()?.goal.toString() ?? '';
  }

  getCompletionHolding(): string {
    return this.getChallenge()?.getCurrency().displayName ?? '';
  }
}
