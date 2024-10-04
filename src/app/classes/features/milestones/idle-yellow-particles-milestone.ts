import {Num} from "../../../num";
import {YellowMilestone} from "./yellow-milestone";

export class IdleYellowParticlesMilestone extends YellowMilestone {
  name: string = 'idle-yellow-particles-gain';
  displayName: string = 'Idle Yellow Particles';
  goal: Num = new Num(2.5, 1);

  action(): Num | undefined {
    // TODO: Implement IdleYellowParticlesMilestone.action
    return undefined;
  }

  getDescription(): string {
    return "You generate 50% of your best yellow particles per second.";
  }

}
