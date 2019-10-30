import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
// import {EMPLOYEES} from '../test-employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

   employees: Employee[];
  // employees: string;
  selectedEmp: Employee;
  onSelect(employee: Employee): void {
    this.selectedEmp = employee;
  }

  constructor(protected employeeService: EmployeeService) { }

  getEmployees(): void {
    // this.employees = this.employeeService.getEmployees();
    this.employeeService.getEmployees().subscribe(emp => this.employees = emp);
    console.log(this.employees);
  }

  ngOnInit() {
    this.getEmployees();
  }

}
