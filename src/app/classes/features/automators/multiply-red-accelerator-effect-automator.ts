import {Automator} from "../automator";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export class MultiplyRedAcceleratorEffectAutomator extends Automator {
  displayName: string = 'Multiply Accelerator Effect';
  goal: Num = new Num(1, 20);
  goalString: string = "Have the effect from Faster Acceleration of 1e20x";
  name: string = 'multiply-red-accelerator-effect-automator';
  style: Styles = Styles.RED_AUTOMATOR;
  override unlocked: boolean = false;
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this),
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);

  buyables(): Buyable[] {
    return [
      UpgradeRecord.multiplyRedAcceleratorEffectUpgrade
    ];
  }

  task(): Num {
    return UpgradeRecord.multiplyRedAcceleratorGeneration.effect || new Num(1, 0);
  }
}
