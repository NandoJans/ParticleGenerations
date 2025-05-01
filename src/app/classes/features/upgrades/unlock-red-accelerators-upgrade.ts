import {Upgrade} from "../upgrade";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import { Enhancement } from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";

export class UnlockRedAcceleratorsUpgrade extends Upgrade {
  baseCost: Num = new Num(1, 75);
  bought: Num = new Num(0, 0);
  cost: Num = new Num(1, 75);
  currency: Holding = HoldingRecord.redParticles;
  displayName: string = 'Unlock Red Accelerators';
  increase: Num = new Num(1, 0);
  name: string = 'Unlock Red Accelerators';
  nav: string = 'red';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this),
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_BOOSTER_ACCELERATION, this);
  style: Styles =  Styles.RED_ACCELERATOR_UNLOCK;
  subNav: string = 'red-accelerators';
  type: string = 'unlock';
  override oneTime: boolean = true;

  action(): undefined {
    if (this.hasBought()) {
      GeneratorRecord.redAcceleratorGenerator.amount = new Num(1, 0);
      GeneratorRecord.redAcceleratorGenerator.bought = new Num(1, 0);
      GeneratorRecord.redAcceleratorGenerator.unlocked = true;
    } else {
      HoldingRecord.redAccelerators.amount = new Num(1, 0);
      HoldingRecord.redAccelerators.powEffect = new Num(1, 0);
      HoldingRecord.redAccelerators.mulEffect = new Num(1, 0);
      GeneratorRecord.redAcceleratorGenerator.amount = new Num(0, 0);
      GeneratorRecord.redAcceleratorGenerator.bought = new Num(0, 0);
      GeneratorRecord.redAcceleratorGenerator.unlocked = false;
    }
    return undefined;
  }

  getDescription(): string {
    return "";
  }

  allowedEnhancements: Enhancement[] = [
    EnhancementRecord.yellow,
  ];
  enhancementString(enhancement:Enhancement): string {
    return "Remove the red accelerator unlock requirement.";
  }
  canEnhance(): boolean {
    return true;
  }
  enhance(): void {
    this.bought = new Num(1, 0);
  }
}
