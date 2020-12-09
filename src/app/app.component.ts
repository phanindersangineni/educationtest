import { Component, Inject } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '../../node_modules/@ngx-translate/core';
import { APP_CONFIG, AppConfig } from './app.config';
import { MyEvent } from 'src/services/myevent.services';
import { Constants } from 'src/models/contants.models';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rtlSide = "left";

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
    private platform: Platform, private navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService, private myEvent: MyEvent,
    private storage: Storage) {
    this.initializeApp();
    this.myEvent.getLanguageObservable().subscribe(value => {
      this.globalize(value);
     
    });

    /*this.storage.ready().then(() => {
      this.storage.get('studentid').then((studentid) => {
        if (studentid == null) {
          this.navCtrl.navigateRoot(['./']);
         
        } else {
          this.navCtrl.navigateRoot(['./home']);
         
        }
      });
    });*/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
      this.globalize(defaultLang);
      document.addEventListener('backbutton', () => {
        if (this.navCtrl.back) {
           return;
        }
        this.navCtrl.pop()
      }, false);
    });

  
  };

  globalize(languagePriority) {
    this.translate.setDefaultLang("en");
    let defaultLangCode = this.config.availableLanguages[0].code;
    this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  }

  setDirectionAccordingly(lang: string) {
    switch (lang) {
      case 'ar': {
        this.rtlSide = "rtl";
        break;
      }
      default: {
        this.rtlSide = "ltr";
        break;
      }
    }
  }
}
