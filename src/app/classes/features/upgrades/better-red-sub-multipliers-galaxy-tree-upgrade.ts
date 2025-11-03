import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Upgrade} from "../upgrade";

export class BetterRedSubMultipliersGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "better-red-sub-multipliers-galaxy-tree-upgrade");
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
    return `Red generator sub-multiplier upgrade is ${this.buffer.toString(2)}x stronger.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      GeneratorRecord.redGenerators.forEach(generator => {
        generator.multiplierUpgrade.buffer = generator.multiplierUpgrade.buffer.mul(this.buffer);
      })
    }
    return;
  }

  style: Styles = Styles.STAR_RED;
  displayName: string = "Better Red Sub-Multipliers";

  override buffer = new Num(1.5, 0);
  override baseBuffer = new Num(1.5, 0);

  cost: Num = new Num(3, 1);
  baseCost: Num = new Num(3, 1);
}
