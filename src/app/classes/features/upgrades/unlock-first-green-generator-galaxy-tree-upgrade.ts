import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class UnlockFirstGreenGeneratorGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "unlock-first-green-generator");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterRedGeneratorsMultiplierGalaxyTree,
      UpgradeRecord.cheaperBoosterAccelerationGalaxyTree,
      UpgradeRecord.fasterHydrogenGenerationGalaxyTree,
      UpgradeRecord.strongerYellowPowerGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [];
  }

  getDescription(): string {
    return "Unlocks the first green generator.";
  }

  action(): undefined {
    if (this.hasBought()) {
      if (
        GeneratorRecord.firstGreenGenerator.bought.lt(new Num(1, 0)) ||
        GeneratorRecord.firstGreenGenerator.amount.lt(new Num(1, 0))
      ) {
        GeneratorRecord.firstGreenGenerator.bought = new Num(1, 0);
        GeneratorRecord.firstGreenGenerator.amount = new Num(1, 0);
      }
    }
  }

  style: Styles = Styles.STAR_RED
  displayName: string = "Unlock First Green Generator";

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);
}
