import {BlueLightUpgrade} from "./blue-light-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {HoldingsService} from "../../../services/holdings.service";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class LightNeutronMultiplierUpgrade extends BlueLightUpgrade {
  baseCost: Num = new Num(1, 15);
  cost: Num = new Num(1, 15);
  override buffer: Num = new Num(1.5, -1);
  override baseBuffer: Num = new Num(1.5, -1);
  displayName: string = "Light Neutrons";
  increase: Num = new Num(1, 3);
  name: string = "light-neutron-multiplier";
  override oneTime: boolean = true;

  action(): Num {
    const buff: Num = HoldingRecord.blueNeutrons.amount.pow(this.buffer, false);
    MultiplierRecord.blueLightGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Blue light boosts blue light by ${this.buffer.toString(true)}.`;
  }
}
