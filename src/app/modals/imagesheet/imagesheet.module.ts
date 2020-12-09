import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';


import { ImagesheetPage } from './imagesheet.page';
import { ImagesheetPageRoutingModule } from './imagesheet-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
  ImagesheetPageRoutingModule
  ],
  declarations: [ImagesheetPage]
})
export class ImagesheetPageModule {}
