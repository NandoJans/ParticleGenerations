import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class ExpandedYellowKeyScalingGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "expanded-yellow-key-scaling-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.amplifiedYellowKeysGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Increase the limit buys of multiply YK scaling upgrade by ${this.buffer.toString()}.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.decreaseMultiplyYellowKeysScalingStarKeySub.limit = UpgradeRecord.decreaseMultiplyYellowKeysScalingStarKeySub.limit.add(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Expanded Yellow Key Scaling";

  override buffer = new Num(5, 0);
  override baseBuffer = new Num(5, 0);

  cost: Num = new Num(250, 0);
  baseCost: Num = new Num(250, 0);
}
