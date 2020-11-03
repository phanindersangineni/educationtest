import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private myToast: any;

  constructor(
    private toast: ToastController
  ) { }

  showToast(message) {
    this.myToast = this.toast.create({
      message: message,
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast() {
    this.myToast = this.toast.dismiss();
  }

}
