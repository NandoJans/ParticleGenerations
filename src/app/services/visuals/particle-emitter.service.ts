import { Injectable } from '@angular/core';
import {Particle} from "../../globals";
import {HoldingsService} from "../holdings.service";

@Injectable({
  providedIn: 'root'
})
export class ParticleEmitterService {
  static emitterType: string = '';

  static setEmitter(type: string) {
    this.emitterType = type;
  }

  static getParticleDoc() {
    return `
    <div class="`+this.emitterType+` emitted-particle">
    </div>
    `
  }

  static tick() {
    const emitter = <HTMLElement> document.getElementById(this.emitterType);
    if (emitter === null) return;

    let particleType: string;

    switch (this.emitterType) {
      case 'red-particle-emitter': particleType = 'redParticles'; break;
      case 'accelerator-particle-emitter': particleType = 'redAccelerators'; break;
      case 'yellow-particle-emitter': particleType = 'yellowParticles'; break;
      case 'fusion-particle-emitter': particleType = 'yellowFusion'; break;
      case 'green-particle-emitter': particleType = 'greenParticles'; break;
      case 'dark-particle-emitter': particleType = 'darkEnergy'; break;
      case 'decay-particle-emitter': particleType = 'nuclearDecay'; break;
      case 'blue-particle-emitter': particleType = 'blueParticles'; break;
      case 'neutrons-particle-emitter': particleType = 'blueNeutrons'; break;
      case 'light-particle-emitter': particleType = 'blueLight'; break;
      case 'purple-particle-emitter': particleType = 'purpleParticles'; break;
      default: particleType = 'redParticles'; break;
    }

    let amount = HoldingsService.get(particleType).exp
    if (amount > 110) {
      amount = 110;
    }
    amount = amount - emitter.children.length

    for (let i = 0; i < amount; i++) {
      emitter.innerHTML += this.getParticleDoc();
    }
    for (let i = 0; i > amount && emitter.hasChildNodes(); i--) {
      emitter.childNodes[0].remove();
    }
  }
}
