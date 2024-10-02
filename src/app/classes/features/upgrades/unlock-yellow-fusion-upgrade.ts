import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class UnlockYellowFusionUpgrade extends YellowUpgrade {
  name: string = 'unlock-yellow-fusion';
  displayName: string = 'Unlock Yellow Fusion';

  baseCost: Num = new Num(1, 32);
  cost: Num = new Num(1, 32);
  override oneTime: boolean = true;
  override subNav: string = 'yellowFusion'

  override action(): undefined {
    GeneratorRecord.firstRedGenerator.requirement = [];
    this.hidden = true;
    return undefined
  }

  override getDescription(): string {
    return 'Start yellow fusion to boost yellow generators.';
  }
}
