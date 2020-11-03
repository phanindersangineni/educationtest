import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import { Subscription } from 'rxjs';
import {VgAPI} from 'videogular2/core';
import { Storage } from '@ionic/storage';
import { VideoService } from 'src/services/video.service';
@Component({
  selector: 'app-offlinevideo',
  templateUrl: './offlinevideo.page.html',
  styleUrls: ['./offlinevideo.page.scss'],
})
export class OfflinevideoPage implements OnInit {
tab: string = "all";
options: VideoOptions
api:VgAPI;
base64 :any="";

  constructor(private route: Router,private videoPlayer: VideoPlayer,
    private storage: Storage,
    private videoService:VideoService) {
    /* this.storage.get('base64').then((base64) => {
       // this.base64 ='https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4';
        //"data:video/mp4;base64,"
        //base64;
       //alert(this.base64);
      
      });*/
      alert(this.videoService.getbase64String);
      this.base64 =this.videoService.getbase64String;
   }

  ngOnInit() {
    
  }

 
  closeVideo() {
    this.videoPlayer.close();
  }

  onPlayerReady(api:VgAPI) {
    this.storage.get('currenttime').then((currenttime) => {
    this.api = api;
    console.log(currenttime);
    this.api.getDefaultMedia().currentTime= currenttime;
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
      () =>{
        //alert(this.api.getDefaultMedia().currentTime);
        this.storage.set("currenttime",this.api.getDefaultMedia().currentTime);
        console.log(this.api.getDefaultMedia().duration);
        console.log(this.api.getDefaultMedia().time);
      }
      
    )

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
        () => {
            // Set the video to the beginning
            this.api.getDefaultMedia().currentTime= currenttime;
            console.log("test");
            alert(this.api.getDefaultMedia().currentTime);
            this.storage.set("currenttime",this.api.getDefaultMedia().currentTime);
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