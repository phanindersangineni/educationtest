import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import { Subscription } from 'rxjs';
import {VgAPI} from 'videogular2/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-playvideo',
  templateUrl: './playvideo.page.html',
  styleUrls: ['./playvideo.page.scss'],
})
export class PlayvideoPage implements OnInit {
tab: string = "all";
options: VideoOptions
api:VgAPI;
  constructor(private route: Router,private videoPlayer: VideoPlayer,
    private storage: Storage) {
    
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