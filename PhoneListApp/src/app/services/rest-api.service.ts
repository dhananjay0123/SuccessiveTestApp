import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PhoneDetail } from '../models/phone-detail';
import { AppConstants } from '../models/app-constants';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  getPhoneDetails(): Observable<PhoneDetail[]> {

   
    return this.http.get<PhoneDetail[]>(AppConstants.apiBaseURL + AppConstants.phoneEndpoint)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deletePhoneDetail(phoneDetail: PhoneDetail) {

    var httpOptions = this.getHeader();

    return this.http.delete(AppConstants.apiBaseURL + AppConstants.phoneEndpoint +"/" + phoneDetail.id, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  addPhoneDetail(phoneDetail: PhoneDetail) {

    var httpOptions = this.getHeader();

    return this.http.post(AppConstants.apiBaseURL + AppConstants.phoneEndpoint, JSON.stringify(phoneDetail), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  addUpdatePhoneDetail(phoneDetail: PhoneDetail) {

    var httpOptions = this.getHeader();

    return this.http.post(AppConstants.apiBaseURL + AppConstants.phoneEndpoint, JSON.stringify(phoneDetail), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getHeader() {
    
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
      })
    };

    return httpOptions;
  }
  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
