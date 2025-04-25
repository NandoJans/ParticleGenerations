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
import { PrestigeButtonComponent } from './components/medium/prestige-button/prestige-button.component';
import { MilestoneComponent } from './components/particles/milestone/milestone.component';
import { ChallengeComponent } from './components/particles/challenge/challenge.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AutomatorComponent } from './components/particles/automator/automator.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TimelineComponent } from './components/particles/timeline/timeline.component';
import { TimelineEventComponent } from './components/particles/timeline-event/timeline-event.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { InfoComponent } from './components/medium/info/info.component';
import { ParticleEmitterComponent } from './components/medium/particle-emitter/particle-emitter.component';
import { OfflineComponent } from './components/medium/offline/offline.component';

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
    PrestigeButtonComponent,
    MilestoneComponent,
    ChallengeComponent,
    AutomatorComponent,
    TimelineComponent,
    TimelineEventComponent,
    InfoComponent,
    ParticleEmitterComponent,
    OfflineComponent,
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
