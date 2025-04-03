import {NuclearDecayUpgrade} from "./nuclear-decay-upgrade";
import {Num} from "../../../num";
import {LimitedUpgrade} from "../generators/limited-upgrade";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";

export class BetterNuclearDecayUpgrade extends NuclearDecayUpgrade {
  baseCost: Num = new Num(7.5, 1);
  cost: Num = new Num(1, 2);
  displayName: string = 'Better Nuclear Decay';
  name: string = 'better-nuclear-decay';

  override action(): Num {
    if (LimitedUpgrade.totalBought.greq(new Num(1, 1))) {
      const buff = this.buffer.mul(this.bought, false).add(new Num(1, 0), false);
      GlobalMultipliersService.correct('nuclearDecayPower', buff)
      super.action();
      return buff;
    }
    return new Num(1, 0)
  }

  getDescription(): string {
    return "";
  }
}
