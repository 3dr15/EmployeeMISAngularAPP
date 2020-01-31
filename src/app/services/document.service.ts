import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  readonly apiRoot: string = 'https://localhost:44391/api';
  // readonly apiRoot: string = 'http://api.empmis.com/api';
  constructor(private httpClient: HttpClient) { }

  getDocument(id: any): Observable<Blob> {
    return this.httpClient
    .get(this.apiRoot + '/employeeDocument/' + id, { responseType: 'blob' } );
  }

  // getDoc(id: any): Observable<any> {
  //   return this.httpClient
  //   .get<any>(this.apiRoot + '/employeeDocument/' + id, { observe: 'response', responseType: 'blob' } );
  // }

}
