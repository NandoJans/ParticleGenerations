import {Component} from '@angular/core';
import {BlueElement} from '../../../classes/features/elements/blue-element';
import {BluePhaseService} from '../../../services/blue-phase.service';

@Component({
  selector: 'app-blue-neutron-star',
  templateUrl: './blue-neutron-star.component.html',
  styleUrl: './blue-neutron-star.component.css',
  standalone: false
})
export class BlueNeutronStarComponent {
  selectedElement?: BlueElement;

  constructor(public bluePhase: BluePhaseService) {}

  get starScale(): number {
    const mass = Math.max(0, this.bluePhase.neutronStarMass.toNumber());
    return Math.min(1.85, .72 + Math.log10(mass + 1) * .16);
  }

  selectElement(element: BlueElement): void { this.selectedElement = element; }

  sacrificeSelected(): void {
    if (!this.selectedElement) return;
    this.bluePhase.sacrificeElement(this.selectedElement);
    this.selectedElement = undefined;
  }
}
