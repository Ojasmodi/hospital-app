import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';
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
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.signUpForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z ]+$'),
        ],
      ],
      age: ['', [Validators.required, Validators.max(99), Validators.min(1)]],
      gender: ['', [Validators.required]],
      symptoms: ['', [Validators.required]],
      address: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.pattern('^[A-Za-z0-9 ]+$'),
        ],
      ],
      city: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]+$')]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  ngOnInit() {
    let userType = this.userService.getUserType();
    if (userType != 'app-user') {
      this.toastr.warning('Access-denied');
      this.route.navigateByUrl('/patient/view-all');
    }
  }

  onSubmit() {
    let data = {
      name: this.f.name.value,
      address: this.f.address.value,
      age: this.f.age.value,
      symptoms: this.f.symptoms.value,
      gender: this.f.gender.value,
      phoneNumber: this.f.phoneNumber.value,
      email: this.f.email.value,
      city: this.f.email.value,
    };
    this.spinner.show();
    this.patientService.register(data).subscribe(
      (response) => {
        this.spinner.hide();
        if (response) {
          this.toastr.info('Register successful.');
          this.route.navigate(['/patient/view/', response]);
        } else {
          this.toastr.error('Some issue in registering patient.');
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error('Some error occured.');
      }
    );
  }
}
