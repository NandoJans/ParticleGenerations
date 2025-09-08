import { Component, OnInit } from '@angular/core';
import {Generator} from "../../../classes/features/generator";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";

@Component({
  selector: 'app-green-generators',
  templateUrl: './green-generators.component.html',
  styleUrls: ['./green-generators.component.css']
})
export class GreenGeneratorsComponent implements OnInit {
  generators: Generator[] = [
    GeneratorRecord.firstGreenGenerator,
  ];
  darkMatter: Holding = HoldingRecord.darkMatter;
  infoText: string[] = [
    'Welcome to the Green layer - the next major progression milestone!',
    'Green Generators produce Dark Matter, an incredibly powerful resource that unlocks new dimensions of growth.',
    'This layer represents a significant step up in complexity and power from the yellow layer.',
    'Dark Matter will be used for upgrades that can dramatically reshape your entire game progression.',
    'Green mechanics are still developing - more generators and features will be unlocked as you progress!',
    'Focus on maximizing Dark Matter production to prepare for the powerful upgrades this layer will bring.'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
