import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacultiesPage } from './faculties.page';

const routes: Routes = [
  {
    path: '',
    component: FacultiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacultiesPageRoutingModule {}
