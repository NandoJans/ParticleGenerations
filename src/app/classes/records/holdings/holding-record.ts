import {Holding} from "../../features/holding";
import {RedParticleHolding} from "../../features/holdings/red-particle-holding";
import {RedAcceleratorHolding} from "../../features/holdings/red-accelerator-holding";

export const HoldingRecord: {[key: string]: Holding} = {
  redParticles: new RedParticleHolding(),
  redAccelerators: new RedAcceleratorHolding(),
}
