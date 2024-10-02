import {Automator} from "../automator";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {RedGeneratorRecord} from "../../records/generators/red-generator-record";

export class RedGeneratorAutomator extends Automator {
  displayName: string = 'Red Generator Automator'
  name: string = 'red-generators-automator'
  goal: Num = new Num(1, 50);
  goalString: string = 'Reach 1e50 ' + HoldingRecord.redParticles.abbreviation;

  buyables(): Buyable[] {
    return RedGeneratorRecord.list;
  }

  task(): Num {
    return HoldingRecord.redParticles.amount;
  }
}
