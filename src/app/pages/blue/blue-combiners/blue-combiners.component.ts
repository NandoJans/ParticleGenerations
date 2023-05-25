import { Component, OnInit } from '@angular/core';
import {CombinerService} from "../../../services/interactables/combiner.service";

@Component({
  selector: 'app-blue-combiners',
  templateUrl: './blue-combiners.component.html',
  styleUrls: ['./blue-combiners.component.css']
})
export class BlueCombinersComponent implements OnInit {
  targets: any[] = []
  subjects: any[] = []
  constructor() { }

  ngOnInit(): void {
    this.targets = CombinerService.getCombiners('blue-target')
    this.subjects = CombinerService.getCombiners('blue-subject')
  }
}
