import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { FacultiesPageRoutingModule } from './faculties-routing.module';

import { FacultiesPage } from './faculties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FacultiesPageRoutingModule
  ],
  declarations: [FacultiesPage]
})
export class FacultiesPageModule {}
