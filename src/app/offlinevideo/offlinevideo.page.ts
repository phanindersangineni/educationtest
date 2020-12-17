import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import { Subscription } from 'rxjs';
import { VgAPI } from 'videogular2/core';
import { Storage } from '@ionic/storage';
import { VideoService } from 'src/services/video.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Httpd, HttpdOptions } from '@ionic-native/httpd/ngx';
import {
  File,
  DirectoryEntry, FileEntry
} from '@ionic-native/file/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { LoaderService } from 'src/services/LoaderService';

@Component({
  selector: 'app-offlinevideo',
  templateUrl: './offlinevideo.page.html',
  styleUrls: ['./offlinevideo.page.scss'],
})
export class OfflinevideoPage implements OnInit {
  tab: string = "all";
  options: VideoOptions
  api: VgAPI;
  base64: any = "";
  studentid: '10011617';
  subjectid: '';
  topicid: '';
  subtopicid: '';
  content:any;
  count:any;
  base1 =null;
  base2 =null;

  

  constructor(private route: Router, private videoPlayer: VideoPlayer,
    private storage: Storage,private platform :Platform,
    private videoService: VideoService,private domSanitizer: DomSanitizer,
    private file: File, public ngZone : NgZone, public httpd :Httpd,
    private loadingCtrl:LoaderService) {
    /* this.storage.get('base64').then((base64) => {
       // this.base64 ='https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4';
        //"data:video/p4;base64,"
        //base64;
       //alert(this.base64);
      
      });*/
    this.subtopicid = this.videoService.getSubjectId;
    this.topicid = this.videoService.getTopicId;
    this.subjectid = this.videoService.getSubTopicId;
    this.startlocalserver();
    this.options = {
      scalingMode: 0,
      volume: 0.5
    };
   
   // this.base64 = this.domSanitizer.bypassSecurityTrustUrl(this.videoService.getbase64String);

   this.base64 = this.domSanitizer.bypassSecurityTrustUrl('/files/chaitanya/'+this.videoService.getbase64String);
   
    //alert(this.base64)

  }
  ionViewDidEnter() {
    this.platform.ready().then(()=>{
      this.startlocalserver();
      });
  }

  presentLoadingDefault() {
   this.loadingCtrl.showHideAutoLoader();
  
    setTimeout(() => {
      this.loadingCtrl.hideLoader();
    }, 5000);
  }

  startlocalserver(){
    this.presentLoadingDefault();
    /*let options: HttpdOptions = {
      www_root: this.file.dataDirectory.replace('file://',''),
      port: 9000,
      localhost_only: true //if you want to create multiple localhost then false  
    };*/

    let options: HttpdOptions = {
      www_root: this.file.dataDirectory.replace('file://','')
    };


    this.httpd.startServer(options).subscribe(url => {
      console.log('Server is live',url); //Server is live http://127.0.0.0.1:9000
      let videofilename =this.videoService.getbase64String;
      this.ngZone.run(()=>{
          this.base1 =url+'/chaitanya/'+videofilename;
      })

    },error => {
      //alert(JSON.stringify(error));
      //alert(this.httpd.getUrl());
      this.httpd.getUrl().then((val)=>{
         alert(val);
      });
      this.ngZone.run(()=>{
        let videofilename =this.videoService.getbase64String;
     
      this.base1 ='http://127.0.0.0.1:9000'+'/chaitanya/'+videofilename;
      // alert(this.base1);
    
    })
    });
  }

  ngOnInit() {

    /*this.file.listDir(this.file.dataDirectory, 'chaitanya')
      .then((data) => {
        alert(data[0]);
        this.count = data.length;
        const src = data[0].toInternalURL();
        alert(src);
        this.file.resolveLocalFilesystemUrl(src).then(data => {
          this.content = data.toURL();
          alert(this.content);
          document.getElementById('video').setAttribute('src', this.content);
          console.log('Content path cahnged ', this.content);
        }, error => {
          console.log('File path error');
        })
      })
      .catch(err => console.log('Directory doesnt exist'));*/
   
  }

  playLocalVideo() {
    alert("hi");
    // Playing a video.
    this.videoPlayer.play('file:///data/user/0/com.srichaitanya.neetdb/files/chaitanya/'+this.videoService.getbase64String).then(() => {
      console.log('video completed');
    }).catch(err => {
      alert(err);
    });
 
  }

  
  


  closeVideo() {
    this.videoPlayer.close();
  }

  onPlayerReady1(api: VgAPI) {
    this.storage.get('currenttime').then((currenttime) => {
      this.api = api;
      console.log(currenttime);
      this.api.getDefaultMedia().currentTime = currenttime;
      this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
        () => {
          //alert(this.api.getDefaultMedia().currentTime);
          this.storage.set("currenttime", this.api.getDefaultMedia().currentTime);
          console.log(this.api.getDefaultMedia().duration);
          console.log(this.api.getDefaultMedia().time);
        }

      )

      this.api.getDefaultMedia().subscriptions.ended.subscribe(
        () => {
          // Set the video to the beginning
          this.api.getDefaultMedia().currentTime = currenttime;
          console.log("test");
          alert(this.api.getDefaultMedia().currentTime);
          this.storage.set("currenttime", this.api.getDefaultMedia().currentTime);
          console.log(this.api.getDefaultMedia().currentTime);
          console.log(this.api.getDefaultMedia().duration);
          console.log(this.api.getDefaultMedia().time);
        }
      );
    });
  }

  onPlayerReady(api: VgAPI) {
    this.storage.get('currenttime').then((currenttime) => {
      this.api = api;
      console.log(currenttime);
      this.api.getDefaultMedia().currentTime = currenttime;
      this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
        () => {
          //alert(this.api.getDefaultMedia().currentTime);
          this.storage.set("currenttime", this.api.getDefaultMedia().currentTime);
          console.log(this.api.getDefaultMedia().duration);
          console.log(this.api.getDefaultMedia().time);
        }

      )

      this.api.getDefaultMedia().subscriptions.ended.subscribe(
        () => {
          // Set the video to the beginning
          this.api.getDefaultMedia().currentTime = currenttime;
          console.log("test");
          alert(this.api.getDefaultMedia().currentTime);
          this.storage.set("currenttime", this.api.getDefaultMedia().currentTime);
          console.log(this.api.getDefaultMedia().currentTime);
          console.log(this.api.getDefaultMedia().duration);
          console.log(this.api.getDefaultMedia().time);
        }
      );
    });
  }



  faculties_messages() {
    this.route.navigate(['./faculties-message']);
  }
} 