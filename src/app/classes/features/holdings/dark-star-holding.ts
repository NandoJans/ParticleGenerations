import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class DarkStarHolding extends Holding {
  abbreviation: string = 'DS';
  amount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Dark Stars')
    .withEffectPrefix('Red generators: ')
    .withEffectSuffix('')
    .addLine('Yellow generators: ', () => {
      return (this.yellowEffect) ? this.yellowEffect.toString(2) + 'x' : '-';
    }, '')
    .addLine('Green generators: ', () => {
      return (this.greenEffect) ? this.greenEffect.toString(2) + 'x' : '-';
    }, '')
    .addLine('Charger tiers boost the power of dark stars by ', () => {
      return this.tierEffect.toString(2) + 'x';
    }, '')
    .build();
  name: string = 'dark-star-holding';
  displayName: string = 'Dark Stars';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  startAmount: Num = new Num(0, 0);
  redBuffer: Num = new Num(1, 100);      // Red gets 1e100x per dark star
  yellowBuffer: Num = new Num(1, 5);    // Yellow gets 1e5x per dark star
  greenBuffer: Num = new Num(5, 0);     // Green gets 5x per dark star

  yellowEffect: Num|undefined = new Num(1, 100);
  greenEffect: Num|undefined = new Num(1, 100);

  tierEffect: Num = new Num(1, 0);
  tierBuffer: Num = new Num(1, 0);

  override action(): Num {
    const redEffect = this.redBuffer.pow(this.tierBuffer).pow(this.amount);
    this.yellowEffect = this.yellowBuffer.pow(this.tierBuffer).pow(this.amount);
    this.greenEffect = this.greenBuffer.pow(this.tierBuffer).pow(this.amount);

    this.tierEffect = this.tierBuffer.copy();

    MultiplierRecord.redParticleGenerators.correct(redEffect);
    MultiplierRecord.yellowGenerators.correct(this.yellowEffect);
    MultiplierRecord.greenGenerators.correct(this.greenEffect);

    this.redBuffer = new Num(1, 100);
    this.yellowBuffer = new Num(1, 5);
    this.greenBuffer = new Num(5, 0);
    this.tierBuffer = new Num(1, 0);

    return redEffect;  // Return red effect as the primary effect
  }

  override effectString(effect: Num): string {
    return super.effectString(effect) + 'x';
  }

  getStyle(): Styles {
    return Styles.DARK;
  }
}
