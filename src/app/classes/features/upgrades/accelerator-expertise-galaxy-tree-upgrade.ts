import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class AcceleratorExpertiseGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-accelerators-boost-generators-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerBoosterAccelerationGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Red accelerator expertise enhances red generator multipliers by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.betterRedGeneratorsMultiplierGalaxyTree.buffer =
        UpgradeRecord.betterRedGeneratorsMultiplierGalaxyTree.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_WHITE;
  displayName: string = "Accelerator Expertise";

  override buffer = new Num(1.4, 0);
  override baseBuffer = new Num(1.4, 0);

  cost: Num = new Num(1, 2);
  baseCost: Num = new Num(1, 2);
}
