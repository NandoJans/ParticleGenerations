import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class BetterRedAcceleratorEffectGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "better-red-accelerator-effect-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [

    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerBoosterAccelerationGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Multiply red accelerator effect upgrade effectiveness by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.multiplyRedAcceleratorEffectUpgrade.buffer =
        UpgradeRecord.multiplyRedAcceleratorEffectUpgrade.buffer.mul(this.buffer);
      UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade.buffer =
        UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Better Red Accelerator Effect";

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  cost: Num = new Num(2.7, 1);
  baseCost: Num = new Num(2.7, 1);
}
