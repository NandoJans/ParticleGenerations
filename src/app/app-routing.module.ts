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
import {DarkAgeComponent} from "./pages/green/dark-age/dark-age.component";
import {NuclearDecayComponent} from "./pages/green/nuclear-decay/nuclear-decay.component";
import {BlueTimelineComponent} from "./pages/timeline/blue-timeline/blue-timeline.component";
import {BlueNeutronsComponent} from "./pages/blue/blue-neutrons/blue-neutrons.component";
import {BlueMilestonesComponent} from "./pages/blue/blue-milestones/blue-milestones.component";
import {BlueAutomatorsComponent} from "./pages/automators/blue-automators/blue-automators.component";
import {GreenAutomatorsComponent} from "./pages/automators/green-automators/green-automators.component";
import {NeutronStarsComponent} from "./pages/blue/neutron-stars/neutron-stars.component";
import {BlueUpgradesComponent} from "./pages/blue/blue-upgrades/blue-upgrades.component";
import {BlueCombinersComponent} from "./pages/blue/blue-combiners/blue-combiners.component";
import {BlueGeneratorsComponent} from "./pages/blue/blue-generators/blue-generators.component";
import {RedPurpleComponent} from "./pages/purple/red-purple/red-purple.component";
import {YellowPurpleComponent} from "./pages/purple/yellow-purple/yellow-purple.component";
import {GreenPurpleComponent} from "./pages/purple/green-purple/green-purple.component";
import {BluePurpleComponent} from "./pages/purple/blue-purple/blue-purple.component";
import {PurpleGeneratorsComponent} from "./pages/purple/purple-generators/purple-generators.component";

const routes: Routes = [
  { path: '', component: RedComponent },
  { path: '?/red/particles', component: RedComponent },
  { path: '?/red/accelerators', component: AcceleratorsComponent },
  { path: '?/red/upgrades', component: RedUpgradesComponent },
  { path: '?/red/purple', component: RedPurpleComponent },
  { path: '?/yellow/upgrades', component: YellowUpgradesComponent },
  { path: '?/yellow/generators', component: YellowGeneratorsComponent },
  { path: '?/yellow/challenges', component: YellowChallengesComponent },
  { path: '?/yellow/fusion', component: YellowFusionComponent },
  { path: '?/yellow/milestones', component: YellowMilestonesComponent },
  { path: '?/yellow/purple', component: YellowPurpleComponent },
  { path: '?/green/generators', component: GreenGeneratorsComponent },
  { path: '?/green/sacrifice', component: GreenSacrificeComponent },
  { path: '?/green/milestones', component: GreenMilestonesComponent },
  { path: '?/green/darkenergy', component: DarkEnergyComponent },
  { path: '?/green/darkage', component: DarkAgeComponent },
  { path: '?/green/nucleardecay', component: NuclearDecayComponent },
  { path: '?/green/purple', component: GreenPurpleComponent },
  { path: '?/blue/neutrons', component: BlueNeutronsComponent },
  { path: '?/blue/neutronstars', component: NeutronStarsComponent },
  { path: '?/blue/upgrades', component: BlueUpgradesComponent },
  { path: '?/blue/combiners', component: BlueCombinersComponent },
  { path: '?/blue/generators', component: BlueGeneratorsComponent },
  { path: '?/blue/milestones', component: BlueMilestonesComponent },
  { path: '?/blue/purple', component: BluePurpleComponent },
  { path: '?/purple/generators', component: PurpleGeneratorsComponent },
  { path: '?/automators/red', component: RedAutomatorsComponent },
  { path: '?/automators/yellow', component: YellowAutomatorsComponent },
  { path: '?/automators/green', component: GreenAutomatorsComponent },
  { path: '?/automators/blue', component: BlueAutomatorsComponent },
  { path: '?/automators/prestige', component: PrestigeAutomatorsComponent },
  { path: '?/timeline/red', component: RedTimelineComponent },
  { path: '?/timeline/yellow', component: YellowTimelineComponent },
  { path: '?/timeline/green', component: GreenTimelineComponent },
  { path: '?/timeline/blue', component: BlueTimelineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
