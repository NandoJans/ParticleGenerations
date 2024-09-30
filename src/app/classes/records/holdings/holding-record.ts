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
import {Holding} from "../../features/holding";
import {BlueParticleHolding} from "../../features/holdings/blue-particle-holding";
import {BlueHolding} from "../../features/holdings/blue-holding";
import {BlueNeutronHolding} from "../../features/holdings/blue-neutron-holding";
import {BlueLightHolding} from "../../features/holdings/blue-light-holding";
import {BlueHydrogenHolding} from "../../features/holdings/blue-hydrogen-holding";

export class HoldingRecord {

  // Red Phase
  redParticles     = new RedParticleHolding()
  redAccelerators  = new RedAcceleratorHolding()

  // Yellow Phase
  yellowParticles  = new YellowParticleHolding()
  yellows          = new YellowHolding()
  yellowPower      = new YellowPowerHolding()
  yellowFusion     = new YellowFusionHolding()

  // Green Phase
  greenParticles   = new GreenParticleHolding()
  greens           = new GreenHolding()
  greenEnergy      = new GreenEnergyHolding()
  greenSouls       = new GreenSoulsHolding()
  darkEnergy       = new DarkEnergyHolding()
  darkPower        = new DarkPowerHolding()
  nuclearDecay     = new NuclearDecayHolding()

  // Blue Phase
  blueParticles    = new BlueParticleHolding()
  blues            = new BlueHolding()
  blueNeutrons     = new BlueNeutronHolding()
  blueLight        = new BlueLightHolding()
  blueHydrogen     = new BlueHydrogenHolding()

  getArray(): Holding[] {
    return [
      this.redParticles,
      this.redAccelerators,
      this.yellowParticles,
      this.yellows,
      this.yellowPower,
      this.yellowFusion,
      this.greenParticles,
      this.greens,
      this.greenEnergy,
      this.greenSouls,
      this.darkEnergy,
      this.darkPower,
      this.nuclearDecay,
      this.blueParticles,
      this.blues,
      this.blueNeutrons,
      this.blueLight,
      this.blueHydrogen
    ]
  }

  load() {
    this.getArray().forEach((holding: Holding) => {
      holding.tryLoad()
    })
  }

  save() {
    this.getArray().forEach((holding: Holding) => {
      holding.save()
    })
  }
}
