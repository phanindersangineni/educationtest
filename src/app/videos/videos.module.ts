import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { VideosPageRoutingModule } from './videos-routing.module';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

import { VideosPage } from './videos.page';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { Base64 } from '@ionic-native/base64/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
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
    VideosPageRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  
  providers: [
   VideoPlayer,
   FileTransfer,  
   FileTransferObject,
   File,
   Base64,
   AndroidPermissions
   ],
  declarations: [VideosPage]
})
export class VideosPageModule {}
