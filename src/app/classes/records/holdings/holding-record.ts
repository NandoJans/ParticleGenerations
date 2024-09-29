import {RedParticleHolding} from "../../features/holdings/red-particle-holding";
import {RedAcceleratorHolding} from "../../features/holdings/red-accelerator-holding";

export class HoldingRecord {
  static redParticles     = new RedParticleHolding()
  static redAccelerators  = new RedAcceleratorHolding()
}
