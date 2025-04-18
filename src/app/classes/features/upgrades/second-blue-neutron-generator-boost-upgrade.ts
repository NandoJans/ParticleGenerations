import {BlueNeutronUpgrade} from "./blue-neutron-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class SecondBlueNeutronGeneratorBoostUpgrade extends BlueNeutronUpgrade {
  baseCost: Num = new Num(2, 0);
  cost: Num = new Num(2, 0);
  override buffer: Num = new Num(5, 0);
  override baseBuffer: Num = new Num(5, 0);
  increase: Num = new Num(2, 1);
  override scaling: Num = new Num(2, 1);
  displayName: string = 'Increase Neutron Weight';
  name: string = 'second-blue-neutron-generator-boost-upgrade';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.blues, new Num(5, 0), false)
  ];

  action(): Num {
    const buff: Num | undefined = this.buffer.pow(this.bought, false);
    MultiplierRecord.blueNeutronGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Increase the weight of blue neutron generators by ${this.buffer.toString()}`;
  }
}
