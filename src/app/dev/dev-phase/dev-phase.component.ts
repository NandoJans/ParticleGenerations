import { Component } from '@angular/core';
import { DevPhaseService, PhaseConfig } from '../../services/dev/dev-phase.service';

@Component({
  selector: 'app-dev-phase',
  templateUrl: './dev-phase.component.html',
  styleUrl: './dev-phase.component.css',
  standalone: false,
})
export class DevPhaseComponent {
  selectedPhaseId: string = '';

  constructor(private devPhaseService: DevPhaseService) {}

  getPhases(): PhaseConfig[] {
    return this.devPhaseService.getPhases();
  }

  loadPhase(): void {
    if (this.selectedPhaseId) {
      if (confirm(`This will reset your current progress and load the "${this.getSelectedPhaseName()}" phase. Are you sure?`)) {
        this.devPhaseService.loadPhase(this.selectedPhaseId);
        alert(`Phase "${this.getSelectedPhaseName()}" loaded successfully!`);
      }
    }
  }

  getSelectedPhaseName(): string {
    const phase = this.getPhases().find(p => p.id === this.selectedPhaseId);
    return phase ? phase.name : '';
  }
}
