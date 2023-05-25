import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-particle-emitter',
  templateUrl: './particle-emitter.component.html',
  styleUrls: ['./particle-emitter.component.css']
})
export class ParticleEmitterComponent implements OnInit {
  @Input() type: string | undefined;
  constructor() { }

  ngOnInit(): void {

  }
}
