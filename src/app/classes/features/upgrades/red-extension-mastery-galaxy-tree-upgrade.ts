import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class RedExtensionMasteryGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-extension-mastery-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.redExtensionSupremacyGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerRedExtensionGalaxyTree,
    ];
  }

  getDescription(): string {
    return "Further increases the power of red extensions by 2x.";
  }

  action(): undefined {
    UpgradeRecord.redGeneratorExtension.buffer = UpgradeRecord.redGeneratorExtension.buffer.mul(this.buffer);
    return;
  }

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Red Extension Mastery";

  cost: Num = new Num(4, 0);
  baseCost: Num = new Num(4, 0);
}

