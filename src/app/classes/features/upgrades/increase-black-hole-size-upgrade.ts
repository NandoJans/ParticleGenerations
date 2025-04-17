import {BlackHoleUpgrade} from "./black-hole-upgrade";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class IncreaseBlackHoleSizeUpgrade extends BlackHoleUpgrade {
  override scalingStart: Num = new Num(1, 40);
  override scaling: Num = new Num(1, 1);
  increase: Num = new Num(1, 1);
  baseCost: Num = new Num(1, 20);
  cost: Num = new Num(1, 20);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.blackHoleMass;
  displayName: string = "Increase Size";
  name: string = "increased-black-hole-size";
  override buffer: Num = new Num(1.1, 0);
  override baseBuffer: Num = new Num(1.1, 0);
  requirement: Requirement[] = [
    new Requirement(UpgradeRecord.unlockBlackHoleUpgrade, new Num(1, 0))
  ];

  action(): Num | undefined {
    let buff: Num = this.buffer.pow(this.bought, false)
    MultiplierRecord.gravityGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return "Increase the mass of the black hole to increase gravity gain by x"+this.buffer.toString();
  }

}
