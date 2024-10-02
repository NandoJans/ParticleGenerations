import {Automator} from "../automator";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class RedGeneratorBoosterAutomator extends Automator {
  displayName: string = 'Booster Automator'
  name: string = 'red-booster-automator'
  goal: Num = new Num(1, 50);
  goalString: string = ' ';

  buyables(): Buyable[] {
    return [UpgradeRecord.redGeneratorBooster];
  }

  task(): Num {
    return HoldingRecord.redParticles.amount;
  }
}
