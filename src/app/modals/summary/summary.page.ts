import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/services/exam.service';
import { Storage } from '@ionic/storage';
import { VideoService } from 'src/services/video.service';
import { ToastService } from 'src/services/toastr.service';
import { LoaderService } from 'src/services/LoaderService';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
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
  newscorearray =[];
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
  totalmarks: any = 0;
  allotedmarks: any = 0;
  constructor(private route: Router,
    private examService: ExamService,
    private storage: Storage,
    private videoService: VideoService,
    private toastrService: ToastService,
    private loaderService: LoaderService,
    private modalController: ModalController) {
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

        this.studentanswerdata.admNo = this.admNo;
        this.studentanswerdata.examName = this.examName;

      });



    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.storage.get('studentanswerdata').then((studentanswerdata) => {
      if (studentanswerdata != null) {
        this.studentlooparray = studentanswerdata.subjects;
        console.log(this.studentlooparray);
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
       this.createnewjson();

    }, error => {
      // this.errors = error
      alert(error);
    });
  }
  examlist(data) {
    this.storage.set('studentdata', data);
    this.route.navigate(['./examlist']);
  }

  @HostListener("window:finalsummaryscore",['$event', '$event.detail.param2'])
  finalSummaryscore(event,param2) {
   this.allotedmarks =param2;
  }
 
  @HostListener("window:summaryscore",['$event', '$event.detail.param1'])
  summaryScore(event,param1) {
    let finalarray = param1;
    let finalindx =0;
    let marksobtained =0;
    let finallooparray =function(finalindx)
    {
      let finalrecords =finalarray[finalindx];
      let qnsToBeAttempt =3
      //finalrecords.qnsToBeAttempt;
      let marks =[];
       marks =finalrecords.subarray.sort(function(a, b){return b-a});
    for(var x = 0 ; x < qnsToBeAttempt ;x ++) {
         if(marks[x] !=undefined) {
          marksobtained =marksobtained+marks[x];
         }

         if(x == qnsToBeAttempt -1){
          
          if(finalindx ==finalarray.length-1){
            var event = new CustomEvent("finalsummaryscore",
            { detail: {'param2':marksobtained  } });
            window.dispatchEvent(event);
 
       
          }else{
            finalindx =finalindx+1;
            finallooparray(finalindx); 
          }

         }
       }

    }
    finallooparray(finalindx);
  }

  createnewjson() {

    this.examquestions.forEach(element => {
      if (this.totalmarks == 0) {
        this.totalmarks = parseInt(element.maxMarks);
      } else {
        this.totalmarks = parseInt(this.totalmarks) + parseInt(element.maxMarks);
      }

    });

    var mainindx = 0;
    var mainrecords = this.examquestions;
    let answerarray = this.studentlooparray;
    let newscorearray =[];
    let subarray =[];
    

    var looparray = function (mainindx) {
      let records = mainrecords[mainindx];

      let sectionid = records.subExamSecId;


      var childindx = 0;

      var childarray = function (childindx) {
        let childrecords = answerarray[childindx];
        if (childrecords.subExamSecId == sectionid) {
        subarray.push(childrecords.marks);

        if (answerarray.length-1 == childindx) {

          if (mainrecords.length - 1 == mainindx) {
           const secdata:any ={
            sectionid:sectionid,
            qnsToBeAttempt:records.qnsToBeAttempt,
            subarray:subarray
           }

           newscorearray.push(secdata);
           var event = new CustomEvent("summaryscore",
           { detail: {'param1':newscorearray  } });
           window.dispatchEvent(event);

           //console.log(newscorearray);

          } else {
            mainindx = mainindx + 1;
            looparray(mainindx);
          }

        } else {
          childindx = childindx + 1;
          childarray(childindx);
        }

        
        } else {

          if (answerarray.length - 1 == childindx) {

            if (mainrecords.length - 1 == mainindx) {


            } else {
              mainindx = mainindx + 1;
              looparray(mainindx);
            }

          } else {
            childindx = childindx + 1;
            childarray(childindx);
          }

        }



      }
      childarray(childindx);


    };
    looparray(mainindx);
  }

  async closeModal(message) {
    const onClosedData: string = message;
    await this.modalController.dismiss(onClosedData);
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
          empId: this.studentid
        }

        this.loaderService.showLoader();
        this.examService.post(finalsubmisiondata, '/evaluation/saveEvaluation').subscribe(result => {
         // console.log(result);

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
                if (totalrecords - 1 == indx1) {

                  if (mainrecord - 1 == mindx) {
                    //do something F
                    var event23 = new CustomEvent("evaluationsubmission");
                    window.dispatchEvent(event23);
                  } else {
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
