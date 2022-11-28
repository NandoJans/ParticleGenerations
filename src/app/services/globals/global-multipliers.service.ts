import { Injectable } from '@angular/core';
import {Num} from "../../num";
import {darkAge} from "../interactables/challenges/green";

@Injectable({
  providedIn: 'root'
})
export class GlobalMultipliersService {
  static multipliers = {
    redParticleGenerators: new Num(1, 0),
    redAcceleratorGenerators: new Num(1, 0),
    yellowParticlesGain: new Num(1, 0),
    yellowParticleGenerators: new Num(1, 0),
    yellowFusion: new Num(1, 0),
    yellowFusionPower: new Num(2, -1),
    greenParticleGenerators: new Num(1, 0),
    greenParticlesGain: new Num(1, 0),
    nuclearDecayGenerators: new Num(1, 0),
    blueNeutronGenerators: new Num(1, 0)
  };

  constructor() { }

  static reset() {
    this.multipliers = {
      redParticleGenerators: new Num(1, 0),
      redAcceleratorGenerators: new Num(1, 0),
      yellowParticlesGain: new Num(1, 0),
      yellowParticleGenerators: new Num(1, 0),
      yellowFusion: new Num(1, 0),
      yellowFusionPower: new Num(2, -1),
      greenParticleGenerators: new Num(1, 0),
      greenParticlesGain: new Num(1, 0),
      nuclearDecayGenerators: new Num(1, 0),
      blueNeutronGenerators: new Num(1, 0)
    }
  }

  static get(multiplier: string) {
    // @ts-ignore
    return this.multipliers[multiplier];
  }

  static correct(multiplier: string, multiply: any) {
    // @ts-ignore
    this.multipliers[multiplier].mul(multiply)
  }

  static power(multiplier: string, power: any) {
    // @ts-ignore
    this.multipliers[multiplier].pow(power)
  }
}
