import {Component, OnInit} from '@angular/core';
import {TickService} from "./services/tick.service";
import {DataManagerService} from "./services/data-manager.service";
import {UpgradeService} from "./services/interactables/upgrade.service";
import {Searcher} from "./Searcher";
import {ParticleEmitterService} from "./services/visuals/particle-emitter.service";
import {App} from "./App";
import {Router} from "@angular/router";
import {NavigationsService} from "./services/navigations.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ParticleGenerations';

  constructor(private tick: TickService, private router: Router) {
    NavigationsService.setRouter(router);
    App.subscribe().subscribe(
      (data) => {
        if (data) {
          this.ngOnInit();
        }
      }
    )
  }


  ngOnInit(): void {
    DataManagerService.load();
    ParticleEmitterService.tick();
    this.tick.tick();
  }
}
