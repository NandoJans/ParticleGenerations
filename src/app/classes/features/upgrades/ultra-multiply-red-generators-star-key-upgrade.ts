import {Num} from "../../../num";
import {StarKeyUpgrade} from "./star-key-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UltraMultiplyRedGeneratorsStarKeyUpgrade extends StarKeyUpgrade {
  override displayName: string = "Ultra Multiply Red Generators";

  constructor(saveName: string) {
    super(
      saveName,
      'ultra-multiply-red-generators-star-key-upgrade',
    );
  }

  override calculationOrder: number = 500;

  override buffer: Num = new Num(1, 5);
  override baseBuffer: Num = new Num(1, 5);

  override getDescription(): string {
    return `Multiply the power of multiply red generators by ${this.buffer.toString(2)}x`;
  }

  override action(): Num | undefined {
    if (this.hasBought()) {
      UpgradeRecord.multiplyRedGeneratorsYellow.buffer = UpgradeRecord.multiplyRedGeneratorsYellow.buffer.mul(this.buffer);
    }
    return;
  }
}
