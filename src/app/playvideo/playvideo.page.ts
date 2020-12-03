import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import { Subscription } from 'rxjs';
import { VgAPI } from 'videogular2/core';
import { Storage } from '@ionic/storage';
import { VideoService } from 'src/services/video.service';
import { ExamService } from 'src/services/exam.service';
@Component({
  selector: 'app-playvideo',
  templateUrl: './playvideo.page.html',
  styleUrls: ['./playvideo.page.scss'],
})
export class PlayvideoPage implements OnInit {
  tab: string = "all";
  options: VideoOptions
  api: VgAPI;
  videourl: any = '';
  studentid: '10011617';
  subjectid: '12';
  topicid: '12';
  subtopicid: '13';
  current:any =0;
  total:any =0;
  left:any =0;

  constructor(private route: Router, private videoPlayer: VideoPlayer,
    private storage: Storage,
    private videoService: VideoService,
    private examService: ExamService) {
    this.subtopicid = this.videoService.getSubjectId;
    this.videourl = this.videoService.getVideoUrl;
    if (this.videourl == null) {
      this.videourl = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4';
    }
   // this.videourl ='https://testscaitsbucket.s3.ap-south-1.amazonaws.com/videos/Chemisrtry.mp4';
  }

  ngOnInit() {
  }

  ionViewDidLeave(){
    this.capturewatchevent();
  }


  closeVideo() {
    this.videoPlayer.close();
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
          let timespandata = this.api.getDefaultMedia().time;
          this.current= timespandata.current;
          this.total= timespandata.total;
          this.left = timespandata.left;
       
        }

      )

      this.api.getDefaultMedia().subscriptions.ended.subscribe(
        () => {
          // Set the video to the beginning
          this.api.getDefaultMedia().currentTime = currenttime;
          console.log("test");
          alert(this.api.getDefaultMedia().currentTime);
          this.storage.set("currenttime", this.api.getDefaultMedia().currentTime);
          //console.log(this.api.getDefaultMedia().currentTime);
          // console.log(this.api.getDefaultMedia().duration);
          //console.log(this.api.getDefaultMedia().time);
        }
      );
    });
  }

  capturewatchevent(){

    let studentvideoarray = [];
    const postdata = {
      studentid:this.studentid,
      subVideoId: this.subtopicid,
      watchtime: this.current,
      totaltime: this.total,
      lefttime: this.left

    }

    studentvideoarray.push(postdata);
    
    //console.log(finalpostdata);
    /*this.examService.post(postdata,'videotimecapture').subscribe(result => {
       
    });*/


  }



  faculties_messages() {
    this.route.navigate(['./faculties-message']);
  }
} 