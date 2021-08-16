import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { PatientRoutingModule } from './patient-routing.module';

@NgModule({
  declarations: [
    ViewAllComponent,
    ViewPatientComponent,
    RegisterPatientComponent,
    EmployeeHomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    PatientRoutingModule,
  ],
})
export class PatientModule {}
