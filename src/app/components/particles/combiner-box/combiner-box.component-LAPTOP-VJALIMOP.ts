import { Component, OnInit } from '@angular/core';
import {CombinerService} from "../../../services/interactables/combiner.service";
import {Num} from "../../../num";
import {combinerSubject} from "../../../services/interactables/combiners/subject";

@Component({
  selector: 'app-combiner-box',
  templateUrl: './combiner-box.component.html',
  styleUrls: ['./combiner-box.component.css']
})
export class CombinerBoxComponent implements OnInit {
  combinations: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.combinations = CombinerService.combinations;
  }

  assignSubject(index: number) {
    this.combinations.forEach(combination => {
      if (combination[2] === index) {
        combination[0] = '';
        this.ngOnInit();
      }
    })
  }

}
