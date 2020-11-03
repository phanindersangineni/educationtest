import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SyllabusPageRoutingModule } from './syllabus-routing.module';

import { SyllabusPage } from './syllabus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
    SyllabusPageRoutingModule
  ],
  declarations: [SyllabusPage]
})
export class SyllabusPageModule {}
