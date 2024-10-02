import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {ResetKey} from "../../enums/reset-key";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {RedUpgrade} from "./red-upgrade";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class RedGeneratorExtensionUpgrade extends RedUpgrade {
  baseCost: Num = new Num(1, 3)
  cost: Num = new Num(1, 3)
  bought: Num = new Num(0, 0);
  override scaling: Num = new Num(1, 1);
  override limit: Num = new Num(4, 0);

  override baseBuffer: Num = new Num(2, 0);

  description: string = this.getDescription();
  displayName: string = "Red Generator Extension";
  increase: Num = new Num(1, 2);
  name: string = "red-generator-extension";
  override subNav: string = 'redParticles';
  override requirement: Requirement[] = [];
  override resets: ResetKey = ResetKey.RED_EXTENSION;

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.redParticleGenerators.correct(buff)
    const boughtUpgrade: boolean = UpgradeService.bought('red-generator-extension-upgrade');
    if (this.bought.greq(new Num(4, 0)) && !boughtUpgrade) {
      this.limit = new Num(4, 0)
    } else if (!boughtUpgrade) {
    } else {
      this.limit = new Num(1, 1000000)
    }
    return buff;
  }

  getDescription(): string {
    return "Get a new generator that generates the one before it.";
  }

  override effectString() {
    if (this.amount.exp === 0) {
      switch (this.amount.num) {
        case 0:
          return "Red generator 1";
        case 1:
          return "Red generator 2";
        case 2:
          return "Red generator 3";
        case 3:
          return "Red generator 4";
        case 4:
          return "Red generator 5";
        default:
          break;
      }
    }

    return "";
  }
}
