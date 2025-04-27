import {Automator} from "../automator";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export class ImproveRedParticlesToAcceleratorsAutomator extends Automator {
  displayName: string = 'Better Particle Effect Automator';
  goal: Num = new Num(1, 20);
  goalString: string = 'Have the effect of Red Particles to Accelerators be at least 1e20x';
  name: string = 'improve-red-particles-to-accelerators-automator';
  style: Styles = Styles.RED_AUTOMATOR;
  override unlocked: boolean = false;
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this)
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);

  buyables(): Buyable[] {
    return [
      UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade
    ];
  }

  task(): Num {
    return UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade.effect || new Num(1, 0);
  }
}
