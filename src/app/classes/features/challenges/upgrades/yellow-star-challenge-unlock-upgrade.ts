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
    public unlockable: GameElement,
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
    )
  }

  action(): undefined {
    if (this.hasBought()) {
      this.unlockable.unlocked = true;
    }
    return;
  }

  override limit: Num = new Num(1, 0);
}
