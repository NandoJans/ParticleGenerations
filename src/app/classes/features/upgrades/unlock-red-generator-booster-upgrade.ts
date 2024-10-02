import {RedUpgrade} from "./red-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UnlockRedGeneratorBoosterUpgrade extends RedUpgrade {
  name: string = 'unlock-red-generators-booster'
  displayName: string = 'Unlock Generator Booster';

  baseCost: Num = new Num(1, 60);
  cost: Num = new Num(1, 60);
  bought: Num = new Num(0, 0);
  increase: Num = new Num(1, 0);
  override oneTime: boolean = true;

  action(): undefined {
    UpgradeRecord.redGeneratorBooster.limit = new Num(1, 1000000);
    UpgradeRecord.redGeneratorBooster.unlocked = true;
    UpgradeRecord.redGeneratorBooster.requirement = [];
    return undefined
  }

  getDescription(): string {
    return "Unlock the red generator booster upgrade which gives a multiplier to red generators.";
  }
}
