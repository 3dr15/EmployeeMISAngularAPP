import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Console } from '@angular/core/src/console';
import { CommonService } from '../services/common.service';
// import {EMPLOYEES} from '../test-employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(protected employeeService: EmployeeService,
    private commonService: CommonService
    ) { }
  employees: Employee[];
  // employees: string;
  selectedEmp: Employee;
  ngOnInit() {
    this.getEmployees();
    // this.resetFormFields();
  }

  onSelect(employee: Employee): void {
    employee.docProofLink = '';
    this.selectedEmp = employee;
  }

  onDelete(employee: Employee) {
    if (confirm('Are you sure you want to delete employee ?')) {
      this.employeeService.deleteEmployee(employee).subscribe(
        success => {
          alert('Employee Deleted');
          this.getEmployees();
        },
        error => {
          alert('Something went wrong');
        }
      );
    }
  }

  getEmployees(): void {
    // this.employees = this.employeeService.getEmployees();
    // this.employeeService.getEmployees().subscribe(emp => this.employees = emp);
    this.commonService.get<Employee[]>("employee").subscribe(emp => this.employees = emp);
    // this.employeeService.getEmployees().subscribe(emp => this.employees = emp);
    // console.log(this.employees);
  }


  getNotification(event: any) {
    if (event === true) {
      this.getEmployees();
    }
  }

}
