import {ChallengeUpgrade} from "./challenge-upgrade";
import {Num} from "../../../../num";
import {Holding} from "../../holding";
import {Styles} from "../../../enums/styles";
import {Transaction} from "../../interfaces/transaction";

export class CustomChallengeUpgrade extends ChallengeUpgrade {
  constructor(
    saveName: string,
    name: string,
    displayName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    currency: Holding,
    style: Styles,
    nav: string,
    subNav: string,
    type: string,
    public description: Function = () => '',
    public customAction: Function = () => undefined,
    public customBuyAction: Function = () => undefined,
  ) {
    super(
      saveName,
      name,
      displayName,
      cost,
      increase,
      scaling,
      buffer,
      currency,
      style,
      nav,
      subNav,
      type
    );
  }

  action(): Num|undefined {
    return this.customAction(this) ?? undefined;
  }

  override getDescription(): string {
    return this.description(this);
  }

  setDescription(description: Function): void {
    this.description = description;
  }

  setCustomAction(customAction: Function): void {
    this.customAction = customAction;
  }

  setCustomBuyAction(customBuyAction: Function): void {
    this.customBuyAction = customBuyAction;
  }

  override buy(amount: Num = new Num(1, 0)): Transaction {
    const transaction = super.buy(amount);
    this.customBuyAction(this)
    return transaction;
  }
}
