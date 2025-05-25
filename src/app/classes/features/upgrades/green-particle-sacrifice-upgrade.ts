import { Num } from "src/app/num";
import {SacrificeUpgrade} from "./sacrifice-upgrade";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Holding} from "../holding";

export class GreenParticleSacrificeUpgrade extends SacrificeUpgrade {

  constructor(saveName: string) {
    super(saveName, "green-particle-sacrifice-upgrade");
  }

  displayName: string = "Green Particle Sacrifice Upgrade";
  baseCost: Num = new Num(2, 0);
  cost: Num = new Num(2, 0);
  increase: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.greenParticles;

}
