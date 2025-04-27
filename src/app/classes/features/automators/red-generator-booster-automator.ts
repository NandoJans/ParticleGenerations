import {Automator} from "../automator";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {Styles} from "../../enums/styles";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export class RedGeneratorBoosterAutomator extends Automator {
  displayName: string = 'Red Generator Booster Automator';
  goal: Num = new Num(1, 1);
  goalString: string = 'Have a total multiplier of 10x';
  name: string = 'red-generator-booster-automator';
  style: Styles = Styles.RED_AUTOMATOR;
  override unlocked: boolean = false;
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 1), this),
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);

  buyables(): Buyable[] {
    return [
      UpgradeRecord.redGeneratorBooster,
    ];
  }

  task(): Num {
    return UpgradeRecord.redGeneratorBooster.effect || new Num(1, 0);
  }

}
