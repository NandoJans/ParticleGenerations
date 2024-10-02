import {Automator} from "../automator";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {AcceleratorGeneratorRecord} from "../../records/generators/accelerator-generator-record";

export class RedAcceleratorGeneratorAutomator extends Automator {
  displayName: string = 'Red Accelerators Automator'
  name: string = 'red-accelerators-automator'
  goal: Num = new Num(1, 50);
  goalString: string = ' ';

  buyables(): Buyable[] {
    return AcceleratorGeneratorRecord.list;
  }

  task(): Num {
    return HoldingRecord.redParticles.amount;
  }
}
