import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class BetterRedBoosterGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-generator-efficiency-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.redExpertiseGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterRedGeneratorsMultiplierGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Red generator booster upgrade is ${this.buffer.toString(2)}x stronger.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.redGeneratorBooster.buffer =
        UpgradeRecord.redGeneratorBooster.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_RED;
  displayName: string = "Better Red Booster";

  override buffer = new Num(1.1, 0);
  override baseBuffer = new Num(1.1, 0);

  cost: Num = new Num(4, 0);
  baseCost: Num = new Num(4, 0);
}
