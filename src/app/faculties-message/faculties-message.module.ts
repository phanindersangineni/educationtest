import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { FacultiesMessagePageRoutingModule } from './faculties-message-routing.module';

import { FacultiesMessagePage } from './faculties-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    FacultiesMessagePageRoutingModule
  ],
  declarations: [FacultiesMessagePage]
})
export class FacultiesMessagePageModule {}
