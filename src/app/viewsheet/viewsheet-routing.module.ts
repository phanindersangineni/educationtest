import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewsheetPage } from './viewsheet.page';

const routes: Routes = [
  {
    path: '',
    component: ViewsheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsheetPageRoutingModule {}
