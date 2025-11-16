import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";

export class StrongerYellowFusionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "improve-yellow-fusion-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.fusedAccelerationGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.fasterHydrogenGenerationGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Yellow fusion effect is ${this.buffer.toString(2)}x stronger.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      HoldingRecord.yellowFusion.fusionPower = HoldingRecord.yellowFusion.fusionPower.mul(this.buffer);
    }
    return
  }

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Stronger Yellow Fusion";

  override buffer = new Num(1.25, 0);
  override baseBuffer = new Num(1.25, 0);

  cost: Num = new Num(4, 0);
  baseCost: Num = new Num(4, 0);
}
