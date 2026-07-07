import {Injectable} from '@angular/core';
import {Buyable} from '../classes/features/buyable';
import {Generator} from '../classes/features/generator';
import {Navigation} from '../classes/features/navigation';
import {SubNavigation} from '../classes/features/sub-navigation';
import {ChallengeRecord} from '../classes/records/challenges/challenge-record';
import {GeneratorRecord} from '../classes/records/generators/generator-record';
import {UpgradeRecord} from '../classes/records/upgrades/upgrade-record';
import {BluePhaseService} from './blue-phase.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseAvailabilityService {
  constructor(private bluePhaseService: BluePhaseService) {}

  hasAvailablePurchase(subNavigation: SubNavigation): boolean {
    if (!subNavigation.isUnlocked()) return false;

    if (`${subNavigation.parent.location}/${subNavigation.location}` === 'blue/elements') {
      return this.hasAvailableBlueElementPurchase();
    }

    return this.getBuyables(subNavigation).some(buyable =>
      buyable.isUnlocked()
      && buyable.isEnabled()
      && buyable.isBuyable()
      && (!(buyable instanceof Generator) || !buyable.auto)
    );
  }

  hasAvailablePurchaseInNavigation(navigation: Navigation, subNavigations: SubNavigation[]): boolean {
    return subNavigations.some(subNavigation =>
      subNavigation.parent === navigation && this.hasAvailablePurchase(subNavigation)
    );
  }

  private getBuyables(subNavigation: SubNavigation): Buyable[] {
    switch (`${subNavigation.parent.location}/${subNavigation.location}`) {
      case 'red/particles':
        return [
          ...this.withGeneratorUpgrades(GeneratorRecord.redGenerators),
          UpgradeRecord.redGeneratorExtension,
          UpgradeRecord.redGeneratorBooster,
        ];
      case 'red/accelerators':
        return [
          UpgradeRecord.unlockRedAccelerators,
          UpgradeRecord.multiplyRedAcceleratorGeneration,
          UpgradeRecord.multiplyRedAcceleratorEffectUpgrade,
          UpgradeRecord.improveRedAcceleratorsEffect,
          UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade,
          UpgradeRecord.boosterAccelerationUpgrade,
        ];
      case 'yellow/upgrades':
        return [
          UpgradeRecord.multiplyRedGeneratorsYellow,
          UpgradeRecord.multiplyYellowParticlesYellow,
          UpgradeRecord.multiplyYellowKeyGain,
          ...UpgradeRecord.yellowUpgradeList,
          ...UpgradeRecord.postBreakYellowUpgradeList,
          UpgradeRecord.breakYellowBarrier,
        ];
      case 'yellow/generators':
        return [
          ...this.withGeneratorUpgrades(GeneratorRecord.yellowGenerators),
          UpgradeRecord.yellowPower,
        ];
      case 'yellow/stars': {
        const challenge = ChallengeRecord.currentChallenges['yellow'];
        return challenge
          ? [...challenge.getGenerators(), ...challenge.getUpgrades()]
          : [];
      }
      case 'yellow/fusion':
        return [
          UpgradeRecord.increaseHydrogen,
          UpgradeRecord.increaseHydrogenEffect,
          UpgradeRecord.increaseMaxFusionBoosterAcceleration,
          UpgradeRecord.fusionBoosterAcceleration,
          UpgradeRecord.increaseProximaCentauriGoal,
          UpgradeRecord.increaseLalandeGoal,
          UpgradeRecord.increaseSunGoal,
          UpgradeRecord.increaseSiriusGoal,
        ];
      case 'yellow/starKeys':
        return [
          UpgradeRecord.unlockStarKeyCompression,
          UpgradeRecord.increaseKeyAmountStarKeySub,
          UpgradeRecord.compressionSpeedStarKeySub,
          UpgradeRecord.decreaseMultiplyYellowKeysScalingStarKeySub,
          ...UpgradeRecord.starKeyUpgradeList,
        ];
      case 'green/galaxyTree':
        return [
          UpgradeRecord.redParticleSacrifice,
          UpgradeRecord.yellowParticleSacrifice,
          UpgradeRecord.greenParticleSacrifice,
          ...UpgradeRecord.galaxyTreeUpgradeList,
        ];
      case 'green/generators':
        return [
          ...this.withGeneratorUpgrades(GeneratorRecord.greenGenerators),
          UpgradeRecord.multiplyGreenParticlesGreen,
          UpgradeRecord.unlockThirdGreenGenerator,
        ];
      case 'green/nuclear':
        return [UpgradeRecord.greenKey, ...UpgradeRecord.nuclearUpgrades];
      case 'blue/particles':
        return [
          UpgradeRecord.blueBeamIntensity,
          UpgradeRecord.blueColliderEfficiency,
        ];
      default:
        return [];
    }
  }

  private withGeneratorUpgrades(generators: Generator[]): Buyable[] {
    return generators.flatMap(generator => [generator, ...generator.getUpgrades()]);
  }

  private hasAvailableBlueElementPurchase(): boolean {
    const hasGenericElementPurchase = this.bluePhaseService.elementDefinitions.some(definition => {
      const element = definition.element;
      return this.bluePhaseService.canBuyElementUpgrade(element, element.batteryUpgrade)
        || this.bluePhaseService.canBuyElementUpgrade(element, element.chargerUpgrade)
        || this.bluePhaseService.canBuyElementUpgrade(element, element.capacityUpgrade)
        || this.bluePhaseService.canDischargeElementBattery(element);
    });

    return hasGenericElementPurchase
      || this.bluePhaseService.canBuyBerylliumRocket()
      || this.bluePhaseService.canBuyBerylliumFuel()
      || this.bluePhaseService.canBuyBerylliumLogic();
  }
}
