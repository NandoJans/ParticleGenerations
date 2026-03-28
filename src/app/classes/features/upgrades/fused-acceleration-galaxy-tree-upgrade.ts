import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {SlowdownHelper} from "../../helpers/slowdown-helper";

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
      const rawEffect = HoldingRecord.yellowFusion.amount.pow(this.buffer);
      const effect = SlowdownHelper.applyLayers(rawEffect, this.slowdownStarts, this.slowdownPowers);
      MultiplierRecord.redAcceleratorGenerators.correct(effect);
      return effect;
    }
    return
  }

  // Slowdown layers are applied in order, from earliest to latest threshold.
  // Add/remove layers and tune values freely.
  slowdownStarts: Num[] = [
    new Num(1, 50000),
    new Num(1, 250000),
  ];
  slowdownPowers: Num[] = [
    new Num(2.5, -1),
    new Num(5, -2),
  ];

  override requireParent: RequireParent = RequireParent.ALL;

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Fused Acceleration";

  override buffer = new Num(5, 1);
  override baseBuffer = new Num(5, 1);

  cost: Num = new Num(1.5, 1);
  baseCost: Num = new Num(1.5, 1);
}
