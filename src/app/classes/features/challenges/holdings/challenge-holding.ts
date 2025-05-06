import { HoldingDisplay } from "src/app/classes/displays/holding-display";
import { ResetKey } from "src/app/classes/enums/reset-key";
import { Styles } from "src/app/classes/enums/styles";
import { Num } from "src/app/num";
import {Holding} from "../../holding";

export class ChallengeHolding extends Holding {
  holdingDisplay: HoldingDisplay

  constructor(
    public name: string,
    public displayName: string,
    public abbreviation: string,
    public amount: Num,
    public startAmount: Num,
    public style: Styles,
  ) {
    super();
    this.holdingDisplay = new HoldingDisplay('', '', '', '');
  }
  resetId: ResetKey = ResetKey.NONE;
  getStyle(): Styles {
    return this.style;
  }

  setHoldingDisplay(holdingDisplay: HoldingDisplay): void {
    this.holdingDisplay = holdingDisplay;
  }

  override effectString(effect: Num): string {
    return super.effectString(effect)+'x';
  }

  override action(): Num | undefined {
    return this.effect;
  }
}
