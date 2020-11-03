import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculties-messages-list',
  templateUrl: './faculties-messages-list.page.html',
  styleUrls: ['./faculties-messages-list.page.scss'],
})
export class FacultiesMessagesListPage implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit() {
  }
	

faculties_message() {
    this.route.navigate(['./faculties-message']);
  } 

}
