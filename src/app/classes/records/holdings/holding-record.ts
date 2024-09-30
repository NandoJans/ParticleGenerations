import {RedParticleHolding} from "../../features/holdings/red-particle-holding";
import {RedAcceleratorHolding} from "../../features/holdings/red-accelerator-holding";
import {YellowParticleHolding} from "../../features/holdings/yellow-particle-holding";
import {YellowHolding} from "../../features/holdings/yellow-holding";
import {YellowPowerHolding} from "../../features/holdings/yellow-power-holding";
import {YellowFusionHolding} from "../../features/holdings/yellow-fusion-holding";
import {GreenParticleHolding} from "../../features/holdings/green-particle-holding";
import {GreenHolding} from "../../features/holdings/green-holding";
import {GreenEnergyHolding} from "../../features/holdings/green-energy-holding";
import {GreenSoulsHolding} from "../../features/holdings/green-souls-holding";
import {DarkEnergyHolding} from "../../features/holdings/dark-energy-holding";
import {DarkPowerHolding} from "../../features/holdings/dark-power-holding";
import {NuclearDecayHolding} from "../../features/holdings/nuclear-decay-holding";

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
  static greenParticles   = new GreenParticleHolding()
  static greens           = new GreenHolding()
  static greenEnergy      = new GreenEnergyHolding()
  static greenSouls       = new GreenSoulsHolding()
  static darkEnergy       = new DarkEnergyHolding()
  static darkPower        = new DarkPowerHolding()
  static nuclearDecay     = new NuclearDecayHolding()
}
