import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BoosterOverdriveGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "booster-overdrive-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.boosterMasteryGalaxyTree,
    ];
  }

  getDescription(): string {
    return "Increase free red generator boosters by 3x.";
  }

  action(): undefined {
    MultiplierRecord.freeRedGeneratorBoosters.correct(this.buffer);
    return;
  }

  override buffer = new Num(3, 0);
  override baseBuffer = new Num(3, 0);

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Booster Overdrive";

  cost: Num = new Num(7, 0);
  baseCost: Num = new Num(7, 0);
}

