import {RedUpgrade} from "./red-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class RedAcceleratorParticleBasedUpgrade extends RedUpgrade {
  name: string = 'red-accelerators-particles-based'
  displayName: string = 'Accelerator Particles';

  baseCost: Num = new Num(1, 65);
  cost: Num = new Num(1, 65);
  bought: Num = new Num(0, 0);
  increase: Num = new Num(1, 0);
  override oneTime: boolean = true;

  action(): Num {
    const buff: Num = HoldingRecord.redParticles.amount.log10(false);
    MultiplierRecord.redAcceleratorGenerators.correct(buff);
    return buff
  }

  getDescription(): string {
    return "Gives a multiplier to the accelerators generator based on particles.";
  }
}
