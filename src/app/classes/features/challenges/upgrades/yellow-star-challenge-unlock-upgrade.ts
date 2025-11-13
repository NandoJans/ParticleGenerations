import {UnlockUpgrade} from "./unlock-upgrade";
import {Num} from "../../../../num";
import {Holding} from "../../holding";
import {Styles} from "../../../enums/styles";
import {GameElement} from "../../game-element";

export class YellowStarChallengeUnlockUpgrade extends UnlockUpgrade {

  constructor(
    saveName: string,
    name: string,
    displayName: string,
    cost: Num,
    currency: Holding,
    style: Styles,
    public unlockable: GameElement|GameElement[],
    difficultyIncrease: Num | Num[],
    difficulty = 0
  ) {
    super(
      saveName,
      name,
      displayName,
      cost,
      new Num(1, 0),
      new Num(1, 0),
      new Num(1, 0),
      currency,
      style,
      'yellow',
      'yellowChallenges',
      'yellowStarChallengeUnlockUpgrade',
      difficultyIncrease,
      difficulty
    )
  }

  action(): undefined {
    if (this.hasBought()) {
      if (this.unlockable instanceof GameElement) {
        this.unlockable.unlocked = true;
        this.unlockable.enable();
      } else {
        this.unlockable.forEach(unlockable => {
          unlockable.unlocked = true;
          unlockable.enable();
        })
      }
    }
    return;
  }

  override limit: Num = new Num(1, 0);
}
