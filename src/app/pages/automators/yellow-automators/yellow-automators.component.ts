import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../classes/features/automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";

@Component({
    selector: 'app-yellow-automators',
    templateUrl: './yellow-automators.component.html',
    styleUrls: ['./yellow-automators.component.css'],
    standalone: false
})
export class YellowAutomatorsComponent implements OnInit {
  yellowPrestigeAutomator: Automator[] = [
    AutomatorRecord.yellowPrestige
  ]
  yellowUpgradeAutomators: Automator[] = [
    AutomatorRecord.multiplyRedGeneratorsYellow,
    AutomatorRecord.multiplyYellowParticlesYellow,
    AutomatorRecord.multiplyYellowKeysYellow,
    AutomatorRecord.yellowEnhancementAutomator
  ];
  yellowGeneratorAutomators: Automator[] = [
    AutomatorRecord.firstYellowGenerator,
    AutomatorRecord.secondYellowGenerator,
    AutomatorRecord.thirdYellowGenerator,
    AutomatorRecord.fourthYellowGenerator,
    AutomatorRecord.fifthYellowGenerator,
    AutomatorRecord.increaseYellowPowerUpgrade,
  ];
  yellowStarChallengeAutomators: Automator[] = [
    AutomatorRecord.proximaCentauriStarChallenge,
    AutomatorRecord.lalandeStarChallenge,
    AutomatorRecord.sunStarChallenge,
    AutomatorRecord.siriusStarChallenge,
  ]
  yellowFusionAutomators: Automator[] = [
    AutomatorRecord.fusionBoosterAcceleration,
    AutomatorRecord.yellowFusionUpgrades,
  ]
  yellowStarKeyAutomators: Automator[] = [
    AutomatorRecord.starKeyCompression,
    AutomatorRecord.starKeyUpgrades
  ]
  infoText: string[] = [
    'Yellow Automators manage the advanced automation for the yellow layer.',
    'Prestige Automator automatically performs yellow prestiges when beneficial.',
    'Yellow Upgrade Automators handle key yellow upgrades and fusion mechanics.',
    'Yellow Generator Automators manage all five tiers of yellow generators.',
    'These automators are essential for efficient yellow layer progression.',
    'Configure them carefully to optimize your advanced game progression!'
  ]

  constructor() { }

  ngOnInit(): void {
  }

  getToggleAllText() {
    if (this.oneIsActive()) {
      return "Deactivate All"
    } else {
      return "Activate All"
    }
  }

  private oneIsActive() {
    return AutomatorRecord.yellowAutomators.some(automator => automator.active)
  }

  toggleAll() {
    if (this.oneIsActive()) {
      AutomatorRecord.yellowAutomators.forEach(automator => automator.deactivate())
    } else {
      AutomatorRecord.yellowAutomators.forEach(automator => automator.activate())
    }
  }

  getToggleColor() {
    return this.oneIsActive() ? "red" : "green"
  }

}
