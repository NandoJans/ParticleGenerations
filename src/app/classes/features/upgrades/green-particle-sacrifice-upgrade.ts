import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {SacrificeUpgrade} from "./sacrifice-upgrade";

// @ts-ignore
export class GreenParticleSacrificeUpgrade extends SacrificeUpgrade {
  name: string = 'green-particles-sacrifice';
  displayName: string = 'Sacrifice Green Particles';
  bought: Num = new Num(0, 0);
  cost: Num = new Num(2, 0);
  baseCost: Num = new Num(2, 0);
  increase: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.greenParticles;

  getDescription(): string {
    return "Sacrifice green particles to get green souls.";
  };
}
