import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class GeneratedCompressionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "generated-compression-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [

    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.synergizedPowerGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Compression speed is increased based on fifth red generators power by applying Fifth red generators x ${this.buffer.toString(2)}.`
  }

  action(): undefined|Num {
    if (this.hasBought()) {
      const effect = GeneratorRecord.fifthRedGenerator.bought.mul(this.buffer);
      MultiplierRecord.starKeyCompressionSpeed.correct(effect);
      return effect
    }
    return;
  }

  style: Styles = Styles.STAR_WHITE
  displayName: string = "Powered Compression";

  override buffer = new Num(1, 0);
  override baseBuffer = new Num(1, 0);

  cost: Num = new Num(5, 1);
  baseCost: Num = new Num(5, 1);
}
