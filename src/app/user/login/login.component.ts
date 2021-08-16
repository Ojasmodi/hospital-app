import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from 'src/app/core/communication.service';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private route: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private communicationService: CommunicationService,
    private toastr: ToastrService
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  ngOnInit() {
    if (this.userService.isUserAuthorised()) {
      let userType = this.userService.getUserType();
      if (userType != 'app-user') {
        this.route.navigateByUrl('/patient/home');
      } else {
        this.route.navigateByUrl('/patient/view-all');
      }
    }
  }

  // convenient getter for easy access to form fields
  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    let data = {
      email: this.f.email.value,
      password: this.f.password.value,
    };
    this.spinner.show();
    this.userService.login(data).subscribe(
      (response) => {
        this.spinner.hide();
        if (response.status) {
          this.toastr.info('Login successful.');
          localStorage.setItem('authToken', response.authToken);
          localStorage.setItem('username', response.userName);
          localStorage.setItem('userType', response.userType);

          let data = {
            loginStatus: true,
            username: response.userName,
          };
          this.communicationService.setLoggedIn(data);
          if (response.userType == 'admin') {
            this.route.navigate(['/patient/view-all']);
          } else {
            this.route.navigate(['/patient/home']);
          }
        } else {
          this.toastr.error('Username or password is wrong.');
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error('Some error occured.');
      }
    );
  }
}
