import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-insight',
  templateUrl: './insight.page.html',
  styleUrls: ['./insight.page.scss'],
})
export class InsightPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }
 leaderboard() {
    this.route.navigate(['./leaderboard']);
  }
}
