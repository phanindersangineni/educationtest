import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VideoService {
  private base64: any;
  
  
  get getbase64String() {
    return this.base64;
  }

  set setbase64String(base64: string) {
    this.base64 = base64;
  }

  
}