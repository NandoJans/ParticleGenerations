import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class PowerAccelerationGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-accelerators-boost-yellow-upgrades-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.poweredCompressionGalaxyTree
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterYellowGeneratorsGalaxyTree,
      UpgradeRecord.strongerBoosterAccelerationGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Red accelerators boost the power of yellow upgrades by ^${this.buffer.toString(3)}`;
  }

  action(): Num | undefined {
    if (this.hasBought()) {
      const rawEffect = HoldingRecord.redAccelerators.amount.pow(this.buffer);
      const effect = this.applySlowdown(rawEffect);
      MultiplierRecord.yellowGenerators.correct(effect);
      return effect;
    }
    return;
  }

  // Softcap settings - tune these values to adjust where slowdown starts and how strong it is.
  slowdownStart: Num = new Num(1, 5000);
  slowdownPower: Num = new Num(5, -1);

  private applySlowdown(effect: Num): Num {
    if (effect.greq(this.slowdownStart)) {
      return effect.div(this.slowdownStart).pow(this.slowdownPower).mul(this.slowdownStart);
    }
    return effect;
  }

  override requireParent: RequireParent = RequireParent.ALL;

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Power acceleration";

  override buffer = new Num(2, -3);
  override baseBuffer = new Num(2, -3);

  cost: Num = new Num(1, 1);
  baseCost: Num = new Num(1, 1);
}
