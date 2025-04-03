import {YellowPurpleUpgrade} from "./yellow-purple-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class YellowPurpleBufferUpgrade extends YellowPurpleUpgrade {
  name: string = 'yellow-purple-buffer-increaser';
  displayName: string = 'Buy Multiplier Increaser';
  description: string = 'Increase all yellow purple buy multipliers by ';
  baseCost: Num = new Num(1, 20);
  cost: Num = new Num(1, 20);
  override baseBuffer: Num = new Num(1.2, 0);
  override buffer: Num = new Num(1.2, 0);
  increase: Num = new Num(1, 800);
  override scaling: Num = new Num(1, 1600);
  type: string = 'yellow-purple-upgrade';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(2, 0))
  ];

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false).sub(new Num(1, 0), false)
    GeneratorRecord.firstYellowPurpleGenerator.baseMulMod.add(buff);
    GeneratorRecord.secondYellowPurpleGenerator.baseMulMod.add(buff);
    GeneratorRecord.thirdYellowPurpleGenerator.baseMulMod.add(buff);
    UpgradeRecord.yellowPurpleBoosterUpgrade.buffer.add(buff);
    return buff;
  }

  getDescription(): string {
    return this.description + ' ' + this.buffer.toString(true) + 'x';
  }
}
