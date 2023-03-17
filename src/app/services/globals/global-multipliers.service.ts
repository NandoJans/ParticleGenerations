import { Injectable } from '@angular/core';
import {Num} from "../../num";
import {darkAge} from "../interactables/challenges/green";

@Injectable({
  providedIn: 'root'
})
export class GlobalMultipliersService {
  static multipliers: object;
  static afterMultipliers: object;

  static reset() {
    this.multipliers = {
      redParticleGenerators: new Num(1, 0),
      redAcceleratorGenerators: new Num(1, 0),
      yellowParticleGenerators: new Num(1, 0),
      yellowFusion: new Num(1, 0),
      greenParticleGenerators: new Num(1, 0),
      nuclearDecayGenerators: new Num(1, 0),
      blueNeutronGenerators: new Num(1, 0),
      blueLightGenerators: new Num(1, 0),
      blueParticleGenerators: new Num(1, 0),
      redPurpleGenerators: new Num(1, 0),
      yellowPurpleGenerators: new Num(1, 0),
      greenPurpleGenerators: new Num(1, 0),
      bluePurpleGenerators: new Num(1, 0),
      purpleParticleGenerators: new Num(1, 0),

      yellowParticlesGain: new Num(1, 0),
      yellowsGain: new Num(1, 0),
      yellowPowerPower: new Num(5, 0),
      yellowFusionPower: new Num(2, -1),
      greenParticlesGain: new Num(1, 0),
      greensGain: new Num(1, 0),
      darkPowerPower: new Num(3, 0),
      blueParticlesGain: new Num(1, 0),
      blueNeutronPower: new Num(1, 0),
      blueLightPower: new Num(5, 0),
      yellowFusionBlueLightEffect: new Num(1, 0),
      greenSoulsGain: new Num(1, 0),
    }
  }

  static resetAfter() {
    this.afterMultipliers = {
      nuclearDecayPower: new Num(1, 0),
    }
  }

  static get(multiplier: string) {
    // @ts-ignore
    if (this.multipliers[multiplier] !== undefined) return this.multipliers[multiplier];
    // @ts-ignore
    if (this.afterMultipliers[multiplier] !== undefined) return this.afterMultipliers[multiplier];
  }

  static set(multiplier: string, amount: Num) {
    // @ts-ignore
    if (this.multipliers[multiplier] !== undefined) this.multipliers[multiplier] = amount;
    // @ts-ignore
    if (this.afterMultipliers[multiplier] !== undefined) this.afterMultipliers[multiplier] = amount;
  }

  static correct(multiplier: string, multiply: any) {
    // @ts-ignore
    if (this.multipliers[multiplier] !== undefined) this.multipliers[multiplier].mul(multiply)
    // @ts-ignore
    if (this.afterMultipliers[multiplier] !== undefined) this.afterMultipliers[multiplier].mul(multiply)
  }

  static power(multiplier: string, power: any) {
    // @ts-ignore
    if (this.multipliers[multiplier] !== undefined) this.multipliers[multiplier].pow(power)
    // @ts-ignore
    if (this.afterMultipliers[multiplier] !== undefined) this.afterMultipliers[multiplier].pow(power)
  }
}
