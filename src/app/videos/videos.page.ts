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
  studentid: any = '';
  videoId :any ='';
  ispresent :boolean= true;
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

    this.dbService.getRecords().subscribe(records => {
      this.loadlocalarray(records);

    })

  }

  ngOnInit() {
    this.storage.ready().then(() => {
      this.storage.get('storagesize').then((storagesize) => {
        this.storagesize = storagesize;
       // alert(this.storagesize);
      });
      this.storage.get('studentid').then((studentid) => {
        // alert("hi")
        this.studentid = studentid;
        this.storage.get('videoId').then((videoId) => {
          this.videoId =videoId;
         this.loadvideos();
        });
      });
    });

    this.dbService.dbState().subscribe((res) => {
     
    });
   
    if (this.platform.is('ios')) {
      this.storageDirectory = this.file.documentsDirectory;
    }
    else if (this.platform.is('android')) {


     /* this.file.checkDir(this.file.dataDirectory, 'chaitanya').then(response => {
        console.log('Directory exists' + response);
      }).catch(err => {
        console.log('Directory doesn\'t exist' + JSON.stringify(err));
        this.file.createDir(this.file.dataDirectory, 'chaitanya', false).then(response => {
          console.log('Directory create' + response);
        }).catch(err => {
          console.log('Directory no create' + JSON.stringify(err));
        });
      });*/

    }

  }

  playLocalVideo(data) {

    this.videoService.setbase64String = data.base64;
    this.videoService.setSubTopicId = data.subVideoId;
    this.route.navigate(['./offlinevideo']);
  }
  playRemoteVideo(vidar) {
    this.videoService.setVideoUrl = vidar.url;
    this.videoService.setSubTopicId = vidar.subVideoId;
    this.route.navigate(['./playvideo']);
  }

  closeVideo() {
    this.videoPlayer.close();
  }

  loadvideos() {
    const admindata: any = {
      videoId: this.videoId
    }
    this.examService.post(admindata,'/student/subVideos').subscribe(examdata => {
      this.videoarray = examdata;
      if(this.videoarray.length ==0){
        this.ispresent=false;
      }else{
        this.ispresent=true;
      }
    });

    this.dbService.getAlldownloads(this.videoId).then(item => {

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
          let result = this.alreadydownloaded.find(x => x == vidarry.subVideoId);

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
         //alert('download completed: ' + entry.toURL());
       // alert("download completed" + this.storageDirectory);

        this.getBase64StringByFilePath(vidarry);
        // this.ionLoader.hideLoader();
      }, (error) => {
        this.ionLoader.hideLoader();
         alert("error connecting external url");
        //here logging our error its easier to find out what type of error occured.  
        alert(JSON.stringify(error));

      });


    });
  }

  deletevideo(videarray) {

    this.dbService.delete(videarray.subVideoId,videarray.videoId).then(item1 => {
      //alert(JSON.stringify(item1));
      this.storage.get('storagesize').then((storagesize) => {
        this.storagesize = this.storagesize - parseInt(storagesize);

        this.storage.set('storagesize', this.storagesize).then(() => {

          this.alreadydownloaded = this.alreadydownloaded.filter(item => item !== videarray.subVideoId)
          this.toastr.showToast("Video removed successfully");
          const updatdata :any ={
            subVideoId:videarray.subVideoId,
            isdownloaded:'N',
            studentId: this.studentid
          }
          this.examService.post(updatdata,'/student/downloadStatus').subscribe(examdata => {
            this.loadvideos();
          });
        });
      });

    });

  }



  getBase64StringByFilePath(vidarry) {
    return new Promise(async (resolve) => {
      //let res:any = await this.file.resolveLocalFilesystemUrl('file:///storage/emulated/0/chaitanya/sample-mp4-file.mp4');
      let res: any = await this.file.resolveLocalFilesystemUrl('file:///data/user/0/com.srichaitanya.neetdb/files/chaitanya/'+vidarry.fileName);
      alert("conversion start");
      res.file((resFile) => {
        let reader = new FileReader();
        reader.readAsDataURL(resFile);
        reader.onloadend = async (evt: any) => {
          let encodingType = "data:video/mp4;base64,";
          let OriginalBase64 = evt.target.result.split(',')[1]; // Remove the "data:video..." string.
          let decodedBase64 = atob(OriginalBase64); // Decode the incorrectly encoded base64 string.
          let encodedBase64 = btoa(decodedBase64); // re-encode the base64 string (correctly).
          let newBase64 = encodingType + encodedBase64; // Add the encodingType to the string.
          //alert("conversion done");
          this.videoService.setbase64String = newBase64;

          try {
            this.dbService.createtable().then(item => {

              this.dbService.inserttable(vidarry, newBase64).then(item1 => {
                // alert(JSON.stringify(item1));
                //this.getRows();
                this.storagesize = this.storagesize + parseInt(vidarry.videosize);
                this.storage.set('storagesize', this.storagesize);
                this.toastr.showToast('Download Completed');
                this.alreadydownloaded.push(vidarry.subVideoId);
                const updatdata :any ={
                  subVideoId:vidarry.subVideoId,
                  isdownloaded:'Y',
                  studentId: this.studentid
                }
                this.examService.post(updatdata,'/student/downloadStatus').subscribe(examdata => {
                  this.loadvideos();
                  
                 /* resFile.remove(function() {
                    // if the file has been successfully removed
                    alert("File Removed");
                }, function(error) {
                  alert(error);
                    // if there was an error removing the file
                }, function() {
                    // if the file does not exist
                    alert("File dosent exists");
                });*/

               /* this.file.removeFile('file:///data/user/0/com.srichaitanya.neetdb/files/chaitanya/',vidarry.fileName).then( data => {

                  //alert("File removed");
                }).catch( error => {
                  alert(error);
              });*/
                });

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
    this.localvideoarray = [];
    if (records.length > 0) {
      
      for (var i = 0; i < records.length; i++) {
        // this.localvideoarray.push();
        let resp = records[i];
        const localdata: any = {
          facultyName: resp.facultyName,
          subjectName: resp.subjectName,
          description: resp.description,
          base64: resp.base64,
          topicName: resp.topicName,
          subVideoId: resp.subVideoId,
          subtopicName: resp.subtopicName,
          videosize: resp.videosize,
          videoId: resp.videoId
        }
        this.localvideoarray.push(localdata);
        this.alreadydownloaded.push(resp.subVideoId);
         }

    }
  }


  faculties_messages() {
    this.route.navigate(['./faculties-message']);
  }
} 