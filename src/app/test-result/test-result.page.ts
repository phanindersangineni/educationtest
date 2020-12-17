import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ExamService } from 'src/services/exam.service';
import { VideoService } from 'src/services/video.service';
@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.page.html',
  styleUrls: ['./test-result.page.scss'],
})
export class TestResultPage implements OnInit {

  attemptId :any =null;
  summarydata:any ={
    status:'',
    totalMarks:'',
    marksObtain:'',
    answered:''
  };
  examName:any =null;
  constructor(
	private route: Router,
    private navCtrl: NavController,
    private examService: ExamService,
    private videoService: VideoService

	) {
    this.attemptId =this.videoService.getattemptId;
    this.examName = this.videoService.getexamName;

   }

  ngOnInit() {
    this.getsummary();
  }

  ionViewDidEnter(){
    this.attemptId =this.videoService.getattemptId;
    this.examName = this.videoService.getexamName;

    this.getsummary();
  }

  getsummary() {

    const admindata: any = {
      subExamAttemptId: this.attemptId
    }
    //alert(this.studentid);
    this.examService.post(admindata, '/subjectiveExam/examSummary').subscribe(examdata => {
      this.summarydata =examdata;
     
    }, error => {
      // this.errors = error
      alert(error);
    });

  }
	
	
 goTohome() {
    this.route.navigate(['./subjectexam']);
  } 
 goToLeaderboard() {
  
    this.route.navigate(['./leaderboard']);
  }

  viewresult() {
   
    this.route.navigate(['./viewresult']);
  }

}
