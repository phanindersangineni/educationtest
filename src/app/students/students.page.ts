import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/services/exam.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
tab: string = "Maths";
studentid: any = '';
subjects:any =[];
ispresent :boolean= true;
  constructor(private route: Router,
    private examService: ExamService,
    private storage: Storage) {
      this.storage.ready().then(() => {
        this.storage.get('studentid').then((studentid) => {
          // alert("hi")
          this.studentid = studentid;
          this.getsubjectvideos();
        });
      });
     }

  ngOnInit() {
   
  }


syllabus_topics() {
    this.route.navigate(['./syllabus-topics']);
  } 

  getsubjectvideos() {
    const admindata: any = {
      employeeId: this.studentid
    }
    //alert(this.studentid);
     this.examService.post(admindata,'/evaluation/students').subscribe(examdata => {
        this.subjects = examdata;
        if(this.subjects.length ==0){
         this.ispresent =false;
        }
     }, error => {
      // this.errors = error
       alert(error);
   });
  }
  examlist(data) {
    this.storage.set('studentdata',data);
    this.route.navigate(['./examlist']);
  }
}
