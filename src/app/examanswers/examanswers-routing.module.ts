import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamanswersPage } from './examanswers.page';

const routes: Routes = [
  {
    path: '',
    component: ExamanswersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamanswersPageRoutingModule {}
 