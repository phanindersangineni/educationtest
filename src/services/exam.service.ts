
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })


  export class ExamService {

    public exam: any;

    constructor(private http: HttpClient) { }
   
    getexam(userid: string) : Observable<any> {
      return  this.http.get("assets/data/exam.json");
    
    }

  }