import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class YellowExpertiseGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "yellow-upgrades-boost-fusion-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.hydrogenSynergyGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerYellowFusionGalaxyTree,
      UpgradeRecord.strongerHydrogenGalaxyTree,
    ];
  }

  override requireParent: RequireParent = RequireParent.ALL;

  getDescription(): string {
    return `Yellow expertise enhances the power of stronger yellow power, better yellow key gain and better yellow generators by ${this.buffer.toString(2)}x.`;
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

  override buffer = new Num(1.05, 0);
  override baseBuffer = new Num(1.05, 0);

  cost: Num = new Num(2, 2);
  baseCost: Num = new Num(2, 2);
}
