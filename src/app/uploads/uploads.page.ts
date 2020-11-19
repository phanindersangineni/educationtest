import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { VideoService } from 'src/services/video.service';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/services/toastr.service';
import * as _ from 'lodash';
import { AutosubmitEventService } from 'src/services/autosubmitevent.service';
import { CountdownEventService } from 'src/services/countdownevent.service';
//import { FileChooser } from "@ionic-native/file-chooser";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";


@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.page.html',
  styleUrls: ['./uploads.page.scss'],
})
export class UploadsPage implements OnInit {
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

  imgPreview = '';
  imagearrays = [];
  subsecquesid = '7';
  subExamSecId = '1';
  subjectid: any = '1';
  currentduration: any = 0;
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
    private filePath: FilePath
  ) {
    this.subjectid = this.VideoService.getSubjectId;
    this.subExamSecId = this.VideoService.getsubExamSecId;

    this.countdownEventService.getCountdown().subscribe((data) => {
      this.currentduration = data;
    });

    this.storage.ready().then(() => {
      this.storage.get('quesobj').then((quesobj) => {
        this.subsecquesid = quesobj.questionId

      });

      this.storage.get('studentanswerdata').then((studentanswerdata) => {
        console.log(studentanswerdata);
        this.studentanswerdata = studentanswerdata;
        // console.log(this.studentanswerdata);

        //this.getimagearray();
      });


      this.storage.get('currentduration').then((currentduration) => {
        this.currentduration = currentduration;
        //this.startcountdown();
      })

    });


  }

  ngOnInit() {
  }

  /*startcountdown() {
    //var a = parseInt(this.currentduration);
    var a = 0;
    var b = parseInt(this.currentduration);
    let interval = setInterval(() => {
      //console.log(a++);
      //  console.log(this.currentduration);
      if (a == b) {
        clearInterval(interval);
        this.confirmforautosubmit();
      }
      this.currentduration = parseInt(this.currentduration) - 1;
      this.storage.ready().then(() => {
      this.storage.set('currentduration', this.currentduration);
      });



    }, 60000);


  }*/

  getImages() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      //maximumImagesCount: 3,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,

      // quality of resized image, defaults to 100
      quality: 25,

      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imagearrays.push('data:image/jpeg;base64,' + results[i]);
        this.getPhoto(null);
      }
    }, (err) => {
      alert(err);
    });
  }



  async confirmforautosubmit() {

    const alert = await this.alertController.create({
      cssClass: 'syllabus',
      header: 'Auto Save Alert !!',
      message: 'Your alloted time for exam has expired,Your exam will be auto submitted',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
            const autosubmit: any = {
              submit: true
            }
            this.autosubmitevent.publish(autosubmit);

          }
        }
      ]
    });

    await alert.present();
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 1000000;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {

        this.toastService.showToast('Maximum file size should be of 1 MB');
        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.toastService.showToast('Only Images are allowed ( JPG | PNG )');
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            let imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';

            this.toastService.showToast(imageError);

            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.getPhoto(imgBase64Path);
            // this.cardImageBase64 = imgBase64Path;
            //this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

 async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: "From Gallery",

          handler: () => {
            this.openGallery();
          }
        },
        {
          text: "From Camera",
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  }

  openGallery(){

    var options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        console.log("IMAGE DATA IS", imageData);
        this.toastService.showToast("Image chosen successfully");
        this.convertToBase64(imageData, true);
      })
      .catch(e => {
        alert(e);
        this.toastService.showToast("Error while picking from gallery");
      });

  }

  openCamera(){

    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      cameraDirection: 1
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        console.log("IMAGE DATA IS", imageData);
        this.toastService.showToast("Image chosen successfully");
        this.convertToBase64(imageData, true);
      })
      .catch(e => {
        alert(e);
        this.toastService.showToast("Error while picking from camera");
      });

  }

  convertToBase64(imageUrl, isImage) {
    this.filePath
      .resolveNativePath(imageUrl)
      .then(filePath => {
        console.log(filePath);
        this.base64.encodeFile(filePath).then(
          (base64File: string) => {
            console.log("BASE 64 IS", filePath.split(".").pop());
            if (isImage == false) {
              this.fileArray.push({
                displayFile: filePath.split("/").pop(),
                base64File: base64File.split(",").pop() //split(",").pop() depends on the requirement, if back end API is able to extract
                //the file mime type then you can do this, if back end expects  UI update the Mime type
                //  then don't use split(",").pop()
              });
            } else {
              this.imageArr.push({
                displayImg: filePath,
                base64Img: base64File.split(",").pop() //same comment for image follows here.
              });
            }
            this.toastService.showToast(base64File.split(",").pop());
            this.getPhoto(base64File.split(",").pop());
            console.log("LENGTH OF BASE64ARR", this.fileArray.length);
          },
          err => {
            console.log(err);
          }
        );
      })
      .catch(err => console.log(err));
  }


  getimagearray() {
    let subjects = [];
    subjects = this.studentanswerdata.subjects;
    subjects.forEach(element => {
      /*let subjectanswer = [];
       subjectanswer = element.subjectAnswer;

       subjectanswer.forEach(element => {

         if (this.subExamSecId == element.subExamSecId) {

           let secanswers = element.sectionAnswers;
           console.log(secanswers.questionid);
           console.log(this.subsecquesid);
           if (secanswers.questionid == this.subsecquesid) {
             this.imagearrays = secanswers.answersheet;
           }


         }

       });*/

      if (element.questionid = this.subsecquesid) {
        this.imagearrays = element.questionanswers;
      }


    });

  }

  viewImage(img) {
    this.VideoService.setbase64String = img;
    this.route.navigate(['./imageview']);
  }

  removefromarray(i) {

    this.imagearrays.splice(i);
    const filteredItems = this.imagearrays.slice(0, i).concat(this.imagearrays.slice(i + 1, this.imagearrays.length))
    let subjects = [];
    subjects = this.studentanswerdata.subjects;
    let subjectsarray = [];
    subjects.forEach(element => {
      if (element.questionid == this.subsecquesid) {
        element.questionanswers = filteredItems

      }
      const data = {
        subExamSecId: element.subExamSecId,
        questionid: element.questionid,
        subExamQnId: element.subExamQnId,
        questionanswers: element.questionanswers,
        subjectId: element.subjectId
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
    this.storage.ready().then(() => {
      this.storage.set('studentanswerdata', finaldata).then(() => {
        console.log(this.studentanswerdata);
        this.getimagearray();
      });

    });




  }


  goback() {
    this.navCtrl.navigateRoot(['./examstart']);
  }
  goToLeaderboard() {
    this.route.navigate(['./leaderboard']);
  }


  getPhoto(base64) {


    //let base64 = 'data:image/gif;base64,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';
    if(base64 !=null){
    this.imagearrays.push(base64);
    }
    let subjects = [];
    subjects = this.studentanswerdata.subjects;
    let subjectsarray = [];
    subjects.forEach(element => {
      if (element.questionid == this.subsecquesid) {
        element.questionanswers = this.imagearrays;

      }
      const data = {
        subExamSecId: element.subExamSecId,
        questionid: element.questionid,
        subExamQnId: element.subExamQnId,
        questionanswers: element.questionanswers,
        subjectId: element.subjectId
      }
      console.log(subjectsarray);
      // let el = element;
      subjectsarray.push(data);
      console.log(subjectsarray);



    });
    console.log(subjectsarray);
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
        // console.log(this.studentanswerdata);
        this.getimagearray();
      });
    });
    /* let subjects =[];
     subjects = this.studentanswerdata.subjects;
     const subjectsarray=[];
     subjects.forEach(elem => {
       console.log(elem);
     let subjectanswer = [];
     subjectanswer = elem.subjectAnswer;
     
     subjectanswer.forEach(element => {
        console.log("EEEE");
        console.log(this.subExamSecId);
       if (this.subExamSecId == element.subExamSecId) {
 
         let secanswers = element.sectionAnswers;
          if (secanswers.questionid == this.subsecquesid) {
           secanswers.answersheet = this.imagearrays
          
           const secans={
             subExamQnId:secanswers.subExamQnId,
             questionid:secanswers.questionid,
             answersheet:this.imagearrays
           }
           
           const subsectionid ={
             subExamSecId:element.subExamSecId,
             sectionAnswers:secans,
             questionid:secanswers.questionid
           }
           //let secarr =[];
           //secarr.push(subsectionid);
           let subjectans ={
             subjectAnswer:[],
             subjectId:this.subjectid
           };
           subjectans.subjectAnswer.push(subsectionid);
         
           
           console.log("frist");
          subjectsarray.push(subjectans);
          console.log(subjectsarray);
         }else{
           let elearray =[];
           elearray.push(element);
           let subjectans ={
             subjectAnswer:elearray,
             subjectId:this.subjectid
           };
           console.log("second");
           subjectsarray.push(subjectans);
 
         }
         
 
 
       }
 
     });
     let finaldata :any ={
       examId:'',
       studentId:'',
       startedTime:'',
       endedTime:'',
       subjects:subjectsarray
     
     }
     
     
     console.log(JSON.stringify(finaldata));
     this.storage.set('studentanswerdata', finaldata).then(() => {
       console.log(this.studentanswerdata);
       this.getimagearray();
     });
 
   });*/

  }

}
