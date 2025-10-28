import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class CheaperRedGeneratorsGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "cheaper-red-generators-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerRedExtensionGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Red generator costs are divided by ${this.buffer.toString(2)}.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      GeneratorRecord.redGenerators.forEach(generator => {
        generator.increase = generator.increase.div(this.buffer);
      });
    }
    return;
  }

  style: Styles = Styles.STAR_RED;
  displayName: string = "Cheaper Red Generators";

  override buffer = new Num(1.5, 0);
  override baseBuffer = new Num(1.5, 0);

  cost: Num = new Num(3, 0);
  baseCost: Num = new Num(3, 0);
}
