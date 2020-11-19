import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SubjectexamPageRoutingModule } from './subjectexam-routing.module';

import { SubjectexamPage } from './subjectexam.page';
import { ConfirmationPageModule } from '../modals/confirmation/confirmation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
  SubjectexamPageRoutingModule,
  ConfirmationPageModule
  ],
  declarations: [SubjectexamPage]
})
export class SubjectexamPageModule {}
