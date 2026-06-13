import {Num} from '../../../num';
import {Upgrade} from '../upgrade';
import {Requirement} from '../interfaces/requirement';
import {ResetKey} from '../../enums/reset-key';
import {ResetHelper} from '../../helpers/reset-helper';
import {Styles} from '../../enums/styles';
import {Holding} from '../holding';
import {HoldingRecord} from '../../records/holdings/holding-record';
import {Enhancement} from '../enhancements/enhancement';

export class BlueUpgrade extends Upgrade {
  type = 'blue-upgrade';
  style = Styles.BLUE;
  nav = 'blue';
  subNav = 'blueParticles';
  requirement: Requirement[] = [];
  currency: Holding = HoldingRecord.neutrons;
  resetId: ResetKey;
  override amount = Num.ZERO.copy();
  bought = Num.ZERO.copy();
  cost: Num;
  baseCost: Num;
  increase: Num;
  startIncrease: Num;
  override baseBuffer: Num;
  override buffer: Num;
  override unlocked = true;
  override startUnlocked = true;
  override firstUnlock = true;
  allowedEnhancements: Enhancement[] = [];

  constructor(
    saveName: string,
    public name: string,
    public displayName: string,
    private readonly description: string,
    baseCost: Num,
    increase: Num,
    buffer: Num,
    currency: Holding = HoldingRecord.neutrons
  ) {
    super(saveName);
    this.currency = currency;
    this.baseCost = baseCost.copy();
    this.cost = baseCost.copy();
    this.increase = increase.copy();
    this.startIncrease = increase.copy();
    this.baseBuffer = buffer.copy();
    this.buffer = buffer.copy();
    this.resetId = ResetHelper.registerReset(ResetKey.PURPLE, this);
  }

  action(): Num {
    return this.buffer.pow(this.amount);
  }

  getDescription(): string {
    return `${this.description} ${this.buffer.toString(2)}x per level.`;
  }

  canEnhance(): boolean { return false; }
  enhance(): void {}
  enhancementString(_enhancement: Enhancement): string { return ''; }
}
