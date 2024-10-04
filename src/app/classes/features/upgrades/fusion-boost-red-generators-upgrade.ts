import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class FusionBoostRedGeneratorsUpgrade extends LimitedUpgrade {
  name: string = 'fusion-boost-red-generators';
  displayName: string = 'Yellow Fusion Gives a Boost to Red Generators';
  baseCost: Num = new Num(2.5, 1);
  cost: Num = new Num(2.5, 1);
  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  override action(): Num {
    super.action();
    const buff = HoldingRecord.yellowFusion.amount.add(new Num(1, 0), false);
    MultiplierRecord.redParticleGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return "";
  }
}
