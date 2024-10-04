import {SacrificeUpgrade} from "./sacrifice-upgrade";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class YellowParticleSacrificeUpgrade extends SacrificeUpgrade {
  name: string = 'yellow-particles-sacrifice';
  displayName: string = 'Sacrifice Yellow Particles';
  bought: Num = new Num(0, 0);
  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);
  increase: Num = new Num(1, 50);
  currency: Holding = HoldingRecord.yellowParticles;

  getDescription(): string {
    return "Sacrifice yellow particles to get green souls.";
  };
}
