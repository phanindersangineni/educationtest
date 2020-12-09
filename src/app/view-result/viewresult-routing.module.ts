import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewResultPage } from './viewresult.page';

const routes: Routes = [
  {
    path: '',
    component: ViewResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewresultPageRoutingModule {}
