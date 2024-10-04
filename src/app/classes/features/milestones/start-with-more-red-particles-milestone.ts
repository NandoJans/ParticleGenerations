import {YellowMilestone} from "./yellow-milestone";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class StartWithMoreRedParticlesMilestone extends YellowMilestone {
  name: string = 'start-with-1e10';
  displayName: string = 'Start with 1e10';
  goal: Num = new Num(1, 3);

  action(): Num | undefined {
    HoldingRecord.redParticles.startAmount = new Num(1, 10);
    return undefined;
  }

  getDescription(): string {
    return "Start yellows with 1e10 red particles.";
  }
}
