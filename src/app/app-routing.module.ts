import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RedComponent} from "./pages/red/red/red.component";
import {RedAutomatorsComponent} from "./pages/automator/red-automators/red-automators.component";
import {RedAcceleratorsComponent} from "./pages/red/red-accelerators/red-accelerators.component";

const routes: Routes = [
  { path: '', component: RedComponent },
  { path: 'red/particles', component: RedComponent },
  { path: 'red/accelerators', component: RedAcceleratorsComponent },
  { path: 'automators/red' , component: RedAutomatorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
