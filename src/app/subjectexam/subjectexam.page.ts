import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { ExamService } from 'src/services/exam.service';
import { ToastService } from 'src/services/toastr.service';
import { VideoService } from 'src/services/video.service';
import { ConfirmationPage } from '../modals/confirmation/confirmation.page';


@Component({
  selector: 'app-subjectexam',
  templateUrl: './subjectexam.page.html',
  styleUrls: ['./subjectexam.page.scss'],
})
export class SubjectexamPage implements OnInit {
  tab: string = "Maths";
  examschedule: any = [];
  ispresent = true;
  studentid: any = '';
  constructor(private route: Router, private examService: ExamService,
    private storage: Storage, private videoService: VideoService,
    public modalController: ModalController,
    private toastService: ToastService) {
    this.storage.ready().then(() => {
      this.storage.get('studentid').then((studentid) => {
        // alert("hi")
        this.studentid = studentid;
        //this.getschedule();
      });
    });
  }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.storage.ready().then(() => {
      this.storage.get('answereddata').then((answereddata) => {
        if (answereddata != null) {
          // alert(JSON.stringify(answereddata));
          this.videoService.setStudentata = answereddata;
        }

      });
    });
    this.getschedule();
  }

  getschedule() {
    const admindata: any = {
      studentId: this.studentid
    }
    //alert(this.studentid);
    this.examService.post(admindata, '/subjectiveExam/schedules').subscribe(examdata => {
      this.examschedule = examdata;
      if (this.examschedule.length == 0) {
        this.ispresent = false;
      }
      //let examdate = moment('11-17-2020').format('MM/DD/YYYY') + ' ' + '10:10';
      let ddate = '12-17-2020' + ' ' + '10:10';
      var nowS = new Date();
      var checks = new Date(ddate);
      console.log(nowS);
      console.log(checks);
      if (nowS.getTime() > checks.getTime()) {

        let diff = moment(nowS, 'MM/DD/YYYY HH:mm').diff(moment(checks, 'MM/DD/YYYY HH:mm'));
        let d = moment.duration(diff);
        console.log(d);
        let hr = moment.utc(diff).format("HH");
        console.log(parseInt(hr));
        let minutes = moment.utc(diff).format("mm");
        console.log(minutes);
      }

    }, error => {
      // this.errors = error
      alert(error);
    });

    //let response =this.examService.post1(admindata,'/subjectiveExam/schedules');
    //console.log(response);

    /*this.storage.get('currentduration').then((currentduration) => {
      // alert('he');
      if (currentduration == null) {
        this.examService.getexamschedule(this.studentid).subscribe(examdata => {
          this.examschedule = examdata;
          //alert(JSON.stringify(examdata));
        });
      } else {
        this.examService.getexamschedule1(this.studentid).subscribe(examdata => {
          this.examschedule = examdata;
          // alert(JSON.stringify(examdata));
        });
      }
    });*/
  }



  viewresult(data) {
    this.videoService.setattemptId = data.attemptId;
    this.videoService.setexamName = data.examName;
    this.route.navigate(['./test-result']);
  }

  async openModal(data) {
    // let examdate = data.examDate + ' ' + data.examStartTime;

    let examnewDate = data.examDate.split('-');
    let newexamDate = examnewDate[1] + '-' + examnewDate[0] + '-' + examnewDate[2] + ' ' + data.examStartTime;
    //let newexamDate = '12-17-2020 22:50';
    var nowS = new Date();
    var checks = new Date(newexamDate);
    /*if(moment(nowS).isBefore(moment(checks))) {
     console.log("furute date");
    }*/

    this.videoService.setExamHr = data.duration;
    this.videoService.settotalMarks = data.totalMarks;
    this.videoService.setexamName = data.examName;
    this.videoService.setSubjectId = data.subjectId;
    this.videoService.setExamId = data.subExamId;
     if (data.completed == 1) {
      if (this.videoService.getStudentdata == undefined) {
        let diff = moment(nowS, 'MM/DD/YYYY HH:mm').diff(moment(checks, 'MM/DD/YYYY HH:mm'));
        let d = moment.duration(diff);
        let hr = moment.utc(diff).format("HH");
        let minutes = moment.utc(diff).format("mm");
        if (parseInt(hr) == 0) {
          let newcurrentduration = parseInt(data.duration) - parseInt(minutes);
          this.storage.set('currentduration', newcurrentduration);
          this.route.navigate(['./examstart']);
        } else {
          let hrtomin = parseInt(hr) * 60;

          if (hrtomin > data.duration) {
            this.toastService.showToast('Your scheduled exam time has expired');
          } else {
            let sumofmins = hrtomin + parseInt(minutes);
            let newcurrentduration = parseInt(data.duration) - sumofmins;
            this.storage.set('currentduration', newcurrentduration);
            this.route.navigate(['./examstart']);
          }

        }


      } else {
        this.route.navigate(['./examstart']);
      }
    } else {
      this.storage.ready().then(() => {
        this.storage.get('currentduration').then((currentduration) => {
          let studentanswerdata = this.videoService.getStudentdata;

          //alert(currentduration);
          if (currentduration == null || currentduration == undefined) {
             if (nowS.getTime() < checks.getTime()) { 
              this.toastService.showToast('You cannot start the exam before the start time');
            } else {
              let diff = moment(nowS, 'MM/DD/YYYY HH:mm').diff(moment(checks, 'MM/DD/YYYY HH:mm'));
              let d = moment.duration(diff);
              let hr = moment.utc(diff).format("HH");
              let minutes = moment.utc(diff).format("mm");
              console.log(hr);
              if (parseInt(hr) > 0) {
                this.toastService.showToast('You scheduled  exam  time has expired');
              } else {
                if (parseInt(minutes) < 5) {
                  this.openNewModal();
                }
                if (parseInt(minutes) > 5) {
                  this.toastService.showToast('You scheduled  exam  time has expired');
                }
              }

            }
          } else if (currentduration == 0 && studentanswerdata != undefined) {
            this.route.navigate(['./examstart']);
          } else if (currentduration == 0 && studentanswerdata == undefined) {
            if (nowS.getTime() < checks.getTime()) {
              this.toastService.showToast('You cannot start the exam before the start time');
            } else {
              let diff = moment(nowS, 'MM/DD/YYYY HH:mm').diff(moment(checks, 'MM/DD/YYYY HH:mm'));
              let d = moment.duration(diff);
              let hr = moment.utc(diff).format("HH");
              let minutes = moment.utc(diff).format("mm");
              if (parseInt(hr) > 0) {
                this.toastService.showToast('You scheduled  exam  time has expired');
              } else {
                if (parseInt(minutes) < 5) {
                  this.openNewModal();
                }
                if (parseInt(minutes) > 5) {
                  this.toastService.showToast('You scheduled  exam  time has expired');
                }
              }

            }
          }
          else {
            this.toastService.showToast('There is already an exam in progress , Please complete the exam before starting a new exam');
            //  this.route.navigate(['./examstart']);
          }

        });
      });
    }




  }

  async openNewModal() {
    const modal = await this.modalController.create({
      component: ConfirmationPage,

    });

    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
      if (dataReturned.data == 'start') {
        let date = new Date();
        let examdate = moment(date).format('DD-MM-YYYY hh:mm:ss');
        console.log(examdate);
        const examstart: any = {
          startedTime: examdate,
          studentId: this.studentid,
          examId: this.videoService.getExamId
        }
        this.examService.post(examstart, '/subjectiveExam/startExam').subscribe(examdata => {
          console.log(examdata);
          this.storage.ready().then(() => {
            this.storage.set('duration', this.videoService.getexamHr);
            this.storage.set('currentduration', this.videoService.getexamHr);
            console.log(this.videoService.getexamHr);
            this.storage.set('startime', examdate).then(() => {
              this.videoService.setSubmissionStarted = 'N';
              this.route.navigate(['./examstart']);
            })
          });

        });

        /*this.storage.ready().then(() => {  
          this.storage.set('duration', this.videoService.getexamHr);
          this.storage.set('currentduration', this.videoService.getexamHr);
          console.log(this.videoService.getexamHr);
          this.storage.set('startime', examdate).then(() => {
            this.route.navigate(['./examstart']);
          })
        });*/


      }

    });
    return await modal.present();
  }

  gohome() {
    this.route.navigate(['./home']);
  }
}
