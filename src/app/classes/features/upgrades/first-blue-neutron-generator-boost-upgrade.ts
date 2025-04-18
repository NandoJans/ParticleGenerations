import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {BlueNeutronUpgrade} from "./blue-neutron-upgrade";

export class FirstBlueNeutronGeneratorBoostUpgrade extends BlueNeutronUpgrade {
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  increase: Num = new Num(5, 0);
  override scaling: Num = new Num(2, 0);
  displayName: string = 'Increase Compression Rate';
  name: string = 'first-blue-neutron-generator-boost-upgrade';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.blues, new Num(4, 0), false)
  ];

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.blueNeutronGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Increase the compression rate of blue neutron generators by ${this.buffer.toString()}`;
  }
}
