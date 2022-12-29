import { Injectable } from '@angular/core';
import {HoldingsService} from "../holdings.service";

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  static currentBackground: string = 'red';
  static setBackground(type: string) {
    this.currentBackground = type;
    const doc = <HTMLElement> document.getElementById('main-background')
    doc.style.backgroundImage = 'url("./assets/'+type+'Space.png")'
  }
  static tick() {
    const doc = <HTMLElement> document.getElementById('transparent-background')
    let alpha = 1 - HoldingsService.get(this.currentBackground+'Particles').exp / 110
    if (alpha < 0.2) {
      alpha = 0.2
    }
    doc.style.backgroundColor = 'rgba(36,36,36,'+alpha+')'
  }
}
