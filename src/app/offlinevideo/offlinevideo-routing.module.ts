import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfflinevideoPage } from './offlinevideo.page';

const routes: Routes = [
  {
    path: '',
    component: OfflinevideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfflinevideoPageRoutingModule {}
