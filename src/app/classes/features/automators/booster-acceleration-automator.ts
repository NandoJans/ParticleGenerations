import {Automator} from "../automator";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Styles} from "../../enums/styles";

export class BoosterAccelerationAutomator extends Automator {
  displayName: string = 'Booster Acceleration Automator';
  goal: Num = new Num(1, 20);
  goalString: string = 'Booster Acceleration multiplier of at least 1e20x';
  name: string = 'booster-acceleration-automator';
  style: Styles = Styles.RED_AUTOMATOR;
  override unlocked: boolean = false;
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this)
  ];

  buyables(): Buyable[] {
    return [
      UpgradeRecord.boosterAccelerationUpgrade
    ];
  }

  task(): Num {
    return UpgradeRecord.boosterAccelerationUpgrade.effect || new Num(1, 0);
  }
}
