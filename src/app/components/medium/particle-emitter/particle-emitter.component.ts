import {Component, Input, OnInit} from '@angular/core';
import {ParticleEmitterService} from "../../../services/visuals/particle-emitter.service";

@Component({
  selector: 'app-particle-emitter',
  templateUrl: './particle-emitter.component.html',
  styleUrls: ['./particle-emitter.component.css']
})
export class ParticleEmitterComponent implements OnInit {
  @Input() type: string | undefined;
  constructor() { }

  ngOnInit(): void {
    if (this.type !== undefined) ParticleEmitterService.setEmitter(this.type);
    setInterval(() => {
      ParticleEmitterService.tick();
    }, 25)
  }
}
