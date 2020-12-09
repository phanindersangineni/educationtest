import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';


import { StudentsPage } from './students.page';
import { StudentsPageRoutingModule } from './students-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
    StudentsPageRoutingModule
  ],
  declarations: [StudentsPage]
})
export class StudentsPageModule {}
