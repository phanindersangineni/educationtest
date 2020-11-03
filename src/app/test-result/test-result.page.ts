import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.page.html',
  styleUrls: ['./test-result.page.scss'],
})
export class TestResultPage implements OnInit {

  constructor(
	private route: Router,
    private navCtrl: NavController
	) { }

  ngOnInit() {
  }
	
	
 goTohome() {
    this.navCtrl.navigateRoot(['./home']);
  } 
 goToLeaderboard() {
    this.route.navigate(['./leaderboard']);
  }

}
