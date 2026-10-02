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
    private readonly getChallenge: () => Challenge,
    challengeName: string,
    challengeDisplayName: string,
  ) {
    super(saveName);
    this.displayName = challengeDisplayName + "-Automator";
    this.name = challengeName + "-automator";
  }

  /**
   * Challenge records and automator records are both static registries. Resolve
   * the challenge only when the automator runs so neither registry has to be
   * initialized first.
   */
  get challenge(): Challenge {
    return this.getChallenge();
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
