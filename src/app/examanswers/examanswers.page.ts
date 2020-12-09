import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/services/exam.service';
import { Storage } from '@ionic/storage';
import { VideoService } from 'src/services/video.service';
@Component({
  selector: 'app-examanswers',
  templateUrl: './examanswers.page.html',
  styleUrls: ['./examanswers.page.scss'],
})
export class ExamanswersPage implements OnInit {
tab: string = "Maths";
attemptid : any = '';
subjects:any =[];
ispresent :boolean= true;
examdata :any;
examquestions: any = [];
todaysexam: any = {};
  canstartexam = false;
  candownload = false;
  questext: any;
  duration: any = '';
  examname: any = '';
  imgPreview = '';
  interval: any;
  currentduration: any = 0;
  studentanswerdata: any = {
    examId: '',
    studentId: '',
    subjects: [],
    startedTime: '',
    endedTime: '',
    submitted: 0,


  };
  starttime: any;
  newexamques: any = {};
  newques: any = {};
  studentid: any = 0;
  submissionstarted: any = false;
  studentlooparray =[];
 
  constructor(private route: Router,
    private examService: ExamService,
    private storage: Storage,
    private videoService: VideoService,) {
      this.storage.ready().then(() => {
        this.storage.get('subExamAttemptId').then((subExamAttemptId) => {
          // alert("hi")
          this.attemptid = subExamAttemptId;
          this.getstudentdata();
        });

        this.storage.get('studentanswerdata').then((studentanswerdata) => {
          if(studentanswerdata !=null){
            this.studentlooparray =studentanswerdata.subjects;
          }

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
      subExamAttemptId: this.attemptid
    }
    //alert(this.studentid);
     this.examService.post(admindata,'/evaluation/examQuestions').subscribe(examdata => {
      this.examquestions =examdata;
       
     }, error => {
      // this.errors = error
       alert(error);
   });
  }
  examlist(data) {
    this.storage.set('studentdata',data);
    this.route.navigate(['./examlist']);
  }

  gotouploads(examques, ques) {
    this.newexamques = examques;
    this.newques = ques;
    this.storage.ready().then(() => {
      this.storage.get('studentanswerdata').then((studentanswerdata) => {
        this.videoService.setsubExamSecId = examques.subExamSecId;

        if (studentanswerdata == null) {
          let answersht = [];
          const seciddata = {
            subExamSecId: this.newexamques.subExamSecId,
            questionid: this.newques.questionId,
            subExamQnId: this.newques.subExamQnId,
            questionanswers: this.newques.answers,
            subjectId: this.videoService.getSubjectId,

          };
          //let uploadedarray = [];
          //uploadedarray.push(seciddata);



          this.studentanswerdata.subjects.push(seciddata);
          console.log(this.studentanswerdata);

          this.storage.set('quesobj', ques).then(() => {
            this.storage.set('studentanswerdata', this.studentanswerdata).then(() => {
              this.route.navigate(['./uploads']);
            });
          });

        } else {
          this.studentanswerdata = studentanswerdata;

          console.log(this.studentanswerdata);
          let subjects = [];
          subjects = this.studentanswerdata.subjects;
          let cancontinue = true;

          var totalrecords = this.studentanswerdata.subjects.length;
          var indx = 0;
          let studanswerda = this.studentanswerdata.subjects;
          console.log(studanswerda);

          console.log("<<<<>>>>>");

          console.log(studanswerda.length);

          var indx1 = 0;
          let totalrecords1 = studanswerda.length;
          let isfalse = false;
          var looparray1 = function (indx1) {

            var answersrows = studanswerda[indx1];
            console.log(answersrows);

            if (answersrows.questionid == ques.questionId) {
              //this.route.navigate(['./uploads']);
              isfalse = true;
            } else {
              // this.newsectionupload(examques, ques);

            }

            if (totalrecords1 - 1 == indx1) {
              if (isfalse) {
                console.log(studanswerda);
                //this.forwardnew(); 
                //window.location.href = '/uploads';
                var event = new CustomEvent("forwardupload");
                window.dispatchEvent(event);

              } else {
                var event1 = new CustomEvent("newsectionupload");
                window.dispatchEvent(event1);
                //this.newsectionupload(examques, ques);
              }
            } else {
              indx1 = indx1 + 1;
              looparray1(indx1);
            }

          }
          looparray1(indx1);




        }

      })
    });


  }

  @HostListener("window:forwardupload")
  forwardnew() {
    this.route.navigate(['./uploadedsheets']);
  }

  @HostListener("window:newsectionupload")
  newsectionupload() {
    console.log("newsectionupload");
    this.videoService.setsubExamSecId = this.newexamques.subExamSecId;
    let answersht = [];

    let subjects = [];
    subjects = this.studentanswerdata.subjects;
    let subjectsarray = [];
    let newrecord = false;
    subjects.forEach(element => {
      console.log(element);
      if (element.questionid != this.newques.questionId) {

        subjectsarray.push(element);
        console.log(subjectsarray);
      } else {
        newrecord = true;
      }


    });
    //subjectsarray.push();

    const seciddata = {
      subExamSecId: this.newexamques.subExamSecId,
      questionid: this.newques.questionId,
      subExamQnId: this.newques.subExamQnId,
      questionanswers: this.newques.answers,
      subjectId: this.videoService.getSubjectId,

    };
    subjects.push(seciddata);


    let finaldata: any = {
      examId: '',
      studentId: '',
      startedTime: '',
      endedTime: '',
      subjects: subjects

    }
    this.storage.ready().then(() => {
      this.storage.set('quesobj', this.newques).then(() => {
        this.storage.set('studentanswerdata', finaldata).then(() => {
          this.route.navigate(['./uploadedsheets']);
        });
      });
    });

  }

}
