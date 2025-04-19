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
import {PurpleParticleHolding} from "../../features/holdings/purple-particle-holding";
import {PurpleHolding} from "../../features/holdings/purple-holding";
import {PurpleVoidHolding} from "../../features/holdings/purple-void-holding";
import {RedPurpleHolding} from "../../features/holdings/red-purple-holding";
import {YellowPurpleHolding} from "../../features/holdings/yellow-purple-holding";
import {GreenPurpleHolding} from "../../features/holdings/green-purple-holding";
import {BluePurpleHolding} from "../../features/holdings/blue-purple-holding";
import {BlackHoleMassHolding} from "../../features/holdings/black-hole-mass-holding";
import {GravityHolding} from "../../features/holdings/gravity-holding";

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

  // Blue Phase
  static blueParticles    = new BlueParticleHolding()
  static blues            = new BlueHolding()
  static blueNeutrons     = new BlueNeutronHolding()
  static blueLight        = new BlueLightHolding()
  static blueHydrogen     = new BlueHydrogenHolding()

  // Purple Phase
  static purpleParticles  = new PurpleParticleHolding()
  static purples          = new PurpleHolding()
  static purpleVoid       = new PurpleVoidHolding()
  static redPurple        = new RedPurpleHolding()
  static yellowPurple     = new YellowPurpleHolding()
  static greenPurple      = new GreenPurpleHolding()
  static bluePurple       = new BluePurpleHolding()
  static blackHoleMass    = new BlackHoleMassHolding()
  static gravity          = new GravityHolding()

  static getArray(): Holding[] {
    return [
      HoldingRecord.redParticles,
      HoldingRecord.redAccelerators,
      HoldingRecord.yellowParticles,
      HoldingRecord.yellows,
      HoldingRecord.yellowPower,
      HoldingRecord.yellowFusion,
      HoldingRecord.greenParticles,
      HoldingRecord.greens,
      HoldingRecord.greenEnergy,
      HoldingRecord.greenSouls,
      HoldingRecord.darkEnergy,
      HoldingRecord.darkPower,
      HoldingRecord.nuclearDecay,
      HoldingRecord.blueParticles,
      HoldingRecord.blues,
      HoldingRecord.blueNeutrons,
      HoldingRecord.blueLight,
      HoldingRecord.blueHydrogen,
      HoldingRecord.purpleParticles,
      HoldingRecord.purples,
      HoldingRecord.purpleVoid,
      HoldingRecord.redPurple,
      HoldingRecord.yellowPurple,
      HoldingRecord.greenPurple,
      HoldingRecord.bluePurple,
      HoldingRecord.blackHoleMass,
      HoldingRecord.gravity
    ]
  }

  getArray(): Holding[] {
    return HoldingRecord.getArray()
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

  getRedParticles() { return HoldingRecord.redParticles }
  getRedAccelerators() { return HoldingRecord.redAccelerators }
  getYellowParticles() { return HoldingRecord.yellowParticles }
  getYellows() { return HoldingRecord.yellows }
  getYellowPower() { return HoldingRecord.yellowPower }
  getYellowFusion() { return HoldingRecord.yellowFusion }
  getGreenParticles() { return HoldingRecord.greenParticles }
  getGreens() { return HoldingRecord.greens }
  getGreenEnergy() { return HoldingRecord.greenEnergy }
  getGreenSouls() { return HoldingRecord.greenSouls }
  getDarkEnergy() { return HoldingRecord.darkEnergy }
  getDarkPower() { return HoldingRecord.darkPower }
  getNuclearDecay() { return HoldingRecord.nuclearDecay }
  getBlueParticles() { return HoldingRecord.blueParticles }
  getBlues() { return HoldingRecord.blues }
  getBlueNeutrons() { return HoldingRecord.blueNeutrons }
  getBlueLight() { return HoldingRecord.blueLight }
  getBlueHydrogen() { return HoldingRecord.blueHydrogen }
  getPurpleParticles() { return HoldingRecord.purpleParticles }
  getPurples() { return HoldingRecord.purples }
  getPurpleVoid() { return HoldingRecord.purpleVoid }
  getRedPurple() { return HoldingRecord.redPurple }
  getYellowPurple() { return HoldingRecord.yellowPurple }
  getGreenPurple() { return HoldingRecord.greenPurple }
  getBluePurple() { return HoldingRecord.bluePurple }
  getBlackHoleMass() { return HoldingRecord.blackHoleMass }
  getGravity() { return HoldingRecord.gravity }
}
