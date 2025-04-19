import {Multiplier} from "../../features/multiplier";
import {Num} from "../../../num";

export class MultiplierRecord {

  // Red Phase
  static redParticleGenerators: Multiplier = new Multiplier('redParticleGenerators', new Num(1, 0))
  static redAcceleratorGenerators: Multiplier = new Multiplier('redAcceleratorGenerators', new Num(1, 0))
  static redPurpleGenerators: Multiplier = new Multiplier('redPurpleGenerators', new Num(1, 0))

  // Yellow Phase
  static yellowParticlesGain: Multiplier = new Multiplier('yellowParticlesGain', new Num(1, 0))
  static yellowPowerGenerators: Multiplier = new Multiplier('yellowPowerGenerators', new Num(1, 0))
  static yellowFusion: Multiplier = new Multiplier('yellowFusion', new Num(1, 0))
  static yellowPurpleGenerators: Multiplier = new Multiplier('yellowPurpleGenerators', new Num(1, 0))

  // Green Phase
  static greenParticleGenerators: Multiplier = new Multiplier('greenParticleGenerators', new Num(1, 0))
  static greenSoulsGain: Multiplier = new Multiplier('greenSoulsGain', new Num(1, 0))
  static darkEnergyGain: Multiplier = new Multiplier('darkEnergyGain', new Num(1, 0));
  static nuclearDecayGenerators: Multiplier = new Multiplier('nuclearDecayGenerators', new Num(1, 0))
  static greenPurpleGenerators: Multiplier = new Multiplier('greenPurpleGenerators', new Num(1, 0))

  // Blue Phase
  static bluePurpleGenerators: Multiplier = new Multiplier('bluePurpleGenerators', new Num(1, 0));

  // Purple Phase
  static purpleParticleGenerators: Multiplier = new Multiplier('purpleParticleGenerators', new Num(1, 0))
  static gravityGenerators: Multiplier = new Multiplier('gravityGenerators', new Num(1, 0));
  static greenParticlesGain: Multiplier = new Multiplier('greenParticlesGain', new Num(1, 0));
  static blueLightGenerators: Multiplier = new Multiplier('blueLightGenerators', new Num(1, 0));
  static blueLightPower: Multiplier = new Multiplier('blueLightPower', new Num(1, 0));
  static yellowFusionBlueLightEffect: Multiplier = new Multiplier('yellowFusionBlueLightEffect', new Num(1, 0));
  static blueParticlesGain: Multiplier = new Multiplier('blueParticlesGain', new Num(1, 0));
  static darkPowerPower: Multiplier = new Multiplier('darkPowerPower', new Num(1, 0));
  static blueNeutronGenerators: Multiplier = new Multiplier('blueNeutronGenerators', new Num(1, 0));
  static yellowPowerPower: Multiplier = new Multiplier('yellowPowerPower', new Num(1, 0));
  static blueNeutronPower: Multiplier = new Multiplier('blueNeutronPower', new Num(1, 0));
  static blueParticleGenerators: Multiplier = new Multiplier('blueParticleGenerators', new Num(1, 0));
  static nuclearDecayPower: Multiplier = new Multiplier('nuclearDecayPower', new Num(1, 0))
}
