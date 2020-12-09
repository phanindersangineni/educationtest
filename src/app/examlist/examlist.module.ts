import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';


import { ExamlistPage } from './examlist.page';
import { ExamlistPageRoutingModule } from './examlist-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
    ExamlistPageRoutingModule
  ],
  declarations: [ExamlistPage]
})
export class ExamlistPageModule {}
