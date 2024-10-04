import {LimitedUpgrade} from "../generators/limited-upgrade";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class GreenBuffsYellowGeneratorsUpgrade extends LimitedUpgrade {
  name: string = 'green-buffs-yellow-generators';
  displayName: string = 'Green Generators Boost Yellow Generators';
  baseCost: Num = new Num(1.6, 1);
  cost: Num = new Num(1.6, 1);
  override buffer: Num = new Num(7, 0);
  override baseBuffer: Num = new Num(7, 0);

  override action(): Num {
    super.action();
    const buff = GeneratorRecord.firstGreenGenerator.amount.pow(this.buffer, false);
    MultiplierRecord.yellowPowerGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return "";
  }
}
