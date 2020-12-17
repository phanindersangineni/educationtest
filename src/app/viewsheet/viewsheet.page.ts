import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, AlertController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { VideoService } from 'src/services/video.service';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/services/toastr.service';
import * as _ from 'lodash';
import { AutosubmitEventService } from 'src/services/autosubmitevent.service';
import { CountdownEventService } from 'src/services/countdownevent.service';
//import { FileChooser } from "@ionic-native/file-chooser";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { Subscription } from 'rxjs';
import { ImagesheetPage } from '../modals/imagesheet/imagesheet.page';


@Component({
  selector: 'app-viewsheet',
  templateUrl: './viewsheet.page.html',
  styleUrls: ['./viewsheet.page.scss'],
})
export class ViewsheetPage implements OnInit {
  fileArray: Array<{ displayFile: any; base64File: string }> = [];
  imageArr: Array<{ displayImg: any; base64Img: string }> = [];
  studentanswerdata: any = {
    examId: '',
    studentId: '',
    subjectId: '',
    subjectAnswer: []

  };

  imageResponse: any;
  options: any;
  marks:any ='0';
  comments:any ='';
  imgPreview = '';
  imagearrays = [];
  subsecquesid = '7';
  subExamSecId = '1';
  subjectid: any = '1';
  currentduration: any = 0;
  actionsheet :any;
  subscription:Subscription;
  constructor(
    private route: Router,
    private navCtrl: NavController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private storage: Storage,
    private VideoService: VideoService,
    private toastService: ToastService,
    private alertController: AlertController,
    public autosubmitevent: AutosubmitEventService,
    public countdownEventService: CountdownEventService,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    //private fileChooser: FileChooser,
    private plt: Platform,
    private filePath: FilePath,
    private platform:Platform,
    public modalController: ModalController
  ) {
    this.subjectid = this.VideoService.getSubjectId;
    this.subExamSecId = this.VideoService.getsubExamSecId;

    this.storage.ready().then(() => {
      this.storage.get('quesobj').then((quesobj) => {
        this.subsecquesid = quesobj.questionId

        console.log(this.subsecquesid);

      });

      this.storage.get('studentanswerdata').then((studentanswerdata) => {
        this.studentanswerdata = studentanswerdata;
         console.log(this.studentanswerdata);
        this.getimagearray();
      });


    });

   

  }

  ngOnInit() {
  }

  closeactionsheet(){
    //this.actionsheet.dismiss();
  }



  getimagearray() {
    let subjects = [];
    subjects = this.studentanswerdata.subjects;
     subjects.forEach(element => {
      console.log(element);
       if (element.questionid == this.subsecquesid) {
        this.imagearrays = element.questionanswers;
        this.marks = element.marks;
        this.comments = element.comments;
        console.log(this.imagearrays);
      }


    });

  }

  

  async viewimg(img) {
    this.VideoService.setVideoUrl =img;
   
    const modal = await this.modalController.create({
      component: ImagesheetPage,

    });

    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
    
    });
    return await modal.present();

  }

  goback() {
    let subjects = [];
    subjects = this.studentanswerdata.subjects;
    let subjectsarray = [];
    subjects.forEach(element => {
      if (element.questionid == this.subsecquesid) {
        element.marks =this.marks,
        element.comments =this.comments
    
      }else{
        element.marks ='',
        element.comments =''
      
      }
      const data = {
        subExamSecId: element.subExamSecId,
        questionid: element.questionid,
        subExamQnId: element.subExamQnId,
        questionanswers: element.questionanswers,
        subjectId: element.subjectId,
        marks : element.marks,
        comments: element.comments,
        answeredQnId:element.answeredQnId
      }
      console.log(subjectsarray);
      // let el = element;
      subjectsarray.push(data);
      console.log(subjectsarray);



    });

    let finaldata: any = {
      examId: '',
      studentId: '',
      startedTime: '',
      endedTime: '',
      subjects: subjectsarray

    }

    console.log(finaldata);
    this.storage.ready().then(() => {
      this.storage.set('studentanswerdata', finaldata).then(() => {
        console.log(this.studentanswerdata);
        this.route.navigate(['./examanswers']);
      });

    });
  }



  viewImage(img) {
    this.VideoService.setbase64String = img;
    this.route.navigate(['./imageview']);
  }

 

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }






}
