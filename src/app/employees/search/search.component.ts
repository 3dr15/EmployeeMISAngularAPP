import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchString: string;
  employee: Employee[];
  submitted: boolean;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    // this.searchString="Dumy"
  }

  private onSearch(formData: NgForm){
    if (!formData.invalid) {
      console.log(formData.value.searchString );
      this.employeeService.searchEmployees(this.searchString).subscribe(emp => this.employee = emp);
      console.log(this.employee)
      this.submitted = true;
    } else {
      this.submitted = true;
    }
  }
}
