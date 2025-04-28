import {RedGeneratorAutomator} from "../../features/automators/red-generator-automator";
import {Record} from "../record";
import {Automator} from "../../features/automator";
import {GeneratorRecord} from "../generators/generator-record";
import {Injectable} from '@angular/core';
import {RedGeneratorBoosterAutomator} from "../../features/automators/red-generator-booster-automator";
import {MultiplyRedAccelerationGenerationAutomator} from "../../features/automators/multiply-red-acceleration-generation-automator";
import {ImproveRedAcceleratorsEffectAutomator} from "../../features/automators/improve-red-accelerators-effect-automator";
import {ImproveRedParticlesToAcceleratorsAutomator} from "../../features/automators/improve-red-particles-to-accelerators-automator";
import {BoosterAccelerationAutomator} from "../../features/automators/booster-acceleration-automator";
import {RedGeneratorExtensionAutomator} from "../../features/automators/red-generator-extension-automator";
import {
  MultiplyRedAcceleratorEffectAutomator
} from "../../features/automators/multiply-red-accelerator-effect-automator";

@Injectable({
  providedIn: 'root'
})
export class AutomatorRecord extends Record {
  // Red Phase
  static firstRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('firstRedGenerator', GeneratorRecord.firstRedGenerator);
  static secondRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('secondRedGenerator', GeneratorRecord.secondRedGenerator);
  static thirdRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('thirdRedGenerator', GeneratorRecord.thirdRedGenerator);
  static fourthRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('fourthRedGenerator', GeneratorRecord.fourthRedGenerator);
  static fifthRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('fifthRedGenerator', GeneratorRecord.fifthRedGenerator);

  static redGeneratorExtension: RedGeneratorExtensionAutomator = new RedGeneratorExtensionAutomator('redGeneratorExtension');
  static redGeneratorBooster: RedGeneratorBoosterAutomator = new RedGeneratorBoosterAutomator('redGeneratorBooster');

  // Red Accelerator Phase
  static multiplyRedAccelerationGeneration: MultiplyRedAccelerationGenerationAutomator = new MultiplyRedAccelerationGenerationAutomator('multiplyRedAccelerationGeneration');
  static multiplyRedAcceleratorEffect: MultiplyRedAcceleratorEffectAutomator = new MultiplyRedAcceleratorEffectAutomator('multiplyRedAcceleratorEffect');
  static improveRedAcceleratorsEffect: ImproveRedAcceleratorsEffectAutomator = new ImproveRedAcceleratorsEffectAutomator('improveRedAcceleratorsEffect');
  static improveRedParticlesToAccelerators: ImproveRedParticlesToAcceleratorsAutomator = new ImproveRedParticlesToAcceleratorsAutomator('improveRedParticlesToAccelerators');
  static boosterAcceleration: BoosterAccelerationAutomator = new BoosterAccelerationAutomator('boosterAcceleration');

  static override list: Automator[] = [
    AutomatorRecord.firstRedGenerator,
    AutomatorRecord.secondRedGenerator,
    AutomatorRecord.thirdRedGenerator,
    AutomatorRecord.fourthRedGenerator,
    AutomatorRecord.fifthRedGenerator,

    AutomatorRecord.redGeneratorExtension,
    AutomatorRecord.redGeneratorBooster,

    AutomatorRecord.multiplyRedAccelerationGeneration,
    AutomatorRecord.multiplyRedAcceleratorEffect,
    AutomatorRecord.improveRedAcceleratorsEffect,
    AutomatorRecord.improveRedParticlesToAccelerators,
    AutomatorRecord.boosterAcceleration,
  ]

  getList(): Automator[] {
    return AutomatorRecord.list;
  }

  runAutomators(): Automator[] {
    const completedAutomators: Automator[] = [];
    AutomatorRecord.list.forEach(automator => {
      if (automator.run()) {
        completedAutomators.push(automator);
      }
    });
    return completedAutomators;
  }
}
