import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";

export class NerfDarkAgeUpgrade extends LimitedUpgrade {
  name: string = 'nerf-dark-age';
  displayName: string = 'Nerf Dark Age and Set Power to 0.5';
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  override action(): Num {
    super.action();
    // TODO: Implement action
    return new Num(0.5, 0); // Set power to 0.5
  }

  getDescription(): string {
    return "";
  }
}
