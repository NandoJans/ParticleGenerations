import {SacrificeUpgrade} from "./sacrifice-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Holding} from "../holding";

export class YellowParticleSacrificeUpgrade extends SacrificeUpgrade {

  constructor(saveName: string) {
    super(saveName, "yellow-particle-sacrifice-upgrade");
  }

  displayName: string = "Yellow Particle Sacrifice";
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  increase: Num = new Num(1, 25);
  startIncrease: Num = new Num(1, 25);
  currency: Holding = HoldingRecord.yellowParticles;

}
