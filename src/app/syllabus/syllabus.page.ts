import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.page.html',
  styleUrls: ['./syllabus.page.scss'],
})
export class SyllabusPage implements OnInit {
tab: string = "Maths";
  constructor(private route: Router,) { }

  ngOnInit() {
  }


syllabus_topics() {
    this.route.navigate(['./syllabus-topics']);
  } 
}
