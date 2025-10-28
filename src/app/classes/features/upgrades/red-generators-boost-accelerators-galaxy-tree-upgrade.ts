import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class RedGeneratorsBoostAcceleratorsGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-generators-boost-accelerators-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.redGeneratorEfficiency,
    ];
  }

  getDescription(): string {
    return `Red generator mastery empowers cheaper booster acceleration by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.cheaperBoosterAcceleration.buffer = 
        UpgradeRecord.cheaperBoosterAcceleration.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_RED;
  displayName: string = "Generator Mastery";

  override buffer = new Num(1.5, 0);
  override baseBuffer = new Num(1.5, 0);

  cost: Num = new Num(4, 1);
  baseCost: Num = new Num(4, 1);
}
