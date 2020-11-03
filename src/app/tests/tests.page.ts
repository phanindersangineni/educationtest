import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
@Component({
  selector: 'app-tests',
  templateUrl: './tests.page.html',
  styleUrls: ['./tests.page.scss'],
})
export class TestsPage implements OnInit {
  tab: string = "upcoming_test";
  todaysexam: any = {};
  canstartexam = false;
  candownload = false;
  constructor(private route: Router,
    private storage: Storage) {
    this.storage.get('examdata').then((examdata) => {
      this.todaysexam = examdata;
    });
    let examdate = moment().format('DD/MM/YYYY') + ' ' + '00:10';
    //let diff = moment('03/11/2020 00:45', 'DD/MM/YYYY HH:mm').diff(moment('03/11/2020 00:10', 'DD/MM/YYYY HH:mm'))
    //let d = moment.duration(diff);
    // let hours =  Math.floor(d.asHours());
    //let minutes = moment.utc(diff).format("mm");
    //console.log(minutes);

    //var check = moment('03/11/2020 00:10').isAfter();
    var nowS = new Date();
    var checks = new Date(examdate);
    if (nowS.getTime() > checks.getTime()) {
      console.log("rue");
      let diff = moment(nowS, 'DD/MM/YYYY HH:mm').diff(moment(checks, 'DD/MM/YYYY HH:mm'));
      let d = moment.duration(diff);
      let minutes = moment.utc(diff).format("mm");
      if (parseFloat(minutes) > 5) {
        this.canstartexam = false;
      } else {
        this.canstartexam = true;
      }

    } else {
      console.log("false");
      this.candownload = true;
    }

    // console.log(check);

  }

  ngOnInit() {
  }

  test_result() {
    this.route.navigate(['./test-result']);
  }
  question() {

    this.route.navigate(['./question']);
  }
}
