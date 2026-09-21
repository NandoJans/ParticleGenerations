import {Component} from '@angular/core';
import {BlueElement} from '../../../classes/features/elements/blue-element';
import {BluePhaseService} from '../../../services/blue-phase.service';
import {Num} from '../../../num';

interface BackgroundStar {
  left: string;
  top: string;
  size: string;
  opacity: string;
  delay: string;
  duration: string;
}

@Component({
  selector: 'app-blue-neutron-star',
  templateUrl: './blue-neutron-star.component.html',
  styleUrl: './blue-neutron-star.component.css',
  standalone: false
})
export class BlueNeutronStarComponent {
  sacrificeOpen = false;
  readonly selectedElementIds = new Set<string>();
  readonly starLayers = [
    this.createStarLayer(34, .65, 2.1),
    this.createStarLayer(24, 1.1, 2.8),
    this.createStarLayer(15, 1.65, 3.5)
  ];

  constructor(public bluePhase: BluePhaseService) {}

  get hasStar(): boolean { return this.bluePhase.neutronStarMass.mantissa > 0; }

  get massMagnitude(): number {
    if (!this.hasStar) return 0;
    return Math.max(0, this.bluePhase.neutronStarMass.exponent + Math.log10(this.bluePhase.neutronStarMass.mantissa) + 1);
  }

  get starSize(): number {
    return Math.min(290, 3 + Math.log10(1 + this.massMagnitude * 9) * 112);
  }

  get jetStrength(): number { return Math.min(1, .16 + this.massMagnitude / 8); }

  get jetHeight(): number { return Math.min(360, 70 + this.massMagnitude * 34); }

  private createStarLayer(count: number, speed: number, maximumSize: number): BackgroundStar[] {
    return Array.from({length: count}, () => ({
      left: `${(Math.random() * 100).toFixed(2)}%`,
      top: `${(Math.random() * 100).toFixed(2)}%`,
      size: `${(.5 + Math.random() * maximumSize).toFixed(2)}px`,
      opacity: `${(.28 + Math.random() * .72).toFixed(2)}`,
      delay: `${(-Math.random() * 30).toFixed(2)}s`,
      duration: `${(34 / speed + Math.random() * 8).toFixed(2)}s`
    }));
  }

  get selectedElements(): BlueElement[] {
    return this.bluePhase.elements.filter(element =>
      this.selectedElementIds.has(element.id) && !this.bluePhase.isElementCardActive(element)
    );
  }

  get selectedMass(): Num {
    return this.selectedElements.reduce(
      (total, element) => total.add(this.bluePhase.getElementMass(element)),
      Num.ZERO.copy()
    );
  }

  openSacrifice(): void {
    this.selectedElementIds.clear();
    this.sacrificeOpen = true;
  }

  closeSacrifice(): void {
    this.sacrificeOpen = false;
    this.selectedElementIds.clear();
  }

  toggleElement(element: BlueElement): void {
    if (this.bluePhase.isElementCardActive(element)) return;
    if (this.selectedElementIds.has(element.id)) this.selectedElementIds.delete(element.id);
    else this.selectedElementIds.add(element.id);
  }

  sacrificeSelectedElements(): void {
    if (!this.selectedElements.length) return;
    [...this.selectedElements].forEach(element => this.bluePhase.sacrificeElement(element));
    this.closeSacrifice();
  }
}
