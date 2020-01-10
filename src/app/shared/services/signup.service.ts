import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  REG_API_URL = 'http://localhost:8080/moneymanager/register/user';

  headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  public registerUser(regData: any): Observable<any> {
    return this.http.post<any>(this.REG_API_URL,  regData).pipe(
      map(user => {
        if (user && user.userName) {
          localStorage.setItem('currentUserName', JSON.stringify(user.userName));
        }
        return user;
      })
    );
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
