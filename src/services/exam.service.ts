
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ExamService {

  base_path = 'http://175.101.3.68:8180';
  public exam: any;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
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
    return this.http
      .post<any>(this.base_path+suffix, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  get(suffix): Observable<any> {
    return this.http
      .get<any>(this.base_path+suffix)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

}