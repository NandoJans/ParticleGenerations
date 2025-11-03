import { Num } from "src/app/num";
import {StarKeyUpgrade} from "./star-key-upgrade";
import {YellowParticleHolding} from "../holdings/yellow-particle-holding";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class UnlockStarKeyCompressionUpgrade extends StarKeyUpgrade {
  override displayName: string = "Unlock Star Key Compression";

  constructor(saveName: string) {
    super(saveName, 'unlock-star-key-compression-upgrade');
  }

  override getDescription(): string {
    return "";
  }

  override action(): undefined {
    return;
  }

  override cost: Num = new Num(1, 350);
  override baseCost: Num = new Num(1, 350);
  override currency: YellowParticleHolding = HoldingRecord.yellowParticles;
}
