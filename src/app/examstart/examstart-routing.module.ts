import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamstartPage } from './examstart.page';

const routes: Routes = [
  {
    path: '',
    component: ExamstartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamstartPageRoutingModule {}
