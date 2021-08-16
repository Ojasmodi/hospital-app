import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';



@NgModule({
  declarations: [
    ViewAllComponent,
    ViewPatientComponent,
    RegisterPatientComponent,
    EmployeeHomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PatientModule { }
