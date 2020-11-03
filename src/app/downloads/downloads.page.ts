import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.page.html',
  styleUrls: ['./downloads.page.scss'],
})
export class DownloadsPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }
 videos() {
    this.route.navigate(['./videos']);
  }
}
