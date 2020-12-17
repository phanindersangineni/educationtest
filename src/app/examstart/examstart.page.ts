import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
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
import { Subscription } from 'rxjs';
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
  /* examId: '',
   studentId: '',
   subjects: [],
   startedTime: '',
   endedTime: '',
   submitted: 0,*/


  studentanswerdata: any = {
    subjects: []
  };
  starttime: any;
  newexamques: any = {};
  newques: any = {};
  studentid: any = 0;
  submissionstarted: any = false;
  subscription: Subscription;
  studentlooparray: any = [];
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
    public networkService: NetworkService,
    private platform: Platform,
    private navctl: NavController
  ) {



    this.examname = this.videoService.getexamName;
    this.storage.ready().then(() => {
      this.storage.get('startime').then((startime) => {
        this.starttime = startime;
      });

      this.storage.get('studentid').then((studentid) => {
        // alert("hi")
        this.studentid = studentid;

      });


      /* this.storage.get('studentanswerdata').then((studentanswerdata) => {
 
         if (studentanswerdata == null || studentanswerdata == undefined) {
           this.studentanswerdata.examId = this.videoService.getExamId;
           this.studentanswerdata.studentId = '';
 
         } else {
           this.studentanswerdata = studentanswerdata;
         }
         console.log(this.studentanswerdata);
       });*/

      if (this.videoService.getStudentdata != undefined) {
      
        this.studentanswerdata = this.videoService.getStudentdata;

      }

      this.storage.get('duration').then((duration) => {
        this.duration = duration;

      })

      this.storage.get('currentduration').then((currentduration) => {
        console.log(this.videoService.getexamHr);
        console.log(currentduration);
        if (currentduration == null || currentduration == undefined) {
          this.currentduration = this.videoService.getexamHr;
          this.storage.set('currentduration', this.videoService.getexamHr);
        } else {
          this.currentduration = currentduration;
        }
        //alert(currentduration);
        if (parseInt(this.currentduration) != 0) {

          this.startcountdown();
        }
      })
      //alert("123123");
    });
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });

   
   
    if (this.videoService.getStudentdata != undefined) {
      this.studentanswerdata = this.videoService.getStudentdata;
      //this.getexamquestions();

    }
  }

  ionViewWillLeave() {
    this.storage.set('answereddata',this.videoService.getStudentdata);
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    /*if (this.videoService.getStudentdata != undefined) {
      
      this.studentanswerdata = this.videoService.getStudentdata;

    }
    // alert("hi");*/
    this.getexamquestions();
    
  }
  private maxTime = 10;
  startcountdown() {
    //var a = parseInt(this.currentduration);

    var a = 0;
    var b = parseInt(this.currentduration);
    this.interval = setInterval(() => {
      console.log(a++);
      console.log(b);
      if (a == b) {
       
        this.currentduration = 0;
        this.storage.ready().then(() => {
          this.storage.set('currentduration', this.currentduration);
        });
        clearInterval(this.interval);
        this.confirmforautosubmit();


      } else {
        this.currentduration = parseInt(this.currentduration) - 1;
        this.countdownEventService.publishCountdown(this.currentduration);
        this.storage.ready().then(() => {
          this.storage.set('currentduration', this.currentduration);
        });
      }

    }, 60000);


  }
  async confirmforautosubmit() {
   /* if (this.videoService.getStudentdata !=undefined) {*/
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
        ],
        backdropDismiss: false
      });

      await alert.present();
    /*}*/
  }

  getexamquestions() {
    /*this.examService.getexamquestions('').subscribe(examdata => {
      this.examquestions = examdata;
    });*/
    const examdata: any = {
      subExamId: this.videoService.getExamId
    }
    this.examService.post(examdata, '/subjectiveExam/questions').subscribe(examdata => {
      this.examquestions = examdata;
   });

  }

  


  gotouploads(examques, ques) {
    console.log(ques);

    this.newexamques = examques;
    this.newques = ques;
    this.videoService.setsubExamSecId = examques.subExamSecId;

    this.videoService.setsubsecquesid = this.newques.questionId;
    // console.log(this.studentanswerdata );
    if (this.videoService.getStudentdata == undefined) {
      let answersht = [];
      const seciddata = {
        questionId:this.newques.questionId,
        tempId:this.newques.questionId,
        subExamSecId: this.newexamques.subExamSecId,
         subExamQnId: this.newques.subExamQnId,
        questionanswers: answersht,
        subjectId: this.videoService.getSubjectId,
        
        

      };
      //let uploadedarray = [];
      //uploadedarray.push(seciddata);



      this.studentanswerdata.subjects.push(seciddata);

      this.storage.set('quesobj', ques).then(() => {
        console.log("FORARWARD START");
        console.log(this.studentanswerdata);
        this.videoService.setStudentata = this.studentanswerdata;

       /* let navigationExtras: NavigationExtras = {
          queryParams: {
            special: JSON.stringify(this.studentanswerdata)
          }
        };*/

        this.route.navigate(['./uploads']);
      });

    } else {
      this.studentanswerdata = this.videoService.getStudentdata;
      let questionsubjects = this.studentanswerdata.subjects;
      let result = questionsubjects.find(x => x.questionId == this.newques.questionId);
      console.log(questionsubjects);
      console.log(result);
      if (result == undefined) {
        const seciddata1 = {
          questionId:this.newques.questionId,
          subExamSecId: this.newexamques.subExamSecId,
          subExamQnId: this.newques.subExamQnId,
          questionanswers: [],
          subjectId: this.videoService.getSubjectId,
          

        };
        questionsubjects.push(seciddata1);
        console.log(questionsubjects);
        this.studentanswerdata.subjects = questionsubjects;
        this.videoService.setStudentata = this.studentanswerdata;
        /*let navigationExtras: NavigationExtras = {
          queryParams: {
            special: JSON.stringify(this.studentanswerdata)
          }
        };*/
        this.route.navigate(['./uploads']);

      } else {
        /*let navigationExtras: NavigationExtras = {
          queryParams: {
            special: JSON.stringify(this.videoService.getStudentdata)
          }
        };*/
        this.route.navigate(['./uploads']);
      }

   
    }



  }


  @HostListener("window:forwardupload")
  forwardnew() {
    console.log("forwnarnew");
    this.route.navigate(['./uploads']);
  }

  /*@HostListener("window:newsectionupload1")
  newsectionupload() {
    console.log("newsectionupload");
    console.log(this.newques);
    this.videoService.setsubExamSecId = this.newexamques.subExamSecId;
    let answersht = [];

    let subjects = [];
    console.log(this.studentanswerdata);
    subjects = this.studentanswerdata.subjects;
    console.log(subjects);
    const seciddata: any = {
      subExamSecId: this.newexamques.subExamSecId,
      questionid: this.newques.questionId,
      subExamQnId: this.newques.subExamQnId,
      questionanswers: answersht,
      subjectId: this.videoService.getSubjectId,

    };
    console.log(subjects);
    subjects.push(seciddata);
    let subjectsarray = [];
    var counter = 0;
    console.log(subjects);
    let finaldata1: any = {
      examId: '',
      studentId: '',
      startedTime: '',
      endedTime: '',
      subjects: subjects

    }
    console.log(finaldata1);
    this.videoService.setStudentata = finaldata1;
    this.storage.ready().then(() => {
      this.storage.set('quesobj', this.newques).then(() => {
        this.route.navigate(['./uploads']);


      });
    });
    /*subjects1.forEach(element => {
      console.log(element.questionid);
       const seciddata1 :any = {
        subExamSecId: element.subExamSecId,
        questionid: element.questionid,
        subExamQnId: element.subExamQnId,
        questionanswers: element.questionanswers,
        subjectId: element.subjectId,

      };
      console.log(seciddata1);
       subjectsarray.push(seciddata1);
      console.log(subjectsarray);

      if (counter == subjects1.length - 1) {

        let finaldata1: any = {
          examId: '',
          studentId: '',
          startedTime: '',
          endedTime: '',
          subjects1: subjectsarray

        }
        console.log(finaldata1);
        this.videoService.setStudentata = finaldata1;
        this.storage.ready().then(() => {
          this.storage.set('quesobj', this.newques).then(() => {
            this.route.navigate(['./uploads']);


          });
        });


      }

      counter++;
    });
    //subjectsarray.push();
*/




    /* var  mainindx =0;
     let subjects1 = [];
     subjects1 = this.studentanswerdata.subjects;
    
     const seciddata = {
      subExamSecId: this.newexamques.subExamSecId,
      questionid: this.newques.questionId,
      subExamQnId: this.newques.subExamQnId,
      questionanswers: answersht,
      subjectId: this.videoService.getSubjectId,

    };

    subjects1.push(seciddata);

    
    let finaldata: any = {
      examId: '',
      studentId: '',
      startedTime: '',
      endedTime: '',
      subjects:subjects1,
      subjects1:subjects1

    }
   console.log(finaldata);
   this.storage.ready().then(() => {
    this.storage.remove('studentanswerdata').then(() => {
    this.storage.set('quesobj', this.newques).then(() => {
      this.storage.set('studentanswerdata', finaldata).then(() => {
        this.storage.get('studentanswerdata').then((studentanswerdata) => {
          console.log(studentanswerdata);
        this.route.navigate(['./uploads']);

      });
      });
    });
  });
  });


  }*/

  async autoSubmit(status) {

    this.storage.ready().then(() => {
      let studentanswerdata =this.videoService.getStudentdata;
        console.log(studentanswerdata);
        let finalanswers = [];
        if (studentanswerdata != undefined) {
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
        this.currentduration = 0;
        clearInterval(this.interval);
        this.examService.post(finalsubmit, '/subjectiveExam/saveExam').subscribe(result => {
          console.log(result);
          this.loaderService.hideLoader();
          this.toastService.showToast('Your exam details has been captured and it is under evaluation');
          this.storage.remove('studentanswerdata').then(() => {
            this.storage.remove('currentduration').then(() => {
              this.storage.remove('startime').then(() => {
                this.currentduration = 0;
                this.videoService.setStudentata =undefined;
                this.storage.set('answereddata',this.videoService.getStudentdata);
                this.route.navigate(['./subjectexam']);
              });
            });

          });

        }, error => {
          // this.errors = error
          this.toastService.showToast('Error while saving your answer please try after sometime');
          this.loaderService.hideLoader();
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
            console.log(this.videoService.getStudentdata);
            let studentanswerdata =this.videoService.getStudentdata;
             this.storage.ready().then(() => {
              
                 console.log(studentanswerdata);
                 let finalanswers = [];
                 if (studentanswerdata != undefined) {
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
                 this.currentduration = 0;
                 clearInterval(this.interval);
                 this.examService.post(finalsubmit, '/subjectiveExam/saveExam').subscribe(result => {
                   this.toastService.showToast(JSON.stringify(result));
                   this.loaderService.hideLoader();
 
                   if (result.status == 'Success') {
                     this.toastService.showToast('Your exam details has been captured and it is under evaluation');
                     this.storage.ready().then(() => {
                      
                         this.storage.remove('currentduration').then(() => {
                           this.storage.remove('startime').then(() => {
                             this.currentduration = 0;
                             clearInterval(this.interval);
                             this.videoService.setStudentata =undefined;
                             this.storage.set('answereddata',this.videoService.getStudentdata);
                             this.route.navigate(['./subjectexam']);
                           });
                         });
 
                     
                     });
                   } else {
                     this.toastService.showToast('Error while saving your answer please try after sometime');
                   }
 
                 }, error => {
                   // this.errors = error
                   this.toastService.showToast('Error while saving your answer please try after sometime');
                   this.loaderService.hideLoader();
                 });
 
 
 
             });
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();

  }


}
