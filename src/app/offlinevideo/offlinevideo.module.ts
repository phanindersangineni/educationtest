import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { OfflinevideoPageRoutingModule } from './offlinevideo-routing.module';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

import { OfflinevideoPage } from './offlinevideo.page';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';


import {  
  FileTransfer,  
  FileTransferObject  
} from '@ionic-native/file-transfer/ngx'; 

import {  
  File  
} from '@ionic-native/file/ngx'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OfflinevideoPageRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  
  providers: [
   VideoPlayer,
   File
  ],
  declarations: [OfflinevideoPage]
})
export class OfflinevideoPageModule {}
