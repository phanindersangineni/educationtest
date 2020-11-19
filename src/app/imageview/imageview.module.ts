import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; 

import { IonicModule } from '@ionic/angular';

import { Base64 } from '@ionic-native/base64/ngx';
import { ImageviewPageRoutingModule } from './imageview-routing.module';
import { ImageViewPage } from './imageview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule, 
  ImageviewPageRoutingModule
  ],
  declarations: [ImageViewPage],
  providers:[
    Base64
  ]
})
export class ImageViewPageModule {}
