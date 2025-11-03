import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class BetterYellowGeneratorsGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "better-yellow-particles-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerYellowPowerGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Yellow generator buy-multipliers are ${this.buffer.toString(2)}x stronger.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      GeneratorRecord.yellowGenerators.forEach(generator => {
        generator.buyMultiplierUpgrade.buffer = generator.buyMultiplierUpgrade.buffer.mul(this.buffer);
      });
    }
    return;
  }

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Better Yellow Generators";

  override buffer = new Num(2.5, 0);
  override baseBuffer = new Num(2.5, 0);

  cost: Num = new Num(6, 0);
  baseCost: Num = new Num(6, 0);
}
