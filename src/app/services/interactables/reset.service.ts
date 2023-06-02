import { Injectable } from '@angular/core';
import {GeneratorService} from "./generator.service";
import {UpgradeService} from "./upgrade.service";
import {Num} from "../../num";
import {HoldingsService} from "../holdings.service";
import {DataManagerService} from "../data-manager.service";
import {ChallengeService} from "./challenge.service";
import {AutomatorService} from "./automator.service";
import {MilestoneService} from "./milestone.service";
import {PrestigeLayersService} from "../prestige-layers.service";
import {CombinerService} from "./combiner.service";
import {App} from "../../App";
import {NavigationsService} from "../navigations.service";

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  static resetGenerators(type: string, filter: string = 'none') {
    GeneratorService.generators.forEach((generator) => {
      if (generator.resetId === type) {
        if (filter === 'none') generator.bought = new Num(0, 0);
        if (filter === 'none') generator.amount = new Num(0, 0);
        if (filter === 'amount') generator.amount = generator.bought.copy();
      }
    })
  }

  static resetUpgrades(type: string) {
    UpgradeService.upgrades.forEach((upgrade) => {
      if (upgrade.resetId === type) {
        upgrade.bought = new Num(0, 0);
        upgrade.amount = new Num(0, 0);
        if (upgrade.requirement[0] === 'never') upgrade.unlocked = false;
      }
    })
  }

  static resetChallenges(type: string) {
    ChallengeService.challenges.forEach((challenge) => {
      if (challenge.resetId === type) {
        challenge.completed = false;
      }
    })
  }

  static resetAutomators(type: string) {
    AutomatorService.automators.forEach((automator) => {
      if (automator.resetId === type) {
        automator.bought = new Num(0, 0);
      } else if (automator.name === type) {
        automator.bought = new Num(0, 0);
      }
    })
  }

  static resetMilestones(type: string) {
    MilestoneService.milestones.forEach((milestone) => {
      if (milestone.type === type) {
        milestone.unlocked = false;
      }
    })
  }

  static resetCombiners() {
    CombinerService.combiners.forEach((combiner) => {
      combiner.bought = new Num(0, 0);
    })
    CombinerService.combinations = [
      ['empty', 'empty', 1],
      ['empty', 'empty', 2],
      ['empty', 'empty', 3],
      ['empty', 'empty', 4],
      ['empty', 'empty', 5],
      ['empty', 'empty', 6],
    ];
  }

  static reset(resets: string) {
    App.startHaltNuclearDecay();
    HoldingsService.set('redParticles', HoldingsService.get('redParticlesStart').copy());
    HoldingsService.set('redAccelerators', HoldingsService.get('redAcceleratorsStart').copy());
    this.resetGenerators('redParticleGenerators')
    if (resets === 'redParticleGenerators') return;

    HoldingsService.set('yellowPower', new Num(0, 0));
    HoldingsService.set('redPurple', new Num(1, 0));
    HoldingsService.set('yellowPurple', new Num(1, 0));

    const requirement = MilestoneService.getValue('divide-yellow-fusion', 'requirement')
    if (HoldingsService.get(requirement[0]).greq(requirement[1])) {
      HoldingsService.get('yellowFusion').div(new Num(1, 110));
    } else {
      HoldingsService.set('yellowFusion', new Num(1, 0));
    }

    this.resetGenerators('red')
    this.resetGenerators('yellow', 'amount')
    this.resetUpgrades('red')
    DataManagerService.save()
    if (!HoldingsService.get('yellows').greq(new Num(5, 1))) App.next();
    if (resets === 'yellow') return;
    PrestigeLayersService.setValue('yellow', 'previousGain', new Num(1, 0))

    HoldingsService.set('yellowParticles', new Num(0, 0));
    HoldingsService.set('yellowPower', new Num(1, 0));
    HoldingsService.set('yellowFusionPower', new Num(2, -1));
    HoldingsService.set('greenEnergy', new Num(1, 0));
    HoldingsService.set('nuclearDecay', new Num(0, 0));
    HoldingsService.set('greenPurple', new Num(1, 0));

    if (!MilestoneService.isReached('autobuyers-no-reset')) {this.resetAutomators('red-automators')}
    this.resetUpgrades('yellow')
    this.resetGenerators('yellow')
    this.resetGenerators('green', 'amount')
    this.resetChallenges('yellow')
    PrestigeLayersService.setValue('yellow', 'fastestGainPS', new Num(0, 0))
    DataManagerService.save()
    if (!HoldingsService.get('greens').greq(new Num(5, 1))) App.next();
    if (resets === 'green') return;
    PrestigeLayersService.setValue('green', 'previousGain', new Num(1, 0))

    if (!HoldingsService.get('blues').greq(new Num(2, 0))) {
      HoldingsService.set('yellowFusion', new Num(1, 0));
      this.resetAutomators('red-automators')
      this.resetAutomators('yellow-automators')
      this.resetUpgrades('green')
    }
    HoldingsService.set('greenParticles', new Num(0, 0));
    HoldingsService.set('greenSouls', new Num(1, 0));
    HoldingsService.set('darkEnergy', new Num(0, 0));
    HoldingsService.set('darkEnergySubtract', new Num(0, 0));
    HoldingsService.set('darkPower', new Num(0, 0));
    HoldingsService.set('nuclearDecay', new Num(0, 0));
    HoldingsService.set('greenEnergy', new Num(1, 0));
    HoldingsService.set('blueNeutrons', new Num(1, 0));
    HoldingsService.set('bluePurple', new Num(1, 0));
    if (HoldingsService.get('blues').greq(new Num(3, 2))) {
      HoldingsService.set('yellowFusion', HoldingsService.get('yellowFusion').pow(new Num(7.5, -1), false));
    } else {
      HoldingsService.set('yellowFusion', new Num(1, 0));
    }
    HoldingsService.set('blueLight', new Num(0, 0));
    this.resetGenerators('green')
    if (HoldingsService.get('blues').greq(new Num(2, 2,))) {
      this.resetGenerators('nuclear', 'amount')
    } else {
      this.resetGenerators('nuclear')
    }
    this.resetUpgrades('green')
    this.resetChallenges('green')
    HoldingsService.set('blueHydrogen', new Num(1, 0))
    this.resetGenerators('blue', 'amount')

    PrestigeLayersService.setValue('green', 'fastestGainPS', new Num(0, 0))
    DataManagerService.save()
    if (!HoldingsService.get('blues').greq(new Num(5, 1)) && resets === 'blue') App.next();
    if (resets === 'blue') return;
    PrestigeLayersService.setValue('blue', 'previousGain', new Num(1, 0))

    HoldingsService.set('yellowFusion', new Num(1, 0));
    HoldingsService.set('blueParticles', new Num(0, 0));
    this.resetUpgrades('yellow')
    this.resetUpgrades('green')
    this.resetUpgrades('blue')
    this.resetGenerators('blue')
    this.resetGenerators('nuclear')
    this.resetUpgrades('nuclear')

    this.resetChallenges('blue')

    HoldingsService.set('blueHydrogen', new Num(1, 0))
    HoldingsService.set('blueLight', new Num(0, 0))
    HoldingsService.set('redAccelerators', new Num(1, 0))
    HoldingsService.set('redParticles', new Num(1, 2))
    HoldingsService.set('purpleVoid', new Num(1, 0))
    HoldingsService.set('blackHoleMass', new Num(1, 0))
    HoldingsService.set('yellows', new Num(0, 0))
    HoldingsService.set('greens', new Num(0, 0))
    HoldingsService.set('blues', new Num(0, 0))

    PrestigeLayersService.setValue('yellow', 'unlocked', false);
    PrestigeLayersService.setValue('green', 'unlocked', false);
    PrestigeLayersService.setValue('blue', 'unlocked', false);

    NavigationsService.lockNavigation('yellow')
    NavigationsService.lockNavigation('green')
    NavigationsService.lockNavigation('blue')

    this.resetUpgrades('blueUpgrades')
    this.resetGenerators('nuclearDecay')
    this.resetUpgrades('nuclear-decay')
    this.resetUpgrades('red-upgrades')
    this.resetUpgrades('yellow-upgrades')
    this.resetUpgrades('blue-upgrade')
    this.resetUpgrades('blue-light-upgrade')
    this.resetGenerators('blueParticleGenerators')
    this.resetGenerators('blue-light')
    this.resetCombiners()

    this.resetUpgrades('red-purple-upgrade')
    this.resetUpgrades('yellow-purple-upgrade')
    this.resetUpgrades('green-purple-upgrade')
    this.resetUpgrades('blue-purple-upgrade')

    this.resetGenerators('red-purple-generator')
    this.resetGenerators('yellow-purple-generator')
    this.resetGenerators('green-purple-generator')
    this.resetGenerators('blue-purple-generator')
    this.resetGenerators('purple-particles', 'amount')

    UpgradeService.setValue('red-generator-extension-upgrade', 'bought', new Num(1, 0));
    PrestigeLayersService.setValue('blue', 'fastestGainPS', new Num(0, 0))
    DataManagerService.save()
    if (resets === 'purple') return;
    PrestigeLayersService.setValue('purple', 'previousGain', new Num(1, 0))
  }
}
