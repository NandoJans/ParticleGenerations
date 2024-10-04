import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {LimitedUpgrade} from "../generators/limited-upgrade";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class AcceleratorYellowPowerBasedUpgrade extends LimitedUpgrade {
  name: string = 'accelerators-yellow-power-based';
  displayName: string = 'Give Accelerators a Multiplier Based on Fifth Yellow Generators';
  baseCost: Num = new Num(5, 0);
  cost: Num = new Num(5, 0);
  override buffer: Num = new Num(2, 1);
  override baseBuffer: Num = new Num(2, 1);
  override maxEffect: Num = new Num(1, 100);

  override action(): Num {
    super.action();
    let buff: Num = GeneratorRecord.fifthYellowGenerator.amount.pow(this.buffer, false);
    if (buff.greq(this.maxEffect)) {
      buff = this.maxEffect.copy();
    }
    buff.add(new Num(1, 0));
    MultiplierRecord.redAcceleratorGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return "";
  }
}
