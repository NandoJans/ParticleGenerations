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
    return [];
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
    GeneratorRecord.redGenerators.forEach(generator => {
      generator.increase = new Num(1, 1);
    })
    return
  }

  style: Styles = Styles.STAR_RED
  displayName: string = "10x Cost Increase of Red Generators";

  cost: Num = new Num(2, 0);
  baseCost: Num = new Num(2, 0);
}
