import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { EMPLOYEES } from './test-employees';
import { Employee } from '../model/employee';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FormsModule, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly apiRoot: string = 'https://localhost:44391/api';
  // readonly apiRoot: string = 'https://api.employeemis.com/api';
  // readonly apiRoot: string = 'https://api.employeemis.com/EmpApi/api';

  constructor(private httpClient: HttpClient) { }

  getEmployeesCount(): Observable<number> {
    return this.httpClient.get<number>(this.apiRoot + '/employee/count');
  }

  // getEmployees(): Observable<Employee[]> {
  //   // return of(EMPLOYEES);
  //   let params = new HttpParams();
  //      params = params.append('PageNumber', '2');
  //      params = params.append('PageSize', '10');
  //   return this.httpClient.get<Employee[]>(this.apiRoot + `/employee`,{ params });
  //   // return this.httpClient.get<Employee[]>('https://localhost:44375/api/employee');
  // }

  getEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.get<Employee>(this.apiRoot + '/employee/' + employee.employeeID);
  }

  searchEmployees(searchString: string): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.apiRoot + "/employee/search/" + searchString);
  }

  postEmployee(employeeFormData: Employee): Observable<object> {
    return this.httpClient.post(this.apiRoot + '/employee', employeeFormData);
  }

  updateEmployee(employeeFormData: Employee): Observable<object> {
    return this.httpClient.put(this.apiRoot + '/employee/' + employeeFormData.employeeID, employeeFormData);
  }

  deleteEmployee(employee: Employee): Observable<object> {
    return this.httpClient.delete(this.apiRoot + '/employee/' + employee.employeeID);
  }
}
