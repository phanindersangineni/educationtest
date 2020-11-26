import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { ExamService } from 'src/services/exam.service';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/services/toastr.service';
import { LoaderService } from 'src/services/LoaderService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  @ViewChild('mySlides', { read: IonSlides, static: false }) slides: IonSlides;
  question: any;
  questioncounter = 0;
  btnvar = "btn";
  classvar = "d-flex previous_btn";

  topics: any = [];
  exam: any = {
    duration: 0,
    totalquestions: 0
  };
  timer: any;
  questionchoices: any = [];
  questionselected = 0;
  allquestions: any = [];
  defaulttopic = '';
  noquestions = true;
  examcountdown: any = 0;
  studentId: any = '';
  examschedule_id: any = 0;
  subjectid: any = 0;
  deftotal: any = 0;
  showcounter: any = 0;
  newselectionarray: any = [];
  issubmission=false;

  constructor(private examService: ExamService,
    private storage: Storage,
    private toastr: ToastService,
    private alertController: AlertController,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private route: Router) {

    this.storage.ready().then(() => {
      this.storage.get('questioncounter').then((questioncounter) => {
        if (questioncounter == null) {
          this.questioncounter = 0;
        }

        this.storage.get('examdata').then((examdata) => {
          this.exam = examdata;
          this.topics = this.exam.topics;
          this.defaulttopic = this.exam.default;
          this.deftotal = this.exam.deftotal;
          this.showcounter = this.exam.startfrom;
          console.log(this.exam);
          this.loadquestions();
        });
      });

      this.storage.get('studentid').then((studentid) => {
        //console.log(questions);
        this.studentId = studentid;
      });
    });

  }


  ngOnInit() {
    document.body.style.setProperty('--my-var', 'option rigt_answers');
  }

  changetopics(top) {
    this.defaulttopic = top.name;
    this.deftotal = top.total;
    this.showcounter = top.startfrom;
    this.questioncounter = 0;

    this.loadquestions();
  }
  loadquestions() {
    this.storage.ready().then(() => {

      this.storage.get('newquestions').then((newquestions) => {

        if (newquestions == null) {
          this.getquestions();
        } else {
          let shownewquestions = true;
          newquestions.forEach(element => {

            if (element.subjectname == this.defaulttopic) {
              shownewquestions = false;
              this.loadcurrentquestions(element);

            }

          });

          if (shownewquestions) {
            this.getquestions();
          }

        }

      });

    });

  }

  loadcurrentquestions(element) {
    this.allquestions = element.questions;
    this.question = element.questions[this.questioncounter];
    document.getElementById("append").innerHTML = this.question.questiontext;
    this.questionchoices = this.question.questionchoices;

  }

  getquestions() {
    this.storage.ready().then(() => {
      this.storage.get('questiondata').then((questiondata) => {

        // let questionnames =examdata.names.split('|');
        // console.log(questionnames[0]);
        this.examschedule_id = questiondata.examschedule_id;
        this.subjectid = questiondata.subject;
        questiondata.subjects.forEach(element => {

          if (element.subjectname == this.defaulttopic) {

            // console.log(examdata.subjects[questionnames[0]]);


            this.allquestions = element.questions;
            console.log(element.questions);
            const newquestiondata: any = {
              subjectname: this.defaulttopic,
              questions: this.allquestions,
              subjectId: this.subjectid
            }
            this.newselectionarray.push(newquestiondata);

            this.question = element.questions[this.questioncounter];

            this.storage.set('newquestions', this.newselectionarray);
            document.getElementById("append").innerHTML = this.question.questiontext;
            this.questionchoices = this.question.questionchoices;
            /*let counter = 1;
            questionchoices.forEach(element => {
              console.log(element.choicetext);
              document.getElementById("choice" + counter).innerHTML = element.choicetext;
              //this.classvar="option rigt_answers";
              counter++;
            });*/
          }
        });


        this.storage.get('examcountdown').then((examcountdown) => {
          if (examcountdown == null) {
            this.examcountdown = this.exam.duration;
          } else {
            this.examcountdown = examcountdown;
          }
          this.startcountdown();
        })


      });
    });
  }

  async confirmforautosubmit() {
    if(!this.issubmission) {
    const alert = await this.alertController.create({
      cssClass: 'syllabus',
      header: 'Auto Submit Alert !!',
      message: 'Your time has expired ,Your exam will be auto submitted',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.submitexam();

          }
        }
      ]
    });
  }

  }

  startcountdown() {
    //var a = parseInt(this.currentduration);
    var a = 0;
    var b = parseInt(this.examcountdown);
    let interval = setInterval(() => {
      //console.log(a++);
      //  console.log(this.currentduration);
      if (a == b) {
        clearInterval(interval);
        this.confirmforautosubmit();
      }
      this.examcountdown = parseInt(this.examcountdown) - 1;
      this.storage.set('examcountdown', this.examcountdown);



    }, 60000);


  }

  submitexam() {
    this.storage.ready().then(() => {
      this.issubmission =true;
      this.storage.get('newquestions').then((newquestions) => {
        const savedata: any = {
          examscheduleId: this.examschedule_id,
          studentId: this.studentId,
          questionAnswer: newquestions

        }

        this.loaderService.showLoader();
        this.examService.post(savedata, '/objectiveExam/saveExam').subscribe(result => {
          console.log(result);

          this.loaderService.hideLoader();
          this.toastService.showToast('Your exam  details has bee captured and it is under evaluation');
          this.storage.remove('examcountdown').then(() => {
            this.storage.remove('newquestions').then(() => {

              this.storage.remove('questioncounter').then(() => {
                this.storage.remove('questiondata').then(() => {

                  this.route.navigate(['./home']);
                });
              });
            });

          });

        });

      });
    });
  }

  getquestionIndex(index, event) {
    console.log(event.target.checked);
    let enteredanswer = [];
    let studentanswerarray = [];
    let newanswers = [];
    let answerselected = false;
    //this.storage.remove('questions');
    if (event.target.checked == false) {
      answerselected = true;
      enteredanswer.push(index);
    } else {
      enteredanswer.forEach(element => {

        if (index != element) {
          newanswers.push(element);
        }
      });
      enteredanswer = newanswers;
    }
    let counter = 0;
    console.log(this.allquestions);
    this.allquestions.forEach(element => {
      if (counter == this.questioncounter) {
        let qeschoices = [];
        qeschoices = this.question.questionchoices;
        let newchoice: any = [];
        qeschoices.forEach(choiceelement => {
          if (index == choiceelement.choiceid && answerselected) {
            choiceelement.isselected = true;
          } else {
            choiceelement.isselected = false;
          }


          newchoice.push(choiceelement);
          element.questionchoices = newchoice;
          element.selectedanswer = enteredanswer;


        });
        studentanswerarray.push(element);
      } else {

        studentanswerarray.push(element);
      }

      counter++;
    });
    const newquestiondata: any = {
      subjectId: this.subjectid,
      subjectname: this.defaulttopic,
      questions: studentanswerarray
    }
    this.newselectionarray.push(newquestiondata);
    //this.question = studentanswerarray;

    this.storage.ready().then(() => {


      this.storage.set('newquestions', this.newselectionarray).then(() => {
        this.loadquestions();
      });

    });

    /*this.storage.get('questions').then((questions) => {
      console.log(questions);
   // this.getquestions();
    });*/

  }

  async swipeNext() {
    this.questioncounter = this.questioncounter + 1;
    this.showcounter = this.showcounter + 1;
    if (this.exam.totalquestions == this.questioncounter) {
      //  this.classvar="btn disabled";
      const alert = await this.alertController.create({
        cssClass: 'syllabus',
        header: 'Final Confirmation !!',
        message: 'Your are above to submit your exam , Please confirm ?',
        buttons: [
          {
            text: 'Confirm',
            handler: () => {
              console.log('Confirm Okay');
              this.submitexam();

            }
          }
        ]
      });

      await alert.present();
    } else {

      this.loadquestions();
    }
    //this.slides.slideNext();
  }
  swipePrevious() {
    if (this.questioncounter == 0) {
      //this.classvar="btn disabled";
      // this.toastr.showToast('There are no questions available ');
      this.loadquestions();
    } else {
      this.questioncounter = this.questioncounter - 1;
      this.showcounter = this.showcounter - 1;

      this.loadquestions();
    }

    // this.slides.slidePrev();
  }

  async confirmback() {
    const alert = await this.alertController.create({
      cssClass: 'syllabus',
      header: 'Exam Alert !!',
      message: 'There is an exam in progress ,Please submit the exam ,Exam once submitted cannot be changed',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Confirm Okay');
            this.submitexam();

          }
        },
        {
          text: 'Submit',
          handler: () => {
            console.log('Confirm Okay');
            this.submitexam();

          }
        }
      ]
    });
  }


}
