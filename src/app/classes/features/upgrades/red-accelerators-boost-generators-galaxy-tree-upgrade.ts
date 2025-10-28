import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class RedAcceleratorsBoostGeneratorsGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-accelerators-boost-generators-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.increaseBoosterAccelerationPower,
    ];
  }

  getDescription(): string {
    return `Red accelerator expertise enhances red generator multipliers by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.increaseRedGeneratorMultiplier.buffer = 
        UpgradeRecord.increaseRedGeneratorMultiplier.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_RED;
  displayName: string = "Accelerator Expertise";

  override buffer = new Num(1.4, 0);
  override baseBuffer = new Num(1.4, 0);

  cost: Num = new Num(3.5, 1);
  baseCost: Num = new Num(3.5, 1);
}
