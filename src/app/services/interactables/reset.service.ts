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

  static reset(resets: string) {
    HoldingsService.set('redParticles', HoldingsService.get('redParticlesStart').copy());
    HoldingsService.set('redAccelerators', HoldingsService.get('redAcceleratorsStart').copy());
    this.resetGenerators('redParticleGenerators')
    if (resets === 'redParticleGenerators') return;

    HoldingsService.set('yellowPower', new Num(0, 0));

    const requirement = MilestoneService.getValue('divide-yellow-fusion', 'requirement')
    if (HoldingsService.get(requirement[0]).greq(requirement[1])) {
      HoldingsService.get('yellowFusion').div(new Num(1, 110));
    } else {
      HoldingsService.set('yellowFusion', new Num(1, 0));
    }

    this.resetGenerators('redAccelerators')
    this.resetGenerators('yellowParticleGenerators', 'amount')
    this.resetUpgrades('red-accelerators')
    this.resetUpgrades('red-particles')
    this.resetUpgrades('red-upgrades')
    DataManagerService.save()
    if (!HoldingsService.get('yellows').greq(new Num(5, 1))) window.location.reload();
    if (resets === 'yellow') return;
    HoldingsService.set('yellowParticles', new Num(0, 0));
    HoldingsService.set('yellowPower', new Num(1, 0));
    HoldingsService.set('yellowFusionPower', new Num(2, -1));
    HoldingsService.set('greenEnergy', new Num(1, 0));
    HoldingsService.set('nuclearDecay', new Num(0, 0));
    if (!MilestoneService.isReached('autobuyers-no-reset')) {this.resetAutomators('red-automators')}
    this.resetAutomators('go-yellow-automator')
    this.resetUpgrades('yellow-upgrades')
    this.resetGenerators('yellowParticleGenerators')
    this.resetGenerators('yellowFusionGenerators')
    this.resetGenerators('greenParticleGenerators', 'amount')
    this.resetGenerators('nuclearDecay', 'amount')
    this.resetUpgrades('yellow-fusion')
    this.resetChallenges('yellow-challenges')
    DataManagerService.save()
    if (!HoldingsService.get('greens').greq(new Num(5, 1))) window.location.reload();
    if (resets === 'green') return;

    if (!HoldingsService.get('blues').greq(new Num(2, 0))) {
      HoldingsService.set('yellowFusion', new Num(1, 0));
      this.resetAutomators('red-automators')
      this.resetAutomators('yellow-automators')
      this.resetUpgrades('green-fusion')
      this.resetUpgrades('green-upgrades')
    }
    HoldingsService.set('greenParticles', new Num(0, 0));
    HoldingsService.set('greenSouls', new Num(1, 0));
    HoldingsService.set('darkEnergy', new Num(0, 0));
    HoldingsService.set('darkEnergySubtract', new Num(0, 0));
    HoldingsService.set('darkPower', new Num(0, 0));
    HoldingsService.set('nuclearDecay', new Num(0, 0));
    HoldingsService.set('greenEnergy', new Num(1, 0));
    HoldingsService.set('blueNeutrons', new Num(1, 0));
    if (HoldingsService.get('blues').greq(new Num(3, 2))) {
      HoldingsService.set('yellowFusion', new Num(1, 50000));
    } else {
      HoldingsService.set('yellowFusion', new Num(1, 0));
    }
    HoldingsService.set('blueLight', new Num(0, 0));
    this.resetGenerators('greenParticleGenerators')
    if (!HoldingsService.get('blues').greq(new Num(2, 2))) {
      this.resetGenerators('nuclearDecay')
      this.resetUpgrades('nuclear-decay')
    }
    this.resetUpgrades('dark-compressor')
    this.resetUpgrades('green-upgrades-repeatable')
    this.resetUpgrades('dark-upgrade')
    this.resetUpgrades('green-sacrifices')
    this.resetUpgrades('green-limited-upgrades')
    this.resetUpgrades('dark-upgrades')
    this.resetChallenges('dark-age')
    HoldingsService.set('blueHydrogen', new Num(1, 0))
    this.resetGenerators('blueParticleGenerators', 'amount')
    DataManagerService.save()
    if (!HoldingsService.get('blues').greq(new Num(5, 1)) && resets === 'blue') window.location.reload();
    if (resets === 'blue') return;

    HoldingsService.set('yellowFusion', new Num(1, 0));
    HoldingsService.set('yellows', new Num(0, 0));
    HoldingsService.set('greens', new Num(0, 0));
    HoldingsService.set('blueParticles', new Num(0, 0));
    this.resetAutomators('green-automators')
    this.resetUpgrades('green-fusion')
    this.resetUpgrades('green-upgrades')
    this.resetUpgrades('blue-neutron-upgrade')
    this.resetUpgrades('blue-limited-upgrades')
    this.resetGenerators('blue-neutrons')
    this.resetGenerators('nuclearDecay')
    this.resetUpgrades('nuclear-decay')

    DataManagerService.save()
    if (!HoldingsService.get('blues').greq(new Num(5, 1))) window.location.reload();
    if (resets === 'neutron-star') return;
  }
}
