import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class RedExpertiseGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-generators-boost-accelerators-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterRedBoosterGalaxyTree,
      UpgradeRecord.strongerRedExtensionGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Red generator mastery empowers cheaper booster acceleration and stronger booster acceleration by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.cheaperBoosterAccelerationGalaxyTree.buffer =
        UpgradeRecord.cheaperBoosterAccelerationGalaxyTree.buffer.mul(this.buffer);
      UpgradeRecord.strongerBoosterAccelerationGalaxyTree.buffer =
        UpgradeRecord.strongerBoosterAccelerationGalaxyTree.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_WHITE;
  displayName: string = "Red Expertise";

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  cost: Num = new Num(1.2, 2);
  baseCost: Num = new Num(1.2, 2);
}
