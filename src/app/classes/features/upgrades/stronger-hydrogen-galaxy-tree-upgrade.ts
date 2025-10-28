import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class StrongerHydrogenGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "stronger-hydrogen-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.fusionExpertiseGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.fasterHydrogenGenerationGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Make hydrogen boost yellow fusion ${this.buffer.toString(2)}x more.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      HoldingRecord.hydrogen.hydrogenPower = HoldingRecord.hydrogen.hydrogenPower.mul(this.buffer);
    }
    return
  }

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Stronger hydrogen";

  override buffer = new Num(1.05, 0);
  override baseBuffer = new Num(1.05, 0);

  cost: Num = new Num(5, 0);
  baseCost: Num = new Num(5, 0);
}
