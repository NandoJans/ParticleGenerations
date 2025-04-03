import {NuclearDecayUpgrade} from "./nuclear-decay-upgrade";
import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class NuclearDecayIncreaserUpgrade extends NuclearDecayUpgrade {
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 1);
  displayName: string = 'Nuclear Decay Increaser';
  name: string = 'nuclear-decay-increaser';

  override action(): Num {
    if (LimitedUpgrade.totalBought.greq(new Num(1, 1))) {
      const buff = this.buffer.pow(this.bought, false);
      MultiplierRecord.nuclearDecayGenerators.correct(buff);
      super.action();
      return buff;
    }
    return new Num(1, 0)
  }

  getDescription(): string {
    return "";
  }
}
