import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class StrongerYellowGeneratorsGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "stronger-yellow-generators-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.moreYellowKeys,
    ];
  }

  getDescription(): string {
    return `Yellow generator multiplier upgrades are ${this.buffer.toString(2)}x stronger.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      GeneratorRecord.yellowGenerators.forEach(generator => {
        generator.multiplierUpgrade.buffer = generator.multiplierUpgrade.buffer.mul(this.buffer);
      });
    }
    return;
  }

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Better Yellow Multipliers";

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  cost: Num = new Num(4, 0);
  baseCost: Num = new Num(4, 0);
}
