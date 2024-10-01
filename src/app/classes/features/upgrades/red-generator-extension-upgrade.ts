import {Upgrade} from "../upgrade";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {ResetKey} from "../../enums/reset-key";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Styles} from "../../enums/styles";

export class RedGeneratorExtensionUpgrade extends Upgrade {
  baseCost: Num = new Num(1, 3)
  cost: Num = new Num(1, 3)
  bought: Num = new Num(0, 0);
  override scaling: Num = new Num(1, 1);
  override limit: Num = new Num(4, 0);

  currency: Holding = HoldingRecord.redParticles;
  description: string = this.getDescription();
  displayName: string = "Red Generator Extension";
  increase: Num = new Num(1, 0);
  name: string = "red-generator-extension";
  nav: string = 'red';
  subNav: string = 'redParticles';
  requirement: Requirement[] = [];
  resetId: ResetKey = ResetKey.RED;
  override resets: ResetKey = ResetKey.RED_EXTENSION;
  style: Styles = Styles.RED;
  type: string = 'red-particles';

  action(): Num | undefined {
    const buff: Num | undefined = this.buffer.pow(this.bought, false);
    GlobalMultipliersService.correct('redParticleGenerators', buff);
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
