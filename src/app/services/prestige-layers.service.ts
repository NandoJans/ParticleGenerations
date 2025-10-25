import {Injectable} from '@angular/core';
import {PrestigeLayer} from "../classes/features/prestiges/prestige-layer";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {Num} from "../num";
import {Styles} from "../classes/enums/styles";
import {ResetKey} from "../classes/enums/reset-key";
import {MessageStepsFactory} from "../classes/factories/message-steps-factory";
import {faCloud, faSun} from "@fortawesome/free-solid-svg-icons";
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
      { holding: HoldingRecord.yellowParticles, basedOnRequiredHolding: true, gainMultiplier: MultiplierRecord.yellowParticleGain, idleGeneration: true},
      { holding: HoldingRecord.yellowKeys, basedOnRequiredHolding: false, gainMultiplier: MultiplierRecord.yellowKeyGain, idleGeneration: false},
      { holding: HoldingRecord.yellowPrestiges, basedOnRequiredHolding: false, gainMultiplier: MultiplierRecord.yellowPrestigeGain, idleGeneration: false},
    ],
    ResetKey.RED,
    ResetKey.YELLOW,
    MessageStepsFactory.start(Styles.YELLOW, faSun)
      .addStep('Gilded Prison', 'A vast sphere of molten-gold suns surrounds Yellow’s realm. Its surface throbs like a single titanic heartbeat, denying you fresh red particles.')
      .addStep('Solar Whisper', '“Your crimson power is frozen here,” the shell murmurs. “Only the radiance you forge inside me can split my skin.”')
      .addStep('First Hint', 'Every star-particle you harvest dims one facet of the shell. Amass 1 × 10¹⁰⁰⁰ star-particles to weaken its lattice.')
      .addStep('Second Hint', 'When the lattice trembles, invest those particles in the Break Upgrade. Break is the only tool sharp enough to pierce stellar alloy.')
      .build(),
    'Yellow does not allow you to enter. Reset your progress to access yellow\'s upgrades',
    HoldingRecord.yellowParticles,
    MultiplierRecord.yellowParticleIdleGeneration,
  );
  static greenPrestigeLayer: PrestigeLayer = new PrestigeLayer(
    'greenPrestigeLayer',
    'green',
    HoldingRecord.yellowParticles,
    new Num(1, 1000),
    Styles.GREEN,
    [
      { holding: HoldingRecord.greenParticles, basedOnRequiredHolding: true, gainMultiplier: MultiplierRecord.greenParticleGain, idleGeneration: true},
      { holding: HoldingRecord.greenPrestiges, basedOnRequiredHolding: false, gainMultiplier: MultiplierRecord.greenPrestigeGain, idleGeneration: false},
    ],
    ResetKey.YELLOW,
    ResetKey.GREEN,
    MessageStepsFactory.start(Styles.GREEN, faCloud)
      .addStep(
        'Gravity Wall',
        'A viridian aurora curdles space ahead, dense enough to bend time itself. This is the **Green Barrier**.'
      )
      .addStep(
        'Voice in the Void',
        '“Mass alone cannot pass,” Green intones. “Only a bound cosmos may cross.”'
      )
      .addStep(
        'First Hint',
        'Dark matter drifts here like black snow. **Condense 1 × 10^500 units** into a single, coherent core.'
      )
      .addStep(
        'Second Hint',
        'When density peaks, ignite the core with star-light to birth your **first galaxy**.'
      )
      .addStep(
        'Galaxy Forge',
        'Spiral arms unfurl; newborn suns scatter emerald light. The wall senses a self-contained gravity well—and trembles.'
      )
      .addStep(
        'Through the Breach',
        'Your galaxy barrels forward, punching a tunnel through folded space. Behind it, the Barrier seals, but **you are on the other side**.'
      )
      .build(),
    'There are too many stars, we need to contain them.',
    HoldingRecord.greenParticles,
    MultiplierRecord.greenParticleIdleGeneration,
  );

  static list: PrestigeLayer[] = [
    PrestigeLayersService.yellowPrestigeLayer,
    PrestigeLayersService.greenPrestigeLayer,
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

  init(): void {
    this.getList().forEach(layer => {
      layer.init();
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
