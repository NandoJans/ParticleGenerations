import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class CheaperBoosterAccelerationGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "cheaper-booster-acceleration");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.redAcceleratorStartGalaxyTree,
      UpgradeRecord.strongerBoosterAccelerationGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.unlockFirstGreenGeneratorGalaxyTree,
    ];
  }

  getDescription(): string {
    const startIncrease = UpgradeRecord.boosterAccelerationUpgrade.startIncrease;
    return `Decrease the cost increase of booster accelerators from ${startIncrease} to ${startIncrease.div(this.buffer)}.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.boosterAccelerationUpgrade.increase = UpgradeRecord.boosterAccelerationUpgrade.startIncrease.div(this.buffer);
    }
    return
  }

  style: Styles = Styles.STAR_ORANGE
  displayName: string = "Cheaper Booster Acceleration";

  override buffer = new Num(1, 1);
  override baseBuffer = new Num(1, 1);

  cost: Num = new Num(2, 0);
  baseCost: Num = new Num(2, 0);
}
