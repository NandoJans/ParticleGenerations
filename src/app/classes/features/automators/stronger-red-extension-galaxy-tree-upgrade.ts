import {GalaxyTreeUpgrade} from "../upgrades/galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class StrongerRedExtensionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "stronger-red-extension-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterRedSubMultipliersGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterRedGeneratorsMultiplierGalaxyTree,
    ];
  }

  getDescription(): string {
    return "Increases the power of red extensions by 2x";
  }

  action(): undefined {
    UpgradeRecord.redGeneratorExtension.buffer = UpgradeRecord.redGeneratorExtension.buffer.mul(this.buffer);
    return
  }

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Stronger Red Extension";

  cost: Num = new Num(8, 0);
  baseCost: Num = new Num(8, 0);
}

