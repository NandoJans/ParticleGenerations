import {GalaxyTreeUpgrade} from "../upgrades/galaxy-tree-upgrade";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class HalfRedGeneratorIncreaseGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "half-red-generator-increase");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.moreYellowKeys,
      UpgradeRecord.decreaseBoosterAccelerationScaling,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.unlockFirstGreenGenerator,
    ];
  }

  getDescription(): string {
    return "Half all cost increase of red generators.";
  }

  action(): undefined {
    if (this.hasBought()) {
      GeneratorRecord.redGenerators.forEach(generator => {
        generator.increase = generator.startIncrease.div(new Num(2, 0));
      })
    }
    return
  }

  style: Styles = Styles.STAR_RED
  displayName: string = "Red Generator Cost Halving";

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);
}
