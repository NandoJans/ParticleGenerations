import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {PrestigeLayer} from "../prestiges/prestige-layer";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Automator} from "../automator";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class YellowFusionUpgradesAutomator extends Automator {
  name: string = "yellow-fusion-upgrades-automator";
  displayName: string = "Yellow Fusion Upgrades Automator";
  style: Styles = Styles.YELLOW;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.increaseHydrogen,
      UpgradeRecord.increaseHydrogenEffect,
      UpgradeRecord.increaseMaxFusionBoosterAcceleration
    ];
  }
  goal: Num = new Num(1, 2);
  goalString: string = "Reach 100 fusion booster acceleration.";
  task(): Num {
    return UpgradeRecord.fusionBoosterAcceleration.amount;
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
