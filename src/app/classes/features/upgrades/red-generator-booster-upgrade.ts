import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {RedUpgrade} from "./red-upgrade";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class RedGeneratorBoosterUpgrade extends RedUpgrade {
  baseCost: Num = new Num(1, 3)
  cost: Num = new Num(1, 3)
  bought: Num = new Num(0, 0);
  override scaling: Num = new Num(3, 1);
  override limit: Num = new Num(4, 0);

  override baseBuffer: Num = new Num(1.2, 0);

  description: string = this.getDescription();
  displayName: string = "Red Generator Booster";
  increase: Num = new Num(2, 0);
  name: string = "red-generator-booster";
  override subNav: string = 'redParticles';

  action(): Num | undefined {
    if (!UpgradeService.getValue('unlock-red-generators-booster', 'bought').greq(new Num(1, 0))) {
      this.unlocked = false;
      this.requirement = [];
    }
    const freeUpgrades = HoldingRecord.greenEnergy.effect || new Num(0, 0);
    const buff: Num = this.buffer.pow(this.bought.add(freeUpgrades, false), false);
    MultiplierRecord.redParticleGenerators.correct(buff);

    return buff;
  }

  getDescription(): string {
    return "Apply a " + this.buffer + "x boost to all red generators.";
  }

  override effectString() {
    return super.effectString()+"x";
  }
}
