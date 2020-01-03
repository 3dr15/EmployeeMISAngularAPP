import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesInDepartmentComponent } from './employees-in-department.component';

describe('EmployeesInDepartmentComponent', () => {
  let component: EmployeesInDepartmentComponent;
  let fixture: ComponentFixture<EmployeesInDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesInDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesInDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
