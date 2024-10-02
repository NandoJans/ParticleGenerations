import {Num} from "../../../num";
import {RedAcceleratorMultiplierUpgrade} from "./red-accelerator-multiplier-upgrade";

export class FirstRedAcceleratorMultiplierUpgrade extends RedAcceleratorMultiplierUpgrade {
  name: string = 'red-accelerator-multiplier-1';
  displayName: string = 'Red Accelerator Multiplier 1';

  baseCost = new Num(1, 4);
  cost = new Num(1, 4);

  override baseBuffer: Num = new Num(2, 0);
  override buffer: Num = new Num(2, 0);
}
