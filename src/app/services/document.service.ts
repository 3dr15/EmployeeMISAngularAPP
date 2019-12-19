import { DocumentBase64Str } from './../model/documentBase64Str';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  readonly apiRoot: string = 'https://api.employeemis.com/api';
  constructor(private httpClient: HttpClient) { }

  getDocument(id: any): Observable<HttpResponse<Blob>> {
    return this.httpClient
    .get(this.apiRoot + '/employeeDocument/' + id, { observe: 'response', responseType: 'blob' } );
  }

}
