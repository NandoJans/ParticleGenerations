import { Injectable } from '@angular/core';
import {GalaxyTreeUpgrade} from "../classes/features/upgrades/galaxy-tree-upgrade";

@Injectable({
  providedIn: 'root'
})
export class GalaxyTreeService {
  selectedGalaxyStar?: GalaxyTreeUpgrade;


  setSelectedGalaxyStar(galaxyStar: GalaxyTreeUpgrade) {
    console.log('Selected galaxy star: ' + galaxyStar.displayName);
    this.selectedGalaxyStar = galaxyStar;
  }

  hasSelectedGalaxyStar(): boolean {
    return this.selectedGalaxyStar !== undefined;
  }
}
