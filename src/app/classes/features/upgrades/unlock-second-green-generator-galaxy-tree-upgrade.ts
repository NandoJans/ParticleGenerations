import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class UnlockSecondGreenGeneratorGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "unlock-second-green-generator");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterRedBoosterGalaxyTree
    ];
  }

  getDescription(): string {
    return "Unlocks the second green generator.";
  }

  action(): undefined {
    if (this.hasBought()) {
      if (
        GeneratorRecord.secondGreenGenerator.bought.lt(new Num(1, 0)) ||
        GeneratorRecord.secondGreenGenerator.amount.lt(new Num(1, 0))
      ) {
        GeneratorRecord.secondGreenGenerator.bought = new Num(1, 0);
        GeneratorRecord.secondGreenGenerator.amount = new Num(1, 0);
      }
    }
  }

  style: Styles = Styles.STAR_ORANGE
  displayName: string = "Unlock Second Green Generator";

  cost: Num = new Num(5, 1);
  baseCost: Num = new Num(5, 1);
}
