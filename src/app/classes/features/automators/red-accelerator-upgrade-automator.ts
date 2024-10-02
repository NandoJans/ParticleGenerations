import {Automator} from "../automator";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {AcceleratorUpgradeRecord} from "../../records/upgrades/accelerator-upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class RedAcceleratorUpgradeAutomator extends Automator {
  displayName: string = 'Red Accelerator Upgrades Automator'
  name: string = 'red-accelerator-upgrades-automator'
  goal: Num = new Num(1, 50);
  goalString: string = ' ';

  buyables(): Buyable[] {
    return AcceleratorUpgradeRecord.list;
  }

  task(): Num {
    return HoldingRecord.redParticles.amount;
  }
}

