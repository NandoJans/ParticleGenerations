import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class FusedAccelerationGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "yellow-fusion-boost-red-accelerators-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.acceleratedCompressionGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.redAcceleratorStartGalaxyTree,
      UpgradeRecord.strongerYellowFusionGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Yellow Fusion boosts red accelerator generation.`;
  }

  action(): Num|undefined {
    if (this.hasBought()) {
      const effect = HoldingRecord.yellowFusion.amount.pow(this.buffer);
      MultiplierRecord.redAcceleratorGenerators.correct(effect);
      return effect;
    }
    return
  }

  override requireParent: RequireParent = RequireParent.ALL;

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Fused Acceleration";

  override buffer = new Num(0.75, 0);
  override baseBuffer = new Num(0.75, 0);

  cost: Num = new Num(1.5, 1);
  baseCost: Num = new Num(1.5, 1);
}
