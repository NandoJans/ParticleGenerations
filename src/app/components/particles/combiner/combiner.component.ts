import {Component, Input, OnInit} from '@angular/core';
import {Combiner} from "../../../globals";
import {Num} from "../../../num";
import {CombinerService} from "../../../services/interactables/combiner.service";

@Component({
  selector: 'app-combiner',
  templateUrl: './combiner.component.html',
  styleUrls: ['./combiner.component.css']
})
export class CombinerComponent implements OnInit {
  @Input() combiner: Combiner | undefined
  name: string | undefined;
  displayName: string | undefined;
  cost: Num | undefined;
  currency: string | undefined;
  style: string | undefined;
  constructor() { }

  ngOnInit(): void {
    this.name = this.combiner?.name;
    this.displayName = this.combiner?.displayName;
    this.cost = this.combiner?.cost;
    this.currency = this.combiner?.currency;
    this.style = this.combiner?.style;
  }

  assignCombiner() {
    CombinerService.assignCombiner(this.combiner)
  }

}
