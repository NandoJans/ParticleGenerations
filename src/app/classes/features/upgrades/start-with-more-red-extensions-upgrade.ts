import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record"

export class StartWithMoreRedExtensionsUpgrade extends YellowUpgrade {
  constructor(saveName: string) {
    super(saveName, 'start-with-more-red-extensions');
  }
  displayName: string = 'Extend start';

  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  getDescription(): string {
    return "Start with red extensions already bought.";
  }
  action(): undefined {
    UpgradeRecord.redGeneratorExtension.startBought = this.amount.copy();
    return;
  }

  override effectString(): string {
    if (this.amount.equals(new Num(1, 0))) {
      return `${this.amount.toString()} Red Extension`;
    } else {
      return `${this.amount.toString()} Red Extensions`;
    }
  }

  override oneTime: boolean = false;
  override limit: Num = new Num(5, 0);
  override increase: Num = new Num(5, 0);
  baseCost: Num = new Num(5, 0);
  cost: Num = new Num(5, 0);
}
