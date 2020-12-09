import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamlistPage } from './examlist.page';

const routes: Routes = [
  {
    path: '',
    component: ExamlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamlistPageRoutingModule {}
 