import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SynergizedPowerGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-generators-boost-yellow-upgrades-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.generatedCompressionGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerRedExtensionGalaxyTree,
      UpgradeRecord.betterYellowKeyGainGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Yellow Power boost the first generator ^${this.buffer.toString(2)}.`;
  }

  action(): Num | undefined {
    if (this.hasBought()) {
      const powerEffect = HoldingRecord.yellowPower.effect
      if (powerEffect instanceof Num) {
        const rawEffect = powerEffect.pow(this.buffer);
        const effect = this.applySlowdown(rawEffect);
        GeneratorRecord.firstRedGenerator.mulMod = GeneratorRecord.firstRedGenerator.mulMod.mul(effect);
        return effect;
      }
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

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Synergized Power";

  override buffer = new Num(1.5, 0);
  override baseBuffer = new Num(1.5, 0);

  cost: Num = new Num(3, 1);
  baseCost: Num = new Num(3, 1);
}
