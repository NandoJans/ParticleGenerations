import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './page/main/main.component';
import { HeaderComponent } from './page/header/header.component';
import { FooterComponent } from './page/footer/footer.component';
import { RedComponent } from './pages/red/red/red.component';
import { ButtonComponent } from './components/small/button/button.component';
import { GeneratorComponent } from './components/particles/generator/generator.component';
import { NumberDisplayComponent } from './components/small/number-display/number-display.component';
import { BuyableComponent } from './components/small/buyable/buyable.component';
import { UpgradeComponent } from './components/particles/upgrade/upgrade.component';
import { AcceleratorsComponent } from './pages/red/accelerators/accelerators.component';
import { RedUpgradesComponent } from './pages/red/red-upgrades/red-upgrades.component';
import { PrestigeButtonComponent } from './components/medium/prestige-button/prestige-button.component';
import { YellowUpgradesComponent } from './pages/yellow/yellow-upgrades/yellow-upgrades.component';
import { YellowMilestonesComponent } from './pages/yellow/yellow-milestones/yellow-milestones.component';
import { RedAutomatorsComponent } from './pages/automators/red-automators/red-automators.component';
import { YellowGeneratorsComponent } from './pages/yellow/yellow-generators/yellow-generators.component';
import { MilestoneComponent } from './components/particles/milestone/milestone.component';
import { YellowFusionComponent } from './pages/yellow/yellow-fusion/yellow-fusion.component';
import { YellowChallengesComponent } from './pages/yellow/yellow-challenges/yellow-challenges.component';
import { ChallengeComponent } from './components/particles/challenge/challenge.component';
import { PrestigeAutomatorsComponent } from './pages/automators/prestige-automators/prestige-automators.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AutomatorComponent } from './components/particles/automator/automator.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { RedTimelineComponent } from './pages/timeline/red-timeline/red-timeline.component';
import { TimelineComponent } from './components/particles/timeline/timeline.component';
import { TimelineEventComponent } from './components/particles/timeline-event/timeline-event.component';
import { YellowTimelineComponent } from './pages/timeline/yellow-timeline/yellow-timeline.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { GreenGeneratorsComponent } from './pages/green/green-generators/green-generators.component';
import { GreenTimelineComponent } from './pages/timeline/green-timeline/green-timeline.component';
import { GreenSacrificeComponent } from './pages/green/green-sacrifice/green-sacrifice.component';
import { GreenMilestonesComponent } from './pages/green/green-milestones/green-milestones.component';
import { DarkEnergyComponent } from './pages/green/dark-energy/dark-energy.component';
import { YellowAutomatorsComponent } from './pages/automators/yellow-automators/yellow-automators.component';
import { DarkAgeComponent } from './pages/green/dark-age/dark-age.component';
import { NuclearDecayComponent } from './pages/green/nuclear-decay/nuclear-decay.component';
import { BlueTimelineComponent } from './pages/timeline/blue-timeline/blue-timeline.component';
import { BlueNeutronsComponent } from './pages/blue/blue-neutrons/blue-neutrons.component';
import { BlueMilestonesComponent } from './pages/blue/blue-milestones/blue-milestones.component';
import { BlueAutomatorsComponent } from './pages/automators/blue-automators/blue-automators.component';
import { GreenAutomatorsComponent } from './pages/automators/green-automators/green-automators.component';
import { NeutronStarsComponent } from './pages/blue/neutron-stars/neutron-stars.component';
import { BlueUpgradesComponent } from './pages/blue/blue-upgrades/blue-upgrades.component';
import { BlueCombinersComponent } from './pages/blue/blue-combiners/blue-combiners.component';
import { CombinerComponent } from './components/particles/combiner/combiner.component';
import {CombinerBoxComponent} from "./components/particles/combiner-box/combiner-box.component";
import { InfoComponent } from './components/medium/info/info.component';
import { ParticleEmitterComponent } from './components/medium/particle-emitter/particle-emitter.component';
import { BlueGeneratorsComponent } from './pages/blue/blue-generators/blue-generators.component';
import { RedPurpleComponent } from './pages/purple/red-purple/red-purple.component';
import { YellowPurpleComponent } from './pages/purple/yellow-purple/yellow-purple.component';
import { GreenPurpleComponent } from './pages/purple/green-purple/green-purple.component';
import { BluePurpleComponent } from './pages/purple/blue-purple/blue-purple.component';
import { PurpleGeneratorsComponent } from './pages/purple/purple-generators/purple-generators.component';
import { BlackComponent } from './pages/purple/black/black.component';
import { PurpleTimelineComponent } from './pages/timeline/purple-timeline/purple-timeline.component';
import { BlueChallengesComponent } from './pages/blue/blue-challenges/blue-challenges.component';
import { PurpleMilestonesComponent } from './pages/purple/purple-milestones/purple-milestones.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    RedComponent,
    ButtonComponent,
    GeneratorComponent,
    NumberDisplayComponent,
    BuyableComponent,
    UpgradeComponent,
    AcceleratorsComponent,
    RedUpgradesComponent,
    PrestigeButtonComponent,
    YellowUpgradesComponent,
    YellowMilestonesComponent,
    RedAutomatorsComponent,
    YellowGeneratorsComponent,
    MilestoneComponent,
    YellowFusionComponent,
    YellowChallengesComponent,
    ChallengeComponent,
    PrestigeAutomatorsComponent,
    AutomatorComponent,
    RedTimelineComponent,
    TimelineComponent,
    TimelineEventComponent,
    YellowTimelineComponent,
    GreenGeneratorsComponent,
    GreenTimelineComponent,
    GreenSacrificeComponent,
    GreenMilestonesComponent,
    DarkEnergyComponent,
    YellowAutomatorsComponent,
    DarkAgeComponent,
    NuclearDecayComponent,
    BlueTimelineComponent,
    BlueNeutronsComponent,
    BlueMilestonesComponent,
    BlueAutomatorsComponent,
    GreenAutomatorsComponent,
    NeutronStarsComponent,
    BlueUpgradesComponent,
    BlueCombinersComponent,
    CombinerComponent,
    CombinerBoxComponent,
    InfoComponent,
    ParticleEmitterComponent,
    BlueGeneratorsComponent,
    RedPurpleComponent,
    YellowPurpleComponent,
    GreenPurpleComponent,
    BluePurpleComponent,
    PurpleGeneratorsComponent,
    BlackComponent,
    PurpleTimelineComponent,
    BlueChallengesComponent,
    PurpleMilestonesComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule,
        MatProgressBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
