import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SingUpPageRoutingModule } from './sing-up-routing.module';

import { SingUpPage } from './sing-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    SingUpPageRoutingModule
  ],
  declarations: [SingUpPage]
})
export class SingUpPageModule {}
