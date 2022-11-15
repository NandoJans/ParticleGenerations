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
    AutomatorComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
