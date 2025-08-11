import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BoosterEfficiencyGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "booster-efficiency-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.boosterMasteryGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.decreaseBoosterAccelerationScaling,
    ];
  }

  getDescription(): string {
    return "Increase free red generator boosters by 2x.";
  }

  action(): undefined {
    if (this.hasBought() && !this.applied) {
      MultiplierRecord.freeRedGeneratorBoosters.correct(this.buffer);
      this.applied = true;
    }
    return;
  }

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  style: Styles = Styles.STAR_RED;
  displayName: string = "Booster Efficiency";

  cost: Num = new Num(5, 0);
  baseCost: Num = new Num(5, 0);

  private applied = false;
}

