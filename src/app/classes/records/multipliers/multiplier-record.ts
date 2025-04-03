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
}
