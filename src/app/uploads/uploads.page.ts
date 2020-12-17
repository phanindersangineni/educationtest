import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Subscription } from 'rxjs';


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
  actionsheet: any;
  subscription: Subscription;
  uploadstudentdata: any;
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
    private activeroute: ActivatedRoute,
    //private fileChooser: FileChooser,
    private plt: Platform,
    private filePath: FilePath,
    private platform: Platform
  ) {
   
    this.countdownEventService.getCountdown().subscribe((data) => {
      this.currentduration = data;
    });

   /* this.activeroute.queryParams.subscribe(params => {
      if (params && params.special) {
        console.log(JSON.parse(params.special));
        this.VideoService.setStudentata =params.special;
        this.studentanswerdata = JSON.parse(params.special);
        // this.uploadstudentdata =null;
        //this.uploadstudentdata = JSON.parse(params.special);
       
        this.getimagearray();
      }
    });*/

    this.storage.ready().then(() => {
      this.storage.get('quesobj').then((quesobj) => {
      });


      this.storage.get('currentduration').then((currentduration) => {
        this.currentduration = currentduration;
        //this.startcountdown();
      })

    });


  }

  ngOnInit() {
    
  }



  closeactionsheet() {
    //this.actionsheet.dismiss();
  }



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
    this.actionsheet = actionSheet;
    actionSheet.present();
  }

  openGallery() {

    var options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        //console.log("IMAGE DATA IS", imageData);
        this.toastService.showToast("Image chosen successfully");
        this.convertToBase64(imageData, true);
      })
      .catch(e => {
        alert(e);
        this.toastService.showToast(e);
        //this.toastService.showToast("Error while picking from gallery");
      });

  }

  openCamera() {

    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      cameraDirection: 1
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        // console.log("IMAGE DATA IS", imageData);
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
            // console.log("BASE 64 IS", filePath.split(".").pop());
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
            // alert("11");
            // this.toastService.showToast(base64File.split(",").pop());
            // alert(base64File.split(",").pop());
            let base64 = 'data:image/gif;base64,' + base64File.split(",").pop();
            this.getPhoto(base64);
            //console.log("LENGTH OF BASE64ARR", this.fileArray.length);
          },
          err => {
            alert(err);
            console.log(err);
          }
        );
      })
      .catch(err => console.log(err));
  }


  getimagearray() {
    //alert("hi");
    let subjects = [];
    //let loaddata: any;
    this.imagearrays =[];
    let obj = this.studentanswerdata;
    subjects = obj.subjects;
    subjects.forEach(element => {
      console.log(element);
      if (element.questionId == this.subsecquesid) {
        console.log(element.questionId);
        console.log(this.subsecquesid);
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
      if (element.questionId == this.subsecquesid) {
        element.questionanswers = filteredItems

      }

      const data = {
        questionId: element.questionId,
        subExamSecId: element.subExamSecId,
        subExamQnId: element.subExamQnId,
        questionanswers: element.questionanswers,
        subjectId: element.subjectId,

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
    this.VideoService.setStudentata = finaldata;
    this.storage.ready().then(() => {
      /*this.storage.set('studentanswerdata', finaldata).then(() => {*/
      console.log(this.studentanswerdata);
      //this.getimagearray();
      /* });*/

    });




  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });

    this.subjectid = this.VideoService.getSubjectId;
    this.subExamSecId = this.VideoService.getsubExamSecId;
    this.subsecquesid = this.VideoService.getsubsecquesid;
    //alert(this.subsecquesid);
    this.studentanswerdata = this.VideoService.getStudentdata;
    this.getimagearray();

  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
    this.storage.set('answereddata',this.VideoService.getStudentdata);
  }



  goback() {
    this.route.navigate(['./examstart']);
  }
  goToLeaderboard() {
    this.route.navigate(['./leaderboard']);
  }


  getPhoto(base64) {

    // alert('123');
    if (base64 != null) {
      this.imagearrays.push(base64);
    }
    let subjects = [];
    subjects = this.studentanswerdata.subjects;
    let subjectsarray = [];
    subjects.forEach(element => {
      if (element.questionId == this.subsecquesid) {
        console.log(element.questionId);
        console.log(this.subsecquesid);
        element.questionanswers = this.imagearrays;

      }
      const data = {
        questionId: element.questionId,
        subExamSecId: element.subExamSecId,
        subExamQnId: element.subExamQnId,
        questionanswers: element.questionanswers,
        subjectId: element.subjectId,
        
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

    //alert("dd");
    this.VideoService.setStudentata = finaldata;
    this.studentanswerdata = finaldata;
    console.log(this.studentanswerdata);
    console.log(this.VideoService.getStudentdata);
     this.getimagearray();
   


  }

}
