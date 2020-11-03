import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  myurl:any="";
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.myurl=this.sanitizer.bypassSecurityTrustResourceUrl('https://scaits.xyz/validateMobileLogin?username=090011010');
      
  }

}
