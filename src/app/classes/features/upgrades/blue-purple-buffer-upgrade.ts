import {BluePurpleUpgrade} from "./blue-purple-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class BluePurpleBufferUpgrade extends BluePurpleUpgrade {
  name: string = 'blue-purple-buffer-increaser';
  displayName: string = 'Buy Multiplier Increaser';
  description: string = 'Increase all blue purple buy multipliers by ';
  baseCost: Num = new Num(1, 20);
  cost: Num = new Num(1, 20);
  override baseBuffer: Num = new Num(1.5, 0);
  override buffer: Num = new Num(1.5, 0);
  increase: Num = new Num(1, 20);
  override scaling: Num = new Num(1, 40);
  type: string = 'blue-purple-upgrade';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(2, 0))
  ];

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false).sub(new Num(1, 0), false)
    GeneratorRecord.firstBluePurpleGenerator.baseMulMod.add(buff);
    GeneratorRecord.secondBluePurpleGenerator.baseMulMod.add(buff);
    GeneratorRecord.thirdBluePurpleGenerator.baseMulMod.add(buff);
    UpgradeRecord.bluePurpleBoosterUpgrade.buffer.add(buff);
    return buff;
  }

  getDescription(): string {
    return this.description + ' ' + this.buffer.toString(true) + 'x';
  }
}
