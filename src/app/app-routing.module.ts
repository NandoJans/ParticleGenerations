import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RedComponent} from "./pages/red/red/red.component";

const routes: Routes = [
  { path: '', component: RedComponent },
  { path: 'red/particles', component: RedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
