import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPLOYEES } from './test-employees';
import { Employee } from './employee';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
getEmployees(): Observable<Employee[]> {
  // return of(EMPLOYEES);
  return this.httpClient.get<Employee[]>('https://localhost:44375/api/employee/');
   //return this.httpClient.get<any>('http://mrtwitt.000webhostapp.com/wp-json/');
}
constructor(private httpClient: HttpClient) { }

}
