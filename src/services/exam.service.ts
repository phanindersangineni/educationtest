
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { LoaderService } from './LoaderService';
import { HTTP } from '@ionic-native/http/ngx';
import { NetworkService } from './network.service';
import { ToastService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})


export class ExamService {

  base_path = 'https://bank.scaits.org';
  public exam: any;

  constructor(private http: HttpClient,
    private networkService:NetworkService,
    private http1: HTTP ,
    private loaderService:LoaderService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  }

  handleError(error: HttpErrorResponse) {
    this.loaderService.hideLoader();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      alert(JSON.stringify(error.error.message));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

        alert(JSON.stringify(error.error));
    }
    // return an observable with a user-facing error message
     alert('Unexpected error occur, Please try again');
    return throwError(
      'Something bad happened; please try again later.');
      
  };

  getexam(userid: string): Observable<any> {
    return this.http.get("assets/data/exam.json");

  }

  getQuestion(examid: string): Observable<any> {
    return this.http.get("assets/data/question.json");

  }

  getexamschedule(studentid: string): Observable<any> {
    return this.http.get("assets/data/examschedule.json");

  }
  getexamschedule1(studentid: string): Observable<any> {
    return this.http.get("assets/data/examschedule1.json");

  }

  getexamquestions(scheduleid: string): Observable<any> {
    return this.http.get("assets/data/examquestion.json");

  }

  startexam(examstart: any) {
    throw new Error('Method not implemented.');
  }

  getonlineVideos(studentid: string): Observable<any> {
    return this.http.get("assets/data/videos.json");

  }

  post(data,suffix): Observable<any> {
    if(this.networkService.getCurrentNetworkStatus() ==0){
    return this.http
      .post<any>(this.base_path+suffix, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }else{
      alert('There is network connectivity issue you appear to be offline');
    }

  }

  get(suffix): Observable<any> {
    
    if(this.networkService.getCurrentNetworkStatus() ==0){
    return this.http
      .get<any>(this.base_path+suffix)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }else{
      alert('There is network connectivity issue you appear to be offline');
    }

  }

  post1(data,suffix) {
    this.http1.post(this.base_path+suffix, data, this.httpOptions)
                    .then((data) => {
                      alert(JSON.stringify(data));
                        console.log(data);
                        return data;
                    })
                    .catch((error) => {
                      alert(JSON.stringify(error));
                        console.log(error);
                    });

  }

  

}