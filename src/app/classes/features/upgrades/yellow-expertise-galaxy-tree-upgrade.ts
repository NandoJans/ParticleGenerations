import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class YellowExpertiseGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "yellow-upgrades-boost-fusion-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.amplifiedYellowKeysGalaxyTree,
      UpgradeRecord.betterYellowMultipliersGalaxyTree,
    ];
  }

  override requireParent: RequireParent = RequireParent.ALL;

  getDescription(): string {
    return `Yellow power mastery strengthens yellow fusion effect by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.strongerYellowPowerGalaxyTree.buffer = UpgradeRecord.strongerYellowPowerGalaxyTree.buffer.mul(this.buffer);
      UpgradeRecord.betterYellowMultipliersGalaxyTree.buffer = UpgradeRecord.betterYellowMultipliersGalaxyTree.buffer.mul(this.buffer);
      UpgradeRecord.amplifiedYellowKeysGalaxyTree.buffer = UpgradeRecord.amplifiedYellowKeysGalaxyTree.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_WHITE;
  displayName: string = "Yellow Expertise";

  override buffer = new Num(1.5, 0);
  override baseBuffer = new Num(1.5, 0);

  cost: Num = new Num(5, 1);
  baseCost: Num = new Num(5, 1);
}
