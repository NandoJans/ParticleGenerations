import {RedGeneratorAutomator} from "../../features/automators/red-generator-automator";
import {Record} from "../record";
import {Automator} from "../../features/automator";
import {GeneratorRecord} from "../generators/generator-record";
import {HoldingRecord} from "../holdings/holding-record";
import {Num} from "../../../num";
import { Injectable } from '@angular/core';
import {RedGeneratorBoosterAutomator} from "../../features/automators/red-generator-booster-automator";

@Injectable({
  providedIn: 'root'
})
export class AutomatorRecord extends Record {
  // Red Phase
  static firstRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator(
    GeneratorRecord.firstRedGenerator,
    [{require: HoldingRecord.redParticles, amount: new Num(1, 10)}],
  );
  static secondRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator(
    GeneratorRecord.secondRedGenerator,
    [{require: HoldingRecord.redParticles, amount: new Num(1, 10)}],
  );
  static thirdRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator(
    GeneratorRecord.thirdRedGenerator,
    [{require: HoldingRecord.redParticles, amount: new Num(1, 10)}],
  );
  static fourthRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator(
    GeneratorRecord.fourthRedGenerator,
    [{require: HoldingRecord.redParticles, amount: new Num(1, 10)}],
  );
  static fifthRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator(
    GeneratorRecord.fifthRedGenerator,
    [{require: HoldingRecord.redParticles, amount: new Num(1, 10)}],
  );
  static redGeneratorBooster: RedGeneratorBoosterAutomator = new RedGeneratorBoosterAutomator();

  static override list: Automator[] = [
    AutomatorRecord.firstRedGenerator,
    AutomatorRecord.secondRedGenerator,
    AutomatorRecord.thirdRedGenerator,
    AutomatorRecord.fourthRedGenerator,
    AutomatorRecord.fifthRedGenerator,
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
