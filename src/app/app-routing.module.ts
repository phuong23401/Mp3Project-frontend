import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreatesongComponent} from "./createsong/createsong.component";

const routes: Routes = [
  {path:'createsong',component:CreatesongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
