import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RedComponent} from "./pages/red/red/red.component";
import {AcceleratorsComponent} from "./pages/red/accelerators/accelerators.component";
import {RedUpgradesComponent} from "./pages/red/red-upgrades/red-upgrades.component";
import {YellowUpgradesComponent} from "./pages/yellow/yellow-upgrades/yellow-upgrades.component";
import {YellowMilestonesComponent} from "./pages/yellow/yellow-milestones/yellow-milestones.component";
import {RedAutomatorsComponent} from "./pages/automators/red-automators/red-automators.component";
import {YellowGeneratorsComponent} from "./pages/yellow/yellow-generators/yellow-generators.component";
import {YellowFusionComponent} from "./pages/yellow/yellow-fusion/yellow-fusion.component";

const routes: Routes = [
  { path: '', component: RedComponent },
  { path: 'red/particles', component: RedComponent },
  { path: 'red/accelerators', component: AcceleratorsComponent },
  { path: 'red/upgrades', component: RedUpgradesComponent },
  { path: 'yellow/upgrades', component: YellowUpgradesComponent },
  { path: 'yellow/generators', component: YellowGeneratorsComponent },
  { path: 'yellow/fusion', component: YellowFusionComponent },
  { path: 'yellow/milestones', component: YellowMilestonesComponent },
  { path: 'automators/red', component: RedAutomatorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
