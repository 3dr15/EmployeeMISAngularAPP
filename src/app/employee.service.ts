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
  return this.httpClient.get<Employee[]>('https://localhost:44391/api/employees');
  // return this.httpClient.get<Employee[]>('https://localhost:44375/api/employee/');

}
constructor(private httpClient: HttpClient) { }

}
