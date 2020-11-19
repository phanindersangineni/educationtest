import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';


import { ConfirmationPage } from './confirmation.page';
import { ConfirmationPageRoutingModule } from './confirmation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
  ConfirmationPageRoutingModule
  ],
  declarations: [ConfirmationPage]
})
export class ConfirmationPageModule {}
