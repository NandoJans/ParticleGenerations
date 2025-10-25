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
      UpgradeRecord.redAcceleratorStart,
      UpgradeRecord.increaseBoosterAccelerationPower,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.unlockFirstGreenGenerator,
    ];
  }

  getDescription(): string {
    return "Devide the cost increase of booster accelerations by 10";
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
