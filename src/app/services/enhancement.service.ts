import { Injectable } from '@angular/core';
import {EnhancementRecord} from "../classes/records/enhancement-record";
import {Enhancement} from "../classes/features/enhancements/enhancement";
import {Enhancable} from "../classes/features/interfaces/enhancable";
import {Num} from "../num";
import {ResetHelper} from "../classes/helpers/reset-helper";
import {UpgradeRecord} from "../classes/records/upgrades/upgrade-record";
import {GeneratorRecord} from "../classes/records/generators/generator-record";
import {StatsService} from "./stats.service";
import {ChallengeRecord} from "../classes/records/challenges/challenge-record";
import {YellowStarChallenge} from "../classes/features/challenges/yellow-star-challenge";

@Injectable({
  providedIn: 'root'
})
export class EnhancementService {
  enhancing: Enhancement|null = null;
  static enhancementToEnhancables: { [key: string]: Enhancable[] } = {}

  constructor(
    private enhancementRecord: EnhancementRecord,
    private upgradeRecord: UpgradeRecord,
    private generatorRecord: GeneratorRecord,
  ) { }

  respecEnhancement(enhancement: Enhancement) {
    let returnHolding: Num = new Num(1, 0);
    const scalesRefund = enhancement !== EnhancementRecord.green;
    Object.entries(enhancement.enhancables).forEach(([key, enhancable]) => {
      enhancable.enhancement = null;
      delete enhancement.enhancables[key];
      enhancement.getHolding().amount = enhancement.getHolding().amount.add(returnHolding);
      if (scalesRefund) returnHolding = returnHolding.mul(new Num(2, 0));
    })
    ResetHelper.reset(enhancement.respecResetKey);
  }

  isEnhancing(): boolean {
    return this.enhancing !== null;
  }

  getEnhancing(): Enhancement|null {
    return this.enhancing;
  }

  canEnhance(enhancement: Enhancement): boolean {
    return this.enhancing === null && enhancement.canEnhance();
  }

  startEnhancing(enhancement: Enhancement) {
    if (this.canEnhance(enhancement)) {
      this.enhancing = enhancement;
    }
  }

  static enhance(enhancable: Enhancable, enhancement: Enhancement) {
    if (enhancable.allowedEnhancements.includes(enhancement)) {
      enhancement.getHolding().amount = enhancement.getHolding().amount.sub(enhancement.getRequirement());
      enhancable.enhancement = enhancement;
      enhancement.add(enhancable);
      StatsService.addNum(enhancement.name, 'totalEnhancements', new Num(1, 0));
    }
  }

  enhance(enhancable: Enhancable) {
    if (this.enhancing && enhancable.allowedEnhancements.includes(this.enhancing)) {
      this.enhancing.getHolding().amount = this.enhancing.getHolding().amount.sub(this.enhancing.getRequirement());
      enhancable.enhancement = this.enhancing;
      this.enhancing.add(enhancable);
      StatsService.addNum(this.enhancing.name, 'totalEnhancements', new Num(1, 0));

      if (!this.enhancing.canEnhance()) {
        this.stopEnhancing()
      }
    }
  }

  enhanceAll(enhancement: Enhancement) {
    // Get all enhancables that can be enhanced
    if (this.canEnhanceAll(enhancement)) {
      const enhancables = this.getUnenhanced(enhancement);
      enhancables.forEach(enhancable => this.enhance(enhancable));
    }
  }

  canEnhanceAll(enhancement: Enhancement): boolean {
    const enhancableCount = this.getUnenhanced(enhancement).length;
    const requiredAmount = new Num(2, 0).pow(new Num(enhancableCount + 1, 0)).sub(Num.ONE);
    return enhancement.getHolding().amount.greq(requiredAmount)
  }

  private getUnenhanced(enhancement: Enhancement): Enhancable[] {
    return this.getAllowedEnhancables(enhancement).filter(enhancable => enhancable.enhancement === null);
  }

  tick() {
    this.enhancementRecord.getList().forEach(enhancement => {
      enhancement.run();
    })
  }

  stopEnhancing() {
    this.enhancing = null;
  }

  getAllowedEnhancables(enhancement: Enhancement): Enhancable[] {
    return EnhancementService.enhancementToEnhancables[enhancement.name] ?? [];
  }

  init() {
    EnhancementRecord.list.forEach(enhancement => {
      EnhancementService.enhancementToEnhancables[enhancement.name] = [];
    })

    this.upgradeRecord.getList().forEach(upgrade => {
      this.allowGreenEnhancement(upgrade);
      upgrade.allowedEnhancements.forEach(enhancement => {
        this.registerAllowedEnhancable(enhancement, upgrade);
      })
    })
    this.generatorRecord.getList().forEach(generator => {
      this.allowGreenEnhancement(generator);
      generator.allowedEnhancements.forEach(enhancement => {
        this.registerAllowedEnhancable(enhancement, generator);
      })
      generator.getUpgrades().forEach(upgrade => {
        this.allowGreenEnhancement(upgrade);
        upgrade.allowedEnhancements.forEach(enhancement => {
          this.registerAllowedEnhancable(enhancement, upgrade);
        });
      });
    })
    ChallengeRecord.list.forEach(challenge => {
      if (challenge instanceof YellowStarChallenge) {
        challenge.allowedEnhancements.forEach(enhancement => {
          this.registerAllowedEnhancable(enhancement, challenge);
        });
      }
    });
  }


  private registerAllowedEnhancable(enhancement: Enhancement, enhancable: Enhancable): void {
    const allowed = EnhancementService.enhancementToEnhancables[enhancement.name];
    if (!allowed.includes(enhancable)) allowed.push(enhancable);
  }

  private allowGreenEnhancement(enhancable: Enhancable & { nav?: string }): void {
    if (enhancable.nav === 'yellow' && !enhancable.allowedEnhancements.includes(EnhancementRecord.green)) {
      enhancable.allowedEnhancements.push(EnhancementRecord.green);
    }
  }

  atMaxEnhancements(enhancement: Enhancement) {
    return this.getAllowedEnhancables(enhancement).length === Object.keys(enhancement.enhancables).length;
  }
}
