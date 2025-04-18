import {BlueUpgrade} from "./blue-upgrade";
import {Num} from "../../../num";

export class GreenIdleGainUpgrade extends BlueUpgrade {
  baseCost: Num = new Num(1, 30);
  cost: Num = new Num(1, 30);
  increase: Num = new Num(1, 0);
  displayName: string = "Green Particle Generation";
  name: string = "green-idle-gain";
  override oneTime: boolean = true;

  action(): undefined {
    return undefined;
  }

  getDescription(): string {
    return `Generate ${this.buffer.toString()}% of green particles gained on going green per second.`;
  }

}
