import {Component} from '@angular/core';
import {Holding} from '../../../classes/features/holding';
import {HoldingRecord} from '../../../classes/records/holdings/holding-record';
import {BlueElement} from '../../../classes/features/elements/blue-element';
import {BluePhaseService} from '../../../services/blue-phase.service';

@Component({
  selector: 'app-blue-elements',
  templateUrl: './blue-elements.component.html',
  styleUrl: './blue-elements.component.css',
  standalone: false
})
export class BlueElementsComponent {
  neutrons: Holding = HoldingRecord.neutrons;
  readonly activeSlotCount = BluePhaseService.activeElementSlots;
  readonly inventorySlotCount = BluePhaseService.elementInventorySlots;

  constructor(public bluePhase: BluePhaseService) {}

  get activeSlots(): (BlueElement | undefined)[] {
    const elements = this.bluePhase.activeElementCardIds.map(id => this.bluePhase.elements.find(element => element.id === id));
    return Array.from({length: this.activeSlotCount}, (_, index) => elements[index]);
  }

  getFusionPool(): string {
    const kinds = this.bluePhase.getUnlockedCardKinds();
    return kinds.length ? kinds.map(kind => kind[0].toUpperCase() + kind.slice(1)).join(' · ') : 'Helium unlocks at 10';
  }

  fuse(): void { this.bluePhase.fuseElement(); }
}
