import { DocumentComponent } from './document/document.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full'},
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/document/:id', component: DocumentComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'routePath' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
