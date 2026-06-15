import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {BuffSoftCapHelper} from "../../helpers/buff-soft-cap-helper";

export class StarKeyHolding extends Holding {
  static hasIncompleteUpgradeUnlock: () => boolean = () => false;
  name: string = 'star-key-holding';
  displayName: string = 'Star Key';
  abbreviation: string = 'SK';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Star Keys')
    .withEffectPrefix('They apply')
    .withEffectSuffix(' to red generator multipliers')
    .build()
  buffer: Num = new Num(0.03, 0);
  baseBuffer: Num = new Num(0.03, 0);
  starKeyUpgradesBought: Num = new Num(0, 0);
  hasBoughtTotal: boolean = false;
  totalUpgrades: Num = new Num(8, 0);
  private readonly effectSoftCap: Num = new Num(2.5, 0);
  private readonly effectSoftCapPower: Num = new Num(0.2, 0);


  override action(): Num|undefined {
    this.hasBoughtTotal = this.starKeyUpgradesBought.greq(this.totalUpgrades);
    this.starKeyUpgradesBought = new Num(0, 0);
    if (
      this.hasBoughtTotal
      || StarKeyHolding.hasIncompleteUpgradeUnlock()
    ) {
      const rawEffect = this.buffer.mul(this.amount).add(Num.ONE);
      const effect = BuffSoftCapHelper.applyPowerSoftCap(
        rawEffect,
        this.effectSoftCap,
        this.effectSoftCapPower
      );
      if (effect.greq(Num.ONE)) {
        MultiplierRecord.redParticleGenerators.power(effect);
        this.buffer = this.baseBuffer.copy();
        return effect;
      }
    }
    return;
  }

  override effectString(effect: Num): string {
    return '^'+effect.toString(2);
  }

  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override calculationOrder = 999;
  getStyle(): Styles {
    return Styles.STAR_KEY;
  }
}
