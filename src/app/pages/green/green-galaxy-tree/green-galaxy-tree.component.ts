import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GalaxyTreeUpgrade} from "../../../classes/features/upgrades/galaxy-tree-upgrade";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {LocalStorageHelper} from "../../../classes/helpers/local-storage-helper";

@Component({
    selector: 'app-green-galaxy-tree',
    templateUrl: './green-galaxy-tree.component.html',
    styleUrls: ['./green-galaxy-tree.component.css'],
    standalone: false
})
export class GreenGalaxyTreeComponent implements OnInit {
  darkEnergy: Holding = HoldingRecord.darkEnergy;
  upgrades: Upgrade[] = [
    UpgradeRecord.redParticleSacrifice,
    UpgradeRecord.yellowParticleSacrifice,
    UpgradeRecord.greenParticleSacrifice,
  ];
  galaxyTreeStarRoot: GalaxyTreeUpgrade = UpgradeRecord.unlockFirstGreenGenerator;

  @ViewChild('galaxyTreeWrapper') galaxyTreeWrapper!: ElementRef;

  bottomSectionOpen: boolean = true;
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('pages', 'green-galaxy-tree');

  protected readonly faArrowUp = faArrowUp;
  protected readonly faArrowDown = faArrowDown;

  constructor() {

  }

  ngOnInit(): void {
    this.bottomSectionOpen = this.localStorageHelper.load(true, 'bottomSectionOpen');
  }

  isBottomSectionOpen() {
    return this.bottomSectionOpen;
  }

  toggleBottomSection() {
    this.bottomSectionOpen = !this.bottomSectionOpen;
    this.localStorageHelper.save(this.bottomSectionOpen, 'bottomSectionOpen');
  }
}
