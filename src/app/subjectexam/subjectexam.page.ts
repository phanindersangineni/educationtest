import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { ExamService } from 'src/services/exam.service';
import { ToastService } from 'src/services/toastr.service';
import { VideoService } from 'src/services/video.service';
import { ConfirmationPage } from '../modals/confirmation/confirmation.page';

import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-subjectexam',
  templateUrl: './subjectexam.page.html',
  styleUrls: ['./subjectexam.page.scss'],
})
export class SubjectexamPage implements OnInit {
  tab: string = "Maths";
  examschedule: any = [];
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
    this.storage.remove('currentduration');
  }
  ionViewDidEnter() {
    this.getschedule();
  }
  
  getschedule() {
    const admindata: any = {
      studentId: this.studentid
    }
    //alert(this.studentid);
    this.examService.post(admindata,'/subjectiveExam/schedules').subscribe(examdata => {
       this.examschedule = examdata;
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

  async openModal(data) {
    this.videoService.setExamHr = data.duration;
    this.videoService.settotalMarks = data.totalMarks;
    this.videoService.setexamName = data.examName;
    this.videoService.setSubjectId = data.subjectId;
    this.videoService.setExamId = data.subExamId;
    console.log(data);
    if (data.completed == 2) {
      this.route.navigate(['./examstart']);
    } else {
      this.storage.ready().then(() => {  
      this.storage.get('currentduration').then((currentduration) => {
        console.log(currentduration);
        if (currentduration == null || currentduration == undefined) {
          this.openNewModal();
        } else {
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
        this.examService.post(examstart,'/subjectiveExam/startExam').subscribe(examdata => {
        console.log(examdata);
        this.storage.ready().then(() => {  
          this.storage.set('duration', this.videoService.getexamHr);
          this.storage.set('currentduration', this.videoService.getexamHr);
          console.log(this.videoService.getexamHr);
          this.storage.set('startime', examdate).then(() => {
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

  gohome(){
    this.route.navigate(['./home']);
  }
}
