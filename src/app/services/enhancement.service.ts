import { Injectable } from '@angular/core';
import {EnhancementRecord} from "../classes/records/enhancement-record";
import {Enhancement} from "../classes/features/enhancements/enhancement";
import {Enhancable} from "../classes/features/interfaces/enhancable";
import {Num} from "../num";
import {ResetHelper} from "../classes/helpers/reset-helper";
import {UpgradeRecord} from "../classes/records/upgrades/upgrade-record";
import {GeneratorRecord} from "../classes/records/generators/generator-record";

@Injectable({
  providedIn: 'root'
})
export class EnhancementService {
  enhancing: Enhancement|null = null;
  enhancementToEnhancables: { [key: string]: Enhancable[] } = {};

  constructor(
    private enhancementRecord: EnhancementRecord,
    private upgradeRecord: UpgradeRecord,
    private generatorRecord: GeneratorRecord,
  ) { }

  respecEnhancement(enhancement: Enhancement) {
    let returnHolding: Num = new Num(1, 0);
    Object.entries(enhancement.enhancables).forEach(([key, enhancable]) => {
      enhancable.enhancement = null;
      delete enhancement.enhancables[key];
      enhancement.getHolding().amount = enhancement.getHolding().amount.add(returnHolding);
      returnHolding = returnHolding.mul(new Num(2, 0));
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

  enhance(enhancable: Enhancable) {
    if (this.enhancing && enhancable.allowedEnhancements.includes(this.enhancing)) {
      this.enhancing.getHolding().amount = this.enhancing.getHolding().amount.sub(this.enhancing.getRequirement());
      enhancable.enhancement = this.enhancing;
      this.enhancing.add(enhancable);

      if (!this.enhancing.canEnhance()) {
        this.stopEnhancing();
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
    return enhancement.getHolding().amount.greq(requiredAmount);
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
    return this.enhancementToEnhancables[enhancement.name];
  }

  init() {
    EnhancementRecord.list.forEach(enhancement => {
      this.enhancementToEnhancables[enhancement.name] = [];
    })

    this.upgradeRecord.getList().forEach(upgrade => {
      upgrade.allowedEnhancements.forEach(enhancement => {
        this.enhancementToEnhancables[enhancement.name].push(upgrade);
      })
    })
    this.generatorRecord.getList().forEach(generator => {
      generator.allowedEnhancements.forEach(enhancement => {
        this.enhancementToEnhancables[enhancement.name].push(generator);
      })
      generator.getUpgrades().forEach(upgrade => {
        upgrade.allowedEnhancements.forEach(enhancement => {
          this.enhancementToEnhancables[enhancement.name].push(upgrade);
        });
      });
    })
  }
}
