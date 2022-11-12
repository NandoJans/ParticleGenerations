import { Component, OnInit, Input } from '@angular/core';
import {Num} from "../../../num";
import {Generator} from "../../../globals";

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  @Input() generator: Generator | undefined;
  generates: string | undefined;
  name: string | undefined;
  displayName: string | undefined;
  cost: Num | undefined;
  amount: Num | undefined;
  currency: string | undefined;
  style: string | undefined;

  constructor() {

  }

  ngOnInit(): void {
    this.generates = this.generator?.generates;
    this.name = this.generator?.name;
    this.displayName = this.generator?.displayName;
    this.cost = this.generator?.cost;
    this.amount = this.generator?.amount;
    this.currency = this.generator?.currency;
    this.style = this.generator?.style;
  }
}
