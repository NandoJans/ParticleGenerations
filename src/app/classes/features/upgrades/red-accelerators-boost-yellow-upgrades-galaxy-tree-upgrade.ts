import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class RedAcceleratorsBoostYellowUpgradesGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-accelerators-boost-yellow-upgrades-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.redAcceleratorStart,
      UpgradeRecord.strongerYellowPower,
    ];
  }

  getDescription(): string {
    return `Red accelerators enhance yellow key gain by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.moreYellowKeys.buffer = UpgradeRecord.moreYellowKeys.buffer.mul(this.buffer);
    }
    return;
  }

  override requireParent: RequireParent = RequireParent.ALL;

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Accelerated Keys";

  override buffer = new Num(1.3, 0);
  override baseBuffer = new Num(1.3, 0);

  cost: Num = new Num(1.2, 1);
  baseCost: Num = new Num(1.2, 1);
}
