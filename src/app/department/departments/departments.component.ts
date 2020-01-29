import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  submitted: boolean = false;
  departments: Department[];
  departmentFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
    this.createDepartmentFormGroup();
  }

  submit(): void{
    // console.log(this.departmentFormGroup);
    if(this.departmentFormGroup.valid){
      console.log(this.departmentFormGroup.value);
      if(this.departmentFormGroup.value.departmentID == 0){
        this.createDepartment(this.departmentFormGroup.value);
      }else{
        if(confirm("Are you sure you want to update your department!")){
          this.updateDepartment(this.departmentFormGroup.value);
        }
      }
    }else{
      this.submitted = true;
    }

  }

  createDepartment(department: Department): void{
    this.departmentService.postDepartment(department).subscribe(
      success => {
        alert("Successfull");
        this.createDepartmentFormGroup();
        this.getDepartments();
        this.submitted = false; 
      },
      error => {
        alert('Somthing Went Wrong');
        this.submitted = true;
      }
    );
  }

  updateDepartment(department: Department): void{
    this.departmentService.updateDepartment(department).subscribe(
      success => {
        alert("Departmetn Successfully updated");
        this.submitted = false;
        this.createDepartmentFormGroup();
        this.getDepartments();
      },
      error => {
        alert("Something Went Wrong");
        this.submitted = true;
      }
    )
  }

  getDepartments(): void{
    this.departmentService.getDepartments().subscribe({
      next: (dep: Department[]) => {
        this.departments = dep;
      }
    });
  }

  createDepartmentFormGroup(): void{
    this.departmentFormGroup = this.formBuilder.group(
      {
        departmentID: [0, [
          Validators.required,
        ]],
        departmentName: ['',[
          Validators.required,
          Validators.minLength(3)
        ]]
      }
    );
  }

  onEdit(department: Department): void{
    this.departmentFormGroup.reset();
    this.departmentFormGroup.patchValue({
      departmentID: department.departmentID,
      departmentName: department.departmentName
    });
  }

  onDelete(department: Department): void{
    if(confirm(`Do you want to delete ${department.departmentName} ?`)){
      this.departmentService.deleteDepartment(department).subscribe(
        success => {
          this.getDepartments();
        },
        error => {
          alert("Something went wrong try again!");
        }
        
      );
    }
  }
}
