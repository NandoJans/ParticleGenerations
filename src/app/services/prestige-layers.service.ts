import {Injectable} from '@angular/core';
import {PrestigeLayer} from "../classes/features/prestiges/prestige-layer";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {Num} from "../num";
import {Styles} from "../classes/enums/styles";
import {ResetKey} from "../classes/enums/reset-key";
import {MessageStepsFactory} from "../classes/factories/message-steps-factory";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {MessageStepsService} from "./message-steps.service";
import {NavigationsService} from "./navigations.service";
import {MultiplierRecord} from "../classes/records/multipliers/multiplier-record";

@Injectable({
  providedIn: 'root'
})
export class PrestigeLayersService {
  static yellowPrestigeLayer: PrestigeLayer = new PrestigeLayer(
    'yellowPrestigeLayer',
    'yellow',
    HoldingRecord.redParticles,
    new Num(1, 1000),
    Styles.YELLOW,
    [
      { holding: HoldingRecord.yellowParticles, basedOnRequiredHolding: false, gainMultiplier: MultiplierRecord.yellowParticleGain, idleGeneration: true},
      { holding: HoldingRecord.yellowKeys, basedOnRequiredHolding: false, gainMultiplier: MultiplierRecord.yellowKeyGain, idleGeneration: false},
      { holding: HoldingRecord.yellowPrestiges, basedOnRequiredHolding: false, gainMultiplier: MultiplierRecord.yellowPrestigeGain, idleGeneration: false},
    ],
    ResetKey.RED,
    MessageStepsFactory.start(Styles.YELLOW, faKey)
      .addStep('Access Restricted', 'You defeated red and got to yellow. Yellow refuses to let you in.')
      .addStep('Access Restricted', 'Reaching yellow again will not help you.')
      .addStep('Access Restricted', 'Yellow has left you a message:')
      .addStep('Access Restricted', 'Unlocking yellow power is the only way to get in. Try unlocking yellow power.')
      .addStep('Information', 'You can unlock yellow power by reaching red particles.')
      .build(),
    HoldingRecord.yellowParticles,
    MultiplierRecord.yellowParticleIdleGeneration,
  );

  static list: PrestigeLayer[] = [
    PrestigeLayersService.yellowPrestigeLayer
  ];

  constructor(
    private messageStepsService: MessageStepsService,
    private navigationsService: NavigationsService
  ) {}

  getList(): PrestigeLayer[] {
    return PrestigeLayersService.list;
  }

  tick(speed: Num): void {
    this.getList().forEach(layer => {
      layer.run(speed);
    });
  }

  save(): void {
    this.getList().forEach(layer => {
      layer.save();
    });
  }

  load(): void {
    this.getList().forEach(layer => {
      layer.tryLoad();
    });
  }

  prestige(prestigeLayer: PrestigeLayer) {
    if (prestigeLayer.isUnlocked() && prestigeLayer.hasReached()) {
      if (!prestigeLayer.prestigedFirstTime) {
        this.messageStepsService.setMessageSteps(prestigeLayer.messageSteps)

        prestigeLayer.prestigedFirstTime = true;
      }

      prestigeLayer.prestige();
    }
  }
}
