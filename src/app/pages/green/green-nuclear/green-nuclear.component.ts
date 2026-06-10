import {Component} from '@angular/core';
import {HoldingRecord} from '../../../classes/records/holdings/holding-record';
import {Holding} from '../../../classes/features/holding';
import {UpgradeRecord} from '../../../classes/records/upgrades/upgrade-record';
import {NuclearUpgrade} from '../../../classes/features/upgrades/nuclear-upgrade';
import {NuclearConfig} from '../../../classes/config/nuclear-config';
import {ChargerRecord} from '../../../classes/records/charger/charger-record';
import {ChallengeRecord} from '../../../classes/records/challenges/challenge-record';
import {ChallengeService} from '../../../services/interactables/challenge.service';
import {Num} from '../../../num';
import {App} from '../../../App';

@Component({
  selector: 'app-green-nuclear',
  templateUrl: './green-nuclear.component.html',
  styleUrl: './green-nuclear.component.css',
  standalone: false
})
export class GreenNuclearComponent {
  nuclearPotential: Holding = HoldingRecord.nuclearPotential;
  nuclearFission: Holding = HoldingRecord.nuclearFission;
  upgrades: NuclearUpgrade[] = UpgradeRecord.nuclearUpgrades;

  constructor(private challengeService: ChallengeService) {}

  getPotentialGain(): Num {
    if (HoldingRecord.darkStarHolding.amount.lt(NuclearConfig.minimumDarkStars)) {
      return Num.ZERO;
    }

    const darkStarGain = HoldingRecord.darkStarHolding.amount.pow(NuclearConfig.potentialDarkStarPower);
    const extraTiers = ChargerRecord.darkStarChargerList.reduce(
      (total, charger) => total.add(charger.highestTier.sub(Num.ONE)),
      Num.ZERO
    );
    const tierBonus = Num.ONE.add(extraTiers.mul(NuclearConfig.potentialTierWeight));
    return darkStarGain.mul(tierBonus).floor();
  }

  canScram(): boolean {
    return this.getPotentialGain().greq(Num.ONE);
  }

  scramReactor(): void {
    const gain = this.getPotentialGain();
    if (gain.lt(Num.ONE)) return;

    this.challengeService.resetChallengeProgress(ChallengeRecord.darkGalaxy);
    HoldingRecord.darkStarHolding.reset();
    HoldingRecord.darkStarHolding.save();
    ChargerRecord.darkStarChargerList.forEach(charger => {
      charger.reset();
      charger.save();
    });
    HoldingRecord.nuclearPotential.add(gain);
    HoldingRecord.nuclearPotential.save();
    App.next();
  }
}
