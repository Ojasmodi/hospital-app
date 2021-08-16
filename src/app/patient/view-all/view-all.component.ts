import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.less'],
})
export class ViewAllComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let userType = this.userService.getUserType();
    if (userType != 'admin') {
      this.toastr.warning('Access-denied');
      this.route.navigateByUrl('/patient/home');
    }
  }
}
