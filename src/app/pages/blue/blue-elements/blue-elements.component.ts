import {Component} from '@angular/core';
import {Holding} from '../../../classes/features/holding';
import {HoldingRecord} from '../../../classes/records/holdings/holding-record';
import {BlueElementDefinition, BluePhaseService} from '../../../services/blue-phase.service';
import {BlueElement} from '../../../classes/features/elements/blue-element';
import {Num} from '../../../num';

@Component({
  selector: 'app-blue-elements',
  templateUrl: './blue-elements.component.html',
  styleUrl: './blue-elements.component.css',
  standalone: false
})
export class BlueElementsComponent {
  neutrons: Holding = HoldingRecord.neutrons;
  lithium: Holding = HoldingRecord.lithium;
  carbon: Holding = HoldingRecord.carbon;
  oxygen: Holding = HoldingRecord.oxygen;
  boron: Holding = HoldingRecord.boron;
  electrons: Holding = HoldingRecord.electrons;
  protons: Holding = HoldingRecord.protons;
  selectedElementIndex = 0;
  private touchStartX: number | null = null;

  constructor(public bluePhase: BluePhaseService) {}

  get selectedElement(): BlueElementDefinition {
    return this.bluePhase.elementDefinitions[this.selectedElementIndex];
  }

  previousElement(): void {
    this.selectedElementIndex = (this.selectedElementIndex + this.bluePhase.elementDefinitions.length - 1) % this.bluePhase.elementDefinitions.length;
  }

  nextElement(): void {
    this.selectedElementIndex = (this.selectedElementIndex + 1) % this.bluePhase.elementDefinitions.length;
  }

  selectElement(index: number): void {
    this.selectedElementIndex = index;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0]?.clientX ?? null;
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.touchStartX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? this.touchStartX;
    const delta = endX - this.touchStartX;
    if (Math.abs(delta) > 45) {
      delta < 0 ? this.nextElement() : this.previousElement();
    }
    this.touchStartX = null;
  }

  getElementGeneration(element: BlueElementDefinition): Num {
    return this.bluePhase.getElementGeneration(element);
  }

  getLithiumRedMultiplier(): Num {
    return HoldingRecord.lithium.getEffect();
  }

  getSelectedElementUpgradeSet(): BlueElement {
    return this.bluePhase.getSelectedElementUpgradeSet(this.selectedElement);
  }

  getLithiumChargePercent(): number {
    const capacity = this.bluePhase.getLithiumTotalCapacity().toNumber();
    if (!Number.isFinite(capacity) || capacity <= 0) return 0;

    const charge = this.bluePhase.getLithiumTotalCharge().toNumber();
    return Math.max(0, Math.min(100, (charge / capacity) * 100));
  }

  getLithiumChargeBurnPercent(): number {
    const capacity = this.bluePhase.getLithiumTotalCapacity().toNumber();
    if (!Number.isFinite(capacity) || capacity <= 0) return 0;

    const charge = this.bluePhase.getLithiumTotalCharge().toNumber();
    return Math.max(0, Math.min(100, (charge / capacity) * 100));
  }

  getBerylliumFuelPercent(): number {
    const capacity = this.bluePhase.getBerylliumFuelCapacity().toNumber();
    if (!Number.isFinite(capacity) || capacity <= 0) return 0;

    const fuel = this.bluePhase.getBerylliumTotalFuel().toNumber();
    return Math.max(0, Math.min(100, (fuel / capacity) * 100));
  }

  getBoronFiberglassPercent(): number {
    const capacity = this.bluePhase.getBoronFiberglassCapacity().toNumber();
    if (!Number.isFinite(capacity) || capacity <= 0) return 0;

    const fiberglass = this.bluePhase.getBoronTotalFiberglass().toNumber();
    return Math.max(0, Math.min(100, (fiberglass / capacity) * 100));
  }

  getCarbonLifePercent(): number {
    const capacity = this.bluePhase.getCarbonLifeCapacity().toNumber();
    if (!Number.isFinite(capacity) || capacity <= 0) return 0;

    const life = this.bluePhase.carbonLife.toNumber();
    return Math.max(0, Math.min(100, (life / capacity) * 100));
  }
}
