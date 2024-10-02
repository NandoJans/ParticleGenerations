import {RedGeneratorAutomator} from "../../features/automators/red-generator-automator";
import {RedGeneratorExtensionAutomator} from "../../features/automators/red-generator-extension-automator";
import {RedGeneratorBoosterAutomator} from "../../features/automators/red-generator-booster-automator";
import {RedAcceleratorUpgradeAutomator} from "../../features/automators/red-accelerator-upgrade-automator";
import {RedAcceleratorGeneratorAutomator} from "../../features/automators/red-accelerator-generator-automator";
import {Record} from "../record";
import {Automator} from "../../features/automator";

export class AutomatorRecord extends Record {
  // Red Phase
  static redGenerator: RedGeneratorAutomator = new RedGeneratorAutomator();
  static redGeneratorExtension: RedGeneratorExtensionAutomator = new RedGeneratorExtensionAutomator();
  static redGeneratorBooster: RedGeneratorBoosterAutomator = new RedGeneratorBoosterAutomator();
  static redAcceleratorGenerator: RedAcceleratorGeneratorAutomator = new RedAcceleratorGeneratorAutomator();
  static redAcceleratorUpgrade: RedAcceleratorUpgradeAutomator = new RedAcceleratorUpgradeAutomator();

  static override list: Automator[] = [
    AutomatorRecord.redGenerator,
    AutomatorRecord.redGeneratorExtension,
    AutomatorRecord.redGeneratorBooster,
    AutomatorRecord.redAcceleratorGenerator,
    AutomatorRecord.redAcceleratorUpgrade
  ]

  getList(): Automator[] {
    return AutomatorRecord.list;
  }
}
