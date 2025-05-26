import {SacrificeUpgrade} from "./sacrifice-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Holding} from "../holding";

export class YellowParticleSacrificeUpgrade extends SacrificeUpgrade {

  constructor(saveName: string) {
    super(saveName, "yellow-particle-sacrifice-upgrade");
  }

  displayName: string = "Yellow Particle Sacrifice Upgrade";
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  increase: Num = new Num(1, 50);
  startIncrease: Num = new Num(1, 50);
  currency: Holding = HoldingRecord.yellowParticles;

}
