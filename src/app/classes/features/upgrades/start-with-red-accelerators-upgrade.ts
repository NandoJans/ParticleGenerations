import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class StartWithRedAcceleratorsUpgrade extends YellowUpgrade {
  name: string = 'start-with-red-accelerators';
  displayName: string = 'Accelerator Starter';

  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  override oneTime: boolean = true;

  override action(): undefined {
    GeneratorRecord.firstRedGenerator.requirement = [];
    return undefined
  }

  override getDescription(): string {
    return 'Start yellows with the first red accelerator unlocked.';
  }
}
