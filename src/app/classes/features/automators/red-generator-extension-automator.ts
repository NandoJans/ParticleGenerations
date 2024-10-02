import {Automator} from "../automator";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class RedGeneratorExtensionAutomator extends Automator {
  displayName: string = 'Extension Automator'
  name: string = 'red-extension-automator'
  goal: Num = new Num(1, 50);
  goalString: string = ' ';

  buyables(): Buyable[] {
    return [UpgradeRecord.redGeneratorExtension];
  }

  task(): Num {
    return HoldingRecord.redParticles.amount;
  }
}
