import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';


import { SafePipe2 } from 'src/services/SafePipe2';
import { Base64 } from '@ionic-native/base64/ngx';
import { NetworkService } from 'src/services/network.service';
import { ViewresultPageRoutingModule } from './viewresult-routing.module';
import { ViewResultPage } from './viewresult.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
  ViewresultPageRoutingModule
  ],
  declarations: [ViewResultPage,SafePipe2],
  exports: [
    SafePipe2
  ],
  providers:[
    Base64,
    NetworkService

  ]
 
})
export class ViewResultPageModule {}
