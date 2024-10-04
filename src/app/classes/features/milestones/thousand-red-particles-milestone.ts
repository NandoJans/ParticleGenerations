import {YellowMilestone} from "./yellow-milestone";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class ThousandRedParticlesMilestone extends YellowMilestone {
  name: string = 'thousand-red-particles';
  displayName: string = 'Start with 1000';
  goal: Num = new Num(1, 0);

  action(): Num | undefined {
    HoldingRecord.redParticles.startAmount = new Num(1, 3);
    return undefined;
  }

  getDescription(): string {
    return "Sets the starting amount of red particles to 1000.";
  }

}
