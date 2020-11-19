import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { QuestionPageRoutingModule } from './question-routing.module';

import { QuestionPage } from './question.page';
import { SafePipe } from 'src/services/SafePipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    QuestionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QuestionPage,SafePipe],
  exports: [
    SafePipe
  ],
})
export class QuestionPageModule {}
