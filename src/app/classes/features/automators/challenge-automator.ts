import { Num } from "src/app/num";
import {Automator} from "../automator";
import {Buyable} from "../buyable";
import {Challenge} from "../challenge";
import {StatsService} from "../../../services/stats.service";

export abstract class ChallengeAutomator extends Automator {
  name: string;
  displayName: string;

  protected constructor(
    saveName: string,
    public challenge: Challenge
  ) {
    super(saveName);
    this.displayName = challenge.displayName + "-Automator";
    this.name = challenge.name + "-automator";
  }

  buyables(): Buyable[] {
      return [
        ...this.challenge.getGenerators(),
        ...this.challenge.getUpgrades()
      ]
  }

  goal: Num = new Num(2, 1);
  goalString: string = "Complete the challenge 20 times in total.";
  task(): Num {
    return StatsService.getNum(this.challenge.name, 'totalCompletions');
  }
}
