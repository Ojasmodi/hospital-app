import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private validAdminEmail: string = 'admin@admin.com';
  private validAdminPassword: string = '12341234';

  private validEmployeeEmail: string = 'employee@app.com';
  private validEmployeePassword: string = '12341234';

  constructor(private http: HttpClient) {}

  isUserAuthorised(): boolean {
    return localStorage.getItem('authToken') ? true : false;
  }

  getUserType() {
    return localStorage.getItem('userType');
  }

  login(data: { email: any; password: any }): Observable<any> {
    let result = {
      status: false,
      authToken: null,
      userName: null,
    };
    if (
      data.email == this.validAdminEmail &&
      data.password == this.validAdminPassword
    ) {
      return this.http.get<any>(`./../assets/responses/login_admin.json`);
    } else if (
      data.email == this.validEmployeeEmail &&
      data.password == this.validEmployeePassword
    ) {
      return this.http.get<any>(`./../assets/responses/login_app_user.json`);
    }
    return of(result);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
  }
}
