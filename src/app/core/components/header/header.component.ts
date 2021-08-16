import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { CommunicationService } from './../../communication.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  user = { userName: '' };
  communicatonSubs!: Subscription;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.user.userName = localStorage.getItem('username') || '{}';
    this.isUserLoggedIn = this.userService.isUserAuthorised();
    this.communicatonSubs = this.communicationService.loginData.subscribe(
      (data: any) => {
        this.isUserLoggedIn = data.loginStatus;
        this.user.userName = data.username;
      }
    );
  }

  logout() {
    this.userService.logout();
    this.communicationService.setLoggedIn(false);
    this.toastr.success('Logout success.');
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.communicatonSubs.unsubscribe();
  }
}
