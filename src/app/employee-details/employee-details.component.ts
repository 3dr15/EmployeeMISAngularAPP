import { DepartmentService } from './../services/department.service';
import { from } from 'rxjs';
import { Employee } from '../model/employee';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { NgForm } from '@angular/forms';
import { Department } from '../model/department';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  departments: Department[];
  @Input() employee: Employee;
  @Output() Notify = new EventEmitter<boolean>();
  constructor(protected employeeService: EmployeeService, protected departmentService: DepartmentService) { }

  ngOnInit() {
    this.resetFormFields();
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(dep => this.departments = dep);
  }

  onSubmit(formData: NgForm) {
    if (!formData.invalid) {
      // tslint:disable-next-line: radix
      formData.value.departmentID = parseInt(formData.value.departmentID);
      // tslint:disable-next-line: radix
      formData.value.phoneNumber = parseInt(formData.value.phoneNumber);
      if (formData.value.employeeID === 0) {
        this.postEmployee(formData);
      } else {
        if (confirm('Are you sure you want to update employee information ?')) {
          this.updateEmployee(formData);
        }
      }
    }
  }

  postEmployee(formData: NgForm) {
    console.log(formData.value);
    this.employeeService.postEmployee(formData.value).subscribe(
      success => {
        alert('Successfull');
        this.resetFormFields();
        this.setNotification(true);
      },
      error => {
        console.log(error);
        alert('Somthing Went Wrong');
        this.setNotification(false);
      }
    );
  }

  updateEmployee(formData: NgForm) {
    this.employeeService.updateEmployee(formData.value).subscribe(
      success => {
        alert('Successfull');
        // this.getEmployees();
        this.resetFormFields();
        this.setNotification(true);
      },
      error => {
        console.log(error);
        alert('Somthing Went Wrong');
        this.setNotification(false);
      }
    );
  }

  setNotification(status: boolean) {
     this.Notify.emit(status);
  }
  resetFormFields(formData?: NgForm) {
    if (formData != null) {
       formData.resetForm();
    }
    this.employee = {
      employeeID: 0,
      firstName: '',
      lastName: '',
      departmentID: null,
      docProofLink: '',
      email: '',
      password: '',
      phoneNumber: null,
      salary: null
    };
  }
}
