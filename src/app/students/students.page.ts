import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/services/exam.service';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/services/toastr.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  tab: string = "Maths";
  studentid: any = '';
  subjects: any = [];
  ispresent: boolean = true;
  studentdata: any;
  admNo = null;
  constructor(private route: Router,
    private examService: ExamService,
    private storage: Storage,
    private toastr: ToastService) {
    this.storage.ready().then(() => {
      this.storage.get('studentid').then((studentid) => {
        // alert("hi")
        this.studentid = studentid;
        this.getsubjectvideos();
      });

      this.storage.get('studentdata').then((studentdata) => {
        this.storage.get('studentanswerdata').then((studentanswerdata) => {
        if (studentdata != null && studentanswerdata!=null) {
          this.admNo = studentdata.admNo;
        }
      });
      });
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.storage.get('studentdata').then((studentdata) => {
      this.storage.get('studentanswerdata').then((studentanswerdata) => {
      if (studentdata != null && studentanswerdata!=null) {
        this.admNo = studentdata.admNo;
        this.getsubjectvideos();
      }
    });
    });
  }


  syllabus_topics() {
    this.route.navigate(['./syllabus-topics']);
  }

  getsubjectvideos() {
    const admindata: any = {
      employeeId: this.studentid
    }
    //alert(this.studentid);
    this.examService.post(admindata, '/evaluation/students').subscribe(examdata => {
      this.subjects = examdata;
      if (this.subjects.length == 0) {
        this.ispresent = false;
      }
    }, error => {
      // this.errors = error
      alert(error);
    });
  }
  examlist(data) {
    if (this.admNo == null) {
      this.storage.set('studentdata', data);
      this.route.navigate(['./examlist']);
    } else if (this.admNo != null && this.admNo != data.admNo) {
      this.toastr.showToast('Please finish the ongoing student evaluation before the starting of new evaluation');
    } else if (this.admNo != null && this.admNo == data.admNo) {
      this.route.navigate(['./examanswers']);
    }
  }
}
