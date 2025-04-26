import {RedUpgrade} from "./red-upgrade";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Requirement} from "../interfaces/requirement";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class RedGeneratorBoosterUpgrade extends RedUpgrade {
  cost: Num = new Num(1, 2);
  baseCost: Num = new Num(1, 2);
  override scalingStart: Num = new Num(1, 1000);
  override scaling: Num = new Num(1, 1);
  increase: Num = new Num(1, 1);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 2), this),
  ];

  override buffer: Num = new Num(1.025, 0);
  override baseBuffer: Num = new Num(1.025, 0);

  bought: Num = new Num(0, 0);
  displayName: string = "Red Generator Booster";
  name: string = "redGeneratorBooster";
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);

  action(): Num {
    const buff: Num = this.buffer.pow(this.amount, false);
    MultiplierRecord.redParticleGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Increases red generator production by ${this.buffer.toString(true)}x.`;
  }
}
