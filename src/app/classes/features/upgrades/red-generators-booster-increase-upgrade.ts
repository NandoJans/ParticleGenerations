import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class RedGeneratorsBoosterIncreaseUpgrade extends LimitedUpgrade {
  name: string = 'red-generators-booster-increase';
  displayName: string = 'Increase Red Generator Boosters Effect by 3';
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  override action(): Num {
    super.action();
    UpgradeRecord.redGeneratorBooster.buffer.add(this.buffer);
    return new Num(0, 0);
  }

  getDescription(): string {
    return "";
  }
}
