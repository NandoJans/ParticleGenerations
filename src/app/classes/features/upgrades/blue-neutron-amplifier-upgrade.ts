import {BlueNeutronUpgrade} from "./blue-neutron-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BlueNeutronAmplifierUpgrade extends BlueNeutronUpgrade {
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  override buffer: Num = new Num(1.1, 0);
  override baseBuffer: Num = new Num(1.1, 0);
  increase: Num = new Num(1, 1);
  override scaling: Num = new Num(1, 2);
  displayName: string = 'Blue Neutron Amplifier Upgrade';
  name: string = 'blue-neutron-amplifier-upgrade';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.blues, new Num(3, 0), false)
  ];

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.blueNeutronPower.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Amplify the power of blue neutrons by ${this.buffer.toString()}^${this.bought.toString()}`;
  }

}
