import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class ImproveBetterParticleEffectYellowUpgrade extends YellowUpgrade {
  displayName: string = 'Improve Better Particle Effect';
  constructor(name: string) {
    super(name, 'improve-better-particle-effect-yellow');
  }

  override buffer: Num = new Num(0.005, 0);
  override baseBuffer: Num = new Num(0.005, 0);

  getDescription(): string {
    return "Better Particle Effect is increased by " + this.buffer.toString(3);
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade.buffer = UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade.buffer.add(this.buffer);
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(3, 2);
  cost: Num = new Num(3, 2);
}
