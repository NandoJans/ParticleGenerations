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
  styleUrls: ['./yellow-upgrades.component.css']
})
export class YellowUpgradesComponent implements OnInit {
  yellowKeys: YellowKeyHolding = HoldingRecord.yellowKeys;
  yellowPrestiges: YellowPrestigeHolding = HoldingRecord.yellowPrestiges;
  yellowEnhancement: YellowEnhancement = EnhancementRecord.yellow;
  upgrades: Upgrade[] = [
    UpgradeRecord.multiplyRedGeneratorsYellow,
    UpgradeRecord.multiplyYellowParticlesYellow,
    UpgradeRecord.redGeneratorMultiplierYellowPrestigeYellow,
    UpgradeRecord.multiplyRedGeneratorExtensionYellow,
  ];
  yellowPrestige: PrestigeLayer = PrestigeLayersService.yellowPrestigeLayer;

  constructor() { }

  ngOnInit(): void {
  }

}
