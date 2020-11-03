import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; 
import { IonicModule } from '@ionic/angular';

import { CalenderPageRoutingModule } from './calender-routing.module';

import { CalenderPage } from './calender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule, 
    CalenderPageRoutingModule
  ],
  declarations: [CalenderPage]
})
export class CalenderPageModule {} 
