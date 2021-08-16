import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/core/communication.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.less'],
})
export class RegisterPatientComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private route: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private communicationService: CommunicationService
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      symptoms: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}
}
