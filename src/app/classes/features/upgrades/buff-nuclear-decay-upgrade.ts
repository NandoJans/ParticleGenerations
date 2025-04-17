import {BlueLightUpgrade} from "./blue-light-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class BuffNuclearDecayUpgrade extends BlueLightUpgrade {
  baseCost: Num = new Num(1, 25);
  cost: Num = new Num(1, 25);
  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);
  displayName: string = "Buff Nuclear Decay";
  increase: Num = new Num(1, 3);
  name: string = "buff-nuclear-decay";
  override oneTime: boolean = true;

  action(): undefined {
    UpgradeRecord.nuclearDecayBooster.limit = new Num(3, 0);
    UpgradeRecord.nuclearDecayIncreaser.limit = new Num(7, 0);
    UpgradeRecord.betterNuclearDecay.limit = new Num(4, 0);
    return undefined
  }

  getDescription(): string {
    return `Blue light boosts blue light by ${this.buffer.toString(true)}.`;
  }
}
