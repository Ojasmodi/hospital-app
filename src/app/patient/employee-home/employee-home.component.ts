import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.less'],
})
export class EmployeeHomeComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    let userType = this.userService.getUserType();
    if (userType != 'app-user') {
      this.toastr.warning('Access-denied');
      this.route.navigateByUrl('/patient/view-all');
    }
  }
}
