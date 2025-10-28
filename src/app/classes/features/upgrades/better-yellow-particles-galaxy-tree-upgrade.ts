import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BetterYellowParticlesGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "better-yellow-particles-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerYellowPower,
    ];
  }

  getDescription(): string {
    return `Yellow particle generation is ${this.buffer.toString(2)}x stronger.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      MultiplierRecord.yellowParticleGain.correct(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Better Yellow Particles";

  override buffer = new Num(2.5, 0);
  override baseBuffer = new Num(2.5, 0);

  cost: Num = new Num(3, 0);
  baseCost: Num = new Num(3, 0);
}
