import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RedComponent} from "./pages/red/red/red.component";
import {RedAutomatorsComponent} from "./pages/automator/red-automators/red-automators.component";
import {RedAcceleratorsComponent} from "./pages/red/red-accelerators/red-accelerators.component";
import {YellowUpgradesComponent} from "./pages/yellow/yellow-upgrades/yellow-upgrades.component";
import {RedTimelineComponent} from "./pages/timeline/red-timeline/red-timeline.component";
import {YellowTimelineComponent} from "./pages/timeline/yellow-timeline/yellow-timeline.component";
import {YellowAutomatorsComponent} from "./pages/automators/yellow-automators/yellow-automators.component";
import {YellowGeneratorsComponent} from "./pages/yellow/yellow-generators/yellow-generators.component";
import {YellowStarsComponent} from "./pages/yellow/yellow-stars/yellow-stars.component";
import {YellowFusionComponent} from "./pages/yellow/yellow-fusion/yellow-fusion.component";
import {GreenGalaxyTreeComponent} from "./pages/green/green-galaxy-tree/green-galaxy-tree.component";
import {GreenGeneratorsComponent} from "./pages/green/green-generators/green-generators.component";
import {GreenTimelineComponent} from "./pages/timeline/green-timeline/green-timeline.component";
import {BalanceComponent} from "./dev/balance/balance.component";

const routes: Routes = [
  { path: '', component: RedComponent },
  // Red
  { path: 'red/particles', component: RedComponent },
  { path: 'red/accelerators', component: RedAcceleratorsComponent },
  // Yellow
  { path: 'yellow/upgrades', component: YellowUpgradesComponent },
  { path: 'yellow/generators', component: YellowGeneratorsComponent },
  { path: 'yellow/stars', component: YellowStarsComponent },
  { path: 'yellow/fusion', component: YellowFusionComponent },
  // Green
  { path: 'green/galaxyTree', component: GreenGalaxyTreeComponent },
  { path: 'green/greenGenerators', component: GreenGeneratorsComponent },
  // Automators
  { path: 'automators/red' , component: RedAutomatorsComponent },
  { path: 'automators/yellow' , component: YellowAutomatorsComponent },
  // Timeline
  { path: 'timeline/red', component: RedTimelineComponent },
  { path: 'timeline/yellow', component: YellowTimelineComponent },
  { path: 'timeline/green', component: GreenTimelineComponent },

  // Dev
  { path: 'dev/balance', component: BalanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
