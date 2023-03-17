import { Component, OnInit } from '@angular/core';
import {PrestigeLayersService} from "../../services/prestige-layers.service";
import {App} from "../../App";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  unlockedYellow: boolean | undefined;
  unlockedGreen: boolean | undefined;
  unlockedBlue: boolean | undefined;
  unlockedPurple: boolean | undefined;

  purplePhase: boolean = App.purplePhase;

  constructor() {}

  ngOnInit(): void {
    this.purplePhase = App.purplePhase;
    this.unlockedYellow = PrestigeLayersService.getValue('yellow', 'unlocked');
    this.unlockedGreen = PrestigeLayersService.getValue('green', 'unlocked');
    this.unlockedBlue = PrestigeLayersService.getValue('blue', 'unlocked');
    this.unlockedPurple = PrestigeLayersService.getValue('purple', 'unlocked');
  }
}
