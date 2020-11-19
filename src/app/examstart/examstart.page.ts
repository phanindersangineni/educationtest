import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { ExamService } from 'src/services/exam.service';
import { VideoService } from 'src/services/video.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ToastService } from 'src/services/toastr.service';
import { AutosubmitEventService } from 'src/services/autosubmitevent.service';
import { CountdownEventService } from 'src/services/countdownevent.service';
import { LoaderService } from 'src/services/LoaderService';
import { NetworkService } from 'src/services/network.service';
@Component({
  selector: 'app-examstart',
  templateUrl: './examstart.page.html',
  styleUrls: ['./examstart.page.scss'],
})
export class ExamstartPage implements OnInit {
  tab: string = "upcoming_test";
  todaysexam: any = {};
  canstartexam = false;
  candownload = false;
  questext: any;
  examquestions: any = [];
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
  constructor(private route: Router,
    private storage: Storage,
    public alertController: AlertController,
    private examService: ExamService,
    private videoService: VideoService,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private toastService: ToastService,
    public autosubmitevent: AutosubmitEventService,
    public countdownEventService: CountdownEventService,
    public loaderService: LoaderService,
    public networkService:NetworkService
  ) {

    this.autosubmitevent.getObservable().subscribe((data) => {
      this.finalSubmit(2);
    });

    this.examname = this.videoService.getexamName;
    this.storage.ready().then(() => {
      this.storage.get('startime').then((startime) => {
        this.starttime = startime;
      });

      this.storage.get('studentid').then((studentid) => {
        // alert("hi")
        this.studentid = studentid;

      });


      this.storage.get('studentanswerdata').then((studentanswerdata) => {

        if (studentanswerdata == null || studentanswerdata == undefined) {
          this.studentanswerdata.examId = this.videoService.getExamId;
          this.studentanswerdata.studentId = '';

        } else {
          this.studentanswerdata = studentanswerdata;
        }

        console.log(JSON.stringify(this.studentanswerdata));

      });

      this.storage.get('duration').then((duration) => {
        this.duration = duration;

      })

      this.storage.get('currentduration').then((currentduration) => {
        this.currentduration = currentduration;
        console.log(this.currentduration);
        this.startcountdown();
      })
    });
  }

  ngOnInit() {

    this.getexamquestions();
    //clearInterval(this.interval);
    // document.getElementById("question").innerHTML = "hhi";
  }
  private maxTime = 10;
  startcountdown() {
    //var a = parseInt(this.currentduration);
    var a = 0;
    var b = parseInt(this.currentduration);
    let interval = setInterval(() => {
      console.log(a++);
      console.log(b);
      if (a == b) {
        clearInterval(interval);
        this.confirmforautosubmit();
      }
      this.currentduration = parseInt(this.currentduration) - 1;
      this.countdownEventService.publishCountdown(this.currentduration);
      this.storage.ready().then(() => {
        this.storage.set('currentduration', this.currentduration);
      });

    }, 10000);


  }
  async confirmforautosubmit() {
    if (!this.submissionstarted) {
      const alert = await this.alertController.create({
        cssClass: 'syllabus',
        header: 'Exam Submission !!',
        message: 'Your alloted time for exam has expired,Your exam will be auto submitted',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Confirm Okay');
              this.autoSubmit(3);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  getexamquestions() {
    this.examService.getexamquestions('').subscribe(examdata => {
      this.examquestions = examdata;
    });


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
            questionanswers: answersht,
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
    this.route.navigate(['./uploads']);
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
      questionanswers: answersht,
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
          this.route.navigate(['./uploads']);
        });
      });
    });

  }

  async autoSubmit(status) {
     
    this.storage.ready().then(() => {
      this.storage.get('studentanswerdata').then((studentanswerdata) => {
        console.log(studentanswerdata);
        let finalanswers = [];
        if (studentanswerdata != null) {
          finalanswers = studentanswerdata.subjects;
        }

        let date = new Date();
        let enddate = moment(date).format('DD-MM-YYYY hh:mm:ss');


        const finalsubmit: any = {
          studentId: this.studentid,
          subjects: finalanswers,
          startedTime: this.starttime,
          endedTime: enddate,
          submitted: status,
          examId: this.videoService.getExamId
        }

        console.log(JSON.stringify(finalsubmit));
        this.loaderService.showLoader();
        this.examService.post(finalsubmit, '/subjectiveExam/saveExam').subscribe(result => {
          console.log(result);
          this.currentduration = 0;
          this.loaderService.hideLoader();
          this.toastService.showToast('Your exam details has been captured and it is under evaluation');
          this.storage.remove('studentanswerdata').then(() => {
            this.storage.remove('currentduration').then(() => {
              this.storage.remove('startime').then(() => {
                this.route.navigate(['./subjectexam']);
              });
            });

          });

        });
      });

    });

  }

  async finalSubmit(status) {
    const alert = await this.alertController.create({
      cssClass: 'syllabus',
      header: 'Final Confirmation !!',
      message: 'You are about to submit your answers,Exam once submitted cannot be changed',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'CONFIRM',
          handler: () => {
            console.log('Confirm Okay');
            this.toastService.showToast(this.networkService.getCurrentNetworkStatus());
            this.storage.ready().then(() => {
              this.storage.get('studentanswerdata').then((studentanswerdata) => {
                console.log(studentanswerdata);
                let finalanswers = [];
                if (studentanswerdata != null) {
                  finalanswers = studentanswerdata.subjects;
                }
                let date = new Date();
                let enddate = moment(date).format('DD-MM-YYYY hh:mm:ss');
                this.currentduration = 0;

                const finalsubmit: any = {
                  studentId: this.studentid,
                  subjects: finalanswers,
                  startedTime: this.starttime,
                  endedTime: enddate,
                  submitted: 2,
                  examId: this.videoService.getExamId
                }
                this.submissionstarted = true;
                console.log(JSON.stringify(finalsubmit));
                this.loaderService.showLoader();
                this.examService.post(finalsubmit, '/subjectiveExam/saveExam').subscribe(result => {
                  this.loaderService.hideLoader();
                  this.toastService.showToast('Your exam details has been captured and it is under evaluation');
                  this.storage.ready().then(() => {
                    this.currentduration = 0;
                    this.storage.remove('studentanswerdata');
                    this.storage.remove('studentanswerdata').then(() => {
                      this.storage.remove('currentduration').then(() => {
                        this.storage.remove('startime').then(() => {
                          this.route.navigate(['./subjectexam']);
                        });
                      });

                    });
                  });

                });




              });

            });
          }
        }
      ]
    });

    await alert.present();

  }

  getPhoto(subExamSecId, ques) {

    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      let quesanswer = [];
      for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          console.log(base64File);
          let answersht = [];
          answersht.push(base64File);
          let resdata = {
            questionid: ques.questionId,
            subExamQnId: ques.subExamQnId,
            answersheet: answersht
          }
          const seciddata = {
            subExamSecId: subExamSecId,
            sectionAnswers: resdata
          };
          let uploadedarray = [];
          uploadedarray.push(seciddata);

          const subjectid = {
            subjectId: this.videoService.getSubjectId,
            subjectAnswer: uploadedarray
          }

          this.studentanswerdata.subjects.push(subjectid);


          console.log(this.studentanswerdata);
          this.storage.set('quesobj', ques).then(() => {

            this.storage.set('studentanswerdata', this.studentanswerdata).then(() => {
              //this.route.navigate(['./uploads']);
            });
          });

        }, (err) => {
          alert(err);
        });

      }
    }, (err) => {
      alert(err);
    });
    /*let base64 = 'data:image/gif;base64,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';

    let answersht = [];
    answersht.push(base64);
    let resdata = {
      questionid: ques.questionId,
      subExamQnId: ques.subExamQnId,
      answersheet: answersht
    }

    const seciddata = {
      subExamSecId: subExamSecId,
      sectionAnswers: resdata
    };
    let uploadedarray = [];
    uploadedarray.push(seciddata);

    const subjectid = {
      subjectId: this.videoService.getSubjectId,
      subjectAnswer: uploadedarray
    }

    this.studentanswerdata.subjects.push(subjectid);


    console.log(this.studentanswerdata);
    this.storage.set('studentanswerdata', this.studentanswerdata).then(() => {
      this.route.navigate(['./uploads']);
    });*/


  }

}
