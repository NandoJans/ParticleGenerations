import { Num } from "src/app/num";
import {SacrificeUpgrade} from "./sacrifice-upgrade";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Holding} from "../holding";

export class RedParticleSacrificeUpgrade extends SacrificeUpgrade {

  constructor(saveName: string) {
    super(saveName, "red-particle-sacrifice-upgrade");
  }

  displayName: string = "Red particle sacrifice";
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  increase: Num = new Num(1, 500_000);
  startIncrease: Num = new Num(1, 500_000);
  currency: Holding = HoldingRecord.redParticles;

}
