import {Num} from "../../../num";
import {GreenUpgrade} from "./green-upgrade";

export class UnlockThirdGreenGeneratorUpgrade extends GreenUpgrade {
  displayName: string = 'Unlock Third Green Generator';

  constructor(saveName: string) {
    super(saveName, 'unlock-third-green-generator');
  }

  getDescription(): string {
    return 'Unlocks the third green generator.';
  }

  action(): undefined {
    return;
  }

  override oneTime: boolean = true;
  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 150);
  cost: Num = new Num(1, 150);
}
