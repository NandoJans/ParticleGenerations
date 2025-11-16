import {Enhancement} from "./enhancement";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Num} from "../../../num";

export class YellowEnhancement extends Enhancement {
  style: Styles = Styles.YELLOW;
  respecResetKey: ResetKey = ResetKey.RED;
  name: string = 'yellow-enhancement';
  displayName: string = 'Yellow Enhancement';
  description: string = 'You are able to enhance a red phase element.';
  actionMessage: string = 'Click a red phase element to enhance it.';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);

  override getHolding() {
    return HoldingRecord.yellowKeys;
  }

  getRequirement(): Num {
    return new Num(2, 0).pow(new Num(this.enhancableAmount(), 0));
  }

  canEnhance(): boolean {
    return this.getHolding().amount.greq(this.getRequirement());
  }

  getMultiplier(): Num {
    return new Num(1.5, 0);
  }

  getAddition(): Num {
    return new Num(2, 0);
  }

  private enhancableAmount() {
    return Object.values(this.enhancables).length;
  }
}
