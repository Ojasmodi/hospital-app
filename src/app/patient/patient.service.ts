import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  register(data: any): Observable<any> {
    //save i tin local-storage
    return of((Math.random() * 1000).toString());
  }

  getPatient() {}

  constructor() {}
}
