import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Console } from '@angular/core/src/console';
// import {EMPLOYEES} from '../test-employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(protected employeeService: EmployeeService) { }
  employees: Employee[];
  // employees: string;
  selectedEmp: Employee;
  onSelect(employee: Employee): void {
    this.selectedEmp = employee;
  }

  onPost(formData: NgForm) {
    this.employeeService.postEmployee(formData.value).subscribe(
      res => {
        console.log('Successfull');
      },
      err => {
        console.log('Something Went Wrong');
      }
      );
  }

  getEmployees(): void {
    // this.employees = this.employeeService.getEmployees();
    this.employeeService.getEmployees().subscribe(emp => this.employees = emp);
    // console.log(this.employees);
  }

  ngOnInit() {
    this.getEmployees();
  }

}
