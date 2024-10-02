import {Num} from "../../../num";
import {RedAcceleratorMultiplierUpgrade} from "./red-accelerator-multiplier-upgrade";

export class SecondRedAcceleratorMultiplierUpgrade extends RedAcceleratorMultiplierUpgrade {
  name: string = 'red-accelerator-multiplier-2';
  displayName: string = 'Red Accelerator Multiplier 2';

  baseCost = new Num(1, 5);
  cost = new Num(1, 5);

  override baseBuffer: Num = new Num(3, 0);
  override buffer: Num = new Num(3, 0);
}
