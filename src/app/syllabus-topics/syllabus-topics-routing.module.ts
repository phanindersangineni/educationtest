import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyllabusTopicsPage } from './syllabus-topics.page';

const routes: Routes = [
  {
    path: '',
    component: SyllabusTopicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyllabusTopicsPageRoutingModule {}
