import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class GreenGeneratorsEnergyBasedUpgrade extends LimitedUpgrade {
  name: string = 'green-generators-energy-based';
  displayName: string = 'Green Generators Energy Based';
  baseCost: Num = new Num(3, 0);
  cost: Num = new Num(3, 0);
  override buffer: Num = new Num(3, -2);
  override baseBuffer: Num = new Num(3, -2);

  override action(): Num {
    super.action();
    const buff = HoldingRecord.greenEnergy.amount.pow(this.buffer, false);
    MultiplierRecord.greenParticleGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return "Green generators multiplier based on green energy.";
  }
}
