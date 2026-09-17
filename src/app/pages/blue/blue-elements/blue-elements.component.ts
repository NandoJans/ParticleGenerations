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
  selectedElement?: BlueElement;
  showClearWarning = false;
  disableClearWarning = false;
  private detailsTimer?: ReturnType<typeof setTimeout>;

  constructor(public bluePhase: BluePhaseService) {}

  get activeSlots(): (BlueElement | undefined)[] {
    const elements = this.bluePhase.activeElementCardIds.map(id => this.bluePhase.elements.find(element => element.id === id));
    return Array.from({length: this.activeSlotCount}, (_, index) => elements[index]);
  }

  get fusionLevel(): number { return this.bluePhase.getNeutronStage(); }

  fuse(): void { this.bluePhase.fuseElement(); }

  showDetails(element: BlueElement): void {
    if (this.detailsTimer) clearTimeout(this.detailsTimer);
    this.detailsTimer = setTimeout(() => {
      this.selectedElement = element;
      this.detailsTimer = undefined;
    }, 220);
  }

  equip(element: BlueElement): void {
    if (this.detailsTimer) clearTimeout(this.detailsTimer);
    this.detailsTimer = undefined;
    this.bluePhase.equipElementCard(element);
  }

  requestClearActiveElements(): void {
    if (!this.bluePhase.activeElementCardIds.length) return;
    if (!this.bluePhase.showClearActiveElementsWarning) {
      this.bluePhase.clearActiveElementCards();
      return;
    }
    this.disableClearWarning = false;
    this.showClearWarning = true;
  }

  confirmClearActiveElements(): void {
    if (this.disableClearWarning) this.bluePhase.setClearActiveElementsWarning(false);
    this.showClearWarning = false;
    this.bluePhase.clearActiveElementCards();
  }

  cancelClearActiveElements(): void {
    this.showClearWarning = false;
    this.disableClearWarning = false;
  }

  startDrag(event: DragEvent, element: BlueElement): void {
    event.dataTransfer?.setData('text/plain', element.id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  dropIntoActiveSlot(event: DragEvent): void {
    event.preventDefault();
    const id = event.dataTransfer?.getData('text/plain');
    const element = this.bluePhase.elements.find(candidate => candidate.id === id);
    if (element) this.bluePhase.equipElementCard(element);
  }

  closeDetails(): void { this.selectedElement = undefined; }
}
