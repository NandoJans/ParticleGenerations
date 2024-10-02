import {Num} from "../../../num";
import {RedAcceleratorMultiplierUpgrade} from "./red-accelerator-multiplier-upgrade";

export class ThirdRedAcceleratorMultiplierUpgrade extends RedAcceleratorMultiplierUpgrade {
  name: string = 'red-accelerator-multiplier-3';
  displayName: string = 'Red Accelerator Multiplier 3';

  baseCost = new Num(1, 6);
  cost = new Num(1, 6);

  override baseBuffer: Num = new Num(4, 0);
  override buffer: Num = new Num(4, 0);
}
