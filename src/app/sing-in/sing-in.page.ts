import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginService } from 'src/services/login.service';
import { Storage } from '@ionic/storage';
import { ExamService } from 'src/services/exam.service';
import { ToastService } from 'src/services/toastr.service';
@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html',
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {
  public onLoginForm: any;
  results: Observable<any>;
  constructor(
	private route: Router,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loginService:LoginService,
    private storage: Storage,
    private examService: ExamService,
    private toastService :ToastService
	) {
    this.onLoginForm = this.formBuilder.group({
      username: [null, Validators.compose([
        Validators.required
      ])],
     password: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(20)
      ])]
    });
   }

  ngOnInit() {
  }
	
 goToForgotPassword() {
    this.route.navigate(['./forgot-password']);
  } 
	
  goTohome() {
    let username =  this.onLoginForm.get('username').value;
    let password = this.onLoginForm.get('password').value;
    let url ='https://scaits.xyz/userCheck?username='+username+'&password='+password+''
    console.log("Eeee");
    

      /*this.loginService.login(url).subscribe(result => {
        if(result =='SUCCESS'){
          this.storage.set('username',username);
          this.storage.set('studentid',username);
          this.examService.getexam(url).subscribe(examdata => {
          this.storage.set('examdata',examdata);
          this.navCtrl.navigateRoot(['./home']);
          });
        }else{
       this.toastService.showToast(result);
        
        }
      });*/

      this.storage.set('username',username);
      this.storage.set('studentid',username);
      this.examService.getexam(url).subscribe(examdata => {
      this.storage.set('examdata',examdata);
      this.navCtrl.navigateRoot(['./home']);
      });

      
  } 
  goToSignUP() {
    this.navCtrl.navigateRoot(['./sing-up']);
  } 

}
