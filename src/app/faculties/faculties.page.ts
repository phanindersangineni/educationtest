import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.page.html',
  styleUrls: ['./faculties.page.scss'],
})
export class FacultiesPage implements OnInit {
tab: string = "all";
  constructor(private route: Router,) { }

  ngOnInit() {
  }


 faculties_messages() {
    this.route.navigate(['./faculties-message']);
  } 
} 