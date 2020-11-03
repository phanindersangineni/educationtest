import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
  
import { IonicModule } from '@ionic/angular';

import { AboutAcademyPageRoutingModule } from './about-academy-routing.module';

import { AboutAcademyPage } from './about-academy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
    AboutAcademyPageRoutingModule
  ],
  declarations: [AboutAcademyPage]
})
export class AboutAcademyPageModule {}