import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; 

import { IonicModule } from '@ionic/angular';

import { UploadsPageRoutingModule } from './uploads-routing.module';

import { UploadsPage } from './uploads.page';
import { Base64 } from '@ionic-native/base64/ngx';
import { NetworkService } from 'src/services/network.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule, 
  UploadsPageRoutingModule
  ],
  declarations: [UploadsPage],
  providers:[
    Base64
  ]
})
export class UploadsPageModule {}
