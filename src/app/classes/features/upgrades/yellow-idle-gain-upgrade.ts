import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";

export class YellowIdleGainUpgrade extends LimitedUpgrade {
  name: string = 'yellow-idle-gain';
  displayName: string = 'Gain 1% of Your Yellows Gained on Yellow per Second';
  baseCost: Num = new Num(2, 2);
  cost: Num = new Num(2, 2);
  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  override action(): Num {
    super.action();
    // TODO: Implement this
    return new Num(0.01, 0); // Gain 1% of yellows per second
  }

  getDescription(): string {
    return "";
  }
}
