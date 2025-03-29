import {NuclearDecayUpgrade} from "../../../features/upgrades/nuclear-decay-upgrade";
import {Num} from "../../../num";
import {LimitedUpgrade} from "../generators/limited-upgrade";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class NuclearDecayBoosterUpgrade extends NuclearDecayUpgrade {
  baseCost: Num = new Num(1.5, 2);
  cost: Num = new Num(2, 2);
  displayName: string = 'Nuclear Boosting';
  name: string = 'nuclear-decay-booster';

  override action(): Num {
    if (LimitedUpgrade.totalBought.greq(new Num(1, 1))) {
      const buff = this.buffer.pow(this.bought, false);
      GeneratorRecord.firstNuclearDecayGenerator.baseMulMod.mul(buff);
      GeneratorRecord.secondNuclearDecayGenerator.baseMulMod.mul(buff);
      GeneratorRecord.thirdNuclearDecayGenerator.baseMulMod.mul(buff);
      UpgradeRecord.nuclearDecayIncreaser.buffer.mul(buff);
      super.action();
      return buff;
    }
    return new Num(1, 0)
  }

  getDescription(): string {
    return "";
  }
}
