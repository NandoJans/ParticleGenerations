import {Requirement} from "../interfaces/requirement";
import {GameElement} from "../game-element";
import {Num} from "../../../num";
import {Resetable} from "../interfaces/resetable";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Storable} from "../interfaces/storable";
import {LocalStorageHelper} from "../../helpers/local-storage-helper";
import {Holding} from "../holding";
import {MessageSteps} from "../../display/message-steps";
import {Multiplier} from "../multiplier";

export class PrestigeLayer extends GameElement implements Resetable, Storable {
  name: string;
  displayName: string = '';
  requirement: Requirement[];
  reached: boolean = false;
  prestigedFirstTime: boolean = false;
  style: string;
  limitPhaseBelow: boolean = true;
  holdingPhaseBelow: Holding;
  amountRequired: Num;
  gainHoldings: {holding: Holding, basedOnRequiredHolding: boolean, gainMultiplier: Multiplier}[] = [];
  resets: ResetKey;
  messageSteps: MessageSteps;

  constructor(
    saveName: string,
    name: string,
    holdingRequired: Holding,
    amountRequired: Num,
    style: string,
    gainHoldings: {holding: Holding, basedOnRequiredHolding: boolean, gainMultiplier: Multiplier}[],
    resets: ResetKey,
    message: MessageSteps,
  ) {
    super(saveName);
    this.name = name;
    this.requirement = [
      new Requirement(holdingRequired, amountRequired, this)
    ]
    this.style = style;
    this.holdingPhaseBelow = holdingRequired;
    this.amountRequired = amountRequired;
    this.gainHoldings = gainHoldings;
    this.resets = resets;
    this.messageSteps = message;
  }

  override unlock(): void | { title: string; message: string } {
    this.unlocked = true;
    this.reached = true;
  }

  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  softResetId: ResetKey = ResetKey.NONE;

  reset(): void {
    this.reached = false;
    this.requirement.forEach(requirement => {
      requirement.register();
    })
  }

  softReset(): void {}

  hasReached(): boolean {
    return this.reached;
  }

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());

  getSaveCategory(): string {
    return 'prestige-layers';
  }

  getSaveKey(): string {
    return this.name;
  }

  save(): void {
    const localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    localStorageHelper.save(this.reached, 'reached');
    localStorageHelper.save(this.unlocked, 'unlocked');
    localStorageHelper.save(this.prestigedFirstTime, 'prestigedFirstTime');
  }

  tryLoad(): void {
    const localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.reached = localStorageHelper.load(this.reached, 'reached');
    this.unlocked = localStorageHelper.load(this.unlocked, 'unlocked');
    this.prestigedFirstTime = localStorageHelper.load(this.prestigedFirstTime, 'prestigedFirstTime');
  }

  private shouldLimitPhaseBelow(): boolean {
    return this.limitPhaseBelow;
  }

  private applyLimitPhaseBelow(): void {
    if (this.shouldLimitPhaseBelow() && this.holdingPhaseBelow.amount.greq(this.amountRequired)) {
      this.holdingPhaseBelow.amount = this.amountRequired.copy();
    }
  }

  private calculateHoldingGain() {
    // TODO: implement
  }

  private addGainHoldings() {
    this.gainHoldings.forEach(gain => {
      // TODO: use calculateHoldingGain when implemented;
      gain.holding.amount = gain.holding.amount.add(new Num(1, 0).mul(gain.gainMultiplier.num));
    });
  }

  override run(speed: Num) {
    this.applyLimitPhaseBelow();
    this.checkRequirements();
  }

  private applyReset() {
    ResetHelper.reset(this.resets);
  }

  prestige() {
    if (this.hasReached()) {
      this.applyReset();
      this.addGainHoldings();
    }
  }

  firstTimeMessage(): MessageSteps {
    return this.messageSteps;
  }

  private checkRequirements() {
    if (this.holdingPhaseBelow.amount.greq(this.amountRequired)) {
      this.unlock();
    }
  }
}
