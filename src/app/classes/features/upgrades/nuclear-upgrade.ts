import {Num} from '../../../num';
import {Upgrade} from '../upgrade';
import {Holding} from '../holding';
import {HoldingRecord} from '../../records/holdings/holding-record';
import {MultiplierRecord} from '../../records/multipliers/multiplier-record';
import {ResetKey} from '../../enums/reset-key';
import {ResetHelper} from '../../helpers/reset-helper';
import {Styles} from '../../enums/styles';
import {Requirement} from '../interfaces/requirement';
import {Enhancement} from '../enhancements/enhancement';
import {NuclearUpgradeConfig} from '../../config/nuclear-config';

export class NuclearUpgrade extends Upgrade {
  name: string;
  displayName: string;
  type = 'nuclear-upgrade';
  override calculationOrder = 2;
  resetId: ResetKey;
  style = Styles.NUCLEAR;
  nav = 'green';
  subNav = 'greenNuclear';
  requirement: Requirement[] = [];
  currency: Holding = HoldingRecord.nuclearFission;
  override amount = new Num(0, 0);
  bought = new Num(0, 0);
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

  constructor(public readonly config: NuclearUpgradeConfig) {
    super(config.key);
    this.name = config.key;
    this.displayName = config.displayName;
    this.cost = config.baseCost.copy();
    this.baseCost = config.baseCost.copy();
    this.increase = config.costIncrease.copy();
    this.startIncrease = config.costIncrease.copy();
    this.baseBuffer = config.buffPerLevel.copy();
    this.buffer = config.buffPerLevel.copy();
    this.limit = config.limit?.copy();
    this.resetId = ResetHelper.registerReset(ResetKey.BLUE, this);
  }

  action(): Num | undefined {
    const effect = this.buffer.pow(this.amount);
    switch (this.config.target) {
      case 'greenGenerators':
        MultiplierRecord.greenGenerators.correct(effect);
        break;
      case 'darkStars':
        HoldingRecord.darkStarHolding.tierBuffer = HoldingRecord.darkStarHolding.tierBuffer.mul(effect);
        break;
      case 'darkChargers':
        MultiplierRecord.darkChargerEffects.correct(effect);
        break;
      case 'nuclearFissionGain':
        MultiplierRecord.nuclearFissionGain.correct(effect);
        break;
      case 'nuclearPotentialGain':
        break;
      case 'unlockGreenGenerator4':
      case 'unlockGreenGenerator5':
      case 'reduceStarKeyCompressionRequirement':
        return undefined;
    }
    return effect;
  }

  getDescription(): string {
    if (
      this.config.target === 'unlockGreenGenerator4'
      || this.config.target === 'unlockGreenGenerator5'
      || this.config.target === 'reduceStarKeyCompressionRequirement'
    ) {
      return this.config.description;
    }
    return `${this.config.description} ${this.buffer.toString(2)}x per level.`;
  }

  canEnhance(): boolean { return false; }
  enhance(): void {}
  enhancementString(_enhancement: Enhancement): string { return ''; }
}
