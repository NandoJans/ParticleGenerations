import {RedParticleHolding} from "../../features/holdings/red-particle-holding";
import {RedAcceleratorHolding} from "../../features/holdings/red-accelerator-holding";
import {YellowParticleHolding} from "../../features/holdings/yellow-particle-holding";
import {YellowHolding} from "../../features/holdings/yellow-holding";
import {YellowPowerHolding} from "../../features/holdings/yellow-power-holding";
import {YellowFusionHolding} from "../../features/holdings/yellow-fusion-holding";

export class HoldingRecord {

  // Red Phase
  static redParticles     = new RedParticleHolding()
  static redAccelerators  = new RedAcceleratorHolding()

  // Yellow Phase
  static yellowParticles  = new YellowParticleHolding()
  static yellows          = new YellowHolding()
  static yellowPower      = new YellowPowerHolding()
  static yellowFusion     = new YellowFusionHolding()

  // Green Phase
}
