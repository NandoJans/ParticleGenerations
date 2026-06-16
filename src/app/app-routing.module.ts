import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {environment} from "../environments/environment";
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
import {YellowStarKeysPageComponent} from "./pages/yellow/yellow-star-keys-page/yellow-star-keys-page.component";
import {GreenDarkGalaxyPageComponent} from "./pages/green/green-dark-galaxy-page/green-dark-galaxy-page.component";
import {BalanceComponent} from "./dev/balance/balance.component";
import {DevPhaseComponent} from "./dev/dev-phase/dev-phase.component";
import {GreenAutomatorsPageComponent} from "./pages/automator/green-automators-page/green-automators-page.component";
import {GreenNuclearComponent} from "./pages/green/green-nuclear/green-nuclear.component";
import {BlueParticlesComponent} from "./pages/blue/blue-particles/blue-particles.component";
import {BlueTimelineComponent} from "./pages/timeline/blue-timeline/blue-timeline.component";
import {BlueElementsComponent} from "./pages/blue/blue-elements/blue-elements.component";

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
  { path: 'yellow/starKeys', component: YellowStarKeysPageComponent },
  // Green
  { path: 'green/galaxyTree', component: GreenGalaxyTreeComponent },
  { path: 'green/generators', component: GreenGeneratorsComponent },
  { path: 'green/darkGalaxy', component: GreenDarkGalaxyPageComponent },
  { path: 'green/nuclear', component: GreenNuclearComponent },
  // Blue
  { path: 'blue/particles', component: BlueParticlesComponent },
  { path: 'blue/elements', component: BlueElementsComponent },
  // Automators
  { path: 'automators/red' , component: RedAutomatorsComponent },
  { path: 'automators/yellow' , component: YellowAutomatorsComponent },
  { path: 'automators/green' , component: GreenAutomatorsPageComponent },
  // Timeline
  { path: 'timeline/red', component: RedTimelineComponent },
  { path: 'timeline/yellow', component: YellowTimelineComponent },
  { path: 'timeline/green', component: GreenTimelineComponent },
  { path: 'timeline/blue', component: BlueTimelineComponent },

  // Dev (only in development mode)
  ...(environment.production ? [] : [
    { path: 'dev/balance', component: BalanceComponent },
    { path: 'dev/phase', component: DevPhaseComponent },
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
