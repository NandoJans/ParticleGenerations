import { Num } from "src/app/num";
import {StarKeyUpgrade} from "./star-key-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UltraRedExtensionStarKeyUpgrade extends StarKeyUpgrade {
  override displayName: string = "Ultra Red Extension";

  constructor(saveName: string) {
    super(
      saveName,
      'ultra-red-extension-star-key-upgrade',
    );
  }

  override calculationOrder: number = 1010;

  override buffer: Num = new Num(1, 6);
  override baseBuffer: Num = new Num(1, 6);

  override getDescription(): string {
    return "Increase the multiplier of red extension by " + this.buffer.toString(2) + "x";
  }
  override action(): Num | undefined {
    if (this.hasBought()) {
      UpgradeRecord.redGeneratorExtension.buffer = UpgradeRecord.redGeneratorExtension.buffer.mul(this.buffer);
    }
    return;
  }
}
