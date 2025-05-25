import { Num } from "src/app/num";
import {SacrificeUpgrade} from "./sacrifice-upgrade";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Holding} from "../holding";

export class RedParticleSacrificeUpgrade extends SacrificeUpgrade {

  constructor(saveName: string) {
    super(saveName, "red-particle-sacrifice-upgrade");
  }

  displayName: string = "Red Particle Sacrifice Upgrade";
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  increase: Num = new Num(1, 250);
  currency: Holding = HoldingRecord.redParticles;

}
