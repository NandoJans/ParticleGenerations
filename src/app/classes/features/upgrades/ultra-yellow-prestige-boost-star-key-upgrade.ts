import {Num} from "../../../num";
import {StarKeyUpgrade} from "./star-key-upgrade";

export class UltraYellowPrestigeBoostStarKeyUpgrade extends StarKeyUpgrade {
  override displayName: string = "Ultra Yellow Prestige Boost";
  constructor(saveName: string) {
    super(
      saveName,
      'ultra-yellow-prestige-boost-star-key-upgrade',
    );
  }

  override calculationOrder: number = 1000;

  override buffer: Num = new Num(1.5, 0);
  override baseBuffer: Num = new Num(1.5, 0);

  override getDescription(): string {
    return `Change the yellow prestige boost upgrade effect to ${this.buffer.toString(2)}^Y`;
  }

  override action(): Num | undefined {
    return;
  }
}
