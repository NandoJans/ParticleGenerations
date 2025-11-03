import { Component, OnInit } from '@angular/core';
import {YellowKeyHolding} from "../../../classes/features/holdings/yellow-key-holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {YellowPrestigeHolding} from "../../../classes/features/holdings/yellow-prestige-holding";
import {YellowEnhancement} from "../../../classes/features/enhancements/yellow-enhancement";
import {EnhancementRecord} from "../../../classes/records/enhancement-record";
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {PrestigeLayer} from "../../../classes/features/prestiges/prestige-layer";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";

@Component({
    selector: 'app-yellow-upgrades',
    templateUrl: './yellow-upgrades.component.html',
    styleUrls: ['./yellow-upgrades.component.css'],
    standalone: false
})
export class YellowUpgradesComponent implements OnInit {
  yellowKeys: YellowKeyHolding = HoldingRecord.yellowKeys;
  yellowPrestiges: YellowPrestigeHolding = HoldingRecord.yellowPrestiges;
  yellowEnhancement: YellowEnhancement = EnhancementRecord.yellow;
  upgrades: Upgrade[] = [
    UpgradeRecord.multiplyRedGeneratorsYellow,
    UpgradeRecord.multiplyYellowParticlesYellow,
    UpgradeRecord.multiplyYellowKeyGain,
    UpgradeRecord.empoweredBoosterAcceleration,
    UpgradeRecord.decreaseRedGeneratorScaling,
    UpgradeRecord.decreaseRedGeneratorBoosterScaling,
    UpgradeRecord.stopRedBoosterAccelerationReset,
    UpgradeRecord.unlockFourthYellowGenerator,
    UpgradeRecord.unlockFifthYellowGenerator,
    UpgradeRecord.breakYellowFusionLimitYellow,
    UpgradeRecord.redGeneratorMultiplierYellowPrestigeYellow,
    UpgradeRecord.multiplyRedGeneratorExtensionYellow,
    UpgradeRecord.startWithMoreRedExtensionsUpgrade,
    UpgradeRecord.increaseRedGeneratorSubMultipliers,
    UpgradeRecord.increaseRedGeneratorBuyMultipliers,
    UpgradeRecord.noResetRedExtension,
    UpgradeRecord.improveFasterAccelerationYellow,
    UpgradeRecord.improveMultiplyAcceleratorEffectYellow,
    UpgradeRecord.improveBetterAccelerationYellow,
    UpgradeRecord.improveBetterParticleEffectYellow,
    UpgradeRecord.breakYellowBarrier
  ];
  yellowPrestige: PrestigeLayer = PrestigeLayersService.yellowPrestigeLayer;
  infoText: string[] = [
    'Yellow Upgrades are powerful enhancements purchased with Yellow Keys and Yellow Prestiges.',
    'Yellow Keys are earned through yellow prestige operations and unlock core improvements to your production.',
    'Yellow Prestiges are a higher-tier currency that unlocks the most powerful upgrades in this section.',
    'Many upgrades here break through previous limitations, like reducing scaling costs and unlocking new generator tiers.',
    'The yellow enhancement system provides permanent bonuses that compound over time.',
    'Strategic upgrade purchases here can dramatically accelerate your entire game progression!'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
