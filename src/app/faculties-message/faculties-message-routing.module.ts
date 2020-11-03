import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacultiesMessagePage } from './faculties-message.page';

const routes: Routes = [
  {
    path: '',
    component: FacultiesMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacultiesMessagePageRoutingModule {}
