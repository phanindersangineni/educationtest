import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { VideoService } from 'src/services/video.service';
@Component({
  selector: 'app-imagesheet',
  templateUrl: './imagesheet.page.html',
  styleUrls: ['./imagesheet.page.scss'],
})
export class ImagesheetPage implements OnInit {
  tab: string = "Maths";
  img:any;
  constructor(private route: Router, private modalController :ModalController,
   private videoService:VideoService) {
      this.img = this.videoService.getVideoUrl;
     }

  ngOnInit() {
  }

  async closeModal(message) {
    const onClosedData: string =message;
    await this.modalController.dismiss(onClosedData);
  }
}
