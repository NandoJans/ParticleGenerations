import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class FusionExpertiseGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "yellow-fusion-expertise-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerYellowFusionGalaxyTree,
      UpgradeRecord.strongerHydrogenGalaxyTree,
    ];
  }

  override requireParent: RequireParent = RequireParent.ALL;

  getDescription(): string {
    return `Increase other fusion upgrade power by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.strongerYellowPowerGalaxyTree.buffer = UpgradeRecord.strongerYellowPowerGalaxyTree.buffer.mul(this.buffer);
      UpgradeRecord.strongerYellowFusionGalaxyTree.buffer = UpgradeRecord.strongerYellowFusionGalaxyTree.buffer.mul(this.buffer);
      UpgradeRecord.strongerHydrogenGalaxyTree.buffer = UpgradeRecord.strongerHydrogenGalaxyTree.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_WHITE;
  displayName: string = "Fusion Expertise";

  override buffer = new Num(1.25, 0);
  override baseBuffer = new Num(1.25, 0);

  cost: Num = new Num(4.5, 1);
  baseCost: Num = new Num(4.5, 1);
}
