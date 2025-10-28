import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class YellowFusionBoostUpgradesGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "yellow-fusion-boost-upgrades-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerHydrogenGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Hydrogen mastery amplifies yellow power by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.strongerYellowPower.buffer = 
        UpgradeRecord.strongerYellowPower.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Hydrogen Mastery";

  override buffer = new Num(1.6, 0);
  override baseBuffer = new Num(1.6, 0);

  cost: Num = new Num(4.5, 1);
  baseCost: Num = new Num(4.5, 1);
}
