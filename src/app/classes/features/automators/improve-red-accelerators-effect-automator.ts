import {Automator} from "../automator";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {Requirement} from "../interfaces/requirement";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export class ImproveRedAcceleratorsEffectAutomator extends Automator {
  displayName: string = 'Better Acceleration Automator';
  goal: Num = new Num(1, 10);
  goalString: string = 'Have the effect of Red Accelerators be at least 1e10x';
  name: string = 'improve-red-accelerators-effect-automator';
  style: Styles = Styles.RED_AUTOMATOR;
  override unlocked: boolean = false;
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this)
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);

  buyables(): Buyable[] {
    return [
      UpgradeRecord.improveRedAcceleratorsEffect
    ];
  }

  task(): Num {
    return HoldingRecord.redAccelerators.effect || new Num(1, 0);
  }
}
