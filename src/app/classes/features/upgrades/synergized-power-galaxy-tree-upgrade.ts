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
      const effect = HoldingRecord.yellowPower.effect
      if (effect instanceof Num) {
        GeneratorRecord.firstRedGenerator.mulMod = GeneratorRecord.firstRedGenerator.mulMod.mul(effect.pow(this.buffer));
        return effect;
      }
    }
    return;
  }

  override requireParent: RequireParent = RequireParent.ALL;

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Synergized Power";

  override buffer = new Num(3, 0);
  override baseBuffer = new Num(3, 0);

  cost: Num = new Num(3.5, 1);
  baseCost: Num = new Num(3.5, 1);
}
