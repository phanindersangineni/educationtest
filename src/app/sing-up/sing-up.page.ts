import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

  constructor(
	private route: Router,
    private navCtrl: NavController
	) { }

  ngOnInit() {
  }
	
  goTohome() {
    this.navCtrl.navigateRoot(['./home']);
  } 
  goToSignIn() {
    this.navCtrl.navigateRoot(['./sing-in']);
  } 
}
