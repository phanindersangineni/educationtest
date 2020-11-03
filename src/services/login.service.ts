
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })


  export class LoginService {

    constructor(private http: HttpClient) { }
   
    login(endpoint: string): Observable<any> {
        
        return this.http.get(endpoint ,{responseType: 'text'});
    }

  }