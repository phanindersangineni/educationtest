import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DownloadsPageRoutingModule } from './downloads-routing.module';

import { DownloadsPage } from './downloads.page';
import { ProgressBarComponent } from 'src/components/progress-bar/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
  DownloadsPageRoutingModule,
  
  ],
  declarations: [DownloadsPage,ProgressBarComponent]
})
export class DownloadsPageModule {}
