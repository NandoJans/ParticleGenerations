import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class RedExtensionSupremacyGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-extension-supremacy-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.redExtensionMasteryGalaxyTree,
    ];
  }

  getDescription(): string {
    return "Further increases the power of red extensions by 3x.";
  }

  action(): undefined {
    UpgradeRecord.redGeneratorExtension.buffer = UpgradeRecord.redGeneratorExtension.buffer.mul(this.buffer);
    return;
  }

  override buffer = new Num(3, 0);
  override baseBuffer = new Num(3, 0);

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Red Extension Supremacy";

  cost: Num = new Num(5, 0);
  baseCost: Num = new Num(5, 0);
}

