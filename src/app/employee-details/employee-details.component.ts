import { from } from 'rxjs';
import { Employee } from './../employee';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() employee: Employee;
  @Output() Notify = new EventEmitter<boolean>();
  constructor(protected employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetFormFields();
  }

  onSubmit(formData: NgForm) {
    if (formData.value.id === 0) {
      this.postEmployee(formData);
    } else {
      if (confirm('Are you sure you want to update employee information ?')) {
        this.updateEmployee(formData);
      }
    }
  }

  postEmployee(formData: NgForm) {
    this.employeeService.postEmployee(formData.value).subscribe(
      success => {
        alert('Successfull');
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
      id: 0,
      firstName: '',
      lastName: '',
      departmentId: null,
      docProofLink: '',
      email: '',
      password: '',
      phoneNumber: null,
      salary: null
    };
  }
}
