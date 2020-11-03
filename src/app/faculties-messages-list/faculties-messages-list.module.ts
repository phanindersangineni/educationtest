import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { FacultiesMessagesListPageRoutingModule } from './faculties-messages-list-routing.module';

import { FacultiesMessagesListPage } from './faculties-messages-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    FacultiesMessagesListPageRoutingModule
  ],
  declarations: [FacultiesMessagesListPage]
})
export class FacultiesMessagesListPageModule {}
 