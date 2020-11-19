import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_CONFIG, BaseAppConfig } from './app.config';
import { LoginService } from 'src/services/login.service';
import { IonicStorageModule } from '@ionic/storage';
import { VideoService } from 'src/services/video.service';
import { LoaderService } from 'src/services/LoaderService';
import { ExamService } from 'src/services/exam.service';
import { ToastService } from 'src/services/toastr.service';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64';
import { AutosubmitEventService } from 'src/services/autosubmitevent.service';
import { CountdownEventService } from 'src/services/countdownevent.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Network } from '@ionic-native/network/ngx'



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
/*{
  name: '_myDb',
  driverOrder: ['localstorage']
}*/
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '_myDb',
      driverOrder: ['localstorage']
    }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
 
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    VideoService,
    LoaderService,
    ExamService,
    ToastService,
    ImagePicker,
    AutosubmitEventService,
    CountdownEventService,
    Camera,
    FilePath,
    Network
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
