import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../app.config';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todaydate = null;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'no', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

username ='';
  todaysexam :any ={};
  constructor(@Inject(APP_CONFIG) public config: AppConfig, private route: Router,
  private theInAppBrowser: InAppBrowser,
  private storage: Storage ) {
    this.storage.get('examdata').then((examdata) => {
     this.todaysexam  =examdata;
     console.log(this.todaysexam);
     //alert("hhhh");
    });

     this.todaydate = moment(new Date()).format('DD/MM/YYYY');
    
   }

  notification() {
    this.route.navigate(['./notification']);
  }
  change_language() {
    this.route.navigate(['./change-language']);
  }
  my_profile() {
    this.route.navigate(['./my-profile']);
  }
  syllabus() {
    this.route.navigate(['./syllabus']);
  }
  calender() {
    this.route.navigate(['./calender']);
  }
  tests() {
    this.route.navigate(['./tests']);
  }
  insight() {
    this.route.navigate(['./insight']);
  }
  downloads() {
    this.route.navigate(['./downloads']);
  }
  about_academy() {
    this.route.navigate(['./about-academy']);
  }
  faculties() {
    this.route.navigate(['./faculties']);
  }
  subjectiveexam() {
    this.route.navigate(['./subjectexam']);
  }
  support() {
    this.route.navigate(['./support']);
  }
  allstudents() {
    this.route.navigate(['./students']);
  }
  logout() {
    this.storage.remove('studentid').then(() => {
    this.route.navigate(['./sing-in']);
    });
  }
  faculties_message() {
    this.route.navigate(['./faculties-messages-list']);
  }
  buyAppAction() {
    window.open("https://bit.ly/cc_Academy", '_system', 'location=no');
  }
  
  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithInAppBrowser(){
    let target = "_blank";
    
    this.storage.get('username').then((username) => {
      this.username =username;
      let url ='https://scaits.xyz/validateMobileLogin?username='+this.username;
    this.theInAppBrowser.create(url,target,this.options);
    });
}
public openWithCordovaBrowser(url : string){
    let target = "_self";
    this.theInAppBrowser.create(url,target,this.options);
}  

}
