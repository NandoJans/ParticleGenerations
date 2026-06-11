import {Num} from '../../../num';
import {Upgrade} from '../upgrade';
import {Holding} from '../holding';
import {HoldingRecord} from '../../records/holdings/holding-record';
import {ResetKey} from '../../enums/reset-key';
import {ResetHelper} from '../../helpers/reset-helper';
import {Styles} from '../../enums/styles';
import {Requirement} from '../interfaces/requirement';
import {Enhancement} from '../enhancements/enhancement';
import {Transaction} from '../interfaces/transaction';

export class GreenKeyUpgrade extends Upgrade {
  name = 'green-key-upgrade';
  displayName = 'Create Green Key';
  type = 'green-key-upgrade';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.BLUE, this);
  style = Styles.GREEN;
  nav = 'green';
  subNav = 'greenNuclear';
  requirement: Requirement[] = [];
  currency: Holding = HoldingRecord.nuclearPotential;
  override amount = new Num(0, 0);
  bought = new Num(0, 0);
  cost = Num.ONE;
  baseCost = Num.ONE;
  increase = new Num(10, 0);
  startIncrease = new Num(10, 0);
  override baseBuffer = Num.ONE;
  override buffer = Num.ONE;
  allowedEnhancements: Enhancement[] = [];
  override unlocked = true;
  override startUnlocked = true;
  override firstUnlock = true;

  override buy(): Transaction {
    this.correctCost();
    const transaction: Transaction = {
      cost: new Num(0, 0),
      amount: new Num(0, 0),
      currency: this.currency,
    };

    if (!this.isBuyable()) return transaction;

    const paid = this.cost.copy();
    this.currency.sub(paid);
    this.amount = this.amount.add(Num.ONE);
    this.bought = this.bought.add(Num.ONE);
    HoldingRecord.greenKeys.add(Num.ONE);
    this.correctCost();
    this.currency.save();
    HoldingRecord.greenKeys.save();
    this.save();

    transaction.cost = paid;
    transaction.amount = Num.ONE;
    return transaction;
  }

  action(): Num {
    return this.bought;
  }

  getDescription(): string {
    return 'Create a Green Key with Nuclear Potential. Each key can double one yellow element.';
  }

  override effectString(): string {
    return `${HoldingRecord.greenKeys.amount.toString()} available`;
  }

  canEnhance(): boolean {
    return false;
  }

  enhance(): void {}

  enhancementString(_enhancement: Enhancement): string {
    return '';
  }
}
