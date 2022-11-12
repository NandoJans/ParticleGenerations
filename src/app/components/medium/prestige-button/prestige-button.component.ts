import { Component, OnInit, Input } from '@angular/core';
import {PrestigeLayersService} from "../../../services/prestige-layers.service";

@Component({
  selector: 'app-prestige-button',
  templateUrl: './prestige-button.component.html',
  styleUrls: ['./prestige-button.component.css']
})
export class PrestigeButtonComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() buttonId: string | undefined;
  @Input() style: string | undefined;
  constructor(private prestigeLayers: PrestigeLayersService) { }

  prestige() {
    PrestigeLayersService.prestige(this.name);
  }

  ngOnInit(): void {

  }

}
