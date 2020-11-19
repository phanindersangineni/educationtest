import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectexamPage } from './subjectexam.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectexamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectexamPageRoutingModule {}
