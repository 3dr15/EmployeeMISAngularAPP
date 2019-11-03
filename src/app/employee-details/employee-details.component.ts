import { from } from 'rxjs';
import { Employee } from './../employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() employee: Employee;
  constructor(protected employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetFormFields();
  }

  onSubmit(formData: NgForm) {
    this.employeeService.postEmployee(formData.value).subscribe(
      success => {
        alert('Successfull');
      },
      error => {
        console.log(error);
        alert('Somthing Went Wrong');
      }
    );
    console.log(formData.value);
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
