import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { ExamstartPageRoutingModule } from './examstart-routing.module';

import { ExamstartPage } from './examstart.page';
import { SafePipe1 } from 'src/services/SafePipe1';
import { Base64 } from '@ionic-native/base64/ngx';
import { NetworkService } from 'src/services/network.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
  ExamstartPageRoutingModule
  ],
  declarations: [ExamstartPage,SafePipe1],
  exports: [
    SafePipe1
  ],
  providers:[
    Base64,
    NetworkService

  ]
 
})
export class ExamstartPageModule {}
