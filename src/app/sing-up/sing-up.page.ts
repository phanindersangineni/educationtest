import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {
  subscription:Subscription;
  constructor(
	private route: Router,
    private navCtrl: NavController,
    private platform: Platform
	) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
    
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

	
  goTohome() {
    this.navCtrl.navigateRoot(['./home']);
  } 
  goToSignIn() {
    this.navCtrl.navigateRoot(['./sing-in']);
  } 
}
