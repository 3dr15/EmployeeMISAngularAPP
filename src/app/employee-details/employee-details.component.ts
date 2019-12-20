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
  file: any;
  submitted: boolean;

  constructor(protected employeeService: EmployeeService, protected departmentService: DepartmentService) { }

  ngOnInit() {
    this.resetFormFields();
    this.getDepartments();
    this.submitted = false;
  }

  // File Handeling Start
  fileUpload(event: any) {     // This event trigers while file is selected to upload
    if (event.target.files[0]) {
      this.file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.fileLoad.bind(this);
      fileReader.readAsBinaryString(this.file);
      // console.log(this.file);
    }
  }

  fileLoad(Efile) {     // Functions as a onload event for FileReader class
    const binaryString = Efile.target.result;     // Gives Binary string
    this.file = btoa(binaryString);               // Converts that Binary string to base64 String from binary
    // console.log(btoa(binaryString));
  }
  // File Handeling End

  getDepartments() {
    this.departmentService.getDepartments().subscribe(dep => this.departments = dep);
  }


  onSubmit(formData: NgForm) {
    if (!formData.invalid) {
      // tslint:disable-next-line: radix
      formData.value.departmentID = parseInt(formData.value.departmentID);
      // tslint:disable-next-line: radix
      formData.value.phoneNumber = parseInt(formData.value.phoneNumber);
      // formData.value.docProofLink = btoa(formData.value.docProofLink);
      formData.value.docProofLink = this.file;

      console.log(formData.value);
      // return;

      if (formData.value.employeeID === 0) {
        this.postEmployee(formData);
      } else {
        if (confirm('Are you sure you want to update employee information ?')) {
          this.updateEmployee(formData);
        }
      }
    } else {
      this.submitted = true;
    }
  }

  postEmployee(formData: NgForm) {
    // console.log(formData.value);
    this.employeeService.postEmployee(formData.value).subscribe(
      success => {
        alert('Successfull');
        this.resetFormFields();
        this.submitted = false;
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
        this.submitted = false;
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
