import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";

export class MoreYellowKeysGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "more-yellow-keys");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.enhancedDarkEnergyGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.halfRedGeneratorIncrease,
    ];
  }

  getDescription(): string {
    return "Halves all cost increase of red generators.";
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.unlockRedAccelerators.bought = new Num(1, 0);
      UpgradeRecord.unlockRedAccelerators.requirement = [
        new Requirement(HoldingRecord.redParticles, new Num(1, 1), UpgradeRecord.unlockRedAccelerators),
      ];
    }
    return
  }

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "More Yellow Keys";

  cost: Num = new Num(2, 0);
  baseCost: Num = new Num(2, 0);
}

