import {GalaxyTreeUpgrade} from "../upgrades/galaxy-tree-upgrade";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class IncreaseRedGeneratorMultiplierGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "better-red-generator");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.moreYellowKeys,
      UpgradeRecord.increaseBoosterAccelerationPower,
      UpgradeRecord.redGeneratorEfficiency,
      UpgradeRecord.redGeneratorsBoostYellowUpgrades,
      UpgradeRecord.redGeneratorsBoostYellowFusion,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.unlockFirstGreenGenerator,
    ];
  }

  getDescription(): string {
    return `Make red generator multipliers ${this.buffer.toString(2)}x stronger.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      GeneratorRecord.redGenerators.forEach(generator => {
        generator.baseMulMod = generator.baseMulMod.mul(this.buffer);
      })
    }
    return
  }

  style: Styles = Styles.STAR_RED
  displayName: string = "Better red generator multipliers";

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);
}
