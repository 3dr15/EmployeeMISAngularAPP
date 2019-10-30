import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { from } from 'rxjs';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      EmployeesComponent,
      EmployeeDetailsComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
