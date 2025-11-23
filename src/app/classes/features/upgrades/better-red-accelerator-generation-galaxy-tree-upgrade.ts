import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class BetterRedAcceleratorGenerationGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "better-red-accelerator-generation-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [

    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.redAcceleratorStartGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Multiply red accelerator generation upgrade effectiveness by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.multiplyRedAcceleratorGeneration.buffer =
        UpgradeRecord.multiplyRedAcceleratorGeneration.buffer.mul(this.buffer);
      UpgradeRecord.improveRedAcceleratorsEffect.buffer =
        UpgradeRecord.improveRedAcceleratorsEffect.buffer.mul(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Better Red Accelerator Generation";

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  cost: Num = new Num(3.5, 1);
  baseCost: Num = new Num(3.5, 1);
}
