import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/services/exam.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-examlist',
  templateUrl: './examlist.page.html',
  styleUrls: ['./examlist.page.scss'],
})
export class ExamlistPage implements OnInit {
tab: string = "Maths";
studentid: any = '';
subjects:any =[];
ispresent :boolean= true;
examdata :any;
  constructor(private route: Router,
    private examService: ExamService,
    private storage: Storage) {
      this.storage.ready().then(() => {
        this.storage.get('studentdata').then((studentdata) => {
          // alert("hi")
          this.examdata = studentdata;
          this.getstudentdata();
        });
      });
     }

  ngOnInit() {
   
  }


syllabus_topics() {
    this.route.navigate(['./syllabus-topics']);
  } 

  getstudentdata() {
    const admindata: any = {
      studentId: this.examdata.admNo, 
      subject:this.examdata.empSubject
    }
    //alert(this.studentid);
     this.examService.post(admindata,'/evaluation/studentExams').subscribe(examdata => {
        this.subjects = examdata;
        if(this.subjects.length ==0){
         this.ispresent =false;
        }
     }, error => {
      // this.errors = error
       alert(error);
   });
  }
  examanswers(data) {
    this.storage.set('evaluationexamdata',data);
    this.storage.set('subExamAttemptId',data.subExamAttemptId);
    this.route.navigate(['./examanswers']);
  }
}
