import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; 

import { IonicModule } from '@ionic/angular';

import { Base64 } from '@ionic-native/base64/ngx';
import { NetworkService } from 'src/services/network.service';
import { ImagesheetPageModule } from '../modals/imagesheet/imagesheet.module';
import { ViewsheetPageRoutingModule } from './viewsheet-routing.module';
import { ViewsheetPage } from './viewsheet.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule, 
  ViewsheetPageRoutingModule,
  ImagesheetPageModule
  ],
  declarations: [ViewsheetPage],
  providers:[
    Base64
  ]
})
export class ViewsheetPageModule {}
