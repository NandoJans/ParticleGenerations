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

  // Green Phase
  static greenParticles: GreenParticleHolding = new GreenParticleHolding();
  static greenPrestiges: GreenPrestigeHolding = new GreenPrestigeHolding();
  static darkEnergy: DarkEnergyHolding = new DarkEnergyHolding();

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

      HoldingRecord.greenParticles,
      HoldingRecord.greenPrestiges,
      HoldingRecord.darkEnergy,
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

  action() {
    this.getList().forEach((holding: Holding) => {
      holding.effect = holding.action()
    })
  }

  getRedParticles() { return HoldingRecord.redParticles }
}
