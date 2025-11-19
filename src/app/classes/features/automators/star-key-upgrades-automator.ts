import {Styles} from "../../enums/styles";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Automator} from "../automator";

export class StarKeyUpgradesAutomator extends Automator {
  name: string = "star-key-upgrades-automator";
  displayName: string = "Star Key Upgrades Automator";
  style: Styles = Styles.YELLOW;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.increaseKeyAmountStarKeySub,
      UpgradeRecord.compressionSpeedStarKeySub,
      UpgradeRecord.decreaseMultiplyYellowKeysScalingStarKeySub
    ];
  }
  goal: Num = new Num(1, 2);
  goalString: string = "Reach 100 star keys.";
  task(): Num {
    return HoldingRecord.starKeys.amount;
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 350), this),
  ];
}
