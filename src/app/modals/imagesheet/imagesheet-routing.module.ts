import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesheetPage } from './imagesheet.page';


const routes: Routes = [
  {
    path: '',
    component: ImagesheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesheetPageRoutingModule {}
