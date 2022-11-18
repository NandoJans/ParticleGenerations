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
import {YellowChallengesComponent} from "./pages/yellow/yellow-challenges/yellow-challenges.component";
import {PrestigeAutomatorsComponent} from "./pages/automators/prestige-automators/prestige-automators.component";
import {RedTimelineComponent} from "./pages/timeline/red-timeline/red-timeline.component";
import {YellowTimelineComponent} from "./pages/timeline/yellow-timeline/yellow-timeline.component";
import {GreenGeneratorsComponent} from "./pages/green/green-generators/green-generators.component";
import {GreenTimelineComponent} from "./pages/timeline/green-timeline/green-timeline.component";
import {GreenSacrificeComponent} from "./pages/green/green-sacrifice/green-sacrifice.component";
import {GreenMilestonesComponent} from "./pages/green/green-milestones/green-milestones.component";
import {DarkEnergyComponent} from "./pages/green/dark-energy/dark-energy.component";
import {YellowAutomatorsComponent} from "./pages/automators/yellow-automators/yellow-automators.component";

const routes: Routes = [
  { path: '', component: RedComponent },
  { path: '?/red/particles', component: RedComponent },
  { path: '?/red/accelerators', component: AcceleratorsComponent },
  { path: '?/red/upgrades', component: RedUpgradesComponent },
  { path: '?/yellow/upgrades', component: YellowUpgradesComponent },
  { path: '?/yellow/generators', component: YellowGeneratorsComponent },
  { path: '?/yellow/challenges', component: YellowChallengesComponent },
  { path: '?/yellow/fusion', component: YellowFusionComponent },
  { path: '?/yellow/milestones', component: YellowMilestonesComponent },
  { path: '?/green/generators', component: GreenGeneratorsComponent },
  { path: '?/green/sacrifice', component: GreenSacrificeComponent },
  { path: '?/green/milestones', component: GreenMilestonesComponent },
  { path: '?/green/darkenergy', component: DarkEnergyComponent },
  { path: '?/automators/red', component: RedAutomatorsComponent },
  { path: '?/automators/yellow', component: YellowAutomatorsComponent },
  { path: '?/automators/prestige', component: PrestigeAutomatorsComponent },
  { path: '?/timeline/red', component: RedTimelineComponent },
  { path: '?/timeline/yellow', component: YellowTimelineComponent },
  { path: '?/timeline/green', component: GreenTimelineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
