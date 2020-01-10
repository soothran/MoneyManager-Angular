import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogIn: BehaviorSubject<boolean>;
  AUTH_API_URL = 'http://localhost:8080/moneymanager/auth/user';

  constructor(private http: HttpClient, private persistenceService: PersistenceService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  public authenticateUser(data: any): Observable<any> {
    return this.http.post<any>(this.AUTH_API_URL, data).pipe(
      map(user => {
        const userData: User = user;
        if (userData && userData.userId && userData.userName && userData.status === 'ACTIVE') {
          this.persistenceService.set('userDetails', user, { type: StorageType.LOCAL });
          localStorage.setItem('loggedInUser', user.userName);
          localStorage.setItem('userId', JSON.stringify(user.userId));
          this.isLogIn.next(true);
          return true;
        } else {
          this.isLogIn.next(false);
          console.log('failed');
        }
        return false;
      })
    );
  }

  getUserProfile() {
    return this.persistenceService.get('userDetails', StorageType.LOCAL);
  }

  getAuthStatus(): Observable<boolean> {
    return this.isLogIn.asObservable();
  }

  logoutUser(): Observable<boolean> {
    if (localStorage.getItem('userId') !== null) {
      localStorage.removeItem('userId');
      localStorage.removeItem('loggedInUser');
      this.persistenceService.remove('userDetails', StorageType.LOCAL);
      this.persistenceService.removeAll(StorageType.SESSION);
    }
    return this.isLogIn.asObservable();
  }

  getUserId(): string {
    if (this.getAuthStatus()) {
      return localStorage.getItem('userId');
    }
    return '0';
  }

  getUserName(): Observable<string> {
    const username = new BehaviorSubject<string>('');
    if (this.getAuthStatus()) {
      const uName = localStorage.getItem('loggedInUser');
      return new BehaviorSubject<string>(uName).asObservable();
    }
    return username.asObservable();
  }

  loadLocalStorageAuthData() {
    if (localStorage.getItem('userId') !== null && localStorage.getItem('loggedInUser') !== null) {
      this.isLogIn.next(true);
    }
    return this.isLogIn.asObservable();
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
