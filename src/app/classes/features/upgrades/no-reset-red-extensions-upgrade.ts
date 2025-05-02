import {Num} from "src/app/num";
import {YellowUpgrade} from "./yellow-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {ResetKey} from "../../enums/reset-key";

export class NoResetRedExtensionsUpgrade extends YellowUpgrade {
  displayName: string = 'No Reset Red Extensions';

  constructor(name: string) {
    super(name, 'no-reset-red-extensions');
  }

  getDescription(): string {
    return "Red extensions no longer reset red generators.";
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.redGeneratorExtension.resets = ResetKey.NONE;
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(9, 0);
  cost: Num = new Num(9, 0);

}
