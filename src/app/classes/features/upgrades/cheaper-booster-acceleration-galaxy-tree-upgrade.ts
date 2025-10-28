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
    return "Decrease the cost scaling of booster accelerators from 1.000 to 250";
  }

  action(): undefined {
    UpgradeRecord.boosterAccelerationUpgrade.increase = UpgradeRecord.boosterAccelerationUpgrade.startIncrease.div(new Num(1, 1));
    return
  }

  style: Styles = Styles.STAR_ORANGE
  displayName: string = "Cheaper Booster Acceleration";

  cost: Num = new Num(2, 0);
  baseCost: Num = new Num(2, 0);
}
