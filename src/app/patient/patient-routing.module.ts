import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../core/guards/auth-guard.service';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';

const routes: Routes = [
  {
    path: 'view-all',
    component: ViewAllComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: EmployeeHomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'view/:id',
    component: ViewPatientComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'register',
    component: RegisterPatientComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
