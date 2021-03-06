import { Department } from './../model/department';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // readonly apiRoot: string = 'https://localhost:44391/api';
  readonly apiRoot: string = 'http://api.employeemis.com/api';
  // readonly apiRoot: string = 'http://localhost:8880/api';


  constructor(private httpClient: HttpClient) { }

  searchDepartments(searchString: string): Observable<Department[]>{
    return this.httpClient.get<Department[]>(this.apiRoot + "/department/search/" + searchString);
  }

  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.apiRoot + '/department');
  }

  postDepartment(departmentFormData: Department): Observable<object> {
    return this.httpClient.post(this.apiRoot + '/Department', departmentFormData);
  }

  updateDepartment(departmentFormData: Department): Observable<object> {
    return this.httpClient.put(this.apiRoot + '/Department/' + departmentFormData.departmentID, departmentFormData);
  }

  deleteDepartment(department: Department): Observable<object> {
    return this.httpClient.delete(this.apiRoot + '/Department/' + department.departmentID);
  }
}
