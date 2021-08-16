import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private isUserLoggedIn = new Subject();
  loginData = this.isUserLoggedIn.asObservable();

  setLoggedIn(data: any) {
    this.isUserLoggedIn.next(data);
  }

  constructor() {}
}
