import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadedsheetsPage } from './uploadedsheets.page';

const routes: Routes = [
  {
    path: '',
    component: UploadedsheetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadedsheetsPageRoutingModule {}
