import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageViewPage } from './imageview.page';

const routes: Routes = [
  {
    path: '',
    component: ImageViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageviewPageRoutingModule {}
