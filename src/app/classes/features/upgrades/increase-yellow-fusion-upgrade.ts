import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class IncreaseYellowFusionUpgrade extends YellowUpgrade {
  name: string = 'increase-yellow-fusion';
  displayName: string = 'Increase fusion rate';

  baseCost: Num = new Num(1, 32);
  cost: Num = new Num(1, 32);
  override oneTime: boolean = true;
  override subNav: string = 'yellowFusion'

  override buffer: Num = new Num(1.2, 0);
  override baseBuffer: Num = new Num(1.2, 0);
  override requirement: Requirement[] = [
    new Requirement(UpgradeRecord.unlockYellowFusion, new Num(1, 0))
  ]

  override action(): Num {
    const buff: Num = this.buffer.pow(this.amount, false);
    MultiplierRecord.yellowFusion.correct(buff);
    return buff
  }

  override getDescription(): string {
    const buffer: Num = this.buffer.sub(new Num(1, 0), false).mul(new Num(1, 2), false);
    return 'Increases the fusion rate to fuse more at the same time. Increases fusion by '+buffer.toString()+'%.';
  }

  override effectString(): string {
    if (this.effect === undefined) {
      return '';
    }
    const effect: Num = this.effect.sub(new Num(1, 0), false).mul(new Num(1, 2), false);
    return effect.toString()+'%';
  }
}
