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
  File  ,
  DirectoryEntry, FileEntry
} from '@ionic-native/file/ngx'; 
import { Platform } from '@ionic/angular';
import { VideoService } from 'src/services/video.service';
import { LoaderService } from 'src/services/LoaderService';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
tab: string = "all";
options: VideoOptions;
storageDirectory: string = '';
//private fileTransfer: FileTransferObject;
fileTransfer: FileTransferObject = this.transfer.create();
  constructor(private route: Router,private videoPlayer: VideoPlayer,
    private transfer: FileTransfer, private file: File,
    private platform: Platform,private base64: Base64,
    private androidPermissions: AndroidPermissions,
    private storage: Storage,
    private videoService:VideoService,
    private ionLoader: LoaderService) {
    this.options = {
      scalingMode: 0,
      volume: 0.5
    };
   }

  ngOnInit() {

    if (this.platform.is('ios')) {
      this.storageDirectory = this.file.documentsDirectory;
    }
    else if(this.platform.is('android')) {
    
 
   this.file.checkDir(this.file.dataDirectory, 'chaitanya').then(response => {
    console.log('Directory exists'+response);
  }).catch(err => {
    console.log('Directory doesn\'t exist'+JSON.stringify(err));
    this.file.createDir(this.file.dataDirectory, 'chaitanya', false).then(response => {
      console.log('Directory create'+response);
    }).catch(err => {
      console.log('Directory no create'+JSON.stringify(err));
    }); 
  });
  }
  
  }

  playLocalVideo() {
    // Playing a video.
    /*this.videoPlayer.play('file:///android_asset/www/sample-mp4-file.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      alert(err);
    });*/
    //this.videoService.setbase64String ="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4";
    this.route.navigate(['./offlinevideo']);
  }
  playRemoteVideo() {
    // Playing a video.
    /*this.videoPlayer.play('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      alert(err);
    });*/

    this.route.navigate(['./playvideo']);
  }

  closeVideo() {
    this.videoPlayer.close();
  }

  getPermission() {
    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.download();
        } 
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if(status.hasPermission) {
                this.download();
              }
            });
        }
      });
  }

   download() {  
    //here encoding path as encodeURI() format. 
    this.platform.ready().then(() => { 
     this.ionLoader.showLoader(); 
      //this.storageDirectory = this.file.externalRootDirectory + 'chaitanya/';
      this.storageDirectory = this.file.dataDirectory + 'chaitanya/';
    let url = encodeURI("https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4");  
    //here initializing object.  
    this.fileTransfer = this.transfer.create();  
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    this.fileTransfer.download(url, this.storageDirectory + 'sample-mp4-file.mp4', true).then((entry) => {  
        //here logging our success downloaded file path in mobile.  
        console.log('download completed: ' + entry.toURL());  
       // alert("download completed"+this.storageDirectory);
        this.getBase64StringByFilePath();
       alert("Download completed");
       
    }, (error) => {  
      this.ionLoader.hideLoader();
        //here logging our error its easier to find out what type of error occured.  
        alert(JSON.stringify(error));  
    });  

  });
} 



 getBase64StringByFilePath() {
   alert("conversionstart");
return new Promise(async (resolve) => {
  //let res:any = await this.file.resolveLocalFilesystemUrl('file:///storage/emulated/0/chaitanya/sample-mp4-file.mp4');
  let res:any = await this.file.resolveLocalFilesystemUrl('file:///data/user/0/com.opuslabs.academy/files/chaitanya/sample-mp4-file.mp4');
 
  res.file((resFile) => {
    alert("In Progress");
    let reader = new FileReader();
    reader.readAsDataURL(resFile);
    reader.onloadend = async (evt: any) => {
      let encodingType = "data:video/mp4;base64,";
     
      let OriginalBase64 = evt.target.result.split(',')[1]; // Remove the "data:video..." string.
      let decodedBase64 = atob(OriginalBase64); // Decode the incorrectly encoded base64 string.
      let encodedBase64 = btoa(decodedBase64); // re-encode the base64 string (correctly).
      let newBase64 = encodingType + encodedBase64; // Add the encodingType to the string.
     // alert(JSON.stringify(newBase64));
      this.storage.set('base64',newBase64);
     
      this.videoService.setbase64String =newBase64;
      alert("conversion completed");
      this.ionLoader.hideLoader();
      resolve(newBase64);
    }
  }, (error) =>{
    this.ionLoader.hideLoader();
    alert(error);
  });
});
}

 faculties_messages() {
    this.route.navigate(['./faculties-message']);
  } 
} 