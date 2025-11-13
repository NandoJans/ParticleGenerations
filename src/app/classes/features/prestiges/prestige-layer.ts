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
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {App} from "../../../App";

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
  gainHoldings: {holding: Holding, basedOnRequiredHolding: boolean, gainMultiplier: Multiplier, idleGeneration: boolean}[] = [];
  resets: ResetKey;
  messageSteps: MessageSteps;
  firstTimeText: string;
  idleGenerationHolding: Holding
  idleGenerationMultiplier: Multiplier;
  prestigeStarted: Date;
  highestGenerationPerTick: Num = new Num(0, 0);
  holdingGain: Num = new Num(0, 0);
  bestPrestige: Num = new Num(0, 0);


  constructor(
    saveName: string,
    name: string,
    holdingRequired: Holding,
    amountRequired: Num,
    style: string,
    gainHoldings: {holding: Holding, basedOnRequiredHolding: boolean, gainMultiplier: Multiplier, idleGeneration: boolean}[],
    resets: ResetKey,
    resetId: ResetKey,
    message: MessageSteps,
    firstTimeText: string,
    idleGenerationHolding: Holding,
    idleGenerationMultiplier: Multiplier,
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
    this.resetId = ResetHelper.registerReset(resetId, this)
    this.messageSteps = message;
    this.firstTimeText = firstTimeText;
    this.idleGenerationHolding = idleGenerationHolding;
    this.idleGenerationMultiplier = idleGenerationMultiplier;
    this.prestigeStarted = new Date();
    this.highestGenerationPerTick = new Num(0, 0);
  }

  override unlock(): void | { title: string; message: string } {
    this.unlocked = true;
    this.reached = true;
  }

  resetId: ResetKey;
  softResetId: ResetKey = ResetKey.NONE;

  reset(): void {
    console.log('prestige layer reset', this.name);
    this.reached = false;
    this.highestGenerationPerTick = new Num(0, 0);
    this.bestPrestige = new Num(0, 0);
    this.limitPhaseBelow = true;
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
    localStorageHelper.save(this.prestigeStarted.toISOString(), 'prestigeStarted');
    localStorageHelper.saveNum(this.highestGenerationPerTick, 'highestGenerationPerTick');
    localStorageHelper.saveNum(this.bestPrestige, 'bestPrestige');
  }

  tryLoad(): void {
    const localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.reached = localStorageHelper.load(this.reached, 'reached');
    this.unlocked = localStorageHelper.load(this.unlocked, 'unlocked');
    this.prestigedFirstTime = localStorageHelper.load(this.prestigedFirstTime, 'prestigedFirstTime');
    this.prestigeStarted = new Date(localStorageHelper.load(this.prestigeStarted.toISOString(), 'prestigeStarted'));
    this.highestGenerationPerTick = localStorageHelper.loadNum(this.highestGenerationPerTick, 'highestGenerationPerTick');
    this.bestPrestige = localStorageHelper.loadNum(this.bestPrestige, 'bestPrestige');
  }

  private shouldLimitPhaseBelow(): boolean {
    return this.limitPhaseBelow;
  }

  private applyLimitPhaseBelow(): void {
    if (this.shouldLimitPhaseBelow() && this.holdingPhaseBelow.amount.greq(this.amountRequired)) {
      this.holdingPhaseBelow.amount = this.amountRequired.copy();
    }
  }

  private calculateHoldingGain(gain: {
    holding: Holding,
    basedOnRequiredHolding: boolean,
    gainMultiplier: Multiplier,
    idleGeneration: boolean
  }): Num {
    // start with the normal gain
    let baseGain = new Num(1, 0).mul(gain.gainMultiplier.getNum());

    if (gain.basedOnRequiredHolding) {
      const exponent = this.holdingPhaseBelow.amount.log10();
      const base = this.amountRequired.log10();
      const thresholds = exponent.div(base).sub(new Num(1, 0));
      baseGain = baseGain.mul(new Num(2, 0).pow(thresholds));
    }

    if (App.offlineCalculation) {
      baseGain = baseGain.mul(App.gameSpeed);
    }

    return baseGain;
  }

  private addGainHoldings() {
    let generatedHoldings: Num = new Num(0, 0);
    this.gainHoldings.forEach(gain => {
      const holdingGain = this.calculateHoldingGain(gain);
      if (gain.idleGeneration) {
        generatedHoldings = holdingGain;
        if (generatedHoldings.gt(this.bestPrestige)) {
          this.bestPrestige = generatedHoldings;
        }
      }
      gain.holding.amount = gain.holding.amount.add(holdingGain);
    });
    return generatedHoldings;
  }

  private setHoldingGain() {
    for (const gain of this.gainHoldings) {
      if (gain.idleGeneration) {
        this.holdingGain = this.calculateHoldingGain(gain);
      }
    }
  }

  override run(speed: Num) {
    this.applyLimitPhaseBelow();
    this.setHoldingGain();
    this.checkRequirements();
    this.idleGeneration(speed);
  }

  private applyReset() {
    ResetHelper.reset(this.resets);
  }

  private calculateFastestPrestige(holdingGain: Num) {
    if (!App.offlineCalculation) {
      const currentTime = new Date();
      const timeDiff = currentTime.getTime() - this.prestigeStarted.getTime();
      const timeDiffInSeconds = Math.floor(timeDiff / 20);
      const generationPerTick = holdingGain.div(new Num(timeDiffInSeconds, 0));
      if (generationPerTick.gt(this.highestGenerationPerTick)) {
        this.highestGenerationPerTick = generationPerTick;
      }
    }
    this.prestigeStarted = new Date();
  }

  prestige() {
    if (ChallengeService.inChallenge(this.name)) {
      if (ChallengeService.challengeGoalReached(this.name)) {
        ChallengeService.completeChallenge(this.name);
        const holdingGain = this.addGainHoldings();
        this.calculateFastestPrestige(holdingGain);
        this.applyReset();
      }
    } else if (this.hasReached()) {
      const holdingGain = this.addGainHoldings();
      this.calculateFastestPrestige(holdingGain);
      this.applyReset();
    }
  }

  private checkRequirements() {
    if (this.holdingPhaseBelow.amount.greq(this.amountRequired)) {
      this.unlock();
    } else {
      this.reached = false;
    }
  }

  private idleGeneration(speed: Num) {
    // Calculate idle generation for the holding based on the fastest prestige time multiplied by the multiplier
    const idleGeneration = this.highestGenerationPerTick.mul(this.idleGenerationMultiplier.num).mul(speed);
    if (idleGeneration.gt(new Num(0, 0))) {
      this.idleGenerationHolding.amount = this.idleGenerationHolding.amount.add(idleGeneration);
    }
  }
}
