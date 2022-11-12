import { Component, OnInit, Input } from '@angular/core';
import {NumberDisplayService} from "../../../services/number-display.service";

@Component({
  selector: 'app-number-display',
  templateUrl: './number-display.component.html',
  styleUrls: ['./number-display.component.css']
})
export class NumberDisplayComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() style: string | undefined;
  @Input() type: string | undefined;
  @Input() currency: string | undefined;
  @Input() effect: any[] | undefined;

  constructor(private numberDisplays: NumberDisplayService) { }

  ngOnInit(): void {
    this.numberDisplays.add(this.name, this.type, this.currency, this.effect);
  }
}
