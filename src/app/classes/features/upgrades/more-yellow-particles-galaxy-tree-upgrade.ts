import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class MoreYellowParticlesGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "more-yellow-particles-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterYellowMultipliersGalaxyTree,
      UpgradeRecord.cheaperFourthYellowGeneratorGalaxyTreeUpgrade,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterYellowGeneratorsGalaxyTree
    ];
  }

  getDescription(): string {
    return `Multiply yellow particle gain by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      MultiplierRecord.yellowParticleGain.correct(this.buffer);
    }
  }

  style: Styles = Styles.STAR_RED
  displayName: string = "More Yellow Particles";

  override buffer = new Num(1, 5);
  override baseBuffer = new Num(1, 5);

  cost: Num = new Num(1, 1);
  baseCost: Num = new Num(1, 1);
}
