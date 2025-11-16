import { Component } from '@angular/core';
import {StarKeyHolding} from "../../../classes/features/holdings/star-key-holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {YellowKeyHolding} from "../../../classes/features/holdings/yellow-key-holding";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {CompressionService} from "../../../services/compression.service";
import {Num} from "../../../num";
import {StarKeyUpgrade} from "../../../classes/features/upgrades/star-key-upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {StarKeySubUpgrade} from "../../../classes/features/upgrades/star-key-sub-upgrade";
import {UnlockStarKeyCompressionUpgrade} from "../../../classes/features/upgrades/unlock-star-key-compression-upgrade";

@Component({
  selector: 'app-yellow-star-keys-page',
  templateUrl: './yellow-star-keys-page.component.html',
  styleUrl: './yellow-star-keys-page.component.css',
  standalone: false
})
export class YellowStarKeysPageComponent {
  yellowStarKeys: StarKeyHolding = HoldingRecord.starKeys;
  yellowKeys: YellowKeyHolding = HoldingRecord.yellowKeys;
  protected readonly faKey = faKey;
  upgrades: StarKeyUpgrade[] = UpgradeRecord.starKeyUpgradeList
  subUpgrades: StarKeySubUpgrade[] = [
    UpgradeRecord.increaseKeyAmountStarKeySub,
    UpgradeRecord.compressionSpeedStarKeySub,
    UpgradeRecord.decreaseMultiplyYellowKeysScalingStarKeySub,
  ];
  unlockCompressionUpgrade: UnlockStarKeyCompressionUpgrade = UpgradeRecord.unlockStarKeyCompression;

  constructor(
    private compressionService: CompressionService
  ) {}

  startCompression(): void {
    this.compressionService.startCompressing();
  }

  getPercentage(): number {
    return this.compressionService.getPercentage();
  }

  canCompressKeys(): boolean {
    return this.compressionService.canCompressKeys();
  }

  getKeysNeededForCompression(): Num {
    return this.compressionService.getNeededKeys();
  }

  getCompletionTime(): string {
    return this.compressionService.getCompletionTime();
  }

  isCompressing(): boolean {
    return this.compressionService.isCompressing();
  }

  compressionUnlocked(): boolean {
    return this.compressionService.compressionUnlocked();
  }

  getYellowFusionCompressionEffect() {
    return this.compressionService.getYellowFusionCompressionEffect();
  }
}
