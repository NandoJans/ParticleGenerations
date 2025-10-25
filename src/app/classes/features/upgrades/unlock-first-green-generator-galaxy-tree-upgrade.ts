import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UnlockFirstGreenGeneratorGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "unlock-first-green-generator");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.increaseRedGeneratorMultiplier,
      UpgradeRecord.redAcceleratorStart,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [];
  }

  getDescription(): string {
    return "Unlocks the first green generator.";
  }

  action(): undefined {return}

  style: Styles = Styles.STAR_RED
  displayName: string = "Unlock First Green Generator";

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);
}
