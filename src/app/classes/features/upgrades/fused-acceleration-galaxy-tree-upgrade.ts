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
      const rawEffect = HoldingRecord.yellowFusion.amount.pow(this.buffer);
      const effect = this.applySlowdown(rawEffect);
      MultiplierRecord.redAcceleratorGenerators.correct(effect);
      return effect;
    }
    return
  }

  // Softcap settings - tune these values to adjust where slowdown starts and how strong it is.
  slowdownStart: Num = new Num(1, 50000);
  slowdownPower: Num = new Num(2.5, -1);

  private applySlowdown(effect: Num): Num {
    if (effect.greq(this.slowdownStart)) {
      return effect.div(this.slowdownStart).pow(this.slowdownPower).mul(this.slowdownStart);
    }
    return effect;
  }

  override requireParent: RequireParent = RequireParent.ALL;

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Fused Acceleration";

  override buffer = new Num(5, 1);
  override baseBuffer = new Num(5, 1);

  cost: Num = new Num(1.5, 1);
  baseCost: Num = new Num(1.5, 1);
}
