import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // readonly apiRoot: string = 'https://localhost:44391/api';
  readonly apiRoot: string = 'http://api.employeemis.com/api';
  // readonly apiRoot: string = 'http://localhost:8880/api';


  constructor(private httpClient: HttpClient) { }

  // get<T>(url: string): Observable<T> {
  //   return this.httpClient.get<T>(this.apiRoot + "/" + url);
  // }
  get<T>(url: string,params?: HttpParams): Observable<T> {
    if(params === null){
      return this.httpClient.get<T>(this.apiRoot + "/" + url);
    }
    return this.httpClient.get<T>(this.apiRoot + "/" + url,{ params });
  }

}
