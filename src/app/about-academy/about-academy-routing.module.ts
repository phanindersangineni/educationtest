import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutAcademyPage } from './about-academy.page';

const routes: Routes = [
  {
    path: '',
    component: AboutAcademyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutAcademyPageRoutingModule {}
