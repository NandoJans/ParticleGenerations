import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";

export class ImproveFusionCompressionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "improve-fusion-compression-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.hydrogenSynergyGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerHydrogenGalaxyTree
    ];
  }

  override requireParent: RequireParent = RequireParent.ALL;

  getDescription(): string {
    return `Change yellow fusion compression effect formula: Log10(YF) → YF^${this.buffer.toString(4)}.`;
  }

  action(): undefined {
    return;
  }

  style: Styles = Styles.STAR_RED;
  displayName: string = "Improve Fusion Compression";

  override buffer = new Num(1, -4);
  override baseBuffer = new Num(1, -4);

  cost: Num = new Num(5, 0);
  baseCost: Num = new Num(5, 0);
}
