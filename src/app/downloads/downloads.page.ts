import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.page.html',
  styleUrls: ['./downloads.page.scss'],
})
export class DownloadsPage implements OnInit {
  todaydate = null;
  constructor(private route: Router,) {
    this.todaydate = moment(new Date()).format('DD/MM/YYYY');
   }

  ngOnInit() {
  }
 videos() {
    //this.route.navigate(['./videos']);
    this.route.navigate(['./syllabus']);
  }
}
