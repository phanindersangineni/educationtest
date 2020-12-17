import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { VideoService } from 'src/services/video.service';


@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.page.html',
  styleUrls: ['./downloads.page.scss'],
})
export class DownloadsPage implements OnInit {
  todaydate = null;
  loadProgress =20;
  constructor(private route: Router,
    private videoService:VideoService) {
    this.todaydate = moment(new Date()).format('DD/MM/YYYY');
   }

  ngOnInit() {
  }
 videos() {
   this.videoService.setvideotype ='online';
    //this.route.navigate(['./videos']);
    this.route.navigate(['./syllabus']);
  }
  allvideos() {
    this.videoService.setvideotype ='offline';
    this.route.navigate(['./videos']);
  }
}
