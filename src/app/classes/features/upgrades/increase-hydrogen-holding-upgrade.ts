import { Num } from "src/app/num";
import { ResetKey } from "../../enums/reset-key";
import { Styles } from "../../enums/styles";
import { Enhancement } from "../enhancements/enhancement";
import { Holding } from "../holding";
import { Requirement } from "../interfaces/requirement";
import {Upgrade} from "../upgrade";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class IncreaseHydrogenHoldingUpgrade extends Upgrade {
    name: string = 'increase-hydrogen-holding-upgrade';
    displayName: string = 'Increase Hydrogen Generation';
    override buffer: Num = new Num(1.2, 0);
    override baseBuffer: Num = new Num(1.2, 0);
    override limit: Num = new Num(5, 1);
    getDescription(): string {
        return `Multiply hydrogen generation by ${this.buffer.toString(2)}x.`;
    }
    type: string = 'increase-hydrogen-holding-upgrade';
    resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
    style: Styles = Styles.HYDROGEN;
    action(): Num {
      const effect = this.buffer.pow(this.amount);
      MultiplierRecord.hydrogenGenerators.correct(effect)
      if (this.hasBought()) {
        GeneratorRecord.hydrogenGenerator.amount = new Num(1, 0);
        GeneratorRecord.hydrogenGenerator.bought = new Num(1, 0);
        GeneratorRecord.hydrogenGenerator.unlocked = true;
      }
      return effect;
    }
    nav: string = 'yellow';
    subNav: string = 'yellowFusion';
    allowedEnhancements: Enhancement[] = [];
    enhancementString(enhancement: Enhancement): string {
        return "";
    }
    canEnhance(): boolean {
        return false;
    }
    enhance(): void {

    }
    baseCost: Num = new Num(1, 10);
    cost: Num = new Num(1, 10);
    override scaling: Num = new Num(2, 0);
    increase: Num = new Num(1, 1);
    startIncrease: Num = new Num(1, 1);
    bought: Num = new Num(0, 0);
    currency: Holding = HoldingRecord.yellowParticles;
    requirement: Requirement[] = [
      new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
    ];
}
