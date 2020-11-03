import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { TestsPageRoutingModule } from './tests-routing.module';

import { TestsPage } from './tests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,
    TestsPageRoutingModule
  ],
  declarations: [TestsPage]
})
export class TestsPageModule {}
