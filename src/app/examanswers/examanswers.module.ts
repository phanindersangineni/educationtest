import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { ExamanswersPage } from './examanswers.page';
import { ExamanswersPageRoutingModule } from './examanswers-routing.module';
import { SafePipe3 } from 'src/services/SafePipe3';
import { SummaryPageModule } from '../modals/summary/summary.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
  ExamanswersPageRoutingModule,
  SummaryPageModule
  ],
  declarations: [ExamanswersPage,SafePipe3],
  exports: [
    SafePipe3
  ],
})
export class ExamanswersPageModule {}
  