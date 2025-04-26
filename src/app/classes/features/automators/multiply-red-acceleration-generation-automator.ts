import {Automator} from "../automator";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {Styles} from "../../enums/styles";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class MultiplyRedAccelerationGenerationAutomator extends Automator {
  displayName: string = 'Multiply Red Accelerator Generation';
  goal: Num = new Num(1, 20);
  goalString: string = 'Have a total of 1e20 Red Accelerators';
  name: string = 'multiply-red-acceleration-generation-automator';
  style: Styles = Styles.RED_AUTOMATOR;
  override unlocked: boolean = false;
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this),
  ];

  buyables(): Buyable[] {
    return [
      UpgradeRecord.multiplyRedAcceleratorGeneration
    ];
  }

  task(): Num {
    return HoldingRecord.redAccelerators.amount || new Num(1, 0);
  }
}
