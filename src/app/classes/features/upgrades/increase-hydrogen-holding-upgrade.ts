import { Num } from "src/app/num";
import { ResetKey } from "../../enums/reset-key";
import { Styles } from "../../enums/styles";
import { Enhancement } from "../enhancements/enhancement";
import { Holding } from "../holding";
import { Requirement } from "../interfaces/requirement";
import {Upgrade} from "../upgrade";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class IncreaseHydrogenHoldingUpgrade extends Upgrade {
    name: string = 'increase-hydrogen-holding-upgrade';
    displayName: string = 'Add Hydrogen';
    override buffer: Num = new Num(1, 0);
    override baseBuffer: Num = new Num(1, 0);
    getDescription(): string {
        return `Add ${this.buffer.toString()} Hydrogen to your Hydrogen Holding.`;
    }
    type: string = 'increase-hydrogen-holding-upgrade';
    resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
    style: Styles = Styles.HYDROGEN;
    action(): Num {
      const effect = this.amount.copy();
      HoldingRecord.hydrogen.amount = effect.copy();
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
    baseCost: Num = new Num(1, 1);
    cost: Num = new Num(1, 1);
    increase: Num = new Num(1, 1);
    bought: Num = new Num(0, 0);
    currency: Holding = HoldingRecord.yellowFusion;
    requirement: Requirement[] = [
      new Requirement(HoldingRecord.yellowParticles, new Num(1, 13), this),
    ];
}
