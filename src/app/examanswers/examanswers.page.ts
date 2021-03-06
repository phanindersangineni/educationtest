import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/services/exam.service';
import { Storage } from '@ionic/storage';
import { VideoService } from 'src/services/video.service';
import { ToastService } from 'src/services/toastr.service';
import { LoaderService } from 'src/services/LoaderService';
import { SummaryPage } from '../modals/summary/summary.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-examanswers',
  templateUrl: './examanswers.page.html',
  styleUrls: ['./examanswers.page.scss'],
})
export class ExamanswersPage implements OnInit {
  tab: string = "Maths";
  attemptid: any = '';
  subjects: any = [];
  ispresent: boolean = true;
  examdata: any;
  examquestions: any = [];
  todaysexam: any = {};
  canstartexam = false;
  candownload = false;
  questext: any;
  duration: any = '';
  examname: any = '';
  imgPreview = '';
  interval: any;
  studentname: any = '';
  currentduration: any = 0;
  studentanswerdata: any = {
    subExamAttemptId: '',
    subjects: [],
    examName: '',
    admNo: 0,


  };
  starttime: any;
  newexamques: any = {};
  newques: any = {};
  studentid: any = 0;
  submissionstarted: any = false;
  studentlooparray = [];
  examName: any = '';
  admNo: any = '';
  constructor(private route: Router,
    private examService: ExamService,
    private storage: Storage,
    private videoService: VideoService,
    private toastrService: ToastService,
    private loaderService: LoaderService,
    public modalController: ModalController) {
    this.storage.ready().then(() => {
      this.storage.get('studentid').then((studentid) => {
        this.studentid = studentid;
      });
      this.storage.get('subExamAttemptId').then((subExamAttemptId) => {
        // alert("hi")
        this.attemptid = subExamAttemptId;
        this.getstudentdata();
      });

      this.storage.get('studentanswerdata').then((studentanswerdata) => {
        if (studentanswerdata != null) {
          this.studentlooparray = studentanswerdata.subjects;
        }
     
      });

      this.storage.get('evaluationexamdata').then((evaluationexamdata) => {
        this.examName = evaluationexamdata.examName;
        this.studentname = evaluationexamdata.studentName;
        this.admNo = evaluationexamdata.admNo;

        this.studentanswerdata.admNo =this.admNo;
        this.studentanswerdata.examName =this.examName ;

      });



    });
  }

  ngOnInit() {
  
  }
  
  ionViewDidEnter() {
    this.storage.get('studentanswerdata').then((studentanswerdata) => {
      if (studentanswerdata != null) {
        this.studentlooparray = studentanswerdata.subjects;
      }

    });

  }
  

  syllabus_topics() {
    this.route.navigate(['./syllabus-topics']);
  }

  getstudentdata() {
    const admindata: any = {
      subExamAttemptId: this.attemptid
    }
    //alert(this.studentid);
    this.examService.post(admindata, '/evaluation/examQuestions').subscribe(examdata => {
      this.examquestions = examdata;
      console.log(this.examquestions);

    }, error => {
      // this.errors = error
      alert(error);
    });
  }
  examlist(data) {
    this.storage.set('studentdata', data);
    this.route.navigate(['./examlist']);
  }

  async summary() {
    const modal = await this.modalController.create({
      component: SummaryPage,

    });

    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
      if(dataReturned.data ==true){
        this.finalsubmit();
      }
    
    });
    return await modal.present();

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
            answeredQnId:this.newques.answeredQnId,
            sectionName:this.newexamques.sectionName,
            maxMarks:this.newexamques.maxMarks,
            sectionMarks :this.newques.maxMarks

          };
          //let uploadedarray = [];
          //uploadedarray.push(seciddata);



          this.studentanswerdata.subjects.push(seciddata);
          console.log(this.studentanswerdata);

          this.storage.set('quesobj', ques).then(() => {
            this.storage.set('studentanswerdata', this.studentanswerdata).then(() => {
              this.route.navigate(['./uploadedsheets']);
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
                var event1 = new CustomEvent("newsectionupload4");
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

  @HostListener("window:newsectionupload4")
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
      answeredQnId:this.newques.answeredQnId,
      sectionName:this.newexamques.sectionName,
      maxMarks:this.newexamques.maxMarks,
      sectionMarks :this.newques.maxMarks

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

  @HostListener("window:answerevaluationerror")
  evaluateanswererror() {
    this.toastrService.showToast('Please evaluate all the answered questions');
  }

  @HostListener("window:evaluationsubmission")
  evaluationsubmission() {
    this.toastrService.showToast('evaluation submission');
    this.storage.ready().then(() => {
      this.storage.get('studentanswerdata').then((studentanswerdata) => {

        const finalsubmisiondata: any = {
          examName: this.examName,
          studentName: this.studentname,
          admNo: this.admNo,
          attemptid: this.attemptid,
          answers: studentanswerdata.subjects,
          empId:this.studentid
        }

        console.log(JSON.stringify(finalsubmisiondata));

        this.loaderService.showLoader();
        this.examService.post(finalsubmisiondata, '/evaluation/saveEvaluation').subscribe(result => {
          console.log(result);
           //alert(JSON.stringify(result));
          this.loaderService.hideLoader();
          if (result.status == 'Success') {
            this.toastrService.showToast('Evaluation of exam successful');
            this.storage.remove('studentanswerdata').then(() => {
              this.storage.remove('examdata').then(() => {
                this.storage.remove('studentdata').then(() => {
                  this.route.navigate(['./students']);
                });
              });

            });
          } else {
            this.toastrService.showToast('Error while evaluation please try after sometime');
            this.loaderService.hideLoader();
          }

        }, error => {
          // this.errors = error
          this.toastrService.showToast('Error while evaluation please try after sometime');
          this.loaderService.hideLoader();
        });

      });
    });
  }

  finalsubmit() {
    let cansubmit = true;
    this.storage.ready().then(() => {
      let studentarray = [];
      this.storage.get('studentanswerdata').then((studentanswerdata) => {
        if (studentanswerdata == null) {
          this.toastrService.showToast('Please evaluate the answered questions');
        } else {
          studentarray = studentanswerdata.subjects;
          let examquestions = this.examquestions;
          var mainrecord = this.examquestions.length;
          var mindx = 0;
          var mainarray = function (mindx) {
            var rcrows = examquestions[mindx];
            let subrecordarray = rcrows.sectionQuestionAnswer;

            var totalrecords = subrecordarray.length;
            var indx1 = 0;
            var looparray1 = function (indx1) {
              var records = subrecordarray[indx1];
              console.log(studentarray);
              if (records.answeredStatus == 'ANSWERED') {

                const filterarray = studentarray.filter(item => item.questionId !== records.questionId);

                console.log(filterarray);
                if (filterarray[0].marks == undefined) {
                  cansubmit = false;
                  var event44 = new CustomEvent("answerevaluationerror");
                  window.dispatchEvent(event44);
                } else {
                  if (totalrecords - 1 == indx1) {
                    if (mainrecord - 1 == mindx) {
                      //do something F
                      var event22 = new CustomEvent("evaluationsubmission");
                      window.dispatchEvent(event22);
                    } else {
                      mainarray(mindx);
                    }

                  } else {
                    indx1 = indx1 + 1;
                    looparray1(indx1);
                  }

                }



              } else {
                console.log("totalrecords"+totalrecords);
                if (totalrecords - 1 == indx1) {

                  if (mainrecord - 1 == mindx) {
                    //do something F
                    var event23 = new CustomEvent("evaluationsubmission");
                    window.dispatchEvent(event23);
                  } else {
                    mindx =mindx+1;
                    mainarray(mindx);
                  }

                } else {
                  indx1 = indx1 + 1;
                  looparray1(indx1);
                }
              }


            }
            looparray1(indx1);

          };
          mainarray(mindx);



        }
      });
    });
  }

}
