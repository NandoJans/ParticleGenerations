import {SacrificeUpgrade} from "./sacrifice-upgrade";
import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class RedParticleSacrificeUpgrade extends SacrificeUpgrade {
  name: string = 'red-particles-sacrifice';
  displayName: string = 'Sacrifice Red Particles';
  bought: Num = new Num(0, 0);
  cost: Num = new Num(1, 10000);
  baseCost: Num = new Num(1, 10000);
  increase: Num = new Num(1, 10000);
  currency: Holding = HoldingRecord.redParticles;


  getDescription(): string {
    return "Sacrifice red particles to get green souls.";
  };
}
