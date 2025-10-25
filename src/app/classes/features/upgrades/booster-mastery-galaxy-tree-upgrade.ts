import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BoosterMasteryGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "booster-mastery-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.boosterOverdriveGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.boosterEfficiencyGalaxyTree,
    ];
  }

  getDescription(): string {
    return "Increase free red generator boosters by 2x.";
  }

  action(): undefined {
    MultiplierRecord.freeRedGeneratorBoosters.correct(this.buffer);
    return;
  }

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Booster Mastery";

  cost: Num = new Num(6, 0);
  baseCost: Num = new Num(6, 0);
}

