import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Storage } from '@ionic/storage';
import {
  FileTransfer,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import {
  File,
  DirectoryEntry, FileEntry
} from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { VideoService } from 'src/services/video.service';
import { LoaderService } from 'src/services/LoaderService';
import { ExamService } from 'src/services/exam.service';
import { ToastService } from 'src/services/toastr.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DbService } from 'src/services/DbService';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  tab: string = "online";
  options: VideoOptions;
  storageDirectory: string = '';
  videoarray: any = [];
  localvideoarray: any = [];
  kbytes: any = 0;
  databaseObj: SQLiteObject;
  alreadydownloaded = [];
  vidarray: any;
  storagesize = 0;
  readonly database_name: string = "neet.db";
  readonly table_name: string = "offlinevideos";
  //private fileTransfer: FileTransferObject;
  fileTransfer: FileTransferObject = this.transfer.create();
  constructor(private route: Router, private videoPlayer: VideoPlayer,
    private transfer: FileTransfer, private file: File,
    private platform: Platform, private base64: Base64,
    private androidPermissions: AndroidPermissions,
    private storage: Storage,
    private videoService: VideoService,
    private ionLoader: LoaderService,
    private examService: ExamService,
    private toastr: ToastService,
    private loadrService: LoaderService,
    private sqlite: SQLite,
    private dbService: DbService) {
    this.options = {
      scalingMode: 0,
      volume: 0.5
    };

    /*this.platform.ready().then(() => {
    //  this.getRows();
     this.createDB();
    }).catch(error => {
      console.log(error);
    })*/

    this.dbService.getRecords().subscribe(records => {
      this.loadlocalarray(records);

    })




  }

  ngOnInit() {
    this.storage.ready().then(() => {
      this.storage.get('storagesize').then((storagesize) => {
        this.storagesize = storagesize;
        alert(this.storagesize);
      });
    });

    this.dbService.dbState().subscribe((res) => {
      //alert(res);
      /*this.dbService.getAlldownloads().then(item => {
      })*/

    });
    this.loadvideos();

    /*this.storage.get('localvideoarray').then((localvideoarray) => {
      this.localvideoarray = localvideoarray;
      if (this.localvideoarray == null) {
        this.localvideoarray = [];
      }
    })*/

    if (this.platform.is('ios')) {
      this.storageDirectory = this.file.documentsDirectory;
    }
    else if (this.platform.is('android')) {


      this.file.checkDir(this.file.dataDirectory, 'chaitanya').then(response => {
        console.log('Directory exists' + response);
      }).catch(err => {
        console.log('Directory doesn\'t exist' + JSON.stringify(err));
        this.file.createDir(this.file.dataDirectory, 'chaitanya', false).then(response => {
          console.log('Directory create' + response);
        }).catch(err => {
          console.log('Directory no create' + JSON.stringify(err));
        });
      });

    }

  }

  playLocalVideo(data) {

    this.videoService.setbase64String = data.base64;
    this.videoService.setSubjectId = data.subjectId;
    this.videoService.setTopicId = data.topicid;
    this.videoService.setSubTopicId = data.subtopicid;
    this.route.navigate(['./offlinevideo']);
  }
  playRemoteVideo(vidar) {
    this.videoService.setVideoUrl = vidar.url;
    this.videoService.setSubjectId = vidar.subjectId;
    this.videoService.setTopicId = vidar.topicid;
    this.videoService.setSubTopicId = vidar.subtopicid;
    this.route.navigate(['./playvideo']);
  }

  closeVideo() {
    this.videoPlayer.close();
  }

  loadvideos() {
    this.examService.getonlineVideos('').subscribe(examdata => {
      this.videoarray = examdata;
    });
  }

  getPermission(vidarry) {
    this.vidarray = vidarry;
    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          // this.download(vidarry);

          this.checkvideoexists(vidarry);
        }
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if (status.hasPermission) {
                // this.download(vidarry);
                this.checkvideoexists(vidarry);
              }
            });
        }
      });
  }


  checkvideoexists(vidarry) {
    this.storage.ready().then(() => {
      this.storage.get('storagesize').then((storagesize) => {
        if (storagesize == null) {
          this.storagesize = 0;
        } else {
          this.storagesize = this.storagesize + parseInt(storagesize);
        }
        if (this.storagesize == 20000) {
          this.toastr.showToast('There is no enough storage space left, Please delete some of the videos');
        } else {
          let result = this.alreadydownloaded.find(x => x == vidarry.subtopicid);

          if (result == undefined) {
            this.download(vidarry);
          } else {
            this.toastr.showToast('You have already downloaded the video');
          }
        }


      });
    });

  }

  download(vidarry) {
    //here encoding path as encodeURI() format. 
    this.platform.ready().then(() => {
      this.ionLoader.showLoader();
      //this.storageDirectory = this.file.externalRootDirectory + 'chaitanya/';
      this.storageDirectory = this.file.dataDirectory + 'chaitanya/';
      let url = encodeURI(vidarry.url);
      //here initializing object.  
      this.fileTransfer = this.transfer.create();
      //alert("Download Started");
      // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
      this.fileTransfer.download(url, this.storageDirectory + vidarry.fileName, true).then((entry) => {
        //here logging our success downloaded file path in mobile.  
        // alert('download completed: ' + entry.toURL());
        //alert("download completed" + this.storageDirectory);

        this.getBase64StringByFilePath(vidarry);
        // this.ionLoader.hideLoader();
      }, (error) => {
        this.ionLoader.hideLoader();
        //here logging our error its easier to find out what type of error occured.  
        alert(JSON.stringify(error));

      });


    });
  }

  deletevideo(videarray) {

    this.dbService.delete(videarray.subtopicid).then(item1 => {
      //alert(JSON.stringify(item1));
      this.storage.get('storagesize').then((storagesize) => {
        this.storagesize = this.storagesize - parseInt(storagesize);

        this.storage.set('storagesize', this.storagesize).then(() => {

          this.alreadydownloaded = this.alreadydownloaded.filter(item => item !== videarray.subtopicid)
          this.toastr.showToast("Video removed successfully");
        });
      });

    });

  }



  getBase64StringByFilePath(vidarry) {
    return new Promise(async (resolve) => {
      //let res:any = await this.file.resolveLocalFilesystemUrl('file:///storage/emulated/0/chaitanya/sample-mp4-file.mp4');
      let res: any = await this.file.resolveLocalFilesystemUrl('file:///data/user/0/com.srichaitanya.neetdb/files/chaitanya/Chemisrtry.mp4');

      res.file((resFile) => {
        let reader = new FileReader();
        reader.readAsDataURL(resFile);
        reader.onloadend = async (evt: any) => {
          let encodingType = "data:video/mp4;base64,";
          let OriginalBase64 = evt.target.result.split(',')[1]; // Remove the "data:video..." string.
          let decodedBase64 = atob(OriginalBase64); // Decode the incorrectly encoded base64 string.
          let encodedBase64 = btoa(decodedBase64); // re-encode the base64 string (correctly).
          let newBase64 = encodingType + encodedBase64; // Add the encodingType to the string.

          this.videoService.setbase64String = newBase64;

          try {

            this.dbService.createtable().then(item => {

              this.dbService.inserttable(vidarry, newBase64).then(item1 => {
                // alert(JSON.stringify(item1));
                //this.getRows();
                this.storagesize = this.storagesize + parseInt(vidarry.videosize);
                this.storage.set('storagesize', this.storagesize);
                this.toastr.showToast('Download Completed');
                this.alreadydownloaded.push(vidarry.subtopicid);


                this.ionLoader.hideLoader();
              })
            })





          } catch (error) {
            alert(error);
          }

          resolve(newBase64);
        }
      }, (error) => {
        this.ionLoader.hideLoader();
        alert(error);
      });
    });
  }

  loadlocalarray(records) {
    if (records.length > 0) {
      this.localvideoarray = [];
      for (var i = 0; i < records.length; i++) {
        // this.localvideoarray.push();
        let resp = records[i];
        const localdata: any = {
          facultyName: resp.facultyName,
          Subject: resp.Subject,
          description: resp.description,
          base64: resp.base64,
          topicid: resp.topicid,
          topicName: resp.topicName,
          subtopicid: resp.subtopicid,
          subtopicName: resp.subtopicName,
          videosize: resp.videosize
        }
        this.localvideoarray.push(localdata);
        this.alreadydownloaded.push(resp.subtopicid);
        //alert(this.localvideoarray.length);
        //this.loadvideos();
        //alert(res.rows.item(i));
        //this.row_data.push(res.rows.item(i));
      }

    }
  }


  calculateImageSize(base64String) {
    let padding;
    let inBytes;
    let base64StringLength;
    if (base64String.endsWith('==')) { padding = 2; }
    else if (base64String.endsWith('=')) { padding = 1; }
    else { padding = 0; }

    base64StringLength = base64String.length;
    console.log(base64StringLength);
    inBytes = (base64StringLength / 4) * 3 - padding;
    console.log(inBytes);
    this.kbytes = inBytes / 1000;
    return this.kbytes;
  }

  faculties_messages() {
    this.route.navigate(['./faculties-message']);
  }
} 