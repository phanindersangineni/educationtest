import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; 

import { IonicModule } from '@ionic/angular';

import { Base64 } from '@ionic-native/base64/ngx';
import { NetworkService } from 'src/services/network.service';
import { UploadedsheetsPageRoutingModule } from './uploadedsheets-routing.module';
import { UploadedsheetsPage } from './uploadedsheets.page';
import { ImagesheetPageModule } from '../modals/imagesheet/imagesheet.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule, 
  UploadedsheetsPageRoutingModule,
  ImagesheetPageModule
  ],
  declarations: [UploadedsheetsPage],
  providers:[
    Base64
  ]
})
export class UploadedsheetsPageModule {}
