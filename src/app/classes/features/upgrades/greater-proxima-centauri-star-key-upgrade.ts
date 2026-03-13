import {StarKeyUpgrade} from "./star-key-upgrade";
import {Num} from "../../../num";

export class GreaterProximaCentauriStarKeyUpgrade extends StarKeyUpgrade {
  override displayName: string = "Greater Proxima Centauri";
  constructor(saveName: string) {
    super(
      saveName,
      'greater-proxima-centauri-star-key-upgrade',
    );
  }

  override calculationOrder: number = 1000;

  override buffer: Num = new Num(1, 150);
  override baseBuffer: Num = new Num(1, 150);

  override getDescription(): string {
    return `Increase effect cap of proxima centauri by ${this.buffer.toString(2)}`;
  }

  override action(): Num | undefined {
    return;
  }
}
