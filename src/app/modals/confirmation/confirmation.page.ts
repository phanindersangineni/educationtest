import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { VideoService } from 'src/services/video.service';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  tab: string = "Maths";
  totalmarks :any ='';
  duration:any ='';
  constructor(private route: Router, private modalController :ModalController,
   private videoService:VideoService) {
      this.totalmarks = videoService.gettotalMarks;
      this.duration = videoService.getexamHr;
     }

  ngOnInit() {
  }

  async closeModal(message) {
    const onClosedData: string =message;
    await this.modalController.dismiss(onClosedData);
  }
}
