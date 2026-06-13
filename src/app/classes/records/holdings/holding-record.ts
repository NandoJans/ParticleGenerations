import {RedParticleHolding} from "../../features/holdings/red-particle-holding";
import {Holding} from "../../features/holding";
import { Injectable } from '@angular/core';
import {RedAcceleratorHolding} from "../../features/holdings/red-accelerator-holding";
import {YellowParticleHolding} from "../../features/holdings/yellow-particle-holding";
import {YellowKeyHolding} from "../../features/holdings/yellow-key-holding";
import {YellowPrestigeHolding} from "../../features/holdings/yellow-prestige-holding";
import {YellowPowerHolding} from "../../features/holdings/yellow-power-holding";
import {YellowFusionHolding} from "../../features/holdings/yellow-fusion-holding";
import {HydrogenHolding} from "../../features/holdings/hydrogen-holding";
import {GreenParticleHolding} from "../../features/holdings/green-particle-holding";
import {GreenPrestigeHolding} from "../../features/holdings/green-prestige-holding";
import {DarkEnergyHolding} from "../../features/holdings/dark-energy-holding";
import {DarkMatterHolding} from "../../features/holdings/dark-matter-holding";
import {StarKeyHolding} from "../../features/holdings/star-key-holding";
import {DarkStarHolding} from "../../features/holdings/dark-star-holding";
import {NuclearPotentialHolding} from "../../features/holdings/nuclear-potential-holding";
import {NuclearFissionHolding} from "../../features/holdings/nuclear-fission-holding";
import {GreenKeyHolding} from "../../features/holdings/green-key-holding";
import {
  ElectronHolding,
  LithiumHolding,
  NeutronClumpHolding,
  NeutronHolding,
  ProtonHolding
} from "../../features/holdings/blue-holdings";
import {BlueParticleHolding} from "../../features/holdings/blue-particle-holding";

@Injectable({
  providedIn: 'root'
})
export class HoldingRecord {

  // Red Phase
  static redParticles: RedParticleHolding = new RedParticleHolding()
  static redAccelerators: RedAcceleratorHolding = new RedAcceleratorHolding();

  // Yellow Phase
  static yellowParticles: YellowParticleHolding = new YellowParticleHolding();
  static yellowKeys: YellowKeyHolding = new YellowKeyHolding();
  static yellowPrestiges: YellowPrestigeHolding = new YellowPrestigeHolding();
  static yellowPower: YellowPowerHolding = new YellowPowerHolding();
  static yellowFusion: YellowFusionHolding = new YellowFusionHolding();
  static hydrogen: HydrogenHolding = new HydrogenHolding();
  static starKeys: StarKeyHolding = new StarKeyHolding();

  // Green Phase
  static greenParticles: GreenParticleHolding = new GreenParticleHolding();
  static greenPrestiges: GreenPrestigeHolding = new GreenPrestigeHolding();
  static darkEnergy: DarkEnergyHolding = new DarkEnergyHolding();
  static darkMatter: DarkMatterHolding = new DarkMatterHolding();
  static darkStarHolding: DarkStarHolding = new DarkStarHolding();
  static nuclearPotential: NuclearPotentialHolding = new NuclearPotentialHolding();
  static nuclearFission: NuclearFissionHolding = new NuclearFissionHolding();
  static greenKeys: GreenKeyHolding = new GreenKeyHolding();

  // Blue Phase
  static blueParticles: BlueParticleHolding = new BlueParticleHolding();
  static protons: ProtonHolding = new ProtonHolding();
  static electrons: ElectronHolding = new ElectronHolding();
  static neutrons: NeutronHolding = new NeutronHolding();
  static neutronClump: NeutronClumpHolding = new NeutronClumpHolding();
  static lithium: LithiumHolding = new LithiumHolding();

  static getList(): Holding[] {
    return [
      HoldingRecord.redParticles,
      HoldingRecord.redAccelerators,

      HoldingRecord.yellowParticles,
      HoldingRecord.yellowKeys,
      HoldingRecord.yellowPrestiges,
      HoldingRecord.yellowPower,
      HoldingRecord.yellowFusion,
      HoldingRecord.hydrogen,
      HoldingRecord.starKeys,

      HoldingRecord.greenParticles,
      HoldingRecord.greenPrestiges,
      HoldingRecord.darkEnergy,
      HoldingRecord.darkMatter,
      HoldingRecord.darkStarHolding,
      HoldingRecord.nuclearPotential,
      HoldingRecord.nuclearFission,
      HoldingRecord.greenKeys,

      HoldingRecord.blueParticles,
      HoldingRecord.protons,
      HoldingRecord.electrons,
      HoldingRecord.neutrons,
      HoldingRecord.neutronClump,
      HoldingRecord.lithium,
    ]
  }

  getList(): Holding[] {
    return HoldingRecord.getList()
  }

  load() {
    this.getList().forEach((holding: Holding) => {
      holding.tryLoad()
    })
  }

  save() {
    this.getList().forEach((holding: Holding) => {
      holding.save()
    })
  }

  init() {
    this.getList().forEach((holding: Holding) => {
      holding.init()
    })
  }

  action() {
    this.getList().forEach((holding: Holding) => {
      holding.effect = holding.action()
    })
  }

  getRedParticles() { return HoldingRecord.redParticles }
}
