import {GreenPurpleUpgrade} from "./green-purple-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class GreenPurpleBufferUpgrade extends GreenPurpleUpgrade {
  name: string = 'green-purple-buffer-increaser';
  displayName: string = 'Buy Multiplier Increaser';
  description: string = 'Increase all green purple buy multipliers by ';
  baseCost: Num = new Num(1, 20);
  cost: Num = new Num(1, 20);
  override baseBuffer: Num = new Num(1.3, 0);
  override buffer: Num = new Num(1.3, 0);
  increase: Num = new Num(1, 50);
  override scaling: Num = new Num(1, 50);
  type: string = 'green-purple-upgrade';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(2, 0))
  ];

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false).sub(new Num(1, 0), false)
    GeneratorRecord.firstGreenPurpleGenerator.baseMulMod.add(buff);
    GeneratorRecord.secondGreenPurpleGenerator.baseMulMod.add(buff);
    GeneratorRecord.thirdGreenPurpleGenerator.baseMulMod.add(buff);
    UpgradeRecord.greenPurpleBoosterUpgrade.buffer.add(buff);
    return buff;
  }

  getDescription(): string {
    return this.description + ' ' + this.buffer.toString(true) + 'x';
  }
}
