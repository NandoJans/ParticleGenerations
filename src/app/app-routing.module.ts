import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RedComponent} from "./pages/red/red/red.component";
import {RedAutomatorsComponent} from "./pages/automator/red-automators/red-automators.component";
import {RedAcceleratorsComponent} from "./pages/red/red-accelerators/red-accelerators.component";
import {YellowUpgradesComponent} from "./pages/yellow/yellow-upgrades/yellow-upgrades.component";
import {RedTimelineComponent} from "./pages/timeline/red-timeline/red-timeline.component";
import {YellowTimelineComponent} from "./pages/timeline/yellow-timeline/yellow-timeline.component";

const routes: Routes = [
  { path: '', component: RedComponent },
  // Red
  { path: 'red/particles', component: RedComponent },
  { path: 'red/accelerators', component: RedAcceleratorsComponent },
  // Yellow
  { path: 'yellow/upgrades', component: YellowUpgradesComponent },
  // Automators
  { path: 'automators/red' , component: RedAutomatorsComponent },
  // Timeline
  { path: 'timeline/red', component: RedTimelineComponent },
  { path: 'timeline/yellow', component: YellowTimelineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
