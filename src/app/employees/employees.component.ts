import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { HttpParams } from '@angular/common/http';
// import {EMPLOYEES} from '../test-employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  numberOfPages: Array<number> = new Array<number>();
  numberOfRecordPerPage = 10;
  currentPage = 1;
  //num: number;
  NotFound: boolean = false;
  searchString: string;
  constructor(protected employeeService: EmployeeService,
    private commonService: CommonService
    ) { }
  employees: Employee[];
  // employees: string;
  selectedEmp: Employee;
  ngOnInit() {
    this.getEmployees(1);
    // this.resetFormFields();
    this.employeeService.getEmployeesCount().subscribe({
      next: (num : number)=>{
        console.log(num);
        for (let index = 0; index < num; index++) {
          this.numberOfPages.push(index + 1);
        }
      }
    });
    
  }

  onSelect(employee: Employee): void {
    employee.docProofLink = '';
    this.selectedEmp = employee;
  }

  onSearch(searchFormData: NgForm): void{
    if(!searchFormData.invalid){
      this.searchString = searchFormData.value.searchString;
      this.employeeService.searchEmployees(searchFormData.value.searchString)
      .subscribe(
        employees => {
          this.NotFound = false;
          this.employees = employees;
        },
        error => {

          this.NotFound = true;
          this.getEmployees(1);
          console.log("its error");
          console.log(error);
        }
      );
    }else{
      this.NotFound = false;
      this.getEmployees(1);
    }
  }

  onDelete(employee: Employee) {
    if (confirm('Are you sure you want to delete employee ?')) {
      this.employeeService.deleteEmployee(employee).subscribe(
        success => {
          alert('Employee Deleted');
          this.getEmployees(1);
        },
        error => {
          alert('Something went wrong');
        }
      );
    }
  }

  getEmployees(PageNumber: number): void {
    // Through normal way
    // this.employeeService.getEmployees().subscribe(emp => this.employees = emp);
    // Through Generic
    // this.commonService.get<Employee[]>("employee").subscribe(emp => this.employees = emp);
    let params = new HttpParams();
    params = params.append('PageNumber', PageNumber.toString());
    params = params.append('PageSize', '10');
    this.commonService.get<Employee[]>("employee",params).subscribe(emp => this.employees = emp);

    // this.employeeService.getEmployees().subscribe(emp => this.employees = emp);
    // console.log(this.employees);
  }


  getNotification(event: any) {
    if (event === true) {
      this.getEmployees(1);
    }
  }

  // Pagination
  previous(): void{
    if(this.currentPage > 1){
      this.getEmployees(--this.currentPage);
    }  
  }
  next(): void{
    if(this.currentPage < this.numberOfPages.length){
      this.getEmployees(++this.currentPage);
    }
  }
  gotoPage(page: number): void{
    this.currentPage = page;
    this.getEmployees(this.currentPage);
  }
}
