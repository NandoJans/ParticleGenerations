import {YellowMilestone} from "./yellow-milestone";
import {Num} from "../../../num";

export class BreakYellowBarrierMilestone extends YellowMilestone {
  constructor(name: string) {
    super(
      name,
      "Break Yellow's Barrier",
      new Num(1, 3)
    );
  }
  override getDescription(): string {
    return "Break yellow's barrier";
  }
}
