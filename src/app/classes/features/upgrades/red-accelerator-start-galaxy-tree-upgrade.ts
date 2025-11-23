import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class RedAcceleratorStartGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-accelerator-start");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.fusedAccelerationGalaxyTree,
      UpgradeRecord.betterRedAcceleratorGenerationGalaxyTree,
      UpgradeRecord.acceleratorExpertiseGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.cheaperBoosterAccelerationGalaxyTree,
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

  style: Styles = Styles.STAR_RED
  displayName: string = "Red Accelerator Start";

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);
}
